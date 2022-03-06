import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../styles/colors";
import { UserType } from "../../../utils/types/modelTypes";
import AppText from "../../utils/AppText";
import RecommendedUserCard from "./RecommendedUserCard";

const RecommendedUsers: React.FC<{
  navigation: any;
  recommendedUsers: UserType[];
}> = ({ recommendedUsers, navigation }) => {
  const renderItem = ({ item }: any) => (
    <RecommendedUserCard recommendedUser={item} navigation={navigation} />
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
          keyExtractor={(item, index) => item._id}
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
