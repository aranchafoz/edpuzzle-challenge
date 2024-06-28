import endpoints from "../endpoints";

interface GiveVideoFeedbackParams {
  videoId: string;
  isPositive: boolean;
}

export const giveVideoFeedback = ({
  videoId,
  isPositive,
}: GiveVideoFeedbackParams) => {
  const body = { isPositive };

  return fetch(endpoints.giveVideoFeedback(videoId), {
    method: "POST",
    body: JSON.stringify(body),
  });
};
