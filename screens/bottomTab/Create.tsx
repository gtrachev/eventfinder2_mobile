import { View, Text, ScrollView } from "react-native";
import React from "react";
import CreateForm from "../../components/forms/CreateForm";
import AppText from "../../components/utils/AppText";
import colors from "../../styles/colors";

const Create = () => {
  return (
    <ScrollView style={{ backgroundColor: colors.whiteColor }}>
      <CreateForm />
    </ScrollView>
  );
};

export default Create;
