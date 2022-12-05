import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import AppBanner from "./AppBanner";
import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";
import YouTube from "react-youtube";
import AppFooter from "./AppFooter";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PreviousIcon from '@mui/icons-material/FastRewind';
import NextIcon from '@mui/icons-material/FastForward';
import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { IconButton } from "@mui/material";
import AllScreenPublishedListCard from "./AllscreenPublishedListCard";

const AllListScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    const [value, setValue] = useState(0);
    const [songIndex, setSongIndex] = useState(0);

    function resetSongIndex() {
        setSongIndex(0);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        store.getPublishedPlaylistPairs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(store.idNamePairs);
    console.log(store.publishedListPairs);

    let listCard = "";
    if (store) {
        listCard = (
            <div
                style={{
                    width: "100%",
                    borderRadius: "20px",
                }}
            >
                {store.publishedListPairs.map(pair => (
                    <AllScreenPublishedListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        songIndex={songIndex}
                        resetSongIndex={resetSongIndex}
                    />
                ))}
            </div>
        );
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role='tabpanel'
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    const opts = {
        height: "300px",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    let song_id = "";
    let songIds = [];
    let player;

    if (store.listBeingPlay) {
        let songs = store.listBeingPlay.songs;
        for (let song of songs)
            songIds.push(song.youTubeId);
        song_id = songIds[songIndex];
    }

    function loadAndPlayCurrentSong(player) {
        let song = songIds[songIndex];
        player.loadVideoById(song);
        player.playVideo();
    }

    function onPlayerReady(event) {
        player = event.target;
        loadAndPlayCurrentSong(player);
    }

    function incSong() {
        let index = (songIndex + 1) % songIds.length;
        setSongIndex(index);
    }

    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        }
    }

    function handlePlay() {
        player.playVideo();
    }

    function handlePause() {
        player.pauseVideo();
    }

    function handleNext() {
        incSong();
        song_id = songIds[songIndex];
        player.playVideo();
    }

    function handlePrevious() {
        let index = (songIndex - 1) % songIds.length;
        if (index < 0) index = 0;
        setSongIndex(index);
        song_id = songIds[songIndex];
        player.playVideo();
    }

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
                    <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                        <div style={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                sx={{height: "50px"}}
                            >
                                <Tab label='Player' {...a11yProps(0)} sx={{background:"grey", borderRadius:"10px"}}/>
                                <Tab label='Comments' {...a11yProps(1)} sx={{background:"grey", borderRadius:"10px"}}/>
                            </Tabs>
                        </div>
                        <TabPanel value={value} index={0}>
                            <YouTube videoId={song_id} opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange}/>
                            <div>Playlist: {store.listBeingPlay ? store.listBeingPlay.name : ""} </div>
                            <div>song #: {(store.listBeingPlay && store.listBeingPlay.songs.length > 0) ? (songIndex+1) : ""}</div>
                            <div>title: {(store.listBeingPlay && store.listBeingPlay.songs.length > 0) ? store.listBeingPlay.songs[songIndex].title : ""} </div>
                            <div>artist: {(store.listBeingPlay && store.listBeingPlay.songs.length > 0) ? store.listBeingPlay.songs[songIndex].artist : ""}</div>
                            <div id="player-controller">
                                <IconButton size="large" onClick={handlePrevious}>
                                    <PreviousIcon />
                                </IconButton>
                                <IconButton onClick={handlePause}>
                                    <StopIcon />
                                </IconButton>
                                <IconButton onClick={handlePlay}>
                                    <PlayIcon />
                                </IconButton>
                                <IconButton onClick={handleNext}>
                                    <NextIcon />
                                </IconButton>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Comments
                        </TabPanel>
                    </div>
                </div>
            </div>
            <div id="playlister-footer">{!store.listBeingPlay ? "" : store.listBeingPlay.name}</div>
        </React.Fragment>
    );
};

export default AllListScreen;
