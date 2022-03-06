import { Platform, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/userActions";
import { RootState } from "../redux/rootReducer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Details from "../screens/main/Details";
import Account from "../screens/main/Account";
import AccountsList from "../screens/main/AccountsList";
import Edit from "../screens/main/Edit";
import EditAccount from "../screens/main/EditAccount";
import Auth from "./Auth";
import LoadingContainer from "./utils/LoadingContainer";
import Main from "./Main";
import colors from "../styles/colors";

const Layout = () => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.users);
  const errorSlice = useSelector((state: RootState) => state.errors);
  const Tabs = createNativeStackNavigator();
  useEffect(() => {
    getUser()(dispatch);
  }, [dispatch, errorSlice?.error]);
  return (
    <SafeAreaView style={styles.layoutContainer}>
      {!userSlice.currentUser && userSlice.isLoading ? (
        <LoadingContainer />
      ) : !userSlice.currentUser ? (
        <Auth />
      ) : userSlice.currentUser.username &&
        userSlice.currentUser.username.length ? (
        <NavigationContainer>
          <Tabs.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Main"
          >
            <Tabs.Screen name="Main" component={Main} options={{}} />
            <Tabs.Screen name="Details" component={Details} options={{}} />
            <Tabs.Screen name="User" component={Account} options={{}} />
            <Tabs.Screen
              name="AccountsList"
              component={AccountsList}
              options={{}}
            />
            <Tabs.Screen name="EditEvent" component={Edit} options={{}} />
            <Tabs.Screen
              name="EditAccount"
              component={EditAccount}
              options={{}}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      ) : null}
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
