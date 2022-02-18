import React, { useContext } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import EmptyList from "../components/EmptyList";
import VideoGrid from "../components/video/VideoGrid";
import videoContext from "../Context/videoContext";
import { BallTriangle } from "react-loader-spinner";

const SearchedVideos = () => {
  const {
    searchedVideos,
    isShowErrorMsg,
    setSearchedVideos,
    searchVideosFromDb,
    loader,
  } = useContext(videoContext);
  const { pathname } = useLocation();
  const searchedText = pathname.split("/searchedVideos/")[1];

  useEffect(() => {
    const temp = async () => {
      const response = await searchVideosFromDb(`${searchedText}`);
      setSearchedVideos(response.data.filteredVideos);
    };
    temp();
  }, [searchedText]);

  return (
    <>
      {loader ? (
        <div className="loaderWrapper">
          <BallTriangle color="white" />
        </div>
      ) : (
        <>
          {" "}
          <div className="mainPage">
            {isShowErrorMsg ? (
              <h3>
                There is an error, please try after sometime. Invalid/Expired
                JWT token
              </h3>
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
      )}
    </>
  );
};

export default SearchedVideos;
