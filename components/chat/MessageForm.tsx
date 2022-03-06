import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";

const MessageForm: React.FC<{
  handleSendMessage: (
    values: {
      text: string;
    },
    actions: FormikHelpers<{
      text: string;
    }>
  ) => void;
}> = ({ handleSendMessage }) => {
  const initialValues = {
    text: "",
  };
  const validationSchema = yup.object().shape({
    text: yup.string().required().min(1).max(250),
  });
  return (
    <View
      style={{
        padding: 10,
        width: "100%",
        backgroundColor: colors.whiteColor,
        flexDirection: "row",
      }}
    >
      <View style={styles.messageInputContainer}>
        <TouchableOpacity>
          <Icon
            name="attach-outline"
            style={{ fontSize: 35, color: colors.primaryColor }}
          />
        </TouchableOpacity>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSendMessage(values, actions)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.messageInput}>
              <TextInput
                onChangeText={handleChange("text")}
                onBlur={handleBlur("text")}
                value={values.text}
                placeholder={"Enter..."}
                multiline={true}
                style={{
                  width: 100,
                  flexGrow: 1,
                  fontSize: 18,
                  fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
                }}
              />
              <IconButton onPress={() => handleSubmit()}>
                <Icon
                  name="paper-plane-outline"
                  style={{ fontSize: 25, color: colors.primaryColor }}
                />
              </IconButton>
            </View>
          )}
        </Formik>
        <TouchableOpacity>
          <Icon
            name="happy-outline"
            style={{ fontSize: 35, color: colors.primaryColor }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageForm;

const styles = StyleSheet.create({
  messageInputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.whiteColor,
  },
  messageInput: {
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
    height: 50,
    marginRight: 5,
  },
});
