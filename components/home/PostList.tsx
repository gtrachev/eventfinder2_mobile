import { StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { EventType, NoteType } from "../../utils/types/modelTypes";
import { RootState } from "../../redux/rootReducer";
import EventCard from "../cards/EventCard";
import NoteCard from "../cards/NoteCard";
import AppText from "../utils/AppText";
import colors from "../../styles/colors";
import LoadingContainer from "../utils/LoadingContainer";
import ErrorCard from "../cards/ErrorCard";

const PostList: React.FC<{
  posts: [NoteType, EventType];
  popularEvents: EventType[];
  navigation: any;
}> = ({ posts, popularEvents, navigation }) => {
  const eventsSlice = useSelector((state: RootState) => state.events);
  return (
    <View>
      {posts.length ? (
        posts.map((post: any) => {
          if (post.price) {
            return (
              <EventCard event={post} navigation={navigation} key={post._id} />
            );
          } else {
            return (
              <NoteCard navigation={navigation} note={post} key={post._id} />
            );
          }
        })
      ) : (
        <ErrorCard err_message="No posts found." />
      )}
      <AppText
        styles={{
          color: colors.secondaryColor,
          fontSize: 23,
          marginLeft: 10,
          marginBottom: 15,
        }}
      >
        Recommended events:
      </AppText>
      {!eventsSlice.isLoading ? (
        popularEvents && popularEvents.length ? (
          popularEvents.map((event: EventType) => (
            <EventCard event={event} navigation={navigation} key={event._id} />
          ))
        ) : (
          <ErrorCard err_message="No recommended events." />
        )
      ) : (
        <LoadingContainer />
      )}
    </View>
  );
};

export default PostList;

const styles = StyleSheet.create({});
