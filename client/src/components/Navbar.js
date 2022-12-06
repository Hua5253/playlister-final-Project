import React, { useContext, useState } from "react";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import { GlobalStoreContext } from "../store";
import PersonIcon from '@mui/icons-material/PersonOutline';
import PeopleIcon from '@mui/icons-material/Groups';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");
    const history = useHistory();

    function directToHome() {
        store.setScreen("home");
        history.push('/');
    }

    function directToAllList() {
        store.setScreen("allList");
        history.push('/allList/');
    }

    function directToUser() {
        store.setScreen("user");
        history.push('/user/');
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur();
        }
    }

    function handleBlur() {
        if (text === "") return;
        store.setSearchText(text);
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    return (
        <div id='navbar'>
            <IconButton onClick={directToHome}>
                <HomeIcon fontSize='large' />
            </IconButton >
            <IconButton onClick={directToAllList}>
                <PeopleIcon fontSize='large' />
            </IconButton>
            <IconButton onClick={directToUser}>
                <PersonIcon fontSize='large' />
            </IconButton>
            <input
                type="text"
                className='search'
                style={{marginTop: "8px", marginLeft: "10%", width: "27vw", borderRadius: "10px"}}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                onChange={handleUpdateText}
            />
        </div>
    );
};

export default Navbar;
