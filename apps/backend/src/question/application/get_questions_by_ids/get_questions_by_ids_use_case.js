/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

/* ====================================================== */
/*                       Command                          */
/* ====================================================== */

async function getQuestionsByIds({ ids }, { questionRepository }) {
  const questions = await questionRepository.findByIds(ids);
  return questions;
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { getQuestionsByIds };
