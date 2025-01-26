import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const FormField = ({
  title,
  otherStyles,
  handleChangeText,
  value,
  placeholder,
  inputStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-base text-white font-pmedium `}>{title}</Text>
      <View
        className={` h-16 bg-black-100 mt-2 w-full rounded-xl items-center justify-center${inputStyles}`}
      >
        <TextInput
          className="text-white flex-1 font-psemibold"
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          value={value}
          //   secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
