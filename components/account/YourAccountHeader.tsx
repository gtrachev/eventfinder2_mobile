import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import { UserType } from "../../utils/types/modelTypes";
import { uppercase } from "../../utils/helpers/uppercase";
import { InterestEnum } from "../../utils/types/interestTypes";
import { logoutUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import AppText from "../utils/AppText";
import Icon from "react-native-vector-icons/Ionicons";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";

const YourAccountHeader: React.FC<{
  currentUser: UserType;
  navigation: any;
}> = ({ currentUser, navigation }) => {
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    logoutUser()(dispatch);
    dispatch({
      type: uiActionTypes.SET_FLASH,
      payload: {
        type: "success",
        message: "Successfully logged out of your account.",
      },
    });
  };
  return currentUser ? (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {currentUser.profileImage && currentUser.profileImage.path ? (
          <Image
            source={{ uri: currentUser.profileImage.path }}
            style={styles.profileImg}
          />
        ) : null}
        <View>
          <AppText
            styles={{
              color: colors.primaryColor,
              fontSize: 30,
              marginBottom: 5,
            }}
          >
            {currentUser.username}
          </AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton
              onPress={() => setShowInfo((prevShowInfo) => !prevShowInfo)}
            >
              <Icon
                name="information-circle-outline"
                style={{
                  color: colors.primaryColor,
                  fontSize: 40,
                  marginRight: 10,
                }}
              />
            </IconButton>
            <DangerButton onPress={handleLogout}>
              <AppText styles={{ color: colors.dangerColor, fontSize: 20 }}>
                Log out
              </AppText>
            </DangerButton>
          </View>
        </View>
      </View>
      {showInfo ? (
        <View style={{ alignItems: "flex-start" }}>
          <View style={styles.followerCountContainer}>
            <TouchableOpacity
              style={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                padding: 10,
                borderRightWidth: 1,
                borderRightColor: colors.secondaryColor,
                borderStyle: "solid",
              }}
              onPress={() => {
                navigation.navigate("AccountsList", {
                  accounts: currentUser.followers,
                  title: "Followers",
                });
              }}
            >
              <AppText styles={{ color: colors.secondaryColor, fontSize: 20 }}>
                Followers
              </AppText>
              <AppText styles={{ color: colors.secondaryColor, fontSize: 20 }}>
                {currentUser.followers.length}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                padding: 10,
              }}
              onPress={() => {
                navigation.navigate("AccountsList", {
                  accounts: currentUser.following,
                  title: "Following",
                });
              }}
            >
              <AppText styles={{ color: colors.secondaryColor, fontSize: 20 }}>
                Following
              </AppText>
              <AppText styles={{ color: colors.secondaryColor, fontSize: 20 }}>
                {currentUser.following.length}
              </AppText>
            </TouchableOpacity>
          </View>
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Email:{" "}
            <AppText
              styles={{
                color: colors.primaryColor,
                fontSize: 20,
              }}
            >
              {currentUser.email}
            </AppText>
          </AppText>
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
              marginTop: 10,
            }}
          >
            User tier:{" "}
            <AppText
              styles={{
                color: colors.primaryColor,
                fontSize: 20,
              }}
            >
              {uppercase(currentUser.userTier)}
            </AppText>
          </AppText>
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Country:{" "}
            <AppText
              styles={{
                color: colors.primaryColor,
                fontSize: 20,
              }}
            >
              {currentUser.country}
            </AppText>
          </AppText>
          {currentUser.city && (
            <AppText
              styles={{
                color: colors.secondaryColor,
                fontSize: 20,
                marginTop: 10,
              }}
            >
              City:{" "}
              <AppText
                styles={{
                  color: colors.primaryColor,
                  fontSize: 20,
                }}
              >
                {currentUser.city}
              </AppText>
            </AppText>
          )}
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Age:{" "}
            <AppText
              styles={{
                color: colors.primaryColor,
                fontSize: 20,
              }}
            >
              {currentUser.age}
            </AppText>
          </AppText>
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Interests:{" "}
            <AppText
              styles={{
                color: colors.primaryColor,
                fontSize: 20,
              }}
            >
              {currentUser.interests
                .map((interest: InterestEnum) => uppercase(interest))
                .join(", ")}
            </AppText>
          </AppText>
          <Button
            style={{
              marginTop: 10,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("EditAccount")}
          >
            <AppText
              styles={{
                color: colors.primaryColor,
                fontSize: 23,
                paddingVertical: 5,
              }}
            >
              Edit account
            </AppText>
          </Button>
        </View>
      ) : null}
    </View>
  ) : null;
};

export default YourAccountHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.whiteColor,
    padding: 20,
    paddingBottom: 0,
  },
  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
  },
  followerCountContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.secondaryColor,
    borderStyle: "solid",
    marginTop: 20,
    flexDirection: "row",
  },
});
