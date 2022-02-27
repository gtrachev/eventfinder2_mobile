import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "../utils/AppText";
import colors from "../../styles/colors";
import ErrorCard from "../cards/ErrorCard";
import EventCard from "../cards/EventCard";
import NoteCard from "../cards/NoteCard";

const AccountPosts: React.FC<{ navigation: any; route: any }> = ({ route }) => {
  const { title, posts } = route.params;
  return (
    <View>
      <AppText
        styles={{
          color: colors.secondaryColor,
          fontSize: 23,
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        {title}
      </AppText>
      {posts.length ? (
        posts.map((post: any) => {
          if (post.price) {
            return <EventCard event={post} key={post._id} />;
          } else {
            return <NoteCard note={post} key={post._id} />;
          }
        })
      ) : (
        <ErrorCard err_message="No posts found." />
      )}
    </View>
  );
};

export default AccountPosts;

const styles = StyleSheet.create({});
