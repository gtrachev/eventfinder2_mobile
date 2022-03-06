import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import type { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import LoadingContainer from "../../components/utils/LoadingContainer";
import Icon from "react-native-vector-icons/Ionicons";
import ChatsSearch from "../../components/chat/ChatsSearch";
import ChatsList from "../../components/chat/ChatsList";
import AppText from "../../components/utils/AppText";

const Chats: React.FC<{
  navigation: MaterialTopTabNavigationProp<
    {
      UserChats: undefined;
      CurrentChat: undefined;
    },
    "UserChats"
  >;
}> = ({ navigation }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const [searchRegex, setSearchRegex] = useState<RegExp | null>(null);
  return (
    <View
      style={{
        backgroundColor: colors.whiteColor,
        height: "100%",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
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
          Your chats
        </AppText>
      </View>
      {!userSlice.isLoading && userSlice.currentUser ? (
        <>
          <ChatsSearch setSearchRegex={setSearchRegex} />
          <ChatsList searchRegex={searchRegex} navigation={navigation} />
        </>
      ) : (
        <LoadingContainer />
      )}
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
