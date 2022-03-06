import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import countries from "i18n-iso-countries";
import { Field, Formik } from "formik";
import { eventFormikInitialValuesType } from "../../utils/types/formikInitStateTypes";
import { createValidationSchema } from "../../utils/formik/yupValidationSchemas";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { editEvent } from "../../redux/actions/eventsActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { AgeGroupEnum, EventType } from "../../utils/types/modelTypes";
import CheckboxImageInputField from "../../utils/formik/CheckboxImageInputField";
import EventFormInputField from "../../utils/formik/EventFormInputField";
import InterestCategories from "./InterestCategories";
import DateField from "./DateField";
import TimeField from "./TimeField";
import AppText from "../utils/AppText";
import Button from "../../styles/styledComponents/Buttons/Button";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const EditEventForm: React.FC<{ navigation: any; eventDetails: EventType }> = ({
  navigation,
  eventDetails,
}) => {
  const [files, setFiles] = useState<any>([]);
  const [ageGroupChecked, setAgeGroupChecked] = useState(eventDetails.ageGroup);
  const [country, setCountry] = useState<any>({
    name: eventDetails.country,
  });
  const [countryCode, setCountryCode] = useState<any>(
    countries.getAlpha2Code(eventDetails.country, "en")
  );
  const [countryErr, setCountryErr] = useState(false);
  const [date, setDate] = useState(eventDetails.date);
  const [dateTouched, setDateTouched] = useState(true);
  const [deletedImagesErr, setDeletedImagesErr] = useState(false);
  const [time, setTime] = useState(
    new Date(
      new Date(eventDetails.date).toISOString().slice(0, 11) +
        `${eventDetails.time}:00`
    )
  );
  const [timeTouched, setTimeTouched] = useState(true);
  const initialValues: eventFormikInitialValuesType = {
    name: eventDetails.name,
    price: `${eventDetails.price}`,
    description: eventDetails.description,
    country: eventDetails.country,
    city: eventDetails.city,
    address: eventDetails.address,
    interestCategories: [...eventDetails.interestCategories],
    ageGroup: eventDetails.ageGroup,
    deletedImages: [],
  };
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
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
      const deletedImages = values.deletedImages;
      const eventData = {
        ...values,
        date,
        time: time.toLocaleTimeString().slice(0, 5),
        price: +eventDetails.price,
      };
      delete eventData.deletedImages;
      editEvent(
        eventDetails._id,
        { ...eventData, images: [...eventDetails.images, ...images] },
        deletedImages
      )(dispatch);
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
  return userSlice.currentUser ? (
    <View style={{ alignItems: "center", padding: 10 }}>
      <AppText styles={{ fontSize: 30, color: colors.primaryColor }}>
        Edit Event
      </AppText>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          if (!country.name.length) {
            setCountryErr(true);
            return;
          }
          if (
            values["deletedImages"] &&
            values["deletedImages"]?.length >= eventDetails.images.length
          ) {
            setDeletedImagesErr(true);
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
                <AppText
                  styles={{
                    color: colors.dangerColor,
                    fontSize: 15,
                    marginTop: 5,
                  }}
                >
                  Country is a required field
                </AppText>
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
            <View
              style={{
                marginBottom: 20,
              }}
            >
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
                  values={eventDetails.interestCategories}
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
            <View
              style={{
                marginBottom: 20,
              }}
            >
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
                      setAgeGroupChecked(AgeGroupEnum.over);
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
                      setAgeGroupChecked(AgeGroupEnum.all);
                      props.setFieldValue("ageGroup", "all");
                    }}
                  />
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
            </View>
            <View style={{ marginBottom: 20 }}>
              <AppText
                styles={{
                  fontSize: 20,
                  color: colors.primaryColor,
                  marginBottom: 5,
                }}
              >
                Include more images
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
                  style={[styles.imagesContainer]}
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
            </View>
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <AppText
                styles={{
                  fontSize: 20,
                  color: colors.primaryColor,
                  marginBottom: 5,
                }}
              >
                Delete images
              </AppText>
              <ScrollView
                style={[
                  styles.deletedImagesContainer,
                  deletedImagesErr &&
                  props.values["deletedImages"] &&
                  props.values["deletedImages"]?.length >=
                    eventDetails.images.length
                    ? styles.imagesError
                    : null,
                ]}
                contentContainerStyle={{
                  justifyContent: "space-around",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                nestedScrollEnabled={true}
              >
                {eventDetails.images.map((image) => {
                  return (
                    <Field
                      name={"deletedImages"}
                      id={image.filename}
                      value={image.filename}
                      label={image.filename.slice(0, 10)}
                      component={CheckboxImageInputField}
                      imgSource={{ uri: image.path }}
                    />
                  );
                })}
              </ScrollView>
              {deletedImagesErr &&
              props.values["deletedImages"] &&
              props.values["deletedImages"]?.length >=
                eventDetails.images.length ? (
                <AppText
                  styles={{
                    color: colors.dangerColor,
                    fontSize: 15,
                    marginTop: 5,
                  }}
                >
                  Event requires at least one image.
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
                Edit
              </AppText>
            </Button>
          </ScrollView>
        )}
      </Formik>
    </View>
  ) : null;
};

export default EditEventForm;

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
  deletedImagesContainer: {
    padding: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.grayColor,
    borderRadius: 20,
    maxHeight: 370,
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
