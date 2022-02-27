import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import * as yup from "yup";
import Button from "../../styles/styledComponents/Buttons/Button";
import AppText from "../utils/AppText";

const ChatsSearch = () => {
  const initialValues = {
    search: "",
  };
  const validationSchema = yup.object().shape({
    search: yup.string().required().min(1).max(250),
  });
  return (
    <View style={styles.chatsSearchContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.searchInput}>
            <TextInput
              onChangeText={handleChange("search")}
              onBlur={handleBlur("search")}
              value={values.search}
              placeholder={"Search..."}
              style={{
                flexGrow: 1,
                fontSize: 18,
                fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
              }}
            />
            <IconButton>
              <Icon
                name="search"
                style={{ fontSize: 25, color: colors.primaryColor }}
              />
            </IconButton>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChatsSearch;

const styles = StyleSheet.create({
  chatsSearchContainer: {
    width: "100%",
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.whiteColor,
  },
  searchInput: {
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
    height: 50,
  },
});
