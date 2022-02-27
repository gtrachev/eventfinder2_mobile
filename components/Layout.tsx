import { Platform, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "./Main";
import colors from "../styles/colors";
import { getUser } from "../redux/actions/userActions";
import { RootState } from "../redux/rootReducer";
import Auth from "./Auth";
import LoadingContainer from "./utils/LoadingContainer";

const Layout = () => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.users);
  const uiSlice = useSelector((state: RootState) => state.ui);
  const errorSlice = useSelector((state: RootState) => state.errors);
  useEffect(() => {
    getUser()(dispatch);
    if (!userSlice.isLoading && errorSlice?.error && errorSlice.error.length) {
    }
  }, [dispatch, errorSlice?.error]);
  return (
    <SafeAreaView style={styles.layoutContainer}>
      {!userSlice.currentUser && userSlice.isLoading ? (
        <LoadingContainer />
      ) : !userSlice.currentUser ? (
        <Auth />
      ) : (
        <Main />
      )}
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    color: colors.secondaryColor,
    fontFamily: "Segoe UI",
  },
});
