import { useEffect, useState } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { getUserByPromo } from "../api/getUserByPromo";
import moment from "moment";
import { AxiosResponse } from "axios";

const nbDaysInRun = 15;

export default function GeneratePDF({ id }: { id: string }) {
  const [students, setStudents] = useState([]);
  const [startDate, setStartDate] = useState<string>("");
  let html = "";

  useEffect(() => {
    getUserByPromo(id).then((res: AxiosResponse) => {
      setStudents(res.data);
    });
  }, []);

  const generatePDF = async () => {
    const content = `
      <html>
      <style>
      table {
          border-collapse: collapse;
          width: 100%;
          font-size: 16px;
      }

      th,
      td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
          font-size: 15px;
      }

      th {
          background-color: #b3c8ff;
          font-weight: bold;
      }

      tr:nth-child(even) {
          background-color: #f9f9f9;
      }

      tr:hover {
          background-color: #f5f5f5;
      }

      td:first-child {
          font-weight: bold;
      }

      td:nth-child(2),
      td:nth-child(3) {
          font-size: 14px;
      }
      h1 {
          text-align: center;
          font-size: 15px;
          margin-top: 25px;
      }
      h2 {
          text-align: left;
          font-size: 13px;
      }
      div {
          border: 2px solid red;
          width: 200px;
          height: 30px;
      }
        </style>
        <head>
        </head>
        <body>
          ${html}
      </html>
    `;
    const { uri } = await printToFileAsync({ html: content });
    await shareAsync(uri);
  };

  const isAbsent = (irregularities: any, date: any, isMorning: any) => {
    return irregularities.some((irregularity: any) => {
      const irregularityDate = moment(irregularity.date, "DD/MM/YYYY");
      const irregularityIsMorning =
        irregularity.arrival <= "12:00:00" &&
        irregularity.arrival !== "00:00:00";
      return (
        irregularityDate.isSame(date, "day") &&
        irregularityIsMorning === isMorning
      );
    });
  };

  const generateTableRows = (student: any) => {
    const rows = [];
    const runStartDate = moment(startDate, "DD/MM/YYYY"); // TODO: update with actual run start date
    for (let i = 0; i < nbDaysInRun; i++) {
      const currentDate = moment(runStartDate);
      currentDate.add(i, "days");
      const date = currentDate.format("DD/MM/YYYY");
      const isMorningAbsent = isAbsent(student.absences, currentDate, true);
      const isAfternoonAbsent = isAbsent(student.absences, currentDate, false);
      const morningPresence = isMorningAbsent ? "Absent" : "Présent";
      const afternoonPresence = isAfternoonAbsent ? "Absent" : "Présent";
      rows.push(
        `<tr><td>${date}</td><td>${morningPresence}</td><td>${afternoonPresence}</td></tr>`
      );
    }
    return rows.join("");
  };

  students.forEach((student: any) => {
    const tableRows = generateTableRows(student);
    html += `
    
      <img src="https://etna.io/wp-content/uploads/2018/09/Logo-ETNA-Ecole-Informatique-Alternance.png" alt="ETNA" width="175" height="55" position="absolute" top="10" left="10" />
      <h1> Feuille d'émargement </h1>
      <h2> Intitulé de la formation : Chargée de projets informatiques </h2>
      <h2> Lieu de la formation : ETNA - 7 rue Maurice Grandcoing - 94200 IVRY SUR SEINE </h2>
      <h2> Stagiaire : ${student.firstname} ${student.lastname} </h2>
      <h2 margin-bottom=50px> Récapitulatif de la participation du stagiaire sur la période du ${startDate} au ${moment(
      startDate,
      "DD/MM/YYYY"
    )
      .add(14, "days")
      .format("DD/MM/YYYY")} </h2>
      <table>
        <tr><th>Date</th><th>Matin</th><th>Après-midi</th></tr>
        ${tableRows}
      </table>
      <h2> Fait à Ivry-sur-Seine, le 27/02/2023. </h2>
      <h2> Signature du stagiaire </h2>
      <div></div>
      </body>
      <br/><br/>
    `;
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Rentrer la date de début de run"
        value={startDate}
        onChangeText={setStartDate}
        style={{
          textAlign: "center",
          height: 40,
          borderWidth: 1,
          borderColor: "lightgrey",
          marginBottom: 20,
          borderRadius: 5,
          padding: 5,
        }}
      />
      <TouchableOpacity
        onPress={generatePDF}
        style={{
          backgroundColor: "darkred",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text>Générer et partager le PDF</Text>
      </TouchableOpacity>
    </View>
  );
}
