const axios = require("axios");
import historyModel from "../db/models/history.model";
import userModel from "../db/models/user.model";
import { Request, Response } from "express";
import { User, Promo } from "../interface/interface";

export async function getAllstudents(req: Request, res: Response) {
  const students = await getStudents(req, res);

  res.send(students);
}

export async function getStudentByPromo(req: Request, res: Response) {
  const { id } = req.params || { id: null };

  if (id) {
    let students = await userModel.find({ "promo.id": parseInt(id) });
    if (students) {
      res.send(students);
    } else {
      res.send({ code: 404, error: "No students found" });
    }
  } else {
    res.send({ code: 404, error: "No id provided" });
  }
}

export async function getStudentById(req: Request, res: Response) {
  const { id } = req.params;

  if (id) {
    const student = await userModel.findOne({ login: id.toString() });
    if (student) {
      return res.send(student);
    }
  }

  return res.send({ code: 404, error: "No student found" });
}

export async function getStudents(req: Request, res: Response) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }
  const response = await axios.get(
    "https://intra-api.etna-alternance.net/trombi",
    {
      headers: {
        Cookie: "authenticator=" + authenticator,
      },
    }
  );

  let data = response.data;

  const students = [];

  for (const property in data) {
    const arrayOfPromo = data[property];

    for (let i = 0; i < arrayOfPromo.length; i++) {
      const promo = arrayOfPromo[i];
      let promoData = await axios.get(
        `https://intra-api.etna-alternance.net/trombi/${promo.id}`,
        {
          headers: {
            Cookie: "authenticator=" + authenticator,
          },
        }
      );
      promoData = promoData.data;
      const studentsData = promoData.students;
      for (let j = 0; j < studentsData.length; j++) {
        const student = {
          login: studentsData[j].login,
          firstname: studentsData[j].firstname,
          lastname: studentsData[j].lastname,
          absences: [],
          retards: [],
          promo: promo,
          img: `https://auth.etna-alternance.net/api/users/${studentsData[j].login}/photo`,
        };
        if ((await userModel.findOne({ login: student.login })) === null) {
          await new userModel(student).save();
        }
        students.push(student);
      }
    }
  }
  return students;
}

export async function updateStudent(req: Request, res: Response) {
  const { id } = req.params;

  if (id) {
    const student = await userModel.findOne({ login: id.toString() });
    if (student) {
      const justifying = req.body.justifying;
      const date = req.body.date;
      const arrival = req.body.arrival;
      const type = req.body.type;
      const boolean = req.body.boolean;
      if (student && type && date && arrival) {
        if (type === "absence") {
          userModel.findOneAndUpdate(
            {
              login: id.toString(),
              "absences.date": date,
              "absences.arrival": arrival,
            },
            {
              $set: {
                "absences.$.justified": boolean === "true" ? true : false,
                "absences.$.commentary": justifying,
              },
            },
            { new: true, useFindAndModify: false },
            (err) => {
              if (err) {
                console.log("Something wrong when updating data!");
              }
              return res.send({ code: 200, message: "Absence updated" });
            }
          );
        } else if (type === "retard") {
          userModel.findOneAndUpdate(
            {
              login: id.toString(),
              "retards.date": date,
              "retards.arrival": arrival,
            },
            {
              $set: {
                "retards.$.justified": boolean === "true" ? true : false,
                "retards.$.commentary": justifying,
              },
            },
            { new: true, useFindAndModify: false },
            (err) => {
              if (err) {
                console.log("Something wrong when updating data!");
              }
              return res.send({ code: 200, message: "Absence updated" });
            }
          );
        } else {
          return res.send({
            code: 400,
            message: "Retard ou Absence introuvable",
          });
        }
      } else {
        return res.send({
          code: 400,
          message: "Paramètre(s) invalide(s)",
        });
      }
    }
  } else {
    return res.send({ code: 404, message: "Paramètre(s) invalide(s)" });
  }
}

export async function deleteIrregularity(req: Request, res: Response) {
  const { id } = req.params;
  const date = req.body.date;
  const arrival = req.body.arrival;
  const moment =
    arrival < "12:00:00" && arrival !== "00:00:00" ? "matin" : "après-midi";
  const type = req.body.type;

  if (type === "absence") {
    const user = await userModel.findOneAndUpdate(
      { login: id.toString() },
      { $pull: { absences: { date: date, arrival: arrival } } },
      { new: true }
    );
    await historyModel.updateOne(
      { date: date, moment: moment, "users.login": id.toString() },
      { $set: { "users.$.arrival": "NON ÉMARGÉ" } }
    );
    return res.send({ code: 200, message: "Modifications terminées" });
  }
  if (type === "retard") {
    await userModel.findOneAndUpdate(
      { login: id.toString() },
      { $pull: { retards: { date: date, arrival: arrival } } },
      { new: true }
    );
    await historyModel.updateOne(
      { date: date, moment: moment, "users.login": id.toString() },
      { $set: { "users.$.arrival": "NON ÉMARGÉ" } }
    );
    return res.send({ code: 200, message: "Modifications terminées" });
  }
  return res.send({ code: 200, message: "Erreur" });
}
