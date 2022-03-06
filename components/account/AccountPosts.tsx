import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import ErrorCard from "../cards/ErrorCard";
import EventCard from "../cards/EventCard";
import NoteCard from "../cards/NoteCard";

const AccountPosts: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { posts } = route.params;
  return (
    <View>
      {posts.length ? (
        <FlatList
          data={posts}
          renderItem={({ item }: any) => {
            if (item.name) {
              return <EventCard event={item} navigation={navigation} />;
            } else {
              return <NoteCard note={item} navigation={navigation} />;
            }
          }}
          keyExtractor={(item, index) => item._id}
        />
      ) : (
        <ErrorCard err_message="No posts found." />
      )}
    </View>
  );
};

export default AccountPosts;

const styles = StyleSheet.create({});
