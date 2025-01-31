import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";

import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { user, loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;

  useEffect(() => {}, []);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          className="w-full justify-center items-center min-h-[85vh] px-4"
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
            buttonText="Continue with email"
            containerStyles="bg-secondary-200 px-4 rounded-xl min-h-[62px] justify-center items-center mt-8 w-full"
            textStyles=""
            handlePress={() => {
              router.push("/sign-in");
            }}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
