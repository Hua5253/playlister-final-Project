import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AppBanner from './AppBanner'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    // fool proof design ->
    let isListModalOpen = store.isDeleteListModalOpen();
    let editStatus = false;
    if (store.listNameActive) {
        editStatus = true;
    }
  
    let addListClass = 'playlister-button';
    if (isListModalOpen || editStatus)
        addListClass += "-disabled";

    return (
        <React.Fragment>
            <AppBanner />
            <div id="playlist-selector">
        <div id="list-selector-heading">
        <Fab 
            color="primary" 
            aria-label="add"
            id="add-list-button"
            onClick={handleCreateNewList}
            className={addListClass}
        >
            <AddIcon />
        </Fab>
            <Typography variant="h3">Your Lists</Typography>
        </div>
        <div id="list-selector-list">
            {
                listCard
            }
            <MUIDeleteModal />
        </div>
    </div></React.Fragment>
        )
}

export default HomeScreen;