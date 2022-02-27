import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AccountHeader from "../../components/account/AccountHeader";
import colors from "../../styles/colors";
import AccountPosts from "../../components/account/AccountPosts";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../redux/actions/userActions";
import { RootState } from "../../redux/rootReducer";
import LoadingContainer from "../../components/utils/LoadingContainer";

const Account: React.FC<{
  navigation: any;
  route: any;
}> = ({ route, navigation }) => {
  const { userId } = route.params;
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    getUserById(userId)(dispatch);
  }, [dispatch, userId]);

  const Tabs = createMaterialTopTabNavigator();
  return !userSlice.isLoading ? (
    userSlice.userById ? (
      <View>
        <AccountHeader userById={userSlice.userById} />
        <Tabs.Navigator
          style={{ minHeight: 400 }}
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
              title:
                userSlice.currentUser._id === userId
                  ? "Your posts"
                  : "User posts",
              posts: userSlice.userByIdPosts,
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
              posts: userSlice.userById.attending,
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
          {userSlice.currentUser._id === userId ? (
            <Tabs.Screen
              name="Saved"
              initialParams={{
                title: "Saved events",
                posts: userSlice.userById.savedEvents,
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
          ) : null}
          <Tabs.Screen
            name="Liked"
            initialParams={{
              title: "Liked notes",
              posts: userSlice.userById.likedNotes,
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

export default Account;

const styles = StyleSheet.create({});
