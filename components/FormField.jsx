import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { verifyInstallation } from "nativewind";

const FormField = ({
  otherStyles,
  title,
  inputStyles,
  placeholder,
  handleChangeText,
  value,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  verifyInstallation();

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-white font-pmedium`}>{title}</Text>
      <View
        className={`px-4  w-full  rounded-xl items-center justify-center ${inputStyles}`}
        style={[
          styles.inputContainer,
          isFocused ? styles.focusedInput : styles.normalInput,
          { height: 60 },
        ]}
      >
        <TextInput
          className="text-white text-2xl flex-1 font-psemibold w-full "
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          selectionColor="#FF9001"
          onChangeText={handleChangeText}
          value={value}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
  },
  normalInput: {
    borderColor: "#CDCDE0", // gray-100 from your config
  },
  focusedInput: {
    borderColor: "#FF9001", // secondary-100 from your config
    borderWidth: 2,
  },
});

export default FormField;
