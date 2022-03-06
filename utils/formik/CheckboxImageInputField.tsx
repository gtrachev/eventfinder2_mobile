import { FieldProps } from "formik";
import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import AppText from "../../components/utils/AppText";
import CheckBox from "expo-checkbox";
import colors from "../../styles/colors";

const CheckboxImageInputField: React.FC<
  FieldProps & {
    id: string;
    label: string;
    value: string;
    isChecked: boolean;
    imgSource: any;
  }
> = ({ field, form, id, value, label, isChecked, imgSource, ...props }) => {
  const [checked, setIsChecked] = useState(isChecked);
  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <AppText styles={{ fontSize: 18 }}>{label}</AppText>
      <Image source={imgSource} style={styles.interestImg} />
      <CheckBox
        disabled={false}
        value={checked}
        color={colors.primaryColor}
        onValueChange={(newValue) => {
          setIsChecked((prevIsChecked) => !prevIsChecked);
          if (
            form.values[field.name].length &&
            form.values[field.name].find(
              (fieldValue: string) => fieldValue === value
            )
          ) {
            form.setFieldValue(
              field.name,
              form.values[field.name].filter(
                (fieldValue: string) => fieldValue !== value
              )
            );
          } else {
            form.setFieldValue(field.name, [...form.values[field.name], value]);
          }
        }}
      />
    </View>
  );
};

export default CheckboxImageInputField;

const styles = StyleSheet.create({
  interestImg: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginVertical: 10,
  },
});
