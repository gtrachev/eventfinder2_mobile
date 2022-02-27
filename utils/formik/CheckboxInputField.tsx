import { FieldProps } from "formik";
import React from "react";
import { View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import AppText from "../../components/utils/AppText";

const CheckboxInputField: React.FC<
  FieldProps & {
    label: string;
    isChecked: boolean;
  }
> = ({ field, label, isChecked, ...props }) => {
  return (
    <View>
      <AppText>{label}</AppText>
      {/* <CheckBox onChange={field.onChange} /> */}
    </View>
  );
};

export default CheckboxInputField;
