import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const videoSource =
  "https://cloud.appwrite.io/v1/storage/buckets/679b4fd200145714aa1a/files/67a89bd200177c40b032/view?project=679b4a2f000800e8c62f&mode=admin";

const Bookmark = () => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.pause();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View className="justify-center items-center flex-1  rounded-[35px] ">
      <VideoView
        style={{ width: 200, height: 250, borderRadius: 35 }}
        player={player}
        contentFit="cover"
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {},
  controlsContainer: {
    padding: 10,
  },
});

export default Bookmark;
