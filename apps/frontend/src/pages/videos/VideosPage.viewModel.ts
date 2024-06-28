import { useNavigate, useSearchParams } from "react-router-dom";
import { giveVideoFeedback } from "../../api";
import { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosPage, getVideoList } from "../../modules/videos_module";
import { getRequestStatus } from "../../modules/async_metadata_module";

export const useVideosPageViewModel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedVideoId = searchParams.get("videoId");

  const videos = useSelector(getVideoList);

  const dispatch = useDispatch();
  const status = useSelector((state) =>
    getRequestStatus(state, { actionType: fetchVideosPage().type })
  );

  useEffect(() => {
    dispatch(fetchVideosPage({ pageSize: 20 }));
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(videos) && !selectedVideoId) {
      navigate(`?videoId=${videos[0].id}`, { replace: true });
    }
  }, [videos, selectedVideoId, navigate]);

  const handleGiveVideoFeedback = async (isPositive: boolean) => {
    if (!selectedVideoId) return;

    await giveVideoFeedback({ videoId: selectedVideoId, isPositive });

    // TODO: refetch feedback counters
  };

  return { selectedVideoId, handleGiveVideoFeedback, status, videos };
};
