import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../styles/colors";
import AppText from "../utils/AppText";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";

const DateField: React.FC<{
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  dateTouched: boolean;
  setDateTouched: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ date, setDate, dateTouched, setDateTouched }) => {
  const [show, setShow] = useState(false);
  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    if (!dateTouched) {
      setDateTouched(true);
    }
  };

  const showMode = (currentMode: string) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  return (
    <View>
      <View style={styles.datePickerContainer}>
        <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
          Date
        </AppText>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={showDatepicker}
        >
          {!dateTouched ? (
            <AppText styles={{ fontSize: 20, color: colors.grayColor }}>
              Choose date
            </AppText>
          ) : (
            <AppText styles={{ fontSize: 20 }}>
              {new Date(date).toLocaleDateString()}
            </AppText>
          )}
          <Icon
            style={{ fontSize: 25, color: colors.grayColor }}
            name="calendar-outline"
          />
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

export default DateField;

const styles = StyleSheet.create({
  datePickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayColor,
    borderStyle: "solid",
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
});
