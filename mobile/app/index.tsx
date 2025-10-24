import { View, Text } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";
import { useClerk } from "@clerk/clerk-expo";
import { useNavigation } from "expo-router";

const HomeScreen = () => {
  const { signOut } = useClerk();
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        onPressIn={() => {
          signOut();

        }}
      >
        Sign Up
      </Button>
    </View>
  );
};

export default HomeScreen;
