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
      className={`${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } bg-secondary-200 px-4 rounded-xl min-h-[62px] justify-center items-center mt-8 w-full`}
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
