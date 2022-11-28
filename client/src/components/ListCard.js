import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined";
import DoubleDownArrowIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { idNamePair, selected } = props;
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState(idNamePair.name);

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf("list-card-text-") >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
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

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement = (
        <div
            id={idNamePair._id}
            key={idNamePair._id}
            style={{
                marginTop: "5px",
                display: "flex",
                width: "100%",
                border: "3px solid lightBlue",
                borderRadius: "20px",
                backgroundColor: "lightyellow",
            }}
            button
            onClick={event => {
                handleLoadList(event, idNamePair._id);
            }}
        >
            <div id='box1'>
                <div id='list-card-title' style={{ flexGrow: 1 }}>
                    {idNamePair.name}
                </div>
                <div style={{ marginLeft: "10px" }}>By: </div>
                <div style={{ marginLeft: "10px", marginBottom: "7px" }}>
                    published:
                </div>
            </div>
            <div id='box2' style={{position:'relative'}}>
                <div style={{ marginLeft: "10px" }}>
                    <IconButton>
                        <ThumbUpIcon />
                    </IconButton>
                    10
                    <IconButton>
                        <ThumbDownIcon />
                    </IconButton>
                    10
                </div>
                <div style={{position:'absolute', right:'20px'}}>
                    <DoubleDownArrowIcon />
                </div>
            </div>

            {/* <div >
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{ fontSize: "48pt" }} />
                </IconButton>
            </div>
            <div >
                <IconButton
                    onClick={event => {
                        handleDeleteList(event, idNamePair._id);
                    }}
                    aria-label='delete'
                >
                    <DeleteIcon style={{ fontSize: "48pt" }} />
                </IconButton>
            </div> */}
        </div>
    );

    if (editActive) {
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

export default ListCard;
