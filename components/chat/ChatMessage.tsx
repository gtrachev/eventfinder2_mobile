import { StyleSheet, View, Image } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import TimeAgo from "react-native-timeago";
import { MessageType } from "../../utils/types/modelTypes";
import AppText from "../utils/AppText";

const ChatMessage: React.FC<{ message: MessageType; isAuthor: boolean }> = ({
  message,
  isAuthor,
}) => {
  return isAuthor ? (
    <View style={{ alignItems: "flex-end" }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={[styles.message, { backgroundColor: colors.primaryColor }]}
        >
          <AppText styles={{ color: colors.whiteColor, fontSize: 20 }}>
            {message.text}
          </AppText>
        </View>
        <Image
          source={{ uri: message.author.profileImage.path }}
          style={[styles.profileImg, { marginLeft: 10 }]}
        />
      </View>
      <AppText styles={{ fontSize: 15, color: colors.grayColor, marginTop: 5 }}>
        <TimeAgo time={message.createdAt} />
      </AppText>
    </View>
  ) : (
    <View style={{ marginBottom: 15 }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: message.author.profileImage.path }}
          style={[styles.profileImg, { marginRight: 10 }]}
        />
        <View style={styles.message}>
          <AppText styles={{ color: colors.whiteColor, fontSize: 20 }}>
            {message.text}
          </AppText>
        </View>
      </View>
      <AppText styles={{ fontSize: 15, color: colors.grayColor, marginTop: 5 }}>
        <TimeAgo time={message.createdAt} />
      </AppText>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  profileImg: { width: 50, height: 50, borderRadius: 25 },
  message: {
    maxWidth: "80%",
    padding: 10,
    backgroundColor: colors.secondaryColor,
    borderRadius: 15,
  },
});
