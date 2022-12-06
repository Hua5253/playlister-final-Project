import React, { useContext } from "react";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import { GlobalStoreContext } from "../store";
import PersonIcon from '@mui/icons-material/PersonOutline';
import PeopleIcon from '@mui/icons-material/Groups';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    
    function directToHome() {
        store.setScreen("home");
        history.push('/');
    }

    function directToAllList() {
        store.setScreen("allList");
        history.push('/allList/');
    }

    return (
        <div id='navbar'>
            <IconButton onClick={directToHome}>
                <HomeIcon fontSize='large'/>
            </IconButton >
            <IconButton onClick={directToAllList}>
                <PeopleIcon fontSize='large'/>
            </IconButton>
            <IconButton>
                <PersonIcon fontSize='large'/>
            </IconButton>
        </div>
    );
};

export default Navbar;
