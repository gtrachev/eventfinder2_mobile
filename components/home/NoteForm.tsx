import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { Formik } from "formik";
import * as yup from "yup";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import Icon from "react-native-vector-icons/Ionicons";
import AppText from "../utils/AppText";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
const snimka2 = require("../../assets/snimka2.jpg");

const NoteForm = () => {
  const initialValues = {
    body: "",
  };
  const validationSchema = yup.object().shape({
    body: yup.string().required().min(1).max(250),
  });
  const userSlice = useSelector((state: RootState) => state.users);
  return (
    <View style={styles.noteFormContainer}>
      <AppText styles={styles.noteFormTitle}>What's on your mind?</AppText>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.noteForm}>
            <Image
              style={styles.profileImg}
              source={{ uri: userSlice.currentUser.profileImage.path }}
            />
            <View style={styles.noteInput}>
              <TextInput
                onChangeText={handleChange("body")}
                onBlur={handleBlur("body")}
                value={values.body}
                placeholder={"Enter note"}
                style={{
                  flexGrow: 1,
                  fontSize: 18,
                  fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
                }}
              />
              <IconButton>
                <Icon
                  name="paper-plane"
                  style={{ fontSize: 25, color: colors.primaryColor }}
                />
              </IconButton>
            </View>
          </View>
        )}
      </Formik>
      <AppText styles={{ color: colors.grayColor }}>
        Post a note to share your thoughts with your followers!
      </AppText>
    </View>
  );
};

export default NoteForm;

const styles = StyleSheet.create({
  noteFormContainer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    backgroundColor: colors.whiteColor,
  },
  noteFormTitle: {
    fontSize: 23,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
    color: colors.primaryColor,
    marginBottom: 10,
  },
  noteInput: {
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.primaryColor,
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  noteForm: {
    flexDirection: "row",
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
