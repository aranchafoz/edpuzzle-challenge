import React from "react";
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player/youtube";
import {
  fetchVideo,
  getVideo,
  trackView,
} from "../../modules/video_player_module";
import { getRequestStatus } from "../../modules/async_metadata_module";
import { Text } from "styleguide";

import "./VideoPlayer.css";

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

function VideoPlayer({ videoId, onChangeQuestionToBeOpened }) {
  const [playing, setPlaying] = React.useState(false);
  const playerRef = React.useRef(null);

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

  const checkQuestionsAtTime = (currentTime) => {
    if (!playerRef.current || !video.questions.length) {
      return;
    }

    const questionToBeOpened = video.questions.find(
      ({ time }) => time === currentTime
    );
    if (!questionToBeOpened) {
      onChangeQuestionToBeOpened("");
      return;
    }
    playerRef.current.seekTo(questionToBeOpened.time);
    setPlaying(false);
    onChangeQuestionToBeOpened(questionToBeOpened.id);
  };

  const handleOnPlay = () => {
    setPlaying(true);
  };

  const handleProgress = (progress) => {
    if (!playing) return;
    const second = Math.ceil(progress.playedSeconds);
    checkQuestionsAtTime(second);
  };

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
      <Text as="h2" display="block" fontSize="title" fontWeight="bold" pb="4">
        {video.title}
      </Text>
      <div className="youtube-video-container">
        <ReactPlayer
          ref={playerRef}
          url={video.src}
          controls
          width="100%"
          height="100%"
          playing={playing}
          onPlay={handleOnPlay}
          onEnded={() => dispatch(trackView({ videoId }))}
          onProgress={handleProgress}
        />
      </div>
    </>
  );
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

export { VideoPlayer };
