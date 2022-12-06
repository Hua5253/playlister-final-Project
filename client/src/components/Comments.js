import { useContext, useState } from "react";
import GlobalStoreContext from "../store";
import TextField from "@mui/material/TextField";

export default function Comments() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur();
        }
    }

    function handleBlur() {
        store.addCommentById(store.listBeingPlay._id, text);
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    if (!store.listBeingPlay)
        return (
            <div>
                <div className='comments'>
                    <div className='comment-card'></div>
                </div>
                <input
                    type={text}
                    className='add-comment'
                />
            </div>
        );
    else {
        console.log(store.listBeingPlay.comments);
        return (
            <div>
                <div className='comments'>
                    {store.listBeingPlay.comments.map(comment => (
                        <div key={comment} className='comment-card'>
                            {comment}
                        </div>
                    ))}
                </div>
                {/* <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='comment'
                    autoComplete='comment'
                    className='add-comment'
                    onKeyPress={handleKeyPress}
                    onBlur={handleBlur}
                    onChange={handleUpdateText}
                    defaultValue={text}
                    inputProps={{ style: { fontSize: 48 } }}
                    InputLabelProps={{ style: { fontSize: 24 } }}
                    autoFocus
                /> */}
                <input
                    type={text}
                    className='add-comment'
                    onKeyPress={handleKeyPress}
                    onBlur={handleBlur}
                    onChange={handleUpdateText}
                    defaultValue={text}
                />
            </div>
        );
    }
}
