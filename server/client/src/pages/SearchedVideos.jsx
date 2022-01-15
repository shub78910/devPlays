import React, { useContext } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import EmptyList from "../components/EmptyList";
import VideoGrid from "../components/video/VideoGrid";
import videoContext from "../Context/videoContext";

const SearchedVideos = () => {
  const {
    searchedVideos,
    isShowErrorMsg,
    setSearchedVideos,
    searchVideosFromDb,
  } = useContext(videoContext);
  const { pathname } = useLocation();
  const searchedText = pathname.split("/searchedVideos/")[1];

  console.log(searchedText, "searchedText");
  useEffect(async () => {
    const response = await searchVideosFromDb(`${searchedText}`);
    setSearchedVideos(response.data.filteredVideos);
  }, [searchedText]);

  return (
    <>
      <div className="mainPage">
        {isShowErrorMsg ? (
          <h1>There is an error, please try after sometime.</h1>
        ) : (
          <>
            {searchedVideos?.length === 0 ? (
              <EmptyList
                message={"There are no videos matching the search text."}
              />
            ) : (
              <div className="videoListWrapper">
                {searchedVideos?.map((video) => {
                  return (
                    <div key={video._id}>
                      <VideoGrid video={video} />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchedVideos;
