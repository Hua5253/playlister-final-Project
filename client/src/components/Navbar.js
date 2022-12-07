import React, { useContext, useState } from "react";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import { GlobalStoreContext } from "../store";
import PersonIcon from '@mui/icons-material/PersonOutline';
import PeopleIcon from '@mui/icons-material/Groups';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AuthContext from "../auth";

const Navbar = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const history = useHistory();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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

    function handleSortByName() {
        store.sortBy("name");
        setAnchorEl(null);
    }

    function handleSortByDate() {
        store.sortBy("date");
        setAnchorEl(null);
    }

    function handleSortByLikes() {
        store.sortBy("likes");
        setAnchorEl(null);
    }

    function handleSortByDislikes() {
        store.sortBy("dislikes");
        setAnchorEl(null);
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortByName}>Name(A-Z)</MenuItem>
            <MenuItem onClick={handleSortByDate}>Published Date(Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleSortByLikes}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleSortByDislikes}>Dislikes (High - Low)</MenuItem>
        </Menu>
    );

    console.log(auth.loggedIn)
    return (
        <div id='navbar'>
            <IconButton onClick={directToHome} disabled={!auth.loggedIn}>
                <HomeIcon fontSize='large' />
            </IconButton >
            <IconButton onClick={directToAllList}>
                <PeopleIcon fontSize='large' />
            </IconButton>
            <IconButton onClick={directToUser}>
                <PersonIcon fontSize='large' />
            </IconButton>
            <SearchIcon fontSize="large" sx={{marginLeft: "15%", marginTop: "10px"}}/>
            <input
                type="text"
                className='search'
                style={{width: "27vw", borderRadius: "10px"}}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                onChange={handleUpdateText}
            />
            <div style={{marginTop: "5px", marginLeft: "15%"}}>Sort By <IconButton onClick={handleMenuOpen}><SortIcon fontSize="large"/></IconButton></div>
            {sortMenu}
        </div>
    );
};

export default Navbar;
