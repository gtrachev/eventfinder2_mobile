import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../../../styles/colors";
import AppText from "../../utils/AppText";
import Button from "../../../styles/styledComponents/Buttons/Button";

const RecommendedUserCard: React.FC<{ recommendedUser: any }> = ({
  recommendedUser,
}) => {
  return (
    <View style={styles.recommendedUserCard}>
      <Image
        style={styles.profileImg}
        source={{ uri: recommendedUser.profileImage.path }}
      />
      <AppText numberOfLines={1} styles={{ marginVertical: 10, fontSize: 20 }}>
        {recommendedUser.username}
      </AppText>
      <Button>
        <AppText
          styles={{
            color: colors.primaryColor,
            fontSize: 20,
          }}
        >
          Follow
        </AppText>
      </Button>
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
