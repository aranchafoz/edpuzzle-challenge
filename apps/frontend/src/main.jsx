import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { startStore } from "./modules/store";
import { StyleguideProvider } from "styleguide";

import { ErrorPage } from "./pages/error/ErrorPage";
import { VideosPage } from "./pages/videos/VideosPage";
import { VideoPlayerPage } from "./pages/video_player/VideoPlayerPage";

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

const { store } = startStore();

const router = createBrowserRouter([
  {
    path: "/",
    element: <VideosPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/videos/:videoId",
    element: <VideoPlayerPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyleguideProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StyleguideProvider>
  </React.StrictMode>
);
