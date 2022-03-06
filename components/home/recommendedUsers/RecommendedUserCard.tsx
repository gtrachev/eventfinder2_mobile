import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../../styles/colors";
import { handleFollow } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { UserType } from "../../../utils/types/modelTypes";
import DangerButton from "../../../styles/styledComponents/Buttons/DangerButton";
import AppText from "../../utils/AppText";
import Button from "../../../styles/styledComponents/Buttons/Button";

const RecommendedUserCard: React.FC<{
  recommendedUser: any;
  navigation: any;
}> = ({ recommendedUser, navigation }) => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.users);
  return (
    <View style={styles.recommendedUserCard}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => {
          navigation.navigate("User", { userId: recommendedUser._id });
        }}
      >
        <Image
          style={styles.profileImg}
          source={{ uri: recommendedUser.profileImage.path }}
        />
        <AppText
          numberOfLines={1}
          styles={{ marginVertical: 10, fontSize: 20 }}
        >
          {recommendedUser.username}
        </AppText>
      </TouchableOpacity>
      {userSlice.currentUser.following.find(
        (followedUser: UserType) => followedUser._id === recommendedUser._id
      ) ? (
        <DangerButton
          onPress={() => handleFollow(recommendedUser._id)(dispatch)}
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
        <Button onPress={() => handleFollow(recommendedUser._id)(dispatch)}>
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
    </View>
  );
};

export default RecommendedUserCard;

const styles = StyleSheet.create({
  recommendedUserCard: {
    width: 150,
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: colors.whiteColor,
    justifyContent: "center",
    marginRight: 10,
  },
  profileImg: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
});
