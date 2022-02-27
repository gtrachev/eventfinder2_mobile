import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DiscoverSearch from "../../components/discover/DiscoverSearch";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../../styles/colors";
import DiscoverPopular from "../../components/discover/DiscoverPopular";
import DiscoverLocal from "../../components/discover/DiscoverLocal";
import DiscoverInterest from "../../components/discover/DiscoverInterest";
import DiscoverFilterContainer from "../../components/discover/DiscoverFilterContainer";
import AppText from "../../components/utils/AppText";

const Discover = () => {
  const Tabs = createMaterialTopTabNavigator();

  return (
    <View>
      <DiscoverSearch />
      <DiscoverFilterContainer />
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
          name="Popular"
          options={{
            tabBarLabel: () => (
              <AppText
                styles={{
                  color: colors.secondaryColor,
                  fontSize: 20,
                }}
              >
                Popular
              </AppText>
            ),
          }}
          component={DiscoverPopular}
        />
        <Tabs.Screen
          name="Local"
          options={{
            tabBarLabel: () => (
              <AppText
                styles={{
                  color: colors.secondaryColor,
                  fontSize: 20,
                }}
              >
                Close by
              </AppText>
            ),
          }}
          component={DiscoverLocal}
        />
        <Tabs.Screen
          name="Interest"
          options={{
            tabBarLabel: () => (
              <AppText
                styles={{
                  color: colors.secondaryColor,
                  fontSize: 20,
                }}
              >
                Interest
              </AppText>
            ),
          }}
          component={DiscoverInterest}
        />
      </Tabs.Navigator>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({});
