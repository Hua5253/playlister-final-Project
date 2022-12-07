import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DoubleDownArrowIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import DoubleUpArrowIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import WorkspaceScreen from "./WorkspaceScreen";

export default function UnpublishedListcard(props) {
    const { idNamePair, resetSongIndex } = props;
    const { store } = useContext(GlobalStoreContext);
    // const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState(idNamePair.name);
    const [isExpand, setIsExpand] = useState(false);

    function handleExpand(event) {
        event.stopPropagation();
        store.setCurrentList(idNamePair._id);
        setIsExpand(true);
        resetSongIndex();
    }

    function handleUnexpand() {
        setIsExpand(false);
        store.closeCurrentList();
        resetSongIndex();
    }

    function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleDuplicateList(event, id) {
        event.stopPropagation();
        store.duplicateList(id);
    }

    function handleUndo() {
        store.undo();
    }

    function handleRedo() {
        store.redo();
    }

    function handlePublish() {
        store.publishPlaylist();
    }

    function handlePlaylistClicked(event) {
        resetSongIndex();
        // console.log(event.detail);
        if (event.detail === 1) store.setListToPlay(idNamePair._id);
        else if (event.detail === 2) {
            event.stopPropagation();
            toggleEdit();
        } else return;
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            // let id = event.target.id.substring("list-".length);
            handleBlur();
        }
    }

    // handle blur->
    function handleBlur() {
        store.changeListName(idNamePair._id, text);
        toggleEdit();
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let className = "unselected-playlist";
    if (store.listBeingPlay && store.listBeingPlay._id === idNamePair._id) {
        className = "selected-playlist";
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
                // onDoubleClick={handleToggleEdit}
                onClick={event => handlePlaylistClicked(event)}
            >
                <div id='unexpand-box1'>
                    <div id='list-card-title'>{idNamePair.name}</div>
                    <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
                        By: {idNamePair.userName}{" "}
                    </div>
                </div>
                <div id='unexpand-box2'>
                    <div
                        style={{
                            position: "absolute",
                            right: "20px",
                            bottom: "1px",
                        }}
                    >
                        <IconButton onClick={event => handleExpand(event)}>
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
            >
                <div id='expand-box1'>
                    <div id='list-card-title'>{idNamePair.name}</div>
                    <div style={{ marginLeft: "10px" }}>
                        By: {idNamePair.userName}
                    </div>
                </div>

                <div id='expand-box2'>
                    {/* {console.log(store.currentList)} */}
                    <WorkspaceScreen />
                </div>

                <div id='expand-box3' style={{ position: "relative" }}>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <button
                            style={{ marginLeft: "20px" }}
                            onClick={handleUndo}
                        >
                            Undo
                        </button>
                        <button
                            style={{ marginLeft: "5%" }}
                            onClick={handleRedo}
                        >
                            Redo
                        </button>
                        <button
                            style={{ marginLeft: "5%" }}
                            onClick={handlePublish}
                        >
                            Publish
                        </button>
                        <button
                            style={{ marginLeft: "5%" }}
                            onClick={event =>
                                handleDeleteList(event, idNamePair._id)
                            }
                        >
                            Delete
                        </button>
                        <button
                            style={{ marginLeft: "5%" }}
                            onClick={event => {
                                handleDuplicateList(event, idNamePair._id);
                            }}
                        >
                            Duplicate
                        </button>
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            right: "20px",
                            bottom: "1px",
                        }}
                    >
                        <IconButton onClick={handleUnexpand}>
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
                // onDoubleClick={handleToggleEdit}
                onClick={event => {
                    handlePlaylistClicked(event);
                }}
            >
                <div id='unexpand-box1'>
                    <div id='list-card-title'>{idNamePair.name}</div>
                    <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
                        By: {idNamePair.userName}{" "}
                    </div>
                </div>
                <div id='unexpand-box2'>
                    <div
                        style={{
                            position: "absolute",
                            right: "20px",
                            bottom: "1px",
                        }}
                    >
                        <IconButton onClick={event => handleExpand(event)}>
                            <DoubleDownArrowIcon fontSize='large' />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }

    if (editActive && !isExpand) {
        cardElement = (
            <TextField
                margin='normal'
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label='Playlist Name'
                name='name'
                autoComplete='Playlist Name'
                className='list-card'
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 48 } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
                autoFocus
            />
        );
    }
    return cardElement;
}
