import { useEffect } from "react";
import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import videoContext from "../Context/videoContext";

function AddPlaylistModal(props) {
  const {
    makeNewPlaylist,
    userFromDb,
    addVideoToPlaylist,
    change,
    getUser,
    userId,
  } = useContext(videoContext);

  // useEffect(() => {
  //   getUser(userId);
  // }, [change]);

  let playlists = [];
  if (userFromDb?.data.user.playlist !== undefined) {
    playlists = Object.keys(userFromDb?.data.user.playlist);
  }

  const [newPlaylistName, setNewPlaylistName] = useState("");

  const changeHandler = (e) => {
    setNewPlaylistName(e.target.value);
  };

  const createNewPlaylist = async () => {
    if (newPlaylistName !== "") {
      let response = await makeNewPlaylist(newPlaylistName);
      getUser(userId);
      toast.info(response.data?.message);
    }
  };

  function isChecked(playlistName) {
    return !!userFromDb?.data?.user?.playlist[playlistName].find(
      (video) => props.videoId === video._id
    );
  }

  const updateVideoToPlaylist = async (playlistName) => {
    const response = await addVideoToPlaylist(playlistName, props.videoId);
    getUser(userId);
    toast.success(response.data?.message);
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="modalWrapper">
        <Modal.Body>
          <div className="d-flex justify-content-between newPlaylistWrapper">
            <input
              placeholder="Add playlist name"
              type="text"
              onChange={(e) => changeHandler(e)}
            />
            <button onClick={createNewPlaylist}>+</button>
          </div>
          <br />

          {playlists?.map((item) => {
            return (
              <div onChange={() => updateVideoToPlaylist(item)}>
                <input
                  checked={isChecked(item)}
                  //make dynamiccc
                  type="checkbox"
                  name="playlistName"
                  value={item}
                />{" "}
                <label for="playlistName"> {item} </label>
                <br />
              </div>
            );
          })}

          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default AddPlaylistModal;

//yoooo
//all the routes are donw
//backend done
//frontend too, is almost finished
//just map the array populate the checkboxes
//and then your done!
