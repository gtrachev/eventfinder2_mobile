import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { EventType } from "../../utils/types/modelTypes";
import { useDispatch, useSelector } from "react-redux";
import { handleAttend, handleSave } from "../../redux/actions/userActions";
import { RootState } from "../../redux/rootReducer";
import { deleteEvent } from "../../redux/actions/eventsActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../styles/styledComponents/Buttons/Button";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import AppText from "../utils/AppText";

const DetailsButtons: React.FC<{
  eventDetails: EventType;
  navigation: any;
}> = ({ eventDetails, navigation }) => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.users);
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
          deleteEvent(eventDetails._id)(dispatch);
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
  return (
    <View
      style={{
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        {userSlice.currentUser.attending.find(
          (attendingEvent: EventType) => attendingEvent._id === eventDetails._id
        ) ? (
          <DangerButton
            style={{ flexDirection: "row" }}
            onPress={() => handleAttend(eventDetails._id)(dispatch)}
          >
            <Icon
              name="close-circle-outline"
              style={{
                color: colors.dangerColor,
                fontSize: 30,
                paddingVertical: 5,
              }}
            />
            <AppText
              styles={{
                color: colors.dangerColor,
                fontSize: 23,
                paddingVertical: 5,
              }}
            >
              Unattend
            </AppText>
          </DangerButton>
        ) : (
          <Button
            style={{ flexDirection: "row" }}
            onPress={() => handleAttend(eventDetails._id)(dispatch)}
          >
            <Icon
              name="checkmark-circle-outline"
              style={{
                color: colors.primaryColor,
                fontSize: 30,
                paddingVertical: 5,
              }}
            />
            <AppText
              styles={{
                color: colors.primaryColor,
                fontSize: 23,
                paddingVertical: 5,
              }}
            >
              Attend
            </AppText>
          </Button>
        )}

        <View style={{ flexDirection: "row" }}>
          <IconButton
            onPress={() => handleSave(eventDetails._id)(dispatch)}
            style={{ marginRight: 10 }}
          >
            <Icon
              style={{
                color: colors.primaryColor,
                fontSize: 40,
                paddingVertical: 5,
              }}
              name={
                userSlice.currentUser.savedEvents.find(
                  (savedEvent: EventType) => savedEvent._id === eventDetails._id
                )
                  ? "bookmark"
                  : "bookmark-outline"
              }
            />
          </IconButton>
          <IconButton>
            <Icon
              style={{
                color: colors.primaryColor,
                fontSize: 40,
                paddingVertical: 5,
              }}
              name="share-outline"
            />
          </IconButton>
        </View>
      </View>
      <View style={{ marginBottom: 10 }}>
        <IconButton style={{ flexDirection: "row", alignItems: "center" }}>
          <AppText
            styles={{
              color: colors.primaryColor,
              fontSize: 23,
              paddingVertical: 5,
              marginRight: 10,
            }}
          >
            Join events chat room
          </AppText>
          <Icon
            style={{
              color: colors.primaryColor,
              fontSize: 30,
              paddingVertical: 5,
            }}
            name="chatbubbles-outline"
          />
        </IconButton>
      </View>
      {userSlice.currentUser._id === eventDetails.author._id ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            style={{ alignItems: "center", width: "42%" }}
            onPress={() => {
              navigation.navigate("EditEvent", { eventDetails });
            }}
          >
            <AppText
              styles={{
                color: colors.primaryColor,
                fontSize: 23,
                paddingVertical: 5,
              }}
            >
              Edit
            </AppText>
          </Button>
          <DangerButton
            style={{ alignItems: "center", width: "42%" }}
            onPress={showWarning}
          >
            <AppText
              styles={{
                color: colors.dangerColor,
                fontSize: 23,
                paddingVertical: 5,
              }}
            >
              Delete
            </AppText>
          </DangerButton>
        </View>
      ) : null}
    </View>
  );
};

export default DetailsButtons;

const styles = StyleSheet.create({});
