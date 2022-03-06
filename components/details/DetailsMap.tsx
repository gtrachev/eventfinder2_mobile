import { StyleSheet, View } from "react-native";
import React from "react";
import { EventType } from "../../utils/types/modelTypes";
import MapView, { Marker } from "react-native-maps";
import colors from "../../styles/colors";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import Icon from "react-native-vector-icons/Ionicons";

const DetailsMap: React.FC<{
  eventDetails: EventType;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ eventDetails, setShowMap }) => {
  return (
    <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
      <MapView
        style={{ height: 250, width: "100%" }}
        initialRegion={{
          latitude: eventDetails.geometry.coordinates[0],
          longitude: eventDetails.geometry.coordinates[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        maxZoomLevel={100}
        camera={{
          center: {
            latitude: eventDetails.geometry.coordinates[0],
            longitude: eventDetails.geometry.coordinates[1],
          },
          zoom: 9,
          pitch: 45,
          heading: 90,
          altitude: 1000,
        }}
      >
        <Marker
          coordinate={{
            latitude: eventDetails.geometry.coordinates[0],
            longitude: eventDetails.geometry.coordinates[1],
          }}
          title={eventDetails.address}
          pinColor={colors.primaryColor}
        />
      </MapView>
      <IconButton
        style={{ position: "absolute", top: 10, right: 20 }}
        onPress={() => {
          setShowMap(false);
        }}
      >
        <Icon
          name="close-circle-outline"
          style={{
            color: colors.dangerColor,
            fontSize: 40,
          }}
        />
      </IconButton>
    </View>
  );
};

export default DetailsMap;

const styles = StyleSheet.create({});
