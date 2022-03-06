import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import EditEventForm from "../../components/forms/EditEventForm";

const Edit: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { eventDetails } = route.params;
  return (
    <ScrollView
      style={{ backgroundColor: colors.whiteColor }}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <EditEventForm navigation={navigation} eventDetails={eventDetails} />
    </ScrollView>
  );
};

export default Edit;

const styles = StyleSheet.create({});
