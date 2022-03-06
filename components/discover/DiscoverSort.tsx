import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import AppText from "../utils/AppText";

const DiscoverSort: React.FC<{
  sort: {
    sortBy: string;
    sort: string;
  };
  setSort: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      sort: string;
    }>
  >;
  setShowSort: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ sort, setSort, setShowSort }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.whiteColor,
        padding: 10,
        justifyContent: "space-between",
      }}
    >
      <View style={{ alignItems: "center", flexGrow: 1 }}>
        <AppText
          styles={{
            color: colors.primaryColor,
            fontSize: 20,
          }}
        >
          Date
        </AppText>
        <TouchableOpacity
          onPress={() => {
            setSort({ sortBy: "date", sort: "-1" });
            setShowSort(false);
          }}
        >
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 18,
              marginTop: 5,
            }}
          >
            Ascending
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSort({ sortBy: "date", sort: "1" });
            setShowSort(false);
          }}
        >
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 18,
              marginTop: 5,
            }}
          >
            Descending
          </AppText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.grayColor,
          borderStyle: "solid",
          flexGrow: 1,
        }}
      >
        <AppText
          styles={{
            color: colors.primaryColor,
            fontSize: 20,
          }}
        >
          Price
        </AppText>
        <TouchableOpacity
          onPress={() => {
            setSort({ sortBy: "price", sort: "1" });
            setShowSort(false);
          }}
        >
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 18,
              marginTop: 5,
            }}
          >
            Ascending
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSort({ sortBy: "price", sort: "-1" });
            setShowSort(false);
          }}
        >
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 18,
              marginTop: 5,
            }}
          >
            Descending
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", flexGrow: 1 }}>
        <AppText
          styles={{
            color: colors.primaryColor,
            fontSize: 20,
          }}
        >
          Popularity
        </AppText>
        <TouchableOpacity
          onPress={() => {
            setSort({ sortBy: "attenders", sort: "1" });
            setShowSort(false);
          }}
        >
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 18,
              marginTop: 5,
            }}
          >
            Ascending
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSort({ sortBy: "attenders", sort: "-1" });
            setShowSort(false);
          }}
        >
          <AppText
            styles={{
              color: colors.secondaryColor,
              fontSize: 18,
              marginTop: 5,
            }}
          >
            Descending
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiscoverSort;

const styles = StyleSheet.create({});
