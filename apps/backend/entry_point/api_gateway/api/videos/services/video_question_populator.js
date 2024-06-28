/* ====================================================== */
/*                      Application                       */
/* ====================================================== */

const { GetQuestionsByIdsQuery } = require("question");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

async function populateQuestionsForVideo(video, { queryBus }) {
  const videoQuestionsById = video.questions.reduce(
    (accumulator, videoQuestion) => {
      accumulator[videoQuestion.questionId] = { time: videoQuestion.time };
      return accumulator;
    },
    {}
  );

  const { data: questions, error: questionsError } = await queryBus.handle(
    GetQuestionsByIdsQuery.create({ ids: Object.keys(videoQuestionsById) })
  );

  if (questionsError) return { error: questionsError };

  const populatedQuestions = questions.map((question) => {
    return { ...question, ...videoQuestionsById[question.id] };
  });

  return { data: { ...video, questions: populatedQuestions } };
}

async function populateQuestionsForVideos(videos, { queryBus }) {
  const results = await Promise.all(
    videos.map((video) => populateQuestionsForVideo(video, { queryBus }))
  );

  const populatedVideos = results.reduce((accumulator, { data, error }) => {
    if (data) accumulator.push(data);
    return accumulator;
  }, []);

  return populatedVideos;
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { populateQuestionsForVideo, populateQuestionsForVideos };
