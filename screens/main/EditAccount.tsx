import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import AppText from "../../components/utils/AppText";
import { Formik, Field } from "formik";
import Button from "../../styles/styledComponents/Buttons/Button";
import EventFormInputField from "../../utils/formik/EventFormInputField";
import { editAccountValidationSchema } from "../../utils/formik/yupValidationSchemas";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import InterestCategories from "../../components/forms/InterestCategories";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { editUser } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { useDispatch, useSelector } from "react-redux";
import Flash from "../../components/utils/Flash";
import { InterestEnum } from "../../utils/types/interestTypes";
import { RootState } from "../../redux/rootReducer";
import { EditUserInputType, UserType } from "../../utils/types/modelTypes";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const EditAccountForm: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const currentUser: UserType = userSlice.currentUser;
  const [country, setCountry] = useState<any>({ name: currentUser.country });
  const [countryCode, setCountryCode] = useState<any>(
    countries.getAlpha2Code(currentUser.country, "en")
  );
  const [countryErr, setCountryErr] = useState(false);
  const [file, setFile] = useState<any>(null);
  const editInitialValues: {
    age: string;
    country: string;
    city: string;
    interests: InterestEnum[];
  } = {
    age: `${currentUser.age}`,
    country: country.name,
    city: currentUser.city,
    interests: [...currentUser.interests],
  };

  const dispatch = useDispatch();

  const handlePickImages = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    setFile(pickerResult);
  };

  const handleEdit = async (values: {
    age: string;
    country: string;
    city: string;
    interests: InterestEnum[];
  }) => {
    try {
      if (file) {
        try {
          const formData = {
            file: "data:image/jpg;base64," + file["base64"],
            upload_preset: "oes8taaw",
            folder: "EventFinder_users",
          };
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/drrvhe0qk/image/upload`,
            formData
          );
          editUser({
            ...values,
            profileImage: {
              path: res.data.url,
              filename: res.data.original_filename,
            },
            age: +values.age,
            userTier: currentUser.userTier,
          })(dispatch);
          navigation.navigate("CurrentAccount");
          return;
        } catch (err) {
          dispatch({
            type: uiActionTypes.SET_FLASH,
            payload: { type: "error", message: "Account edit failed." },
          });
        }
      }
      const editUserData: EditUserInputType = {
        ...values,
        profileImage: {
          path: currentUser.profileImage.path,
          filename: currentUser.profileImage.filename,
        },
        age: +values.age,
        userTier: currentUser.userTier,
      };

      editUser(editUserData)(dispatch);
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "success",
          message: "Account successfully edited.",
        },
      });
      navigation.navigate("CurrentAccount");
    } catch {
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "error",
          message: "Your account could not be edited.",
        },
      });
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.whiteColor,
        height: "100%",
        alignItems: "center",
        padding: 10,
      }}
    >
      <AppText
        styles={{
          fontSize: 30,
          color: colors.primaryColor,
          textAlign: "center",
          width: "100%",
        }}
      >
        Edit account
      </AppText>
      <Flash />
      <ScrollView nestedScrollEnabled={true}>
        <Formik
          initialValues={editInitialValues}
          onSubmit={async (values, actions) => {
            handleEdit(values);
          }}
          validationSchema={editAccountValidationSchema}
        >
          {(props) => {
            return (
              <View
                style={{
                  width: "100%",
                }}
              >
                <Field name="age" label="Age" component={EventFormInputField} />
                <View>
                  <AppText
                    styles={{ fontSize: 20, color: colors.primaryColor }}
                  >
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
                      <AppText styles={{ fontSize: 20 }}>
                        {country.name}
                      </AppText>
                    ) : null}
                  </View>
                  {countryErr && !country.length ? (
                    <AppText>Country is a required field</AppText>
                  ) : null}
                </View>
                <Field
                  name="city"
                  label="City"
                  component={EventFormInputField}
                />
                <View style={{ marginBottom: 20 }}>
                  <AppText
                    styles={{
                      fontSize: 20,
                      color: colors.primaryColor,
                      marginBottom: 5,
                    }}
                  >
                    Interests
                  </AppText>
                  <View>
                    <InterestCategories
                      name="interests"
                      values={currentUser.interests}
                      errorStyle={
                        props.touched["interests"] && props.errors["interests"]
                          ? styles.error
                          : {}
                      }
                    />
                  </View>
                  {props.touched["interests"] && props.errors["interests"] ? (
                    <AppText
                      styles={{
                        color: colors.dangerColor,
                        fontSize: 15,
                        marginTop: 5,
                      }}
                    >
                      You must select between 1 and 10 interests.
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
                    Update profile image
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
                        Pick image
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
                      {file ? (
                        <Image style={styles.image} source={file} />
                      ) : null}
                    </ScrollView>
                  </View>
                </View>
                <Button
                  style={{ alignItems: "center" }}
                  onPress={(e: any) => props.handleSubmit()}
                >
                  <AppText
                    styles={{
                      fontSize: 23,
                      color: colors.primaryColor,
                      paddingVertical: 5,
                    }}
                  >
                    Edit account
                  </AppText>
                </Button>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default EditAccountForm;

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
  error: {
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
