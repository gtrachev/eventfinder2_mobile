import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import { NoteType, UserType } from "../../utils/types/modelTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { handleUserLikeNote } from "../../redux/actions/userActions";
import EventCard from "./EventCard";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import AppText from "../utils/AppText";
import Icon from "react-native-vector-icons/Ionicons";

const NoteCard: React.FC<{ note: NoteType; navigation: any }> = ({
  note,
  navigation,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const userSlice = useSelector((state: RootState) => state.users);
  const followingWhoLiked = userSlice.currentUser.following
    .filter((user: UserType) =>
      user.likedNotes.find((likedNote: NoteType) => likedNote._id === note._id)
    )
    .slice(0, 3)
    .sort((a: UserType, b: UserType) => a.followers.length - b.followers.length)
    .map((followingWhoLiked: UserType) => followingWhoLiked.username);
  const dispatch = useDispatch();
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
        {userSlice.currentUser._id === note.author._id ? (
          <IconButton
            onPress={() => setShowPopup((prevShowPopup) => !prevShowPopup)}
          >
            <Icon
              name="ellipsis-vertical"
              style={{
                color: colors.primaryColor,
                fontSize: 30,
              }}
            />
          </IconButton>
        ) : null}
      </View>
      {note.shared_event ? (
        <View>
          <AppText
            styles={{
              fontSize: 20,
              color: colors.primaryColor,
              marginBottom: 15,
            }}
          >
            Sharing: {note.shared_event.name} by{" "}
            {note.shared_event.author.username}
          </AppText>
          <EventCard
            containerStyle={{ marginBottom: 0 }}
            event={note.shared_event}
            navigation={navigation}
          />
        </View>
      ) : null}
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AccountsList", {
              accounts: note.likedBy,
              title: "Liked by",
            });
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
        </TouchableOpacity>
        <IconButton onPress={() => handleUserLikeNote(note._id)(dispatch)}>
          <Icon
            name={
              userSlice.currentUser.likedNotes.find(
                (likedNote: NoteType) => likedNote._id === note._id
              )
                ? "heart"
                : "heart-outline"
            }
            style={{
              color: colors.primaryColor,
              fontSize: 35,
            }}
          />
        </IconButton>
      </View>
      {showPopup ? (
        <View style={styles.popupContainer}>
          <DangerButton style={{ alignItems: "center" }}>
            <AppText styles={{ fontSize: 20, color: colors.dangerColor }}>
              Delete
            </AppText>
          </DangerButton>
        </View>
      ) : null}
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
    marginBottom: 15,
  },
  profileImgContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  popupContainer: {
    position: "absolute",
    top: 60,
    right: 10,
    padding: 15,
    backgroundColor: colors.whiteColor,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
