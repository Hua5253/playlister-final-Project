import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import AppBanner from "./AppBanner";
import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import AppFooter from "./AppFooter";
import Navbar from "./Navbar";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let listCard = "";
    if (store) {
        listCard = (
            <div
                style={{
                    width: "100%",
                    borderRadius: "20px",
                    
                }}
            >
                {store.idNamePairs.map(pair => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))}
            </div>
        );
    }

    // fool proof design ->
    let isListModalOpen = store.isDeleteListModalOpen();
    let editStatus = false;
    if (store.listNameActive) {
        editStatus = true;
    }

    let addListClass = "playlister-button";
    if (isListModalOpen || editStatus) addListClass += "-disabled";

    return (
        <React.Fragment>
            <AppBanner />
            <Navbar />
            <div id='container'>
                <div id='container-left-side'>
                    {listCard}
                    <MUIDeleteModal />
                </div>
                <div id='container-right-side'>
                    <p style={{fontSize: '50px'}}>W T F</p>
                </div>
            </div>
            <AppFooter />
        </React.Fragment>
    );
};

export default HomeScreen;
