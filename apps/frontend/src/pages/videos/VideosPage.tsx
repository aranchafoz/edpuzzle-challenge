import isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";
import { Box, Text } from "styleguide";

import { SelectedVideo } from "./SelectedVideo";
import { useVideosPageViewModel } from "./VideosPage.viewModel";

export const VideosPage = () => {
  const { handleGiveVideoFeedback, selectedVideoId, status, videos } =
    useVideosPageViewModel();

  if (status.isLoading && isEmpty(videos)) {
    return <Text display="block">Loading...</Text>;
  }
  if (status.error && isEmpty(videos)) {
    return (
      <Text display="block" color="coral">
        {status.error}
      </Text>
    );
  }
  return (
    <Box
      h="screen"
      w="screen"
      display="flex"
      flexDirection="column"
      overflowY="hidden"
    >
      <Box
        as={Link}
        to={selectedVideoId ? `/?videoId=${selectedVideoId}` : "/"}
        w="parent"
        pv="2"
        ph="4"
        borderBottomWidth="1"
        borderColor="gunmetal-5"
        borderStyle="solid"
        flexGrow="0"
        flexShrink="0"
      >
        <Box
          as="img"
          h="10"
          src="https://edpuzzle.imgix.net/edpuzzle-logos/horizontal-logo.svg"
        />
      </Box>
      <Box p="4" flexGrow="1" display="flex" flexDirection="row" h="parent">
        <Box display="flex" flexDirection="column" overflowY="auto">
          {videos.map((video: any) => (
            <Box
              key={video.id}
              as={Link}
              to={`?videoId=${video.id}`}
              borderWidth="1"
              borderColor={
                video.id === selectedVideoId ? "bananas" : "gunmetal-5"
              }
              borderStyle="solid"
              mb="4"
              p="2"
              display="flex"
              flexDirection="row"
              bg="white hover:gunmetal-6"
            >
              <Box
                as="img"
                src={video.thumbnailUrl}
                alt={video.title}
                w="[200px]"
              />
              <Box ps="6">
                <Text as="h3" display="block" lines={2} pb="4">
                  {video.title}
                </Text>
                <Text display="block" fontSize="caption" color="gunmetal-2">
                  {video.author}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
        <Box ph="6" flexGrow="1">
          {selectedVideoId && (
            <SelectedVideo
              videoId={selectedVideoId}
              handleGiveVideoFeedback={handleGiveVideoFeedback}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
