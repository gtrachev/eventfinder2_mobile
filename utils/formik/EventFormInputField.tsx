import { FieldProps } from "formik";
import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import AppText from "../../components/utils/AppText";
import colors from "../../styles/colors";
import { uppercase } from "../helpers/uppercase";

const EventFormInputField: React.FC<
  FieldProps & {
    label: string;
    type?: string;
  }
> = ({ field, form, label, type, ...props }) => {
  const errMsg = form.touched[field.name] && form.errors[field.name];

  return (
    <View
      style={{
        marginBottom: 20,
        width: "100%",
      }}
    >
      <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
        {label}
      </AppText>
      <TextInput
        value={field.value}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        style={[
          styles.input,
          type === "textarea" ? styles.textarea : {},
          errMsg ? styles.error : {},
        ]}
        placeholder={`Enter ${field.name}...`}
        multiline={type === "textarea" ? true : false}
        numberOfLines={type === "textarea" ? 5 : 1}
        textAlignVertical="top"
        placeholderTextColor={errMsg ? colors.dangerColor : colors.grayColor}
      />
      {errMsg ? (
        <AppText
          styles={{ color: colors.dangerColor, fontSize: 15, marginTop: 5 }}
        >
          {typeof errMsg === "string" ? uppercase(errMsg) : ""}
        </AppText>
      ) : null}
    </View>
  );
};

export default EventFormInputField;

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayColor,
    borderStyle: "solid",
    paddingBottom: 5,
    paddingHorizontal: 5,
    color: colors.secondaryColor,
  },
  textarea: {
    borderRightColor: colors.grayColor,
    borderLeftColor: colors.grayColor,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  error: {
    borderRightColor: colors.dangerColor,
    borderLeftColor: colors.dangerColor,
    borderBottomColor: colors.dangerColor,
    backgroundColor: "rgba(252, 68, 69, .2)",
  },
});
