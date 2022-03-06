import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./Home";
import ChatsTab from "./ChatsTab";

const HomeTab = () => {
  const MainTopTabs = createMaterialTopTabNavigator();
  return (
    <MainTopTabs.Navigator
      initialRouteName="Home"
      showPageIndicator={false}
      tabBar={() => null}
    >
      <MainTopTabs.Screen name="Home" component={Home} />
      <MainTopTabs.Screen name="ChatsTab" component={ChatsTab} />
    </MainTopTabs.Navigator>
  );
};

export default HomeTab;
