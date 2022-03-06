import { StyleSheet, View, Image } from "react-native";
import React from "react";

const LoadingContainer = () => {
  const loadingGif = `https://res.cloudinary.com/drrvhe0qk/image/upload/v1645732075/interestImages/loading_xsoft5.gif`;
  return (
    <View
      style={{
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Image source={{ uri: loadingGif, height: 200, width: 200 }} />
    </View>
  );
};

export default LoadingContainer;

const styles = StyleSheet.create({});
