import React from "react";
import { Field } from "formik";
import { StyleSheet, ScrollView } from "react-native";
import colors from "../../styles/colors";
import CheckboxImageInputField from "../../utils/formik/CheckboxImageInputField";
const artsImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732076/interestImages/artsInterest_yytjms.png`;
const cookingImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732076/interestImages/cookingInterests_mlt5fu.png`;
const diyImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732076/interestImages/diyInterest_zlabbw.png`;
const educationImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732076/interestImages/educationInterest_ednm9p.png`;
const fitnessImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/fitnessInterest_dezphd.png`;
const hikingImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/hikingInterest_mid9ys.png`;
const historyImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/historyInterest_gq3y0b.png`;
const itImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/itInterest_jazjmz.png`;
const literatureImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/literatureInterest_vvbfjz.png`;
const musicImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/musicInterest_x7yrt6.png`;
const politicsImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/politicsInterest_p9fzpz.png`;
const scienceImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/scienceInterest_y1uspj.png`;
const sightseeingImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/sightseeingInterest_j9s8qc.png`;
const sportsImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/sportsInterest_lxypaq.png`;
const technologiesImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732076/interestImages/technologiesInterest_gp1mvz.png`;
const travellingImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732076/interestImages/travellingInterest_jgcm06.png`;
const yogaImage = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732076/interestImages/yogaInterest_ujrbyk.png`;

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
        imgSource={{ uri: artsImage }}
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
        imgSource={{ uri: cookingImage }}
      />
      <Field
        name={name}
        id="diy"
        value="diy"
        label="DIY"
        isChecked={values && values.find((value: string) => value === "diy")}
        component={CheckboxImageInputField}
        imgSource={{ uri: diyImage }}
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
        imgSource={{ uri: educationImage }}
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
        imgSource={{ uri: fitnessImage }}
      />
      <Field
        name={name}
        id="hiking"
        value="hiking"
        label="Hiking"
        isChecked={values && values.find((value: string) => value === "hiking")}
        component={CheckboxImageInputField}
        imgSource={{ uri: hikingImage }}
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
        imgSource={{ uri: historyImage }}
      />
      <Field
        name={name}
        id="it"
        value="it"
        label="IT"
        isChecked={values && values.find((value: string) => value === "it")}
        component={CheckboxImageInputField}
        imgSource={{ uri: itImage }}
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
        imgSource={{ uri: literatureImage }}
      />
      <Field
        name={name}
        id="music"
        value="music"
        label="Music"
        isChecked={values && values.find((value: string) => value === "music")}
        component={CheckboxImageInputField}
        imgSource={{ uri: musicImage }}
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
        imgSource={{ uri: politicsImage }}
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
        imgSource={{ uri: scienceImage }}
      />
      <Field
        name={name}
        id="sightseeing"
        value="sightseeing"
        label="Sightseeing"
        isChecked={
          values && values.find((value: string) => value === "sightseeing")
        }
        component={CheckboxImageInputField}
        imgSource={{ uri: sightseeingImage }}
      />
      <Field
        name={name}
        id="sports"
        value="sports"
        label="Sports"
        isChecked={values && values.find((value: string) => value === "sports")}
        component={CheckboxImageInputField}
        imgSource={{ uri: sportsImage }}
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
        imgSource={{ uri: technologiesImage }}
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
        imgSource={{ uri: travellingImage }}
      />
      <Field
        name={name}
        id="yoga"
        value="yoga"
        label="Yoga"
        isChecked={values && values.find((value: string) => value === "yoga")}
        component={CheckboxImageInputField}
        imgSource={{ uri: yogaImage }}
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
