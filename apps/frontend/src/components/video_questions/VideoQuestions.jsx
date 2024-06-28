import React from "react";
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideo, getVideo } from "../../modules/video_player_module";
import { getRequestStatus } from "../../modules/async_metadata_module";
import { Box, Text } from "styleguide";

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

function VideoQuestions({ videoId, openedQuestionId }) {
  const dispatch = useDispatch();
  const video = useSelector(getVideo);
  const status = useSelector((state) =>
    getRequestStatus(state, { actionType: fetchVideo().type })
  );

  React.useEffect(() => {
    if (isEmpty(video) || video.id !== videoId) {
      dispatch(fetchVideo({ id: videoId }));
    }
  }, [dispatch, videoId, video]);

  if (status.isLoading && isEmpty(video)) {
    return <Text display="block">Loading...</Text>;
  }
  if (status.error && isEmpty(video)) {
    return (
      <Text display="block" color="coral">
        {status.error}
      </Text>
    );
  }
  if (isEmpty(video)) {
    return null;
  }
  return (
    <>
      <Text as="h3" fontSize="subtitle" fontWeight="bold">
        Questions in the video
      </Text>
      {isEmpty(video.questions) ? (
        <Text display="block" fontWeight="light" fontSize="caption" pv="6">
          No questions
        </Text>
      ) : (
        <Box as="ul" pv="6">
          {video.questions.map((question) => (
            <Box
              key={question.id}
              as="li"
              display="flex"
              flexDirection="row"
              mb="2"
              ph="4"
              pv="2"
              borderWidth="1"
              borderColor={
                openedQuestionId === question.id ? "pool" : "gunmetal-4"
              }
              bg={openedQuestionId === question.id ? "pool" : "white"}
              borderStyle="solid"
            >
              <Text
                display="block"
                fontWeight="light"
                flexShrink="0"
                flexGrow="1"
                minW="16"
                pe="4"
                color={openedQuestionId === question.id ? "bananas" : "pool"}
              >
                {new Date(question.time * 1000).toISOString().substring(11, 16)}
              </Text>
              <Text
                display="block"
                flexGrow="1"
                color={openedQuestionId === question.id ? "white" : "mertens"}
              >
                {question.text}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

export { VideoQuestions };
