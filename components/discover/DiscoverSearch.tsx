import { Platform, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import colors from "../../styles/colors";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import Button from "../../styles/styledComponents/Buttons/Button";
import AppText from "../utils/AppText";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import Icon from "react-native-vector-icons/Ionicons";

const DiscoverSearch: React.FC<{
  navigation: any;
  setSearchRegex: React.Dispatch<React.SetStateAction<RegExp | null>>;
}> = ({ navigation, setSearchRegex }) => {
  const initialValues = {
    search: "",
  };
  const validationSchema = yup.object().shape({
    search: yup.string().required().min(1).max(250),
  });
  const userSlice = useSelector((state: RootState) => state.users);
  const handleSearch = (values: { search: string }) => {
    const searchRegex = new RegExp(values.search, "gi");
    setSearchRegex(searchRegex);
  };
  return (
    <View style={styles.discoverSearchContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSearch(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.searchInput}>
            <TextInput
              onChangeText={handleChange("search")}
              onChange={() => handleSubmit()}
              onBlur={() => handleBlur("search")}
              value={values.search}
              placeholder={"Search..."}
              multiline={true}
              style={{
                width: 100,
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
        onPress={() =>
          navigation.navigate("AccountsList", {
            accounts: userSlice.recommendedUsers,
            title: "Find users",
          })
        }
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
