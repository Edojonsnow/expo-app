import {
  View,
  Text,
  FlatList,
  Touchable,
  ImageBackground,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.0,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  const videoSource =
    "https://cloud.appwrite.io/v1/storage/buckets/679b4fd200145714aa1a/files/67a89bd200177c40b032/view?project=679b4a2f000800e8c62f&mode=admin";

  const player = useVideoPlayer(videoSource, (player) => {
    // player.loop = true;
    player.pause();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      className="mr-5  "
      duration={500}
    >
      <View className="w-52 h-72 justify-center items-center flex-1 rounded-[35px] ">
        {!isPlaying ? (
          <TouchableOpacity
            className=" justify-center items-center"
            // activeOpacity={0.7}
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
          >
            <ImageBackground
              source={{
                uri: item.thumbnail,
              }}
              className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
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
            className=" justify-center items-center   "
            style={{ width: 200, height: 250, borderRadius: 35 }}
            contentFit="contain"
            allowsFullscreen
            allowsPictureInPicture
          />
        )}
      </View>
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
