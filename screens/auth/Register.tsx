import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import { Formik, Field } from "formik";
import { registerFormikInitialValuesType } from "../../utils/types/formikInitStateTypes";
import { registerValidationSchema } from "../../utils/formik/yupValidationSchemas";
import CountryPicker, {
  CountryCode,
  Country,
} from "react-native-country-picker-modal";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { registerUser } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { useDispatch } from "react-redux";
import { UserTiersTypes } from "../../utils/types/userTiers";
import StripeCheckoutForm from "./StripeCheckoutForm";
import Flash from "../../components/utils/Flash";
import InterestCategories from "../../components/forms/InterestCategories";
import Button from "../../styles/styledComponents/Buttons/Button";
import EventFormInputField from "../../utils/formik/EventFormInputField";
import AppText from "../../components/utils/AppText";

const Register: React.FC<{
  navigation: any;
  route: any;
}> = ({ route, navigation }) => {
  const { userTier } = route.params;
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
  const [file, setFile] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutValues, setCheckoutValues] = useState<any>({});
  const registerInitialValues: registerFormikInitialValuesType = {
    username: "",
    password: "",
    email: "",
    age: "",
    country: country.name,
    city: "",
    interests: [],
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

  const handleRegister = async (values: registerFormikInitialValuesType) => {
    try {
      const res = await axios.get(
        `https://eventfinder2-server.herokuapp.com/api/user/checkUsername/${values.username}`
      );
      if (res.data.availableUsername) {
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
            registerUser({
              ...values,
              userTier,
              profileImage: {
                path: res.data.url,
                filename: res.data.public_id,
              },
            })(dispatch);
            return;
          } catch (err) {
            dispatch({
              type: uiActionTypes.SET_FLASH,
              payload: { type: "error", message: "Registration failed." },
            });
          }
        }

        registerUser({
          ...values,
          userTier,
          age: +values.age,
        })(dispatch);
        dispatch({
          type: uiActionTypes.SET_FLASH,
          payload: {
            type: "success",
            message: `Welcome ${values.username}.`,
          },
        });
      } else {
        dispatch({
          type: uiActionTypes.SET_FLASH,
          payload: { type: "error", message: "Username is not available." },
        });
      }
    } catch (err) {
      window.scrollTo(0, 0);
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: { type: "error", message: "Registration failed." },
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
        Register
      </AppText>
      <Flash />
      <ScrollView nestedScrollEnabled={true}>
        <Formik
          initialValues={registerInitialValues}
          onSubmit={async (values, actions) => {
            if (userTier === UserTiersTypes.free) {
              handleRegister(values);
            } else if (
              userTier === UserTiersTypes.creator ||
              userTier === UserTiersTypes.standard
            ) {
              const res = await axios.get(
                `https://eventfinder2-server.herokuapp.com/api/user/checkUsername/${values.username}`
              );
              if (res.data.availableUsername) {
                setCheckoutValues(values);
                setShowCheckout(true);
              } else {
                window.scrollTo(0, 0);
                dispatch({
                  type: uiActionTypes.SET_FLASH,
                  payload: {
                    type: "error",
                    message: "Username is not available.",
                  },
                });
              }
            }
          }}
          validationSchema={registerValidationSchema}
        >
          {(props) => {
            return (
              <View
                style={{
                  width: "100%",
                  borderBottomColor: colors.primaryColor,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  paddingBottom: 20,
                }}
              >
                <Field
                  name="username"
                  label="Username"
                  component={EventFormInputField}
                />
                <Field
                  name="email"
                  label="Email"
                  component={EventFormInputField}
                />
                <Field
                  name="password"
                  label="Password"
                  component={EventFormInputField}
                />
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
                    Profile image (optional)
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
                    {userTier === UserTiersTypes.standard ||
                    userTier === UserTiersTypes.creator
                      ? "Proceed to checkout"
                      : "Register"}
                  </AppText>
                </Button>
              </View>
            );
          }}
        </Formik>
        {showCheckout ? (
          <StripeCheckoutForm
            values={checkoutValues}
            file={file}
            userTier={userTier}
          />
        ) : null}
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <AppText
            styles={{
              fontSize: 20,
              color: colors.secondaryColor,
              paddingVertical: 5,
            }}
          >
            Already have an account?
          </AppText>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <AppText
              styles={{
                fontSize: 20,
                color: colors.primaryColor,
                paddingVertical: 5,
              }}
            >
              Log in now!
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

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
