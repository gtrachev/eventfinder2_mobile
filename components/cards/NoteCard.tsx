import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";
import AppText from "../utils/AppText";
import { NoteType, UserType } from "../../utils/types/modelTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
const snimka2 = require("../../assets/snimka2.jpg");

const NoteCard: React.FC<{ note: NoteType }> = ({ note }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const followingWhoLiked = userSlice.currentUser.following
    .filter((user: UserType) =>
      user.likedNotes.find((likedNote: NoteType) => likedNote._id === note._id)
    )
    .slice(0, 3)
    .sort((a: UserType, b: UserType) => a.followers.length - b.followers.length)
    .map((followingWhoLiked: UserType) => followingWhoLiked.username);
  // const showUsers = () => {
  //   setShowLikedAccounts(true);
  //   dispatch({
  //     type: uiActionTypes.SHOW_OVERLAY,
  //     payload: { show: true, mobile: false },
  //   });
  return (
    <View style={styles.noteCardContainer}>
      <View style={styles.noteCardHeader}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: note.author.profileImage.path }}
            style={styles.profileImgContainer}
          />
          <View>
            <AppText styles={{ fontSize: 20 }}>{note.author.username}</AppText>
            <AppText styles={{ fontSize: 15, color: colors.grayColor }}>
              {`${new Date(note.created_at).toLocaleDateString()} at ${new Date(
                note.created_at
              ).getHours()}.${new Date(note.created_at).getMinutes()}`}
            </AppText>
          </View>
        </View>
        <Icon
          name="ellipsis-vertical"
          style={{
            color: colors.primaryColor,
            fontSize: 30,
          }}
        />
      </View>
      <AppText styles={{ fontSize: 20, marginVertical: 10 }}>
        {note.body}
      </AppText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AppText
          styles={{ fontSize: 15, color: colors.grayColor, marginBottom: 5 }}
        >
          {followingWhoLiked.length
            ? `Liked by ${followingWhoLiked.join(", ")} and ${
                note.likedBy.length - followingWhoLiked.length
              } more.`
            : `Liked by ${note.likedBy.length} user${
                note.likedBy.length === 1 ? "" : "s"
              }.`}
        </AppText>
        <Icon
          name="heart-outline"
          style={{
            color: colors.primaryColor,
            fontSize: 35,
          }}
        />
      </View>
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  noteCardContainer: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: colors.whiteColor,
    justifyContent: "center",
    marginBottom: 20,
    padding: 10,
  },
  noteCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImgContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
