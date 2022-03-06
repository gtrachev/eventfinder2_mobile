import { ScrollView } from "react-native";
import React from "react";
import CreateForm from "../../components/forms/CreateForm";
import colors from "../../styles/colors";

const Create: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView
      style={{ backgroundColor: colors.whiteColor }}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <CreateForm navigation={navigation} />
    </ScrollView>
  );
};

export default Create;
