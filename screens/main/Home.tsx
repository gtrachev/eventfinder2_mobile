import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import Nav from "../../components/Nav";
import NoteForm from "../../components/home/NoteForm";
import RecommendedUsers from "../../components/home/recommendedUsers/RecommendedUsers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { getRecommendedUsers, getUser } from "../../redux/actions/userActions";
import LoadingContainer from "../../components/utils/LoadingContainer";
import Flash from "../../components/utils/Flash";
import PostList from "../../components/home/PostList";
import { getFollowedPosts } from "../../redux/actions/postsActions";
import { getEvents } from "../../redux/actions/eventsActions";

const Home: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const postsSlice = useSelector((state: RootState) => state.postsReducer);
  const eventsSlice = useSelector((state: RootState) => state.events);
  const fetchUrl = `http://eventfinder2-server.herokuapp.com/api/events/popular_events`;
  const dispatch = useDispatch();
  const homeScrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    getFollowedPosts(30)(dispatch);
    getUser()(dispatch);
    getRecommendedUsers()(dispatch);
    getEvents(fetchUrl)(dispatch);
  }, [fetchUrl, dispatch]);
  return userSlice.currentUser && userSlice.currentUser._id ? (
    <View style={{ paddingBottom: 20 }}>
      <Nav navigation={navigation} />
      <ScrollView style={{ marginBottom: 20 }} ref={homeScrollRef}>
        <Flash />
        <NoteForm navigation={navigation} />
        <RecommendedUsers
          navigation={navigation}
          recommendedUsers={userSlice.recommendedUsers}
        />
        {!postsSlice.isLoading ? (
          <PostList
            posts={postsSlice.followedPosts}
            popularEvents={eventsSlice.events}
            navigation={navigation}
          />
        ) : (
          <LoadingContainer />
        )}
      </ScrollView>
    </View>
  ) : null;
};

export default Home;
