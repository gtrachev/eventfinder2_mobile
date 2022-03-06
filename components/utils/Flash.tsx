import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { RootState } from "../../redux/rootReducer";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";

const Flash: React.FC = () => {
  const dispatch = useDispatch();
  const uiSlice = useSelector((state: RootState) => state.ui);
  const closeFlash = () => {
    dispatch({
      type: uiActionTypes.REMOVE_FLASH,
    });
  };

  return uiSlice.flash.message.length ? (
    <View
      style={[
        styles.flashContainer,
        uiSlice.flash.type === "error" ? styles.error : {},
      ]}
    >
      <AppText styles={{ color: colors.whiteColor, fontSize: 20 }}>
        {uiSlice.flash.message}
      </AppText>
      <IconButton onPress={closeFlash}>
        <Icon
          name="close-outline"
          style={{ color: colors.whiteColor, fontSize: 30 }}
        />
      </IconButton>
    </View>
  ) : null;
};

export default Flash;

const styles = StyleSheet.create({
  flashContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(21, 219, 149, .7)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  error: {
    backgroundColor: "rgba(252, 68, 69, .7)",
  },
});
