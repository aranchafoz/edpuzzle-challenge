import { Link } from "react-router-dom";
import { Box, Button, Text } from "styleguide";
import { VideoPlayer } from "../../../components/video_player/VideoPlayer";
import { VideoQuestions } from "../../../components/video_questions/VideoQuestions";
import { useState } from "react";
import { VideoLikeDislike } from "../../../components/video_like_dislike/VideoLikeDislike";

interface SelectedVideoProps {
  videoId: string;
  handleGiveVideoFeedback: (isPositive: boolean) => void;
}

export const SelectedVideo = ({
  videoId,
  handleGiveVideoFeedback,
}: SelectedVideoProps) => {
  const [openedQuestionId, setOpenedQuestionId] = useState("");

  return (
    <>
      <VideoPlayer
        videoId={videoId}
        onChangeQuestionToBeOpened={setOpenedQuestionId}
      />
      <Text as="h3" display="block" pt="6" pb="2">
        Share link
      </Text>
      <Box display="flex" flexDirection="row" pb="6">
        <Box
          as="input"
          pv="2"
          ph="4"
          me="4"
          minW="[500px]"
          borderWidth="1"
          borderColor="gunmetal-3"
          borderStyle="solid"
          borderRadius="2"
          readOnly
          value={`${window.location.origin}/videos/${videoId}`}
        ></Box>
        <Button as={Link} flavor="banana" to={`/videos/${videoId}`}>
          Go
        </Button>
      </Box>
      <VideoLikeDislike onGiveFeedback={handleGiveVideoFeedback} />
      <VideoQuestions videoId={videoId} openedQuestionId={openedQuestionId} />
    </>
  );
};
