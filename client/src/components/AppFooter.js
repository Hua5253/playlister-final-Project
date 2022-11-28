import { useContext } from "react";
import { GlobalStoreContext } from "../store/index";
import Statusbar from './Statusbar';
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

export default function AppFooter() {
  const { store } = useContext(GlobalStoreContext);

  function handleCreateNewList() {
    store.createNewList();
  }

  if (!store.currentList)
    return (
      <div id='playlister-footer'>
    
          <AddIcon fontSize='large' onClick={handleCreateNewList}/>
      
        <Typography variant='h4'>Your Lists</Typography>
      </div>
    );

    else return <Statusbar />
}
