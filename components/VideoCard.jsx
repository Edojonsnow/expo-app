import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const VideoCard = ({ thumbnail, title, video, username, avatar }) => {
  const [play, setplay] = useState(false);
  const videoSource = video;
  const player = useVideoPlayer(videoSource, (player) => {
    // player.loop = true;
    player.pause();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });
  return (
    <View className="flex-col items-center  mb-14 px-4">
      <View className="flex-row items-start gap-3">
        <View className="justify-center items-center flex-row flex-1">
          <View className="border rounded-lg border-secondary-100 w-12 h-12">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1  ml-5">
            <Text
              className="text-sm text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs font-pregular text-gray-100"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View>
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {!isPlaying ? (
        <TouchableOpacity
          className=" w-full h-60  justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        >
          <Image
            source={{
              uri: thumbnail,
            }}
            className="rounded-[35px] w-full h-full justify-center items-center mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <VideoView
          player={player}
          className=" justify-center items-center  "
          style={{
            width: Dimensions.get("window").width * 0.9,
            height: 200,
            borderRadius: 35,
            marginTop: 10,
          }}
          contentFit="cover"
          allowsFullscreen
          allowsPictureInPicture
        />
      )}
    </View>
  );
};

export default VideoCard;
