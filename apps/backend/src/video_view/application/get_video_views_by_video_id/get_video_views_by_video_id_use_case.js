/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

/* ====================================================== */
/*                       Command                          */
/* ====================================================== */

async function getVideoViewsByVideoIdUseCase(
  { videoId, pageSize, pageToken },
  { videoViewRepository }
) {
  const { results, cursor } = await videoViewRepository.findByVideoId(videoId, {
    cursor: pageToken,
    limit: pageSize,
    sortBy: "createdAt",
    order: "desc",
  });
  return {
    nextPageToken: cursor.toValue(),
    resultsPerPage: pageSize.toValue(),
    videoViews: results,
  };
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { getVideoViewsByVideoIdUseCase };
