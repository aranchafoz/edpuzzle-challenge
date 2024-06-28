import React from "react";
import isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchViewsPage,
  fetchVideoViewsCounter,
  trackView,
  getViewsList,
  getViewsCounter,
} from "../../modules/video_player_module";
import { getRequestStatus } from "../../modules/async_metadata_module";
import { Box, Text, Button } from "styleguide";

dayjs.extend(relativeTime);

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

function VideoViews({ videoId, debug = false }) {
  const dispatch = useDispatch();
  const views = useSelector(getViewsList);
  const viewsCounter = useSelector(getViewsCounter);
  const status = useSelector((state) =>
    getRequestStatus(state, { actionType: fetchViewsPage().type })
  );

  React.useEffect(() => {
    dispatch(fetchVideoViewsCounter({ videoId }));
    dispatch(fetchViewsPage({ videoId }));
  }, [dispatch, videoId]);

  if (status.isLoading && isEmpty(views)) {
    return <Text display="block">Loading...</Text>;
  }
  if (status.error && isEmpty(views)) {
    return (
      <Text display="block" color="coral">
        {status.error}
      </Text>
    );
  }
  return (
    <>
      <Text as="h3" fontSize="subtitle" fontWeight="bold">
        Viewed {viewsCounter} times
      </Text>
      <Box pv="6">
        {isEmpty(views) ? (
          <Text display="block" fontWeight="light" fontSize="caption">
            No views
          </Text>
        ) : (
          <Box as="ul">
            {views.map((view) => (
              <Text as="li" key={view.id} display="block" pb="1">
                Viewed {dayjs(view.occurredOn).fromNow()}
              </Text>
            ))}
          </Box>
        )}
        {debug ? (
          <Button
            flavor="primary"
            onClick={() => dispatch(trackView({ videoId }))}
            mt="6"
          >
            Track fake view
          </Button>
        ) : null}
      </Box>
    </>
  );
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

export { VideoViews };
