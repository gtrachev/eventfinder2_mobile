import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ChangeEvent, useState } from "react";
import AppText from "../utils/AppText";
import colors from "../../styles/colors";
import { Field, Formik } from "formik";
import { eventFormikInitialValuesType } from "../../utils/types/formikInitStateTypes";
import EventFormInputField from "../../utils/formik/EventFormInputField";
import { createValidationSchema } from "../../utils/formik/yupValidationSchemas";
import Button from "../../styles/styledComponents/Buttons/Button";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import InterestCategories from "./InterestCategories";
import Icon from "react-native-vector-icons/Ionicons";
import DateField from "./DateField";
import TimeField from "./TimeField";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const CreateForm = () => {
  const [files, setFiles] = useState<any>([]);
  const [filesErr, setFilesErr] = useState(false);
  const [ageGroupChecked, setAgeGroupChecked] = useState("");
  const [country, setCountry] = useState<any>({
    callingCode: ["359"],
    cca2: "BG",
    currency: ["BGN"],
    flag: "flag-bg",
    name: "Bulgaria",
    region: "Europe",
    subregion: "Eastern Europe",
  });
  const [countryCode, setCountryCode] = useState<CountryCode>("BG");
  const [countryErr, setCountryErr] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateTouched, setDateTouched] = useState(false);
  const [time, setTime] = useState(new Date());
  const [timeTouched, setTimeTouched] = useState(false);
  const initialValues: eventFormikInitialValuesType = {
    name: "",
    price: "",
    description: "",
    country: "",
    city: "",
    address: "",
    date: "",
    time: "",
    interestCategories: [],
    ageGroup: "",
  };

  const handlePickImages = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log(pickerResult);
  };

  return (
    <View style={{ alignItems: "center", padding: 10 }}>
      <AppText styles={{ fontSize: 30, color: colors.primaryColor }}>
        Create Event
      </AppText>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {}}
        validationSchema={createValidationSchema}
      >
        {(props) => (
          <ScrollView style={{ width: "100%" }} nestedScrollEnabled={true}>
            <Field name="name" label="Name" component={EventFormInputField} />
            <Field name="price" label="Price" component={EventFormInputField} />
            <Field
              name="description"
              label="Description"
              type="textarea"
              component={EventFormInputField}
            />
            <View>
              <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
                Country
              </AppText>
              <View style={styles.countryInputContainer}>
                <CountryPicker
                  {...{
                    countryCode,
                    withCallingCode: false,
                    withFilter: false,
                    withFlag: true,
                    onSelect: (country: Country) => {
                      setCountryCode(country.cca2);
                      setCountry(country);
                      props.setFieldValue("country", country.name);
                    },
                  }}
                />
                {country ? (
                  <AppText styles={{ fontSize: 20 }}>{country.name}</AppText>
                ) : null}
              </View>
              {countryErr && !country.length ? (
                <AppText>Country is a required field</AppText>
              ) : null}
            </View>
            <Field name="city" label="City" component={EventFormInputField} />
            <Field
              name="address"
              label="Address"
              component={EventFormInputField}
            />
            <DateField
              date={date}
              setDate={setDate}
              dateTouched={dateTouched}
              setDateTouched={setDateTouched}
            />
            <TimeField
              time={time}
              setTime={setTime}
              timeTouched={timeTouched}
              setTimeTouched={setTimeTouched}
            />
            <View style={{ marginBottom: 20 }}>
              <AppText
                styles={{
                  fontSize: 20,
                  color: colors.primaryColor,
                  marginBottom: 5,
                }}
              >
                Interest categories
              </AppText>
              <View>
                <InterestCategories name="interestCategories" errorStyle={{}} />
              </View>
              {props.touched["interestCategories"] &&
              props.errors["interestCategories"] ? (
                <AppText>
                  You must select between 1 and 5 interest categories.
                </AppText>
              ) : null}
            </View>
            <View>
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
                    status={ageGroupChecked === "all" ? "checked" : "unchecked"}
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
            <View style={{ marginBottom: 20 }}>
              <AppText
                styles={{
                  fontSize: 20,
                  color: colors.primaryColor,
                  marginBottom: 5,
                }}
              >
                Images of the event
              </AppText>
              <View style={styles.imagesInputContainer}>
                <TouchableOpacity
                  style={styles.imagesInputBtn}
                  onPress={handlePickImages}
                >
                  <AppText
                    styles={{
                      color: colors.whiteColor,
                      fontSize: 18,
                    }}
                  >
                    Pick images
                  </AppText>
                </TouchableOpacity>
                <ScrollView horizontal={true}></ScrollView>
              </View>
              {filesErr && !files.length ? (
                <AppText>Atleast one image required</AppText>
              ) : null}
            </View>
            <Button style={{ alignItems: "center" }}>
              <AppText
                styles={{
                  fontSize: 23,
                  color: colors.primaryColor,
                  paddingVertical: 5,
                }}
              >
                Create
              </AppText>
            </Button>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default CreateForm;

const styles = StyleSheet.create({
  countryInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.grayColor,
    borderStyle: "solid",
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  datePickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayColor,
    borderStyle: "solid",
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  imagesInputContainer: {
    borderColor: colors.primaryColor,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
  },
  imagesInputBtn: {
    padding: 10,
    backgroundColor: colors.primaryColor,
  },
});

// onSubmit={(e) => {
//   // e.preventDefault();
//   // if (!files.length) {
//   //   setFilesErr(true);
//   // }
//   // if (!country.length) {
//   //   setCountryErr(true);
//   // }
//   // props.handleSubmit();
// }}
