import React from "react";
import { Field } from "formik";
import CheckboxImageInputField from "../../utils/formik/CheckboxImageInputField";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import AppText from "../utils/AppText";
import { wrap } from "module";
import colors from "../../styles/colors";
const artsImage = require("../../assets/interests/artsInterest.png");
const cookingImage = require("../../assets/interests/cookingInterests.png");
const diyImage = require("../../assets/interests/diyInterest.png");
const educationImage = require("../../assets/interests/educationInterest.png");
const fitnessImage = require("../../assets/interests/fitnessInterest.png");
const hikingImage = require("../../assets/interests/hikingInterest.png");
const historyImage = require("../../assets/interests/historyInterest.png");
const itImage = require("../../assets/interests/itInterest.png");
const literatureImage = require("../../assets/interests/literatureInterest.png");
const musicImage = require("../../assets/interests/musicInterest.png");
const politicsImage = require("../../assets/interests/politicsInterest.png");
const scienceImage = require("../../assets/interests/scienceInterest.png");
const sightseeingImage = require("../../assets/interests/sightseeingInterest.png");
const sportsImage = require("../../assets/interests/sportsInterest.png");
const technologiesImage = require("../../assets/interests/technologiesInterest.png");
const travellingImage = require("../../assets/interests/travellingInterest.png");
const yogaImage = require("../../assets/interests/yogaInterest.png");

const InterestCategories: React.FC<{
  name: string;
  values?: string[];
  errorStyle:
    | {
        backgroundColor: string;
        borderColor: string;
      }
    | {};
}> = ({ name, values, errorStyle }) => {
  return (
    <ScrollView
      style={[styles.interestsContainer, errorStyle]}
      contentContainerStyle={{
        justifyContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      nestedScrollEnabled={true}
    >
      <Field
        name={name}
        id="art"
        value="art"
        label="Art"
        isChecked={values && values.find((value: string) => value === "art")}
        component={CheckboxImageInputField}
        imgSource={artsImage}
      />
      <Field
        name={name}
        id="cooking"
        value="cooking"
        label="Cooking"
        isChecked={
          values && values.find((value: string) => value === "cooking")
        }
        component={CheckboxImageInputField}
        imgSource={cookingImage}
      />
      <Field
        name={name}
        id="diy"
        value="diy"
        label="DIY"
        isChecked={values && values.find((value: string) => value === "diy")}
        component={CheckboxImageInputField}
        imgSource={diyImage}
      />
      <Field
        name={name}
        id="education"
        value="education"
        label="Education"
        isChecked={
          values && values.find((value: string) => value === "education")
        }
        component={CheckboxImageInputField}
        imgSource={educationImage}
      />
      <Field
        name={name}
        id="fitness"
        value="fitness"
        label="Fitness"
        isChecked={
          values && values.find((value: string) => value === "fitness")
        }
        component={CheckboxImageInputField}
        imgSource={fitnessImage}
      />
      <Field
        name={name}
        id="hiking"
        value="hiking"
        label="Hiking"
        isChecked={values && values.find((value: string) => value === "hiking")}
        component={CheckboxImageInputField}
        imgSource={hikingImage}
      />
      <Field
        name={name}
        id="history"
        value="history"
        label="History"
        isChecked={
          values && values.find((value: string) => value === "history")
        }
        component={CheckboxImageInputField}
        imgSource={historyImage}
      />
      <Field
        name={name}
        id="it"
        value="it"
        label="IT"
        isChecked={values && values.find((value: string) => value === "it")}
        component={CheckboxImageInputField}
        imgSource={itImage}
      />
      <Field
        name={name}
        id="literature"
        value="literature"
        label="Literature"
        isChecked={
          values && values.find((value: string) => value === "literature")
        }
        component={CheckboxImageInputField}
        imgSource={literatureImage}
      />
      <Field
        name={name}
        id="music"
        value="music"
        label="Music"
        isChecked={values && values.find((value: string) => value === "music")}
        component={CheckboxImageInputField}
        imgSource={musicImage}
      />
      <Field
        name={name}
        id="politics"
        value="politics"
        label="Politics"
        isChecked={
          values && values.find((value: string) => value === "politics")
        }
        component={CheckboxImageInputField}
        imgSource={politicsImage}
      />
      <Field
        name={name}
        id="science"
        value="science"
        label="Science"
        isChecked={
          values && values.find((value: string) => value === "science")
        }
        component={CheckboxImageInputField}
        imgSource={artsImage}
      >
        <Image source={scienceImage} />
      </Field>
      <Field
        name={name}
        id="sightseeing"
        value="sightseeing"
        label="Sightseeing"
        isChecked={
          values && values.find((value: string) => value === "sightseeing")
        }
        component={CheckboxImageInputField}
        imgSource={sightseeingImage}
      />
      <Field
        name={name}
        id="sports"
        value="sports"
        label="Sports"
        isChecked={values && values.find((value: string) => value === "sports")}
        component={CheckboxImageInputField}
        imgSource={sportsImage}
      />
      <Field
        name={name}
        id="technologies"
        value="technologies"
        label="Technologies"
        isChecked={
          values && values.find((value: string) => value === "technologies")
        }
        component={CheckboxImageInputField}
        imgSource={technologiesImage}
      />
      <Field
        name={name}
        id="travelling"
        value="travelling"
        label="Travelling"
        isChecked={
          values && values.find((value: string) => value === "travelling")
        }
        component={CheckboxImageInputField}
        imgSource={travellingImage}
      />
      <Field
        name={name}
        id="yoga"
        value="yoga"
        label="Yoga"
        isChecked={values && values.find((value: string) => value === "yoga")}
        component={CheckboxImageInputField}
        imgSource={yogaImage}
      />
    </ScrollView>
  );
};

export default InterestCategories;

const styles = StyleSheet.create({
  interestsContainer: {
    padding: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.grayColor,
    borderRadius: 20,
    height: 370,
  },
});
