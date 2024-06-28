import React from "react";
import { Link } from "react-router-dom";
import { Box } from "styleguide";

import { VideoLikeDislike } from "../../components/video_like_dislike/VideoLikeDislike";
import { VideoPlayer } from "../../components/video_player/VideoPlayer";
import { VideoViews } from "../../components/video_views/VideoViews";
import { VideoQuestions } from "../../components/video_questions/VideoQuestions";
import { useVideoPlayerPageViewModel } from "./VideoPlayerPage.viewModel";

export const VideoPlayerPage = () => {
  const [openedQuestionId, setOpenedQuestionId] = React.useState("");

  const { handleGiveVideoFeedback, videoFeedbackCounter, videoId } =
    useVideoPlayerPageViewModel();

  return (
    <Box
      h="screen"
      w="screen"
      display="flex"
      flexDirection="column"
      overflowY="hidden"
    >
      <Box
        as={Link}
        to={`/?videoId=${videoId}`}
        w="parent"
        pv="2"
        ph="4"
        borderBottomWidth="1"
        borderColor="gunmetal-5"
        borderStyle="solid"
        flexGrow="0"
        flexShrink="0"
      >
        <Box
          as="img"
          h="10"
          src="https://edpuzzle.imgix.net/edpuzzle-logos/horizontal-logo.svg"
        />
      </Box>
      <Box
        p="8"
        flexGrow="1"
        display="flex"
        flexDirection="column lg:row"
        h="parent"
      >
        <Box flexGrow="1">
          <VideoPlayer
            videoId={videoId}
            onChangeQuestionToBeOpened={setOpenedQuestionId}
          />
        </Box>
        <Box flexGrow="1" h="parent" overflowY="scroll" pt="14" ph="0 lg:10">
          <VideoQuestions
            videoId={videoId}
            openedQuestionId={openedQuestionId}
          />
          <p>{`${videoFeedbackCounter} reactions to the video`}</p>
          <VideoLikeDislike onGiveFeedback={handleGiveVideoFeedback} />
          <VideoViews videoId={videoId} debug={false} />
        </Box>
      </Box>
    </Box>
  );
};
