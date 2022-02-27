import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import colors from "../../../styles/colors";
import AppText from "../../utils/AppText";
import RecommendedUserCard from "./RecommendedUserCard";
import { UserType } from "../../../utils/types/modelTypes";

const RecommendedUsers: React.FC<{ recommendedUsers: UserType[] }> = ({
  recommendedUsers,
}) => {
  const renderItem = ({ item }: any) => (
    <RecommendedUserCard key={item._id} recommendedUser={item} />
  );

  return (
    <View style={styles.recommendedUsersContainer}>
      <AppText
        styles={{ color: colors.secondaryColor, fontSize: 23, marginLeft: 10 }}
      >
        People you may know
      </AppText>
      {recommendedUsers && recommendedUsers.length ? (
        <FlatList
          data={recommendedUsers}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 15, marginHorizontal: 10 }}
        />
      ) : null}
    </View>
  );
};

export default RecommendedUsers;

const styles = StyleSheet.create({
  recommendedUsersContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 15,
  },
});
