import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import { filterInitialValuesType } from "../../utils/types/formikInitStateTypes";
import AppText from "../utils/AppText";
import Icon from "react-native-vector-icons/Ionicons";
import DiscoverSort from "./DiscoverSort";
import DiscoverFilters from "./DiscoverFilters";

const DiscoverFilterContainer: React.FC<{
  filters: filterInitialValuesType | undefined;
  setFilters: React.Dispatch<
    React.SetStateAction<filterInitialValuesType | undefined>
  >;
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
}> = ({ filters, setFilters, sort, setSort }) => {
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  return (
    <View>
      <View style={styles.filterOptionsContainer}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            if (showSort) {
              setShowSort(false);
            } else {
              setShowSort(true);
              setShowFilters(false);
            }
          }}
        >
          <AppText
            styles={{
              color: colors.primaryColor,
              fontSize: 20,
              alignItems: "center",
              marginRight: 10,
            }}
          >
            Sort by
          </AppText>
          <Icon
            name="options"
            style={{ color: colors.primaryColor, fontSize: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            if (showFilters) {
              setShowFilters(false);
            } else {
              setShowFilters(true);
              setShowSort(false);
            }
          }}
        >
          <AppText
            styles={{
              color: colors.primaryColor,
              fontSize: 20,
              alignItems: "center",
              marginRight: 10,
            }}
          >
            Filter
          </AppText>
          <Icon
            name="funnel-outline"
            style={{ color: colors.primaryColor, fontSize: 30 }}
          />
        </TouchableOpacity>
      </View>
      {showSort ? (
        <DiscoverSort sort={sort} setSort={setSort} setShowSort={setShowSort} />
      ) : null}
      {showFilters ? (
        <DiscoverFilters
          filters={filters}
          setFilters={setFilters}
          setShowFilters={setShowFilters}
        />
      ) : null}
    </View>
  );
};

export default DiscoverFilterContainer;

const styles = StyleSheet.create({
  filterOptionsContainer: {
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
