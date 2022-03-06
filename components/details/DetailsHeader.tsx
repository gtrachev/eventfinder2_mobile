import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";
import AppText from "../utils/AppText";

const DetailsHeader: React.FC<{
  navigation: any;
  eventName: string;
}> = ({ navigation, eventName }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.whiteColor,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 15,
      }}
    >
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrow-back"
          style={{ fontSize: 30, color: colors.primaryColor }}
        />
      </TouchableOpacity>
      <AppText
        styles={{
          color: colors.primaryColor,
          fontSize: 30,
        }}
      >
        {eventName}
      </AppText>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({});
