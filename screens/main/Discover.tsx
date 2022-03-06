import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../styles/colors";
import AppText from "../../components/utils/AppText";
import { filterInitialValuesType } from "../../utils/types/formikInitStateTypes";
import { getEvents } from "../../redux/actions/eventsActions";
import { EventType } from "../../utils/types/modelTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import DiscoverEvents from "../../components/discover/DiscoverEvents";
import DiscoverFilterContainer from "../../components/discover/DiscoverFilterContainer";
import DiscoverSearch from "../../components/discover/DiscoverSearch";

const Discover: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [sort, setSort] = useState({ sortBy: "attenders", sort: "-1" });
  const [filters, setFilters] = useState<undefined | filterInitialValuesType>(
    undefined
  );
  const [type, setType] = useState("popular_events");
  const dispatch = useDispatch();
  const eventsSlice = useSelector((state: RootState) => state.events);
  const [searchRegex, setSearchRegex] = useState<RegExp | null>(null);
  useEffect(() => {
    console.log(filters);
    const fetchUrl = filters
      ? `https://eventfinder2-server.herokuapp.com/api/events?price=${filters.price}&ageGroup=${filters.ageGroup}&country=${filters.country}&city=${filters.city}`
      : `https://eventfinder2-server.herokuapp.com/api/events/${type}`;
    getEvents(fetchUrl)(dispatch);
  }, [dispatch, filters, type]);

  const sortEvents = (a: EventType, b: EventType) => {
    if (sort.sortBy === "date" && sort.sort === "-1") {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    } else if (sort.sortBy === "price") {
      return sort.sort === "1" ? a.price - b.price : b.price - a.price;
    } else if (sort.sortBy === "attenders") {
      return sort.sort === "1"
        ? a.attenders.length - b.attenders.length
        : b.attenders.length - a.attenders.length;
    }
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  };
  const sortedEvents = eventsSlice.events.sort((a: EventType, b: EventType) =>
    sortEvents(a, b)
  );

  return (
    <ScrollView style={{ height: "100%" }}>
      <DiscoverSearch navigation={navigation} setSearchRegex={setSearchRegex} />
      <DiscoverFilterContainer
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.whiteColor,
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            flexGrow: 1,
            paddingBottom: 5,
            alignItems: "center",
            borderBottomColor: colors.secondaryColor,
            borderBottomWidth: 1,
          }}
          onPress={() => setType("popular_events")}
        >
          <AppText styles={{ fontSize: 20 }}>Popular</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexGrow: 1,
            paddingBottom: 5,
            alignItems: "center",
            borderBottomColor: colors.secondaryColor,
            borderBottomWidth: 1,
            marginHorizontal: 10,
          }}
          onPress={() => setType("close_events")}
        >
          <AppText styles={{ fontSize: 20 }}>Around you</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexGrow: 1,
            paddingBottom: 5,
            alignItems: "center",
            borderBottomColor: colors.secondaryColor,
            borderBottomWidth: 1,
          }}
          onPress={() => setType("interest_events")}
        >
          <AppText styles={{ fontSize: 20 }}>Interest</AppText>
        </TouchableOpacity>
      </View>
      <DiscoverEvents
        searchRegex={searchRegex}
        events={sortedEvents}
        navigation={navigation}
      />
    </ScrollView>
  );
};

export default Discover;

const styles = StyleSheet.create({});
