import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { verifyInstallation } from "nativewind";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  verifyInstallation();

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-9"
          />
          <Text className="text-2xl text-white font-psemibold  mt-8">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            inputStyles="bg-black-200 border mt-1 "
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="default"
            inputStyles="bg-black-200 border mt-1 "
          />
          <CustomButton
            buttonText="Sign In"
            containerStyles="bg-secondary-200 px-4 rounded-xl min-h-[62px] justify-center items-center mt-8 w-full"
            textStyles=""
            handlePress={() => {
              router.push("/sign-in");
            }}
          />
          <View className="flex flex-row justify-center items-center mt-4 gap-2">
            <Text className="text-gray-200 justify-center text-center ">
              Don't have an account
            </Text>
            <Link href="/sign-up" className="text-secondary-200">
              Sign up.
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
