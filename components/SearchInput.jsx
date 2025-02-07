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
        className="text-base text-white flex-1 font-pregular"
        placeholder="Search for anything"
        placeholderTextColor="#7b7b8b"
        selectionColor="#FF9001"
        onChangeText={handleChangeText}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ textAlignVertical: "center" }}
        {...props}
      />
      <TouchableOpacity className="p-6">
        <Image source={icons.search} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
  },
  normalInput: {
    borderColor: "#CDCDE0",
  },
  focusedInput: {
    borderColor: "#FF9001",
    borderWidth: 2,
  },
});

export default SearchInput;
