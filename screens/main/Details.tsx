import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getDetails } from "../../redux/actions/eventsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { EventType } from "../../utils/types/modelTypes";
import LoadingContainer from "../../components/utils/LoadingContainer";
import DetailsHeader from "../../components/details/DetailsHeader";
import DetailsCarousel from "../../components/details/DetailsCarousel";
import DetailsBody from "../../components/details/DetailsBody";
import DetailsButtons from "../../components/details/DetailsButtons";
import colors from "../../styles/colors";
import DetailsComments from "../../components/details/DetailsComments";
import DetailsMap from "../../components/details/DetailsMap";

const Details: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { eventId } = route.params;
  const eventsSlice = useSelector((state: RootState) => state.events);
  const [showMap, setShowMap] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getDetails(eventId!)(dispatch);
  }, [eventId, dispatch]);
  const eventDetails: EventType = eventsSlice.eventDetails;
  return !eventsSlice.isLoading && eventDetails && eventDetails.name ? (
    <ScrollView nestedScrollEnabled={true}>
      <View
        style={{
          backgroundColor: colors.whiteColor,
          marginBottom: 15,
          paddingBottom: 10,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <DetailsHeader navigation={navigation} eventName={eventDetails.name} />
        <DetailsCarousel images={eventDetails.images} />
        <DetailsBody
          setShowMap={setShowMap}
          navigation={navigation}
          eventDetails={eventDetails}
        />
        {showMap ? (
          <DetailsMap eventDetails={eventDetails} setShowMap={setShowMap} />
        ) : null}
        <DetailsButtons navigation={navigation} eventDetails={eventDetails} />
      </View>
      <View
        style={{
          backgroundColor: colors.whiteColor,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        <DetailsComments eventDetails={eventDetails} />
      </View>
    </ScrollView>
  ) : (
    <LoadingContainer />
  );
};

export default Details;

const styles = StyleSheet.create({});
