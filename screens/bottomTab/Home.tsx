import { View, ScrollView, Text } from "react-native";
import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import NoteForm from "../../components/home/NoteForm";
import RecommendedUsers from "../../components/home/recommendedUsers/RecommendedUsers";
import EventCard from "../../components/cards/EventCard";
import NoteCard from "../../components/cards/NoteCard";
import type { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import AppText from "../../components/utils/AppText";
import {
  getRecommendedUsers,
  getUser,
  logoutUser,
} from "../../redux/actions/userActions";
import LoadingContainer from "../../components/utils/LoadingContainer";
import Flash from "../../components/utils/Flash";
import PostList from "../../components/home/PostList";
import { getFollowedPosts } from "../../redux/actions/postsActions";
import { getEvents } from "../../redux/actions/eventsActions";

const Home: React.FC<{
  navigation: MaterialTopTabNavigationProp<
    {
      Home: undefined;
      ChatsTab: undefined;
    },
    "Home"
  >;
}> = ({ navigation }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const postsSlice = useSelector((state: RootState) => state.postsReducer);
  const eventsSlice = useSelector((state: RootState) => state.events);
  const fetchUrl = `http://eventfinder2-server.herokuapp.com/api/events/popular_events`;
  const dispatch = useDispatch();
  useEffect(() => {
    getFollowedPosts(30)(dispatch);
    getUser()(dispatch);
    getRecommendedUsers()(dispatch);
    getEvents(fetchUrl)(dispatch);
  }, [fetchUrl, dispatch]);
  return !userSlice.isLoading ? (
    userSlice.currentUser && userSlice.currentUser._id ? (
      <View style={{ paddingBottom: 20 }}>
        {/* {userSlice.currentUser && userSlice.currentUser.username ? (
          <View>
            <DangerButton onPress={() => logoutUser()(dispatch)}>
              <AppText>Log out</AppText>
            </DangerButton>
            <Text>{userSlice.currentUser.username}</Text>
          </View>
        ) : null} */}
        <Nav navigation={navigation} />
        <ScrollView style={{ marginBottom: 20 }}>
          <Flash />
          <NoteForm />
          <RecommendedUsers recommendedUsers={userSlice.recommendedUsers} />
          {!postsSlice.isLoading ? (
            <PostList
              posts={postsSlice.followedPosts}
              popularEvents={eventsSlice.events}
            />
          ) : (
            <LoadingContainer />
          )}
        </ScrollView>
      </View>
    ) : null
  ) : (
    <LoadingContainer />
  );
};

export default Home;
