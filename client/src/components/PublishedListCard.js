import { useContext, useState } from "react";
import AuthContext from '../auth';
import { GlobalStoreContext } from "../store";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined";
import DoubleDownArrowIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import DoubleUpArrowIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
export default function PublishedListCard(props) {
    const { idNamePair, resetSongIndex } = props;
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    function handleExpand(event) {
        event.stopPropagation();
        store.setCurrentList(idNamePair._id);
    }

    function handleUnexpand(event) {
        event.stopPropagation();
        store.closeCurrentList();
        resetSongIndex();
    }

    function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }
    
    function handleLike() {
        store.likePlaylistById(idNamePair._id);
        setIsLiked(true);
    }

    function handleDislike() {
        store.dislikePlaylistById(idNamePair._id);
        setIsDisliked(true);
    }

    function handlePlaylistClicked(event) {
        if (event.detail === 1)
            store.setListToPlay(idNamePair._id);
        else return;
    }

    let className = "unselected-playlist";
    if (store.listBeingPlay && store.listBeingPlay._id === idNamePair._id) {
        className = "selected-playlist"
    }

    let cardElement;
    if (!store.currentList)
        cardElement = (
            <div
                id={idNamePair._id}
                key={idNamePair._id}
                className={className}
                style={{
                    marginTop: "5px",
                    display: "flex",
                    width: "100%",
                    border: "3px solid lightBlue",
                    borderRadius: "20px",
                }}
                onClick={event => {handlePlaylistClicked(event)}}
            >
                <div id='unexpand-box1'>
                    <div id='list-card-title'>{idNamePair.name}</div>
                    <div style={{ marginLeft: "10px" }}>By: {auth.getUserName()} </div>
                    <div style={{ marginLeft: "10px", marginBottom: "7px" }}>
                        published: {idNamePair.publishedDate}
                    </div>
                </div>
                <div id='unexpand-box2'>
                    <div style={{ marginLeft: "10px" }}>
                        <IconButton onClick={handleLike} disabled={isLiked || isDisliked}>
                            <ThumbUpIcon />
                        </IconButton>
                        {idNamePair.likes}
                        <IconButton onClick={handleDislike} disabled={isLiked || isDisliked}>
                            <ThumbDownIcon />
                        </IconButton>
                        {idNamePair.dislikes}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            right: "20px",
                            bottom: "1px",
                        }}
                    >
                        <IconButton
                            onClick={
                                event => {handleExpand(event)}
                            }
                        >
                            <DoubleDownArrowIcon fontSize='large' />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    else if (store.currentList._id === idNamePair._id) {
        cardElement = (
            <div
                id={idNamePair._id}
                key={idNamePair._id}
                className={className}
                style={{
                    marginTop: "5px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    border: "3px solid lightBlue",
                    borderRadius: "20px",
                }}
                onClick={event => {handlePlaylistClicked(event)}}
            >
                <div id='expand-box1'>
                    <div style={{ display: "flex" }}>
                        <div style={{width: "50%"}}>
                            <div id='list-card-title'>{idNamePair.name}</div>
                            <div style={{ marginLeft: "10px" }}>By: {auth.getUserName()}</div>
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                            <IconButton onClick={handleLike}>
                                <ThumbUpIcon />
                            </IconButton>
                            {idNamePair.likes}
                            <IconButton onClick={handleDislike}>
                                <ThumbDownIcon />
                            </IconButton>
                            {idNamePair.dislikes}
                        </div>
                    </div>
                </div>

                <div id='expand-box2' style={{ backgroundColor: "lightBlue", width: "94%", borderRadius: "10px", marginLeft: "3%" }}>
                    {store.currentList.songs.map((song, index) => (<ul style={{ listStyleType: "none" }}>
                        <li>
                            {index + 1}. {song.title} by {song.artist}
                        </li>
                    </ul>))}
                </div>

                <div id='expand-box3' style={{ position: "relative" }}>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <button style={{ marginLeft: "60%" }} onClick={(event) => handleDeleteList(event, idNamePair._id)}>Delete</button>
                        <button style={{ marginLeft: "5%" }}>Duplicate</button>
                    </div>
                    <div style={{marginLeft:"10px", marginBottom:"15px"}}>published: {store.currentList.publishedDate} </div>
                    <div
                        style={{
                            position: "absolute",
                            right: "20px",
                            bottom: "1px",
                        }}
                    >
                        <IconButton onClick={event => {handleUnexpand(event)}}>
                            <DoubleUpArrowIcon fontSize='large' />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    } else {
        cardElement = (
            <div
                id={idNamePair._id}
                key={idNamePair._id}
                className={className}
                style={{
                    marginTop: "5px",
                    display: "flex",
                    width: "100%",
                    border: "3px solid lightBlue",
                    borderRadius: "20px",
                }}
            >
                <div id='unexpand-box1'>
                    <div id='list-card-title'>{idNamePair.name}</div>
                    <div style={{ marginLeft: "10px" }}>By: {auth.getUserName()}</div>
                    <div style={{ marginLeft: "10px", marginBottom: "7px" }}>
                        published: {idNamePair.publishedDate}
                    </div>
                </div>
                <div id='unexpand-box2'>
                    <div style={{ marginLeft: "10px" }}>
                        <IconButton onClick={handleLike}>
                            <ThumbUpIcon />
                        </IconButton>
                        {idNamePair.likes}
                        <IconButton onClick={handleDislike}>
                            <ThumbDownIcon />
                        </IconButton>
                        {idNamePair.dislikes}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            right: "20px",
                            bottom: "1px",
                        }}
                    >
                        <IconButton
                            onClick={
                                event => {handleExpand(event)}
                            }
                        >
                            <DoubleDownArrowIcon fontSize='large' />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }

    return cardElement;
}