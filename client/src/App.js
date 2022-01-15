import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Navbar from "./components/Navbar";
import VideoPlayer from "./components/video/VideoPlayer";
import History from "./pages/History";
import Liked from "./pages/Liked";
import WatchLater from "./pages/WatchLater";
import Playlist from "./pages/Playlist";
import Playlists from "./pages/Playlists";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import Page404 from "./pages/Page404";
import SearchedVideos from "./pages/SearchedVideos";

import "react-toastify/dist/ReactToastify.css";
import BottomNavBar from "./components/BottomNavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="sideBarAndPages">
          <div>
            <Sidebar />
          </div>
          <div className="mainPage">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/video/:videoId" element={<VideoPlayer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/liked" element={<Liked />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/searchedVideos/:searchText"
                element={<SearchedVideos />}
              />

              <Route path="/watchLater" element={<WatchLater />} />

              <Route path="/playlists/:playlistName" element={<Playlist />} />
              <Route path="/playlists" element={<Playlists />} />

              <Route path="/history" element={<History />} />

              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </div>
        <BottomNavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
