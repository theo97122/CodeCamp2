import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { studentCardDetailsStyle } from "../styles/studentCardDetailsStyle";
import PunctualityCard from "./punctualityCard";
import { Key, useEffect, useState } from "react";
import { getUserById } from "../api/getUserById";
import { AxiosResponse } from "axios";

export default function StudentCardDetails({ student }: any) {
  const [absences, setAbsences] = useState([]);
  const [retards, setRetards] = useState([]);
  const [run, setRun]: any = useState();
  const [runSelected, setRunSelected] = useState(0);
  const [type, setType] = useState("absence");

  useEffect(() => {
    getUserById(student.login).then((res: AxiosResponse) => {
      const absences = res.data.absences;
      const retards = res.data.retards;
      setAbsences(absences);
      setRetards(retards);

      const allRuns = [
        ...new Set([
          ...absences.map((a: any) => a.run),
          ...retards.map((r: any) => r.run),
        ]),
      ];

      setRun(allRuns);
    });
  }, []);

  return (
    <View style={studentCardDetailsStyle.container}>
      <View style={studentCardDetailsStyle.containerMain}>
        <Image
          style={studentCardDetailsStyle.image}
          source={{ uri: student.img }}
        />
        <View style={studentCardDetailsStyle.containerMainText}>
          <View>
            <Text style={studentCardDetailsStyle.login}> {student.login} </Text>
          </View>
          <View>
            <Text style={studentCardDetailsStyle.nameText}>
              {student.firstname}
            </Text>
            {student.lastname.length < 15 ? (
              <Text style={studentCardDetailsStyle.nameText}>
                {student.lastname}
              </Text>
            ) : (
              <Text style={studentCardDetailsStyle.nameText}>
                {student.lastname.split(" ")[0] +
                  "\n" +
                  student.lastname.split(" ")[1]}
                {}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={studentCardDetailsStyle.trait}></View>
      <View style={studentCardDetailsStyle.punctualityContainer}>
        <View style={studentCardDetailsStyle.buttonContainer}>
          {type === "absence" ? (
            <TouchableOpacity
              style={studentCardDetailsStyle.filterButtonActive}
              onPress={() => setType("absence")}
            >
              <Text style={{ fontFamily: "RobotoSlab-Regular" }}>
                {" "}
                ABSENCES{" "}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={studentCardDetailsStyle.filterButtonInactive}
              onPress={() => setType("absence")}
            >
              <Text style={{ fontFamily: "RobotoSlab-Regular" }}>
                {" "}
                ABSENCES{" "}
              </Text>
            </TouchableOpacity>
          )}
          {type === "retard" ? (
            <TouchableOpacity
              style={studentCardDetailsStyle.filterButtonActive}
              onPress={() => setType("retard")}
            >
              <Text style={{ fontFamily: "RobotoSlab-Regular" }}>
                {" "}
                RETARDS{" "}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={studentCardDetailsStyle.filterButtonInactive}
              onPress={() => setType("retard")}
            >
              <Text style={{ fontFamily: "RobotoSlab-Regular" }}>
                {" "}
                RETARDS{" "}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={studentCardDetailsStyle.retardContainer}>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {run?.map((run: number, key: number) => {
                return (
                  <TouchableOpacity
                    key={key}
                    style={studentCardDetailsStyle.runButtonStyle}
                    onPress={() => setRunSelected(key + 1)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: "auto",
                        marginBottom: "auto",
                        fontFamily: "RobotoSlab-Regular",
                      }}
                    >
                      {" "}
                      RUN {run}{" "}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <ScrollView>
            {type === "retard" &&
              retards
                .filter((retard: any) => {
                  if (runSelected) {
                    if (retard.run === runSelected) {
                      return retard;
                    }
                  }
                })
                .map((retard: any, key: any) => {
                  return (
                    <PunctualityCard
                      key={key}
                      retards={retard}
                      student={student}
                      type={"retard"}
                    />
                  );
                })}
            {type === "absence" &&
              absences
                .filter((retard: any) => {
                  if (runSelected) {
                    if (retard.run === runSelected) {
                      return retard;
                    }
                  }
                })
                .map((absence: any, key: any) => {
                  return (
                    <PunctualityCard
                      key={key}
                      retards={absence}
                      student={student}
                      type={"absence"}
                    />
                  );
                })}
          </ScrollView>
        </View>
        <Text style={studentCardDetailsStyle.retardMainText}></Text>
      </View>
    </View>
  );
}
