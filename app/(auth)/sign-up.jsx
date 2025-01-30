import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { verifyInstallation } from "nativewind";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Sign up in to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            inputStyles="bg-black-200 border mt-1 "
          />
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
            buttonText="Sign up"
            containerStyles="bg-secondary-200 px-4 rounded-xl min-h-[62px] justify-center items-center mt-8 w-full"
            textStyles=""
            handlePress={() => {
              submit();
            }}
          />
          <View className="flex flex-row justify-center items-center mt-4 gap-2">
            <Text className="text-gray-200 justify-center text-center ">
              Already have an account?
            </Text>
            <Link href="/sign-in" className="text-secondary-200">
              Sign in.
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
