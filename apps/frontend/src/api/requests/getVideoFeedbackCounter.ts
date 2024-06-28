import endpoints from "../endpoints";

interface GetVideoFeedbackCounterParams {
  videoId: string;
}

export const getVideoFeedbackCounter = async ({
  videoId,
}: GetVideoFeedbackCounterParams) => {
  let counter = 0;
  console.log("YEYYYE");
  try {
    const response = await fetch(endpoints.getVideoFeedbackCounter(videoId), {
      method: "GET",
    });
    const jsonResponse = await response.json();
    console.log({ data: jsonResponse.data });
    counter = jsonResponse.data.counter;
  } catch (err) {
    console.log({ err });
  }
  console.log("AYYY");
  return { counter };
};
