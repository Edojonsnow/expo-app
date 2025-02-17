import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useVideoPlayer, VideoView } from "expo-video";
import { icons } from "../../constants";
import { useEvent } from "expo";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { createVideoPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useGlobalContext();
  const [form, setform] = useState({
    title: "",
    video: "",
    thumbnail: "",
    prompt: "",
  });

  const videoSource = form.video?.uri;

  const player = useVideoPlayer(videoSource, (player) => {
    // player.loop = true;
    player.pause();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? "images" : "videos",
      aspect: [4, 3],
      quality: 1,
    });
    console.log("result before", result);

    if (!result.canceled) {
      if (selectType === "image") {
        setform({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setform({ ...form, video: result.assets[0] });
      }
    }
    console.log("result after", result);
  };

  const submit = async () => {
    // console.log("Form data before submission:", form);

    if (
      form.prompt === "" ||
      form.title === "" ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setform({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title"
          handleChangeText={(e) => setform({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base mb-3 text-gray-100">Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <VideoView
                player={player}
                className=" justify-center items-center  "
                style={{
                  width: Dimensions.get("window").width * 0.9,
                  height: 256,
                  borderRadius: 35,
                  marginTop: 10,
                }}
                contentFit="cover"
                nativeControls="false"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="justify-center items-center rounded-2xl border border-secondary border-dashed w-14 h-14">
                  <Image source={icons.upload} className="w-1/2 h-1/2" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base mb-3 text-gray-100">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 riunded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="justify-center flex-row items-center rounded-xl border-dashed gap-3">
                  <Image source={icons.upload} className="w-5 h-5" />
                  <Text className="text-sm text-gray-100">Choose a file</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="Enter the prompt you used to generate this video"
          handleChangeText={(e) => setform({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          buttonText="Submit & Publish"
          handlePress={submit}
          containerStyles
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
