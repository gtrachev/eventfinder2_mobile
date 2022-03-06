import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { UserType } from "../../utils/types/modelTypes";
import colors from "../../styles/colors";
import { handleFollow } from "../../redux/actions/userActions";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import * as yup from "yup";
import { Formik } from "formik";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import ErrorCard from "../../components/cards/ErrorCard";
import Button from "../../styles/styledComponents/Buttons/Button";
import Icon from "react-native-vector-icons/Ionicons";
import AppText from "../../components/utils/AppText";

const AccountsList: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const {
    accounts,
    title,
  }: {
    accounts: UserType[];
    title: string;
  } = route.params;
  const [searchRegex, setSearchRegex] = useState<RegExp | null>(null);
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const initialValues = {
    search: "",
  };
  const validationSchema = yup.object().shape({
    search: yup.string().required().min(1).max(250),
  });
  const handleSearch = (values: { search: string }) => {
    const searchRegex = new RegExp(values.search, "gi");
    setSearchRegex(searchRegex);
  };
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.whiteColor,
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-back"
            style={{ fontSize: 25, color: colors.primaryColor }}
          />
        </TouchableOpacity>
        <AppText
          styles={{
            color: colors.primaryColor,
            fontSize: 25,
          }}
        >
          {title}
        </AppText>
      </View>
      {accounts && accounts.length ? (
        <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
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
          {accounts
            .filter((account: UserType) =>
              account.username.match(searchRegex ? searchRegex : "")
            )
            .map((account: UserType) => (
              <View style={styles.accountContainer} key={account._id}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: account.profileImage.path }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 10,
                    }}
                  />
                  <AppText styles={{ fontSize: 23 }}>
                    {account.username}
                  </AppText>
                </View>
                {userSlice.currentUser._id !== account._id ? (
                  userSlice.currentUser.following.find(
                    (followedUser: UserType) => followedUser._id === account._id
                  ) ? (
                    <DangerButton
                      onPress={() => handleFollow(account._id)(dispatch)}
                    >
                      <AppText
                        styles={{
                          color: colors.dangerColor,
                          fontSize: 20,
                        }}
                      >
                        Unfollow
                      </AppText>
                    </DangerButton>
                  ) : (
                    <Button onPress={() => handleFollow(account._id)(dispatch)}>
                      <AppText
                        styles={{
                          color: colors.primaryColor,
                          fontSize: 20,
                        }}
                      >
                        Follow
                      </AppText>
                    </Button>
                  )
                ) : null}
              </View>
            ))}
        </View>
      ) : (
        <ErrorCard err_message="No users found." />
      )}
    </ScrollView>
  );
};

export default AccountsList;

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: colors.whiteColor,
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
    marginBottom: 15,
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.whiteColor,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
