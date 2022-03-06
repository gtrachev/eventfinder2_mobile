import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import { EventType, UserType } from "../../utils/types/modelTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { handleSave } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { deleteEvent } from "../../redux/actions/eventsActions";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import AppText from "../utils/AppText";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../styles/styledComponents/Buttons/Button";

const EventCard: React.FC<{
  event: EventType;
  navigation: any;
  containerStyle?: any;
}> = ({ event, navigation, containerStyle }) => {
  const [showPopup, setShowPopup] = useState(false);
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const followingWhoAttend = userSlice.currentUser.following
    .filter((user: UserType) =>
      user.attending.find(
        (attendedEvent: EventType) => attendedEvent._id === event._id
      )
    )
    .slice(0, 3)
    .sort((a: UserType, b: UserType) => a.followers.length - b.followers.length)
    .map((followingWhoAttend: UserType) => followingWhoAttend.username);
  const handleShare = () => {
    dispatch({
      type: uiActionTypes.SET_SHARED_EVENT,
      payload: event,
    });
    navigation.navigate("Home");
  };
  const showWarning = () => {
    Alert.alert("Warning", "Are you sure you want to delete this event?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteEvent(event._id)(dispatch);
          navigation.navigate("Home");
          dispatch({
            type: uiActionTypes.SET_FLASH,
            payload: {
              type: "success",
              message: "Event successfully deleted.",
            },
          });
        },
        style: "cancel",
      },
    ]);
  };
  return event && event.name ? (
    <View
      style={[styles.eventCardContainer, containerStyle ? containerStyle : {}]}
    >
      <View style={styles.eventCardHeader}>
        <View style={{ flexDirection: "row" }}>
          {event.author && event.author.profileImage ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("User", { userId: event.author._id })
              }
            >
              <Image
                source={{ uri: event.author.profileImage.path }}
                style={styles.profileImgContainer}
              />
            </TouchableOpacity>
          ) : null}
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("User", { userId: event.author._id })
              }
            >
              <AppText styles={{ fontSize: 20 }}>
                {event.author.username}
              </AppText>
            </TouchableOpacity>
            <AppText styles={{ fontSize: 15, color: colors.grayColor }}>
              {`${new Date(
                event.created_at
              ).toLocaleDateString()} at ${new Date(
                event.created_at
              ).getHours()}.${new Date(event.created_at).getMinutes()}`}
            </AppText>
          </View>
        </View>
        {userSlice.currentUser._id === event.author._id ? (
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
      <Image
        source={{ uri: event.images[0].path }}
        style={styles.eventCardPoster}
      />
      <View style={{ padding: 10 }}>
        <AppText
          styles={{ fontSize: 23, color: colors.primaryColor, marginBottom: 5 }}
        >
          {event.name}
        </AppText>
        <AppText
          styles={{
            fontSize: 20,
            color: colors.secondaryColor,
            marginBottom: 5,
          }}
        >
          {event.city}, {event.country}{" "}
          <Icon
            name="location"
            style={{
              color: colors.secondaryColor,
              fontSize: 23,
            }}
          />
        </AppText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <AppText styles={{ fontSize: 20, color: colors.secondaryColor }}>
            Price: {event.price}.00$
          </AppText>
          <AppText styles={{ fontSize: 20, color: colors.secondaryColor }}>
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </AppText>
        </View>
        <AppText
          styles={{
            fontSize: 18,
            color: colors.secondaryColor,
            marginBottom: 20,
            justifyContent: "center",
          }}
          numberOfLines={7}
        >
          {"    "}
          {event.description}
        </AppText>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            onPress={() =>
              navigation.navigate("Details", { eventId: event._id })
            }
          >
            <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
              Learn more
            </AppText>
          </Button>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => handleSave(event._id)(dispatch)}>
              <Icon
                name={
                  userSlice.currentUser.savedEvents.find(
                    (savedEvent: EventType) => savedEvent._id === event._id
                  )
                    ? "bookmark"
                    : "bookmark-outline"
                }
                style={{
                  color: colors.primaryColor,
                  fontSize: 30,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}>
              <Icon
                name="share-outline"
                style={{ color: colors.primaryColor, fontSize: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AccountsList", {
              accounts: event.attenders,
              title: "Attended by",
            });
          }}
        >
          <AppText
            styles={{ fontSize: 15, color: colors.grayColor, marginBottom: 5 }}
          >
            {followingWhoAttend.length
              ? `Attended by ${followingWhoAttend.join(", ")} and ${
                  event.attenders.length - followingWhoAttend.length
                } more.`
              : `Attended by ${event.attenders.length} user${
                  event.attenders.length === 1 ? "" : "s"
                }.`}
          </AppText>
        </TouchableOpacity>
      </View>
      {showPopup ? (
        <View style={styles.popupContainer}>
          <Button
            style={{ alignItems: "center", marginBottom: 10 }}
            onPress={() =>
              navigation.navigate("EditEvent", { eventDetails: event })
            }
          >
            <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
              Edit
            </AppText>
          </Button>
          <DangerButton style={{ alignItems: "center" }} onPress={showWarning}>
            <AppText styles={{ fontSize: 20, color: colors.dangerColor }}>
              Delete
            </AppText>
          </DangerButton>
        </View>
      ) : null}
    </View>
  ) : null;
};

export default EventCard;

const styles = StyleSheet.create({
  eventCardContainer: {
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
    position: "relative",
  },
  eventCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  profileImgContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  eventCardPoster: {
    width: "100%",
    height: 230,
  },
  popupContainer: {
    position: "absolute",
    top: 75,
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
