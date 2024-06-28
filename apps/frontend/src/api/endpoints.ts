export default {
  giveVideoFeedback: (videoId: string) => `/api/v1/videos/${videoId}/feedback`,
  getVideoFeedbackCounter: (videoId: string) =>
    `/api/v1/videos/${videoId}/feedback_counter`,
};
