import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import store from "./redux";

export default function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", justifyContent: "center" },
  text: {
    color: "#333",
  },
});
