import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { EventType } from "../../utils/types/modelTypes";
import EventCard from "../cards/EventCard";
import ErrorCard from "../cards/ErrorCard";
const loadingGif = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/loading_xsoft5.gif`;

const DiscoverEvents: React.FC<{
  events: EventType[];
  navigation: any;
  searchRegex: RegExp | null;
}> = ({ events, navigation, searchRegex }) => {
  const eventsSlice = useSelector((state: RootState) => state.events);
  return !eventsSlice.isLoading ? (
    <View>
      {events && events.length ? (
        events
          .filter((event: EventType) =>
            event.name.match(searchRegex ? searchRegex : "")
          )
          .map((event) => (
            <EventCard event={event} navigation={navigation} key={event._id} />
          ))
      ) : (
        <ErrorCard err_message="No events found." />
      )}
    </View>
  ) : (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Image source={{ uri: loadingGif, height: 200, width: 200 }} />
    </View>
  );
};

export default DiscoverEvents;

const styles = StyleSheet.create({});
