import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ChatType, UserType } from "../../utils/types/modelTypes";
import AppText from "../utils/AppText";

const ChatsList: React.FC<{
  navigation: any;
  searchRegex: RegExp | null;
}> = ({ navigation, searchRegex }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  return (
    <ScrollView style={{ marginTop: 20 }}>
      {userSlice.currentUser && userSlice.currentUser.inChats
        ? userSlice.currentUser.inChats
            .filter((chat: ChatType) => {
              if (chat.type === "personal") {
                return chat.members
                  .find(
                    (member: UserType) =>
                      member._id !== userSlice.currentUser._id
                  )
                  ?.username.match(searchRegex ? searchRegex : "");
              } else {
                return chat.event.name.match(searchRegex ? searchRegex : "");
              }
            })
            .map((chat: ChatType) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CurrentChat", { chatId: chat._id })
                  }
                  key={chat._id}
                >
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 15,
                    }}
                  >
                    <Image
                      style={styles.profileImg}
                      source={{
                        uri:
                          chat.type === "personal"
                            ? chat.members.find(
                                (member: UserType) =>
                                  member._id !== userSlice.currentUser._id
                              )?.profileImage.path
                            : chat.event.images[0].path,
                      }}
                    />
                    <View>
                      <AppText styles={{ fontSize: 20 }}>
                        {chat.type === "personal"
                          ? chat.members.find(
                              (member: UserType) =>
                                member._id !== userSlice.currentUser._id
                            )?.username
                          : chat.event.name}
                      </AppText>
                      <AppText
                        styles={{ color: colors.grayColor, fontSize: 18 }}
                      >
                        {chat.messages.length
                          ? chat.messages[chat.messages.length - 1].text.slice(
                              0,
                              30
                            )
                          : ""}
                      </AppText>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
        : null}
    </ScrollView>
  );
};

export default ChatsList;

const styles = StyleSheet.create({
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
});
