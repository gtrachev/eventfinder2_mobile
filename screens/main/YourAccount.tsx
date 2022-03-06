import { StyleSheet, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import LoadingContainer from "../../components/utils/LoadingContainer";
import YourAccountHeader from "../../components/account/YourAccountHeader";
import Flash from "../../components/utils/Flash";
import AccountPosts from "../../components/account/AccountPosts";

const YourAccount: React.FC<{
  navigation: any;
  route: any;
}> = ({ route, navigation }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const Tabs = createMaterialTopTabNavigator();
  return !userSlice.isLoading ? (
    userSlice.currentUser ? (
      <View style={{ height: "100%" }}>
        <Flash />
        <YourAccountHeader
          navigation={navigation}
          currentUser={userSlice.currentUser}
        />
        <Tabs.Navigator
          style={{ maxHeight: "100%" }}
          screenOptions={{
            swipeEnabled: true,
            tabBarStyle: {
              backgroundColor: colors.whiteColor,
            },
            tabBarIndicatorStyle: {
              backgroundColor: colors.secondaryColor,
            },
          }}
        >
          <Tabs.Screen
            name="Posts"
            initialParams={{
              title: "Your posts",
              posts: userSlice.userPosts,
            }}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Icon
                  name="ios-grid-outline"
                  style={{ color: colors.secondaryColor, fontSize: 24 }}
                />
              ),
            }}
            component={AccountPosts}
          />
          <Tabs.Screen
            name="Attending"
            initialParams={{
              title: "Attending",
              posts: userSlice.currentUser.attending,
            }}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Icon
                  name="checkmark-circle-outline"
                  style={{ color: colors.secondaryColor, fontSize: 24 }}
                />
              ),
            }}
            component={AccountPosts}
          />
          <Tabs.Screen
            name="Saved"
            initialParams={{
              title: "Saved events",
              posts: userSlice.currentUser.savedEvents,
            }}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Icon
                  name="bookmark-outline"
                  style={{ color: colors.secondaryColor, fontSize: 24 }}
                />
              ),
            }}
            component={AccountPosts}
          />
          <Tabs.Screen
            name="Liked"
            initialParams={{
              title: "Liked notes",
              posts: userSlice.currentUser.likedNotes,
            }}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Icon
                  name="heart-outline"
                  style={{ color: colors.secondaryColor, fontSize: 24 }}
                />
              ),
            }}
            component={AccountPosts}
          />
        </Tabs.Navigator>
      </View>
    ) : null
  ) : (
    <LoadingContainer />
  );
};

export default YourAccount;

const styles = StyleSheet.create({});
