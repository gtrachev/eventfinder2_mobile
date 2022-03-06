import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { EventType } from "../../utils/types/modelTypes";
import colors from "../../styles/colors";
import AppText from "../utils/AppText";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";

const DetailsBody: React.FC<{
  eventDetails: EventType;
  navigation: any;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ eventDetails, navigation, setShowMap }) => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <AppText
        styles={{
          color: colors.primaryColor,
          fontSize: 30,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        About the event
      </AppText>
      <AppText
        styles={{
          color: colors.secondaryColor,
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        {"  "}
        {eventDetails.description}
      </AppText>
      <AppText
        styles={{
          color: colors.primaryColor,
          fontSize: 30,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Details
      </AppText>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.secondaryColor,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Icon
            name="calendar-outline"
            style={{
              fontSize: 30,
              marginRight: 5,
              color: colors.secondaryColor,
            }}
          />
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
            }}
          >
            Date: {new Date(eventDetails.date).toLocaleDateString()}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Icon
            name="time-outline"
            style={{
              fontSize: 30,
              marginRight: 5,
              color: colors.secondaryColor,
            }}
          />
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
            }}
          >
            Starting at: {eventDetails.time}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Icon
            name="pricetag-outline"
            style={{
              fontSize: 30,
              marginRight: 5,
              color: colors.secondaryColor,
            }}
          />
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
            }}
          >
            Price: {eventDetails.price}$
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Icon
            name="people-outline"
            style={{
              fontSize: 30,
              marginRight: 5,
              color: colors.secondaryColor,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AccountsList", {
                accounts: eventDetails.attenders,
                title: "Attenders",
              });
            }}
          >
            <AppText
              styles={{
                color: colors.secondaryColor,
                fontSize: 20,
              }}
            >
              Attenders: {eventDetails.attenders.length}
            </AppText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Icon
            name="globe-outline"
            style={{
              fontSize: 30,
              marginRight: 5,
              color: colors.secondaryColor,
            }}
          />
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
            }}
          >
            Location: {eventDetails.city}, {eventDetails.country}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Icon
            name="location-outline"
            style={{
              fontSize: 30,
              marginRight: 5,
              color: colors.secondaryColor,
            }}
          />
          <TouchableOpacity onPress={() => setShowMap(true)}>
            <AppText
              styles={{
                color: colors.secondaryColor,
                fontSize: 20,
              }}
            >
              Address: {eventDetails.address}
            </AppText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <FeatherIcon
            name="user"
            style={{
              fontSize: 30,
              marginRight: 5,
              color: colors.secondaryColor,
            }}
          />
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
            }}
          >
            Author: {eventDetails.author.username}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default DetailsBody;

const styles = StyleSheet.create({});
