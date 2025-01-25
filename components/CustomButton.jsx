import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  buttonText,
  containerStyles,
  textStyles,
  isLoading,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      className={`${containerStyles}`}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Text className={`text-3xl text-white ${textStyles}`}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
