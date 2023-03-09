import historyModel from "../db/models/history.model";
import { Request, Response } from "express";
import moment from "moment";
import userModel from "../db/models/user.model";
import { User } from "../interface/interface";

export async function getHistory(req: Request, res: Response) {
  const history = await historyModel.find();

  if (history) {
    return res.send({ status: 200, data: history });
  }

  return res.send({ status: 400, message: "No history found" });
}

export async function getHistoryByDate(req: Request, res: Response) {
  const history = await historyModel.findOne({ date: req.params.date });

  if (history) {
    return res.send({ status: 200, data: history });
  }

  return res.send({ status: 400, message: "No history found" });
}

export async function createHistory(req: Request, res: Response) {
  const today = moment(new Date()).format("DD/MM/YYYY");
  const now = moment().format("HH:mm:ss") < "12:00:00" ? "matin" : "après-midi";

  if (
    await historyModel.findOne({
      date: today,
      moment: now,
    })
  ) {
    return res.send({ status: 400, message: "History already created" });
  }

  const newHistory = await new historyModel({
    date: moment(new Date()).format("DD/MM/YYYY"),
    moment: now,
    users: [],
  }).save();

  if (newHistory) {
    return res.send({ status: 200, message: "History created" });
  }

  return res.send({ status: 400, message: "History not created" });
}

export async function updateHistory(req: Request, res: Response) {
  const user = await userModel.findOne({ login: req.body.login });
  let now = "";
  const nowDate = moment(req.params.date, "DD/MM/YYYY");
  const startDate = moment("2023-02-27");
  const daysPassed = nowDate.diff(startDate, "days") + 1;
  const runNumber = Math.ceil(daysPassed / 21);

  if (req.body.moment === "matin" || req.body.moment === "après-midi") {
    now = req.body.moment;
  } else {
    now = moment().format("HH:mm:ss") < "12:00:00" ? "matin" : "après-midi";
  }

  const history = await historyModel.findOne({
    date: req.params.date,
    moment: now,
  });

  if (user && history)
    for (let i = 0; i < history.users.length; i++) {
      if (
        history.users[i].login === req.body.login &&
        history.users[i].arrival === "NON ÉMARGÉ"
      ) {
        history.users[i].arrival = "00:00:00";
        await history.updateOne({ users: history.users }, { new: true });
        await history.save();
        await user.updateOne(
          {
            $push: {
              absences: {
                date: req.params.date,
                arrival: "00:00:00",
                justified: false,
                commentary: "",
                run: runNumber,
              },
            },
          },
          { new: true }
        );
        await user.save();
        return res.send({ status: 200, message: "User updated" });
      }
    }

  if (user && history) {
    const userInfo = {
      login: user.login,
      firstname: user.firstname,
      lastname: user.lastname,
      promo: user.promo,
      absences: user.absences,
      retards: user.retards,
      img: user.img,
      arrival: moment().format("HH:mm:ss"),
    };

    if (history.users.find((user: User) => user.login === userInfo.login)) {
      return res.send({ status: 401, message: "User already in history" });
    } else {
      await history.updateOne({ $push: { users: userInfo } }, { new: true });
      await history.save();

      const [hoursStr, minutesStr] = userInfo.arrival.split(":");
      const hours = parseInt(hoursStr);
      const minutes = parseInt(minutesStr);

      if (now === "matin") {
        if (hours === 9 && minutes >= 0 && minutes <= 30) {
          const retard = {
            date: req.params.date,
            arrival: userInfo.arrival,
            justified: false,
            commentary: "",
            run: runNumber,
          };
          await user.updateOne({ $push: { retards: retard } }, { new: true });
          await user.save();
        }

        if (hours > 9 || (hours === 9 && minutes > 30)) {
          const absence = {
            date: req.params.date,
            arrival: userInfo.arrival,
            justified: false,
            commentary: "",
            run: runNumber,
          };
          await user.updateOne({ $push: { absences: absence } }, { new: true });
          await user.save();
        }
      } else {
        if (hours >= 18) {
          const absence = {
            date: req.params.date,
            arrival: userInfo.arrival,
            justified: false,
            commentary: "",
            run: runNumber,
          };
          await user.updateOne({ $push: { absences: absence } }, { new: true });
          await user.save();
        }
      }
      return res.send({ status: 200, message: "History updated" });
    }
  }

  return res.send({ status: 400, message: "History not updated" });
}

export async function notCheckedIn() {
  const allStudents = await userModel.find();
  const date = moment(new Date()).format("DD/MM/YYYY");
  const now = moment().format("HH:mm:ss") < "12:00:00" ? "matin" : "après-midi";

  const registering = await historyModel.findOne({
    date: date,
    moment: now,
  });

  if (registering && allStudents !== undefined) {
    const filter = new Set(registering.users.map((user: User) => user.login));

    const newUsers = allStudents.filter((user) => !filter.has(user.login));

    newUsers.forEach((user) => {
      const newUser = {
        login: user.login,
        firstname: user.firstname,
        lastname: user.lastname,
        promo: user.promo,
        absences: user.absences,
        retards: user.retards,
        img: user.img,
        arrival: "NON ÉMARGÉ",
      };
      registering.users.push(newUser);
    });

    await registering.save();
  }
  return true;
}
