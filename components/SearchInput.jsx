import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { verifyInstallation } from "nativewind";
import { icons } from "../constants";

const SearchInput = ({
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
    <View
      className={`flex flex-row items-center space-x-4 px-4 w-full justify-between   rounded-xl h-16 ${inputStyles}`}
      style={[
        styles.inputContainer,
        isFocused ? styles.focusedInput : styles.normalInput,
        { height: 60 },
      ]}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        placeholder="Search for anything"
        placeholderTextColor="#7b7b8b"
        selectionColor="#FF9001"
        onChangeText={handleChangeText}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <TouchableOpacity className="p-6">
        <Image
          source={icons.search}
          className="w-9 h-9s"
          resizeMode="contain"
        />
      </TouchableOpacity>
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

export default SearchInput;
