import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} style={{ width: 200, height: 200 }} />
      <Text className="text-2xl text-white mt-6">{title}</Text>
      <Text className="text-base text-gray-100 mt-2">{subtitle}</Text>
      <CustomButton
        buttonText="Create Video"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
