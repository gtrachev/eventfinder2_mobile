import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import { ChatType, UserType } from "../../utils/types/modelTypes";
import { uppercase } from "../../utils/helpers/uppercase";
import { InterestEnum } from "../../utils/types/interestTypes";
import { handleFollow, logoutUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { RootState } from "../../redux/rootReducer";
import { createChat } from "../../redux/actions/chatsActions";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import Button from "../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import AppText from "../utils/AppText";
import Icon from "react-native-vector-icons/Ionicons";

const AccountHeader: React.FC<{ userById: UserType; navigation: any }> = ({
  userById,
  navigation,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const userSlice = useSelector((state: RootState) => state.users);
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
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: userById.profileImage.path }}
          style={styles.profileImg}
        />
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              styles={{
                color: colors.primaryColor,
                fontSize: 30,
                marginBottom: 5,
                marginRight:
                  userById._id !== userSlice.currentUser._id ? 10 : 0,
              }}
            >
              {userById.username}
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
              {userById._id === userSlice.currentUser._id ? (
                <DangerButton onPress={handleLogout}>
                  <AppText styles={{ color: colors.dangerColor, fontSize: 20 }}>
                    Log out
                  </AppText>
                </DangerButton>
              ) : null}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {userSlice.currentUser._id !== userById._id ? (
              <>
                {userSlice.currentUser.following.find(
                  (followedUser: UserType) => followedUser._id === userById._id
                ) ? (
                  <DangerButton
                    style={{ marginRight: 10 }}
                    onPress={() => handleFollow(userById._id)(dispatch)}
                  >
                    <AppText
                      styles={{
                        color: colors.dangerColor,
                        fontSize: 20,
                      }}
                    >
                      Unfollow
                    </AppText>
                  </DangerButton>
                ) : (
                  <Button
                    style={{ marginRight: 10 }}
                    onPress={() => handleFollow(userById._id)(dispatch)}
                  >
                    <AppText
                      styles={{
                        color: colors.primaryColor,
                        fontSize: 20,
                      }}
                    >
                      Follow
                    </AppText>
                  </Button>
                )}
                {userSlice.currentUser.inChats &&
                userSlice.currentUser.inChats.length &&
                userSlice.currentUser.inChats
                  .filter((chat: ChatType) => chat.type === "personal")
                  .find((chat: ChatType) => {
                    return chat.members.find(
                      (member) => member._id === userById._id
                    );
                  }) ? (
                  <Button>
                    <AppText
                      styles={{
                        color: colors.primaryColor,
                        fontSize: 20,
                      }}
                    >
                      Message
                    </AppText>
                  </Button>
                ) : (
                  <Button
                    onPress={() => {
                      createChat(userById._id)(dispatch);
                    }}
                  >
                    <AppText
                      styles={{
                        color: colors.primaryColor,
                        fontSize: 20,
                      }}
                    >
                      Start chat
                    </AppText>
                  </Button>
                )}
              </>
            ) : null}
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
                  accounts: userById.followers,
                  title: `${userById.username}'s followers`,
                });
              }}
            >
              <AppText styles={{ color: colors.secondaryColor, fontSize: 20 }}>
                Followers
              </AppText>
              <AppText styles={{ color: colors.secondaryColor, fontSize: 20 }}>
                {userById.followers.length}
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
                  accounts: userById.following,
                  title: `${userById.username}'s following`,
                });
              }}
            >
              <AppText styles={{ color: colors.secondaryColor, fontSize: 20 }}>
                Following
              </AppText>
              <AppText styles={{ color: colors.secondaryColor, fontSize: 20 }}>
                {userById.following.length}
              </AppText>
            </TouchableOpacity>
          </View>

          {userById._id === userSlice.currentUser._id ? (
            <>
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
                  {userById.email}
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
                  {uppercase(userById.userTier)}
                </AppText>
              </AppText>
            </>
          ) : null}
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
              {userById.country}
            </AppText>
          </AppText>
          {userById.city && (
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
                {userById.city}
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
              {userById.age}
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
              {userById.interests
                .map((interest: InterestEnum) => uppercase(interest))
                .join(", ")}
            </AppText>
          </AppText>
          {userById._id === userSlice.currentUser._id ? (
            <Button
              style={{
                marginTop: 10,
                alignItems: "center",
              }}
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
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default AccountHeader;

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
