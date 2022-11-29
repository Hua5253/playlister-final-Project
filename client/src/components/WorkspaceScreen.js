import { useContext } from "react";
import SongCard from "./SongCard.js";
import AddIcon from '@mui/icons-material/AddOutlined';
import MUIEditSongModal from "./MUIEditSongModal";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import { GlobalStoreContext } from "../store/index.js";
import { IconButton } from "@mui/material";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
  const { store } = useContext(GlobalStoreContext);

  function handleAddNewSong() {
    store.addNewSong();
}

  let modalJSX = "";
  if (store.isEditSongModalOpen()) {
    modalJSX = <MUIEditSongModal />;
  } else if (store.isRemoveSongModalOpen()) {
    modalJSX = <MUIRemoveSongModal />;
  }

  return (
      <div
        id='playlist-cards'
        style={{ width: "100%" }}
      >
        {store.currentList.songs.map((song, index) => (
          <SongCard
            id={"playlist-song-" + index}
            key={"playlist-song-" + index}
            index={index}
            song={song}
          />
        ))}
        <div style={{position:'relative', left:'45%'}}>
          <IconButton size="large" onClick={handleAddNewSong}>
            <AddIcon />
          </IconButton>
        </div>
        {modalJSX}
      </div>
  );
}

export default WorkspaceScreen;
