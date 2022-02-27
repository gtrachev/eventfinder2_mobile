import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../styles/colors";
import AppText from "../utils/AppText";
import Icon from "react-native-vector-icons/Ionicons";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import { getUserById, getUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { UserType } from "../../utils/types/modelTypes";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import { uppercase } from "../../utils/helpers/uppercase";
import { InterestEnum } from "../../utils/types/interestTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
const snimka2 = require("../../assets/snimka2.jpg");

const AccountHeader: React.FC<{ userById: UserType }> = ({ userById }) => {
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
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
          <AppText
            styles={{
              color: colors.primaryColor,
              fontSize: 30,
              marginBottom: 5,
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
            <DangerButton>
              <AppText styles={{ color: colors.dangerColor, fontSize: 20 }}>
                Log out
              </AppText>
            </DangerButton>
          </View>
        </View>
      </View>
      {showInfo ? (
        <View style={{ alignItems: "flex-start" }}>
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
        </View>
      ) : null}
      <View style={styles.followerCountContainer}>
        <TouchableOpacity
          style={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            padding: 10,
            borderRightWidth: 1,
            borderRightColor: colors.grayColor,
            borderStyle: "solid",
          }}
        >
          <AppText styles={{ color: colors.grayColor, fontSize: 20 }}>
            Followers
          </AppText>
          <AppText styles={{ color: colors.grayColor, fontSize: 20 }}>
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
        >
          <AppText styles={{ color: colors.grayColor, fontSize: 20 }}>
            Following
          </AppText>
          <AppText styles={{ color: colors.grayColor, fontSize: 20 }}>
            {userById.following.length}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.whiteColor,
    padding: 20,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  followerCountContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.grayColor,
    borderStyle: "solid",
    marginTop: 20,
    flexDirection: "row",
  },
});
