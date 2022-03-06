import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import type { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { FormikHelpers } from "formik";
import { getChat } from "../../redux/actions/chatsActions";
import { ChatType, MessageType } from "../../utils/types/modelTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { io } from "socket.io-client";
import LoadingContainer from "../../components/utils/LoadingContainer";
import ChatMessage from "../../components/chat/ChatMessage";
import MessageForm from "../../components/chat/MessageForm";
import ChatHeader from "../../components/chat/ChatHeader";

const CurrentChat: React.FC<{
  navigation: MaterialTopTabNavigationProp<
    {
      UserChats: undefined;
      CurrentChat: undefined;
    },
    "UserChats"
  >;
  route: any;
}> = ({ navigation, route }) => {
  const { chatId } = route.params;
  const chatsSlice = useSelector((state: RootState) => state.chats);
  const userSlice = useSelector((state: RootState) => state.users);
  const [newMessages, setNewMessages] = useState<MessageType[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<
    { user_id: string; socketId: string }[]
  >([]);
  const socket = useRef<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    getChat(chatId)(dispatch);
  }, [dispatch, chatId]);

  // useEffect(() => {
  //   if (messageScroll.current) {
  //     messageScroll.current.scrollTop = messageScroll.current.scrollHeight;
  //   }
  // }, [newMessages, chatsSlice.openedChat?.messages]);

  //connect user to socket
  //respond on getMessage
  useEffect(() => {
    socket.current = io("https://eventfinder2-server.herokuapp.com");
    socket.current.on("getMessage", (newMessage: MessageType) => {
      setNewMessages((prevMessages) => {
        return [...prevMessages, newMessage];
      });
    });
    return () => {
      setNewMessages([]);
    };
  }, []);

  //emit joinRoom so that user joins the chat room
  //respond on getOnlineUsers to get online users
  useEffect(() => {
    socket.current.emit("joinRoom", {
      userId: userSlice.currentUser._id,
      chatId,
    });
    setNewMessages([]);
    return () => {
      setOnlineUsers([]);
    };
  }, [userSlice.currentUser._id, chatsSlice.openedChat]);

  useEffect(() => {
    socket.current.on(
      "getOnlineUsers",
      (onlineUsers: { user_id: string; socketId: string }[]) => {
        setOnlineUsers(onlineUsers);
      }
    );
  }, []);

  const handleSendMessage = (
    values: { text: string },
    actions: FormikHelpers<{
      text: string;
    }>
  ) => {
    socket.current.emit("sendMessage", {
      message: values.text,
      chatId: chatId,
      senderId: userSlice.currentUser._id,
    });
    actions.resetForm();
  };
  return (
    <View style={{ height: "100%" }}>
      {!chatsSlice.isLoading ? (
        chatsSlice.openedChat &&
        (userSlice.currentUser.inChats.find(
          (chat: ChatType) => chat._id === chatsSlice.openedChat._id
        ) ? (
          <>
            <ChatHeader chat={chatsSlice.openedChat} navigation={navigation} />
            <ScrollView style={{ flexGrow: 1, padding: 10 }}>
              {[...chatsSlice.openedChat.messages, ...newMessages]
                .sort(
                  (a: MessageType, b: MessageType) =>
                    a.createdAt.valueOf() - b.createdAt.valueOf()
                )
                .map((message: MessageType) => (
                  <ChatMessage
                    isAuthor={message.author._id === userSlice.currentUser._id}
                    message={message}
                    key={message._id}
                  />
                ))}
            </ScrollView>
            <MessageForm handleSendMessage={handleSendMessage} />
          </>
        ) : null)
      ) : (
        <LoadingContainer />
      )}
    </View>
  );
};

export default CurrentChat;

const styles = StyleSheet.create({});
