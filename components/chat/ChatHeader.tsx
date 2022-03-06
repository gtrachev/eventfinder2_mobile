import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import type { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { ChatType, UserType } from "../../utils/types/modelTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import AppText from "../utils/AppText";
import Icon from "react-native-vector-icons/Ionicons";

const ChatHeader: React.FC<{
  navigation: MaterialTopTabNavigationProp<
    {
      UserChats: undefined;
      CurrentChat: undefined;
    },
    "UserChats"
  >;
  chat: ChatType;
}> = ({ navigation, chat }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  return (
    <View
      style={{
        backgroundColor: colors.whiteColor,
        padding: 10,
        paddingTop: 17,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          backgroundColor: colors.whiteColor,
          flexDirection: "row",
          alignItems: "center",
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
        <Image
          source={{
            uri:
              chat.type === "personal"
                ? chat.members.find(
                    (member: UserType) =>
                      member._id !== userSlice.currentUser._id
                  )?.profileImage.path
                : chat.event.images[0].path,
          }}
          style={styles.profileImg}
        />
        <AppText styles={{ color: colors.primaryColor, fontSize: 30 }}>
          {chat.type === "personal"
            ? chat.members.find(
                (member: UserType) => member._id !== userSlice.currentUser._id
              )?.username
            : chat.event.name}
        </AppText>
      </View>
      <TouchableOpacity style={{ alignItems: "center" }}>
        <Icon
          name="information-circle-outline"
          style={{
            color: colors.primaryColor,
            fontSize: 35,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
