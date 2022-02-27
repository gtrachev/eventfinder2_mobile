import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import * as yup from "yup";
import Button from "../../styles/styledComponents/Buttons/Button";
import AppText from "../utils/AppText";

const DiscoverSearch = () => {
  const initialValues = {
    search: "",
  };
  const validationSchema = yup.object().shape({
    search: yup.string().required().min(1).max(250),
  });
  return (
    <View style={styles.discoverSearchContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.searchInput}>
            <TextInput
              onChangeText={handleChange("search")}
              onBlur={() => handleBlur("search")}
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
      <Button
        style={{
          marginLeft: 10,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <AppText
          styles={{
            fontSize: 20,
            color: colors.primaryColor,
            marginHorizontal: 5,
          }}
        >
          Users
        </AppText>
      </Button>
    </View>
  );
};

export default DiscoverSearch;

const styles = StyleSheet.create({
  discoverSearchContainer: {
    width: "100%",
    padding: 10,
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
