import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import AppText from "../../components/utils/AppText";
import Button from "../../styles/styledComponents/Buttons/Button";

const UserTiers: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: colors.whiteColor,
        height: "100%",
        padding: 10,
      }}
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <AppText
        styles={{ fontSize: 30, color: colors.primaryColor, marginBottom: 10 }}
      >
        Account Tiers
      </AppText>
      <View style={styles.tierContainer}>
        <View
          style={[
            styles.tierHeader,
            { backgroundColor: colors.successColor, marginBottom: 5 },
          ]}
        >
          <AppText styles={{ color: colors.whiteColor, fontSize: 25 }}>
            Free
          </AppText>
          <AppText styles={{ color: colors.whiteColor, fontSize: 25 }}>
            0$
          </AppText>
        </View>
        <View style={{ padding: 10, width: "100%" }}>
          <AppText styles={styles.tierText}>
            Browse and discover events.
          </AppText>
          <AppText styles={styles.tierText}>
            Post notes visible and accessible to all users.
          </AppText>
          <AppText styles={styles.tierText}>Attend events.</AppText>
          <AppText
            styles={{
              ...styles.tierText,
              color: colors.dangerColor,
            }}
          >
            User not able to post and create events.
          </AppText>
          <Button
            style={{ alignItems: "center", marginBottom: 5 }}
            onPress={() =>
              navigation.navigate("Register", { userTier: "free" })
            }
          >
            <AppText
              styles={{
                fontSize: 23,
                color: colors.primaryColor,
                paddingVertical: 5,
              }}
            >
              Choose
            </AppText>
          </Button>
        </View>
      </View>
      <View style={styles.tierContainer}>
        <View
          style={[
            styles.tierHeader,
            { backgroundColor: colors.secondaryColor, marginBottom: 5 },
          ]}
        >
          <AppText styles={{ color: colors.whiteColor, fontSize: 25 }}>
            Standard
          </AppText>
          <AppText styles={{ color: colors.whiteColor, fontSize: 25 }}>
            20$
          </AppText>
        </View>
        <View style={{ padding: 10, width: "100%" }}>
          <AppText styles={styles.tierText}>
            Browse and discover events.
          </AppText>
          <AppText styles={styles.tierText}>
            Post notes visible and accessible to all users.
          </AppText>
          <AppText styles={styles.tierText}>Attend events.</AppText>
          <AppText styles={styles.tierText}>
            User able to post one event every month.
          </AppText>
          <Button
            style={{ alignItems: "center", marginBottom: 5 }}
            onPress={() =>
              navigation.navigate("Register", { userTier: "standard" })
            }
          >
            <AppText
              styles={{
                fontSize: 23,
                color: colors.primaryColor,
                paddingVertical: 5,
              }}
            >
              Choose
            </AppText>
          </Button>
        </View>
      </View>
      <View style={styles.tierContainer}>
        <View
          style={[
            styles.tierHeader,
            { backgroundColor: colors.primaryColor, marginBottom: 5 },
          ]}
        >
          <AppText styles={{ color: colors.whiteColor, fontSize: 25 }}>
            Creator
          </AppText>
          <AppText styles={{ color: colors.whiteColor, fontSize: 25 }}>
            50$
          </AppText>
        </View>
        <View style={{ padding: 10, width: "100%" }}>
          <AppText styles={styles.tierText}>
            Browse and discover events.
          </AppText>
          <AppText styles={styles.tierText}>
            Post notes visible and accessible to all users.
          </AppText>
          <AppText styles={styles.tierText}>Attend events.</AppText>
          <AppText styles={styles.tierText}>
            User able to post one event every week.
          </AppText>
          <Button
            style={{ alignItems: "center", marginBottom: 5 }}
            onPress={() =>
              navigation.navigate("Register", { userTier: "creator" })
            }
          >
            <AppText
              styles={{
                fontSize: 23,
                color: colors.primaryColor,
                paddingVertical: 5,
              }}
            >
              Choose
            </AppText>
          </Button>
        </View>
      </View>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <AppText
          styles={{
            fontSize: 20,
            color: colors.secondaryColor,
            paddingVertical: 5,
          }}
        >
          Already have an account?
        </AppText>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <AppText
            styles={{
              fontSize: 20,
              color: colors.primaryColor,
              paddingVertical: 5,
            }}
          >
            Log in now!
          </AppText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserTiers;

const styles = StyleSheet.create({
  tierContainer: {
    width: "100%",
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: colors.secondaryColor,
    borderStyle: "solid",
  },
  tierHeader: {
    alignItems: "center",
    padding: 10,
  },
  tierText: {
    padding: 10,
    backgroundColor: colors.secondaryColor,
    color: colors.whiteColor,
    marginBottom: 15,
    fontSize: 20,
    borderRadius: 10,
  },
});
