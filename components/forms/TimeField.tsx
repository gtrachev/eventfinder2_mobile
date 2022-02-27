import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";
import AppText from "../utils/AppText";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimeField: React.FC<{
  time: Date;
  setTime: React.Dispatch<React.SetStateAction<Date>>;
  timeTouched: boolean;
  setTimeTouched: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ time, setTime, timeTouched, setTimeTouched }) => {
  const [show, setShow] = useState(false);
  const onChangeTime = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === "ios");
    setTime(currentDate);
    console.log(selectedDate);
    if (!timeTouched) {
      setTimeTouched(true);
    }
  };

  const showMode = (currentMode: string) => {
    setShow(true);
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <View>
      <View style={styles.timePickerContainer}>
        <AppText styles={{ fontSize: 20, color: colors.primaryColor }}>
          Time
        </AppText>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={showTimepicker}
        >
          {!timeTouched ? (
            <AppText styles={{ fontSize: 20, color: colors.grayColor }}>
              Choose starting time
            </AppText>
          ) : (
            <AppText styles={{ fontSize: 20 }}>
              {time.getHours()}:{time.getMinutes()}
            </AppText>
          )}
          <Icon
            style={{ fontSize: 25, color: colors.grayColor }}
            name="time-outline"
          />
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

export default TimeField;

const styles = StyleSheet.create({
  timePickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayColor,
    borderStyle: "solid",
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
});
