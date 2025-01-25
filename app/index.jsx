import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          className="w-full mt-20 items-center h-full px-4"
          style={{ flexDirection: "column" }}
        >
          <Image
            resizeMode="contain"
            source={images.logo}
            className="w-[130px] h-[84px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="max-w--[380px] w-full h-[250px]"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover the Power of AI with
              <Text className="text-secondary-200 "> AORA</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-3 right-32"
              resizeMode="contain"
            />
          </View>
          <Text className="text-md font-pregular text-gray-100 mt-8 text-center">
            Harness the limitless power of Artificial Intelligence
          </Text>
          <CustomButton
            buttonText="Click me"
            containerStyles="bg-secondary-200 px-4 rounded-xl min-h-[62px] justify-center items-center mt-8"
            textStyles="font-bold"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
