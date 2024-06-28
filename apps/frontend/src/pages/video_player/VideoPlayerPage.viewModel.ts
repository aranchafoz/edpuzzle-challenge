import { useParams } from "react-router-dom";
import { getVideoFeedbackCounter, giveVideoFeedback } from "../../api";
import { useEffect, useState } from "react";

export const useVideoPlayerPageViewModel = () => {
  const { videoId } = useParams();

  const [videoFeedbackCounter, setVideoFeedbackCounter] = useState<any>(0);

  const fetchVideoFeedbackCounter = async (videoId: string) => {
    const { counter } = await getVideoFeedbackCounter({ videoId });

    setVideoFeedbackCounter(counter);
  };

  useEffect(() => {
    if (!videoId) return;
    fetchVideoFeedbackCounter(videoId);
  }, [videoId]);

  const handleGiveVideoFeedback = async (isPositive: boolean) => {
    if (!videoId) return;

    await giveVideoFeedback({ videoId, isPositive });

    await fetchVideoFeedbackCounter(videoId);
  };

  return { videoId, handleGiveVideoFeedback, videoFeedbackCounter };
};
