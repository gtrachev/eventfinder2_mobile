import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { Formik, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { loginUser } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { useDispatch } from "react-redux";
import Flash from "../../components/utils/Flash";
import Button from "../../styles/styledComponents/Buttons/Button";
import EventFormInputField from "../../utils/formik/EventFormInputField";
import AppText from "../../components/utils/AppText";

const Login: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const loginInitialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(1).max(50),
    password: yup.string().required().min(5),
  });

  const dispatch = useDispatch();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const res = await axios.post<{ validData: boolean }>(
        `https://eventfinder2-server.herokuapp.com/api/user/checkUser`,
        {
          username: values.username,
          password: values.password,
        }
      );
      if (res.data.validData) {
        loginUser(values)(dispatch);
        dispatch({
          type: uiActionTypes.SET_FLASH,
          payload: {
            type: "success",
            message: "Successfully logged into your account.",
          },
        });
      } else
        dispatch({
          type: uiActionTypes.SET_FLASH,
          payload: {
            type: "error",
            message: "Incorrect username or password.",
          },
        });
    } catch (err) {
      console.log(err);
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
      <AppText styles={{ fontSize: 30, color: colors.primaryColor }}>
        Log in
      </AppText>
      <Flash />
      <Formik
        initialValues={loginInitialValues}
        onSubmit={(values, actions) => {
          handleLogin(values);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <View
              style={{
                width: "100%",
                borderBottomColor: colors.primaryColor,
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}
            >
              <Field
                name="username"
                label="Username"
                component={EventFormInputField}
              />
              <Field
                name="password"
                label="Password"
                component={EventFormInputField}
              />
              <Button
                style={{ alignItems: "center" }}
                onPress={() => props.handleSubmit()}
              >
                <AppText
                  styles={{
                    fontSize: 23,
                    color: colors.primaryColor,
                    paddingVertical: 5,
                  }}
                >
                  Log in
                </AppText>
              </Button>
            </View>
          );
        }}
      </Formik>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <AppText
          styles={{
            fontSize: 20,
            color: colors.secondaryColor,
            paddingVertical: 5,
          }}
        >
          Don't have an account?
        </AppText>
        <TouchableOpacity onPress={() => navigation.navigate("Tiers")}>
          <AppText
            styles={{
              fontSize: 20,
              color: colors.primaryColor,
              paddingVertical: 5,
            }}
          >
            Sign up now!
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
