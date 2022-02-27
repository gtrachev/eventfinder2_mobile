import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import AppText from "../utils/AppText";
const snimka2 = require("../../assets/snimka2.jpg");
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../styles/styledComponents/Buttons/Button";
import { EventType, UserType } from "../../utils/types/modelTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const EventCard: React.FC<{ event: EventType }> = ({ event }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const followingWhoAttend = userSlice.currentUser.following
    .filter((user: UserType) =>
      user.attending.find(
        (attendedEvent: EventType) => attendedEvent._id === event._id
      )
    )
    .slice(0, 3)
    .sort((a: UserType, b: UserType) => a.followers.length - b.followers.length)
    .map((followingWhoAttend: UserType) => followingWhoAttend.username);
  return (
    <View style={styles.eventCardContainer}>
      <View style={styles.eventCardHeader}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: event.author.profileImage.path }}
            style={styles.profileImgContainer}
          />
          <View>
            <AppText styles={{ fontSize: 20 }}>{event.author.username}</AppText>
            <AppText styles={{ fontSize: 15, color: colors.grayColor }}>
              {`${new Date(
                event.created_at
              ).toLocaleDateString()} at ${new Date(
                event.created_at
              ).getHours()}.${new Date(event.created_at).getMinutes()}`}
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
          <Button>
            <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
              Learn more
            </AppText>
          </Button>
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="bookmark-outline"
              style={{
                color: colors.primaryColor,
                fontSize: 30,
                marginRight: 10,
              }}
            />
            <Icon
              name="share-outline"
              style={{ color: colors.primaryColor, fontSize: 30 }}
            />
          </View>
        </View>
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
      </View>
    </View>
  );
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
});
