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
      className={`${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`text-lg font-psemibold text-primary  ${textStyles}`}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
