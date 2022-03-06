import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import AppText from "../utils/AppText";
import colors from "../../styles/colors";
import { Field, Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { eventFormikInitialValuesType } from "../../utils/types/formikInitStateTypes";
import { createValidationSchema } from "../../utils/formik/yupValidationSchemas";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { RadioButton } from "react-native-paper";
import { createEvent } from "../../redux/actions/eventsActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { differenceOfDates } from "../../utils/helpers/compareDates";
import { UserTiersTypes } from "../../utils/types/userTiers";
import Icon from "react-native-vector-icons/Ionicons";
import EventFormInputField from "../../utils/formik/EventFormInputField";
import Button from "../../styles/styledComponents/Buttons/Button";
import InterestCategories from "./InterestCategories";
import DateField from "./DateField";
import TimeField from "./TimeField";

const CreateForm: React.FC<{ navigation: any }> = ({ navigation }) => {
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
  const [date, setDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [dateTouched, setDateTouched] = useState(true);
  const [time, setTime] = useState(new Date());
  const [timeTouched, setTimeTouched] = useState(true);
  const initialValues: eventFormikInitialValuesType = {
    name: "",
    price: "",
    description: "",
    country: country.name,
    city: "",
    address: "",
    interestCategories: [],
    ageGroup: "",
  };
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const canCreate = () => {
    if (!userSlice.currentUser.lastPosted) {
      return true;
    }
    if (userSlice.currentUser.userTier === UserTiersTypes.standard) {
      return (
        differenceOfDates(new Date(userSlice.currentUser.lastPosted)) >= 30
      );
    }
    return differenceOfDates(new Date(userSlice.currentUser.lastPosted)) >= 7;
  };
  const handlePickImages = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    setFiles([pickerResult]);
  };
  const handleSubmit = async (values: eventFormikInitialValuesType) => {
    try {
      const images: any = await Promise.all(
        files.map(async (file: any) => {
          const formData = {
            file: "data:image/jpg;base64," + file["base64"],
            upload_preset: "oes8taaw",
            folder: "EventFinder_users",
          };
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/drrvhe0qk/image/upload`,
            formData
          );
          const imageData = res.data;
          return { path: imageData.url, filename: imageData.public_id };
        })
      );
      console.log(time.toLocaleTimeString().slice(0, 5));
      createEvent({
        ...values,
        price: +values.price,
        date: date,
        time: time.toLocaleTimeString().slice(0, 5),
        images,
      })(dispatch);
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: { type: "success", message: "Successfully created event." },
      });
      navigation.navigate("Home");
    } catch (err) {
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "error",
          message: "There was a problem creating the event.",
        },
      });
    }
  };

  return userSlice.currentUser &&
    userSlice.currentUser.userTier === UserTiersTypes.free ? (
    <View
      style={{
        padding: 15,
        backgroundColor: "rgba(252, 68, 69, .7)",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Icon
        name="lock-closed-outline"
        style={{
          color: colors.whiteColor,
          fontSize: 50,
        }}
      />
      <AppText
        styles={{
          color: colors.whiteColor,
          fontSize: 35,
          marginVertical: 15,
          textAlign: "center",
        }}
      >
        You must unlock a higher account tier, in order to create events.
      </AppText>
      <TouchableOpacity>
        <AppText
          styles={{
            color: colors.whiteColor,
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Upgrade account
        </AppText>
      </TouchableOpacity>
    </View>
  ) : canCreate() ? (
    <View style={{ alignItems: "center", padding: 10 }}>
      <AppText styles={{ fontSize: 30, color: colors.primaryColor }}>
        Create Event
      </AppText>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          if (!country.name.length) {
            setCountryErr(true);
            return;
          }
          if (!files.length) {
            setFilesErr(true);
            return;
          }
          handleSubmit(values);
        }}
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
              date={new Date(date)}
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
                <InterestCategories
                  name="interestCategories"
                  errorStyle={
                    props.touched["interestCategories"] &&
                    props.errors["interestCategories"]
                      ? styles.imagesError
                      : {}
                  }
                />
              </View>
              {props.touched["interestCategories"] &&
              props.errors["interestCategories"] ? (
                <AppText
                  styles={{
                    color: colors.dangerColor,
                    fontSize: 15,
                    marginTop: 5,
                  }}
                >
                  You must select between 1 and 5 interest categories.
                </AppText>
              ) : null}
            </View>
            <View style={{ marginBottom: 20 }}>
              <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
                Age requirements
              </AppText>
              <View
                style={[
                  { flexDirection: "row" },
                  props.touched["ageGroup"] && props.errors["ageGroup"]
                    ? {
                        backgroundColor: "rgba(252, 68, 69, .2)",
                      }
                    : {},
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <AppText
                    styles={{
                      fontSize: 20,
                      color:
                        props.touched["ageGroup"] && props.errors["ageGroup"]
                          ? colors.dangerColor
                          : colors.secondaryColor,
                    }}
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
                    styles={{
                      fontSize: 20,
                      color:
                        props.touched["ageGroup"] && props.errors["ageGroup"]
                          ? colors.dangerColor
                          : colors.secondaryColor,
                    }}
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
                <AppText
                  styles={{
                    color: colors.dangerColor,
                    fontSize: 15,
                    marginTop: 5,
                  }}
                >
                  Age group is a required field.
                </AppText>
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
                      textAlign: "center",
                    }}
                  >
                    Pick images
                  </AppText>
                </TouchableOpacity>
                <ScrollView
                  horizontal={true}
                  style={[
                    styles.imagesContainer,
                    filesErr && !files.length
                      ? { backgroundColor: "rgba(252, 68, 69, .2)" }
                      : null,
                  ]}
                  contentContainerStyle={{
                    justifyContent: "space-around",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {files.map((file: any) => {
                    console.log(file);
                    return <Image style={styles.image} source={file} />;
                  })}
                </ScrollView>
              </View>
              {filesErr && !files.length ? (
                <AppText
                  styles={{
                    color: colors.dangerColor,
                    fontSize: 15,
                    marginTop: 5,
                  }}
                >
                  Atleast one image required
                </AppText>
              ) : null}
            </View>
            <Button
              onPress={() => {
                props.handleSubmit();
              }}
              style={{ alignItems: "center" }}
            >
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
  ) : (
    <View
      style={{
        padding: 15,
        backgroundColor: "rgba(252, 68, 69, .7)",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Icon
        name="lock-closed-outline"
        style={{
          color: colors.whiteColor,
          fontSize: 50,
        }}
      />
      <AppText
        styles={{
          color: colors.whiteColor,
          fontSize: 35,
          marginVertical: 15,
          textAlign: "center",
        }}
      >
        You have posted an event in last{" "}
        {userSlice.currentUser.userTier === UserTiersTypes.standard
          ? "30"
          : "7"}{" "}
        days.
      </AppText>
      <TouchableOpacity>
        <AppText
          styles={{
            color: colors.whiteColor,
            fontSize: 30,
            textAlign: "center",
          }}
        >
          You will be able to post another event on{" "}
          {userSlice.currentUser.userTier === UserTiersTypes.standard
            ? new Date(
                new Date().setDate(
                  new Date().getDate() +
                    30 -
                    differenceOfDates(
                      new Date(userSlice.currentUser.lastPosted)
                    )
                )
              ).toLocaleDateString()
            : new Date(
                new Date().setDate(
                  new Date().getDate() +
                    7 -
                    differenceOfDates(
                      new Date(userSlice.currentUser.lastPosted)
                    )
                )
              ).toLocaleDateString()}{" "}
        </AppText>
      </TouchableOpacity>
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
    overflow: "hidden",
  },
  imagesInputBtn: {
    padding: 10,
    backgroundColor: colors.primaryColor,
  },
  imagesError: {
    backgroundColor: "rgba(252, 68, 69, .2)",
    borderColor: colors.dangerColor,
  },
  imagesContainer: {
    padding: 10,
    borderRadius: 20,
    maxHeight: 370,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginVertical: 10,
  },
});
