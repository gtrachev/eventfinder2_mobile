import { StyleSheet, View, Image, Platform, TextInput } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import * as yup from "yup";
import { EventType, ReviewType } from "../../utils/types/modelTypes";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { createReview, deleteReview } from "../../redux/actions/eventsActions";
import AppText from "../utils/AppText";
import ErrorCard from "../cards/ErrorCard";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import Icon from "react-native-vector-icons/Ionicons";

const DetailsComments: React.FC<{ eventDetails: EventType }> = ({
  eventDetails,
}) => {
  const initialValues = {
    comment: "",
  };
  const validationSchema = yup.object().shape({
    comment: yup.string().required().min(1).max(250),
  });
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const handleCreate = async (commentBody: string) => {
    createReview({ text: commentBody }, eventDetails._id)(dispatch);
  };
  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleCreate(values.comment)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.commentForm}>
            <Image
              style={styles.profileImg}
              source={{ uri: userSlice.currentUser.profileImage.path }}
            />
            <View style={styles.commentInput}>
              <TextInput
                onChangeText={handleChange("comment")}
                onBlur={handleBlur("comment")}
                value={values.comment}
                placeholder={"Leave a comment"}
                multiline={true}
                style={{
                  flexGrow: 1,
                  fontSize: 18,
                  width: 100,
                  fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
                }}
              />
              <IconButton
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Icon
                  name="paper-plane"
                  style={{ fontSize: 25, color: colors.primaryColor }}
                />
              </IconButton>
            </View>
          </View>
        )}
      </Formik>
      <View>
        {eventDetails.reviews && eventDetails.reviews.length ? (
          eventDetails.reviews.map((review: ReviewType) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 15,
              }}
              key={review._id}
            >
              <Image
                source={{ uri: review.author.profileImage.path }}
                style={styles.profileImg}
              />
              <View>
                <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
                  {review.author.username}{" "}
                  <AppText
                    styles={{
                      fontSize: 20,
                      color: colors.grayColor,
                    }}
                  >
                    - {new Date(review.postedDate!).toLocaleDateString()}
                  </AppText>
                </AppText>
                <AppText styles={{ fontSize: 20, maxWidth: 250 }}>
                  {review.text}
                </AppText>
              </View>
              {userSlice.currentUser._id === review.author._id ? (
                <IconButton
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onPress={() => {
                    deleteReview(review._id, eventDetails._id)(dispatch);
                  }}
                >
                  <Icon
                    name="close-circle-outline"
                    style={{
                      color: colors.dangerColor,
                      fontSize: 40,
                    }}
                  />
                </IconButton>
              ) : null}
            </View>
          ))
        ) : (
          <ErrorCard err_message="No comments found." />
        )}
      </View>
    </View>
  );
};

export default DetailsComments;

const styles = StyleSheet.create({
  commentFormContainer: {
    width: "100%",
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
  },
  commentFormTitle: {
    fontSize: 23,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
    color: colors.primaryColor,
    marginBottom: 10,
  },
  commentInput: {
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.primaryColor,
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  commentForm: {
    flexDirection: "row",
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
