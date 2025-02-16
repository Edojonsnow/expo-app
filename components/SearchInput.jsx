import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { verifyInstallation } from "nativewind";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(initialQuery || "");
  const pathname = usePathname();
  return (
    <View
      className={`flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border ${
        isFocused ? "border-secondary-100" : "border-white"
      } `}
    >
      <TextInput
        className="text-base text-white flex-1 font-pregular"
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        selectionColor="#FF9001"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={query}
      />
      <TouchableOpacity
        className="p-6"
        onPress={() => {
          if (!query) {
            return Alert.alert("Please input something");
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
