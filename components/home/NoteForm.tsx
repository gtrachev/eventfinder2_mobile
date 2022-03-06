import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { createNote } from "../../redux/actions/notesActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { getUser } from "../../redux/actions/userActions";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import Icon from "react-native-vector-icons/Ionicons";
import AppText from "../utils/AppText";

const NoteForm: React.FC<{ navigation: any }> = ({ navigation }) => {
  const initialValues = {
    body: "",
  };
  const validationSchema = yup.object().shape({
    body: yup.string().required().min(1).max(250),
  });
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const uiSlice = useSelector((state: RootState) => state.ui);
  const handleCreate = (
    values: { body: string },
    actions: FormikHelpers<{
      body: string;
    }>
  ) => {
    createNote({
      body: values.body,
      shared_event: uiSlice.sharedEvent ? uiSlice.sharedEvent._id : "",
    })(dispatch);
    getUser()(dispatch);
    actions.resetForm();
    dispatch({
      type: uiActionTypes.SET_SHARED_EVENT,
      payload: undefined,
    });
    dispatch({
      type: uiActionTypes.SET_FLASH,
      payload: { type: "success", message: "Note successfully created." },
    });
  };

  return (
    <View style={styles.noteFormContainer}>
      <AppText styles={styles.noteFormTitle}>What's on your mind?</AppText>
      {uiSlice.sharedEvent ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <IconButton
            onPress={() => {
              dispatch({
                type: uiActionTypes.SET_SHARED_EVENT,
                payload: null,
              });
            }}
          >
            <Icon
              name="close-outline"
              style={{
                color: colors.dangerColor,
                fontSize: 30,
              }}
            />
          </IconButton>
          <AppText
            styles={{
              fontSize: 20,
              color: colors.secondaryColor,
            }}
          >
            Sharing: {uiSlice.sharedEvent.name} by{" "}
            {uiSlice.sharedEvent.author.username}
          </AppText>
        </View>
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleCreate(values, actions)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.noteForm}>
            <TouchableOpacity
              onPress={() => navigation.navigate("CurrentAccount")}
            >
              <Image
                style={styles.profileImg}
                source={{ uri: userSlice.currentUser.profileImage.path }}
              />
            </TouchableOpacity>
            <View style={styles.noteInput}>
              <TextInput
                onChangeText={handleChange("body")}
                onBlur={handleBlur("body")}
                value={values.body}
                placeholder={"Enter note"}
                multiline={true}
                style={{
                  flexGrow: 1,
                  fontSize: 18,
                  width: 100,
                  fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
                }}
              />
              <IconButton onPress={() => handleSubmit()}>
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
    color: colors.primaryColor,
    marginBottom: 10,
    textAlign: "center",
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
