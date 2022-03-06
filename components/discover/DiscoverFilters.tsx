import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Formik, Field } from "formik";
import { RadioButton } from "react-native-paper";
import * as yup from "yup";
import { filterInitialValuesType } from "../../utils/types/formikInitStateTypes";
import AppText from "../utils/AppText";
import colors from "../../styles/colors";
import CheckboxInputField from "../../utils/formik/CheckboxInputField";
import EventFormInputField from "../../utils/formik/EventFormInputField";
import Button from "../../styles/styledComponents/Buttons/Button";

const DiscoverFilters: React.FC<{
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  setFilters: React.Dispatch<
    React.SetStateAction<filterInitialValuesType | undefined>
  >;
  filters: undefined | filterInitialValuesType;
}> = ({ filters, setFilters, setShowFilters }) => {
  const handleFilter = (values: filterInitialValuesType) => {
    setFilters(values);
    setShowFilters(false);
  };
  const [ageGroupChecked, setAgeGroupChecked] = useState("");
  const initialValues: filterInitialValuesType = {
    interests: [],
    price: "",
    ageGroup: "",
    country: "",
    city: "",
  };
  const validationSchema = yup.object().shape({
    price: yup.mixed().notRequired(),
    country: yup.string().notRequired(),
    city: yup.string().notRequired(),
    interests: yup
      .array()
      .of(yup.string().min(1).max(100).notRequired())
      .min(0)
      .max(10)
      .notRequired(),
    ageGroup: yup.string().min(3).notRequired(),
  });
  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleFilter(values);
        }}
      >
        {(props) => {
          return (
            <View
              style={{
                backgroundColor: colors.whiteColor,
                paddingHorizontal: 10,
              }}
            >
              <AppText
                styles={{
                  color: colors.primaryColor,
                  fontSize: 20,
                  paddingVertical: 10,
                }}
              >
                Interests
              </AppText>
              <ScrollView
                style={{ height: 130 }}
                contentContainerStyle={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                <Field
                  name="interests"
                  id="art"
                  value="art"
                  label="Art"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "art"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="cooking"
                  value="cooking"
                  label="Cooking"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "cooking"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="diy"
                  value="diy"
                  label="DIY"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "diy"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="education"
                  value="education"
                  label="Education"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "education"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="fitness"
                  value="fitness"
                  label="Fitness"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "fitness"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="hiking"
                  value="hiking"
                  label="Hiking"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "hiking"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="history"
                  value="history"
                  label="History"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "history"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="it"
                  value="it"
                  label="IT"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "it"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="literature"
                  value="literature"
                  label="Literature"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "literature"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="music"
                  value="music"
                  label="Music"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "music"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="politics"
                  value="politics"
                  label="Politics"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "politics"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="science"
                  value="science"
                  label="Science"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "science"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="sightseeing"
                  value="sightseeing"
                  label="Sightseeing"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "sightseeing"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="sports"
                  value="sports"
                  label="Sports"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "sports"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="technologies"
                  value="technologies"
                  label="Technologies"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "technologies"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="travelling"
                  value="travelling"
                  label="Travelling"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "travelling"
                    )
                  }
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="yoga"
                  value="yoga"
                  label="Yoga"
                  isChecked={
                    props.values &&
                    props.values.interests.find(
                      (value: string) => value === "yoga"
                    )
                  }
                  component={CheckboxInputField}
                />
              </ScrollView>
              <Field
                name="country"
                label="Country"
                component={EventFormInputField}
              />
              <Field name="city" label="City" component={EventFormInputField} />
              <View style={{ marginBottom: 10 }}>
                <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
                  Age requirements
                </AppText>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <AppText
                      styles={{ fontSize: 20, color: colors.secondaryColor }}
                    >
                      Over 16
                    </AppText>
                    <RadioButton
                      value="over"
                      color={colors.primaryColor}
                      uncheckedColor={colors.grayColor}
                      status={
                        ageGroupChecked === "over" ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        setAgeGroupChecked("over");
                        props.setFieldValue("ageGroup", "over");
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AppText
                      styles={{ fontSize: 20, color: colors.secondaryColor }}
                    >
                      All ages
                    </AppText>
                    <RadioButton
                      value="all"
                      color={colors.primaryColor}
                      uncheckedColor={colors.grayColor}
                      status={
                        ageGroupChecked === "all" ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        setAgeGroupChecked("all");
                        props.setFieldValue("ageGroup", "all");
                      }}
                    />
                  </View>
                </View>
                {props.touched["ageGroup"] && props.errors["ageGroup"] ? (
                  <AppText>Age group is a required field.</AppText>
                ) : null}
              </View>

              <Field
                name="price"
                label="Price"
                placeholder="Up to"
                component={EventFormInputField}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Button
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    props.handleSubmit();
                  }}
                >
                  <AppText
                    styles={{
                      color: colors.primaryColor,
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                  >
                    Filter
                  </AppText>
                </Button>
                <TouchableOpacity onPress={() => props.resetForm()}>
                  <AppText
                    styles={{
                      color: colors.secondaryColor,
                      fontSize: 20,
                      paddingVertical: 5,
                    }}
                  >
                    Clear filters
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default DiscoverFilters;

const styles = StyleSheet.create({});
