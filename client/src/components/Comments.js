import { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import GlobalStoreContext from "../store";
import AuthContext from "../auth";

export default function Comments() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const history = useHistory();
    const [text, setText] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur();
        }
    }

    function handleBlur() {
        if (text === "") return;
        store.addCommentById(store.listBeingPlay._id, text);
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function goToUserScreen(text) {
        store.setSearchText(text);
        history.push("/user/");
    }

    if (!store.listBeingPlay || !store.listBeingPlay.isPublished)
        return (
            <div>
                <div className='comments'>
                    <div className='comment-card'></div>
                </div>
                <input
                    type={text}
                    disabled
                    className='add-comment'
                />
            </div>
        );
    else {
        // console.log(store.listBeingPlay.comments);
        return (
            <div>
                <div className='comments'>
                    {store.listBeingPlay.comments.map(comment => (
                        <div key={comment} className='comment-card'>
                            <div style={{ fontSize: "10px" }} onClick={() => goToUserScreen(comment.userName)}>{comment.userName}</div>
                            <div>{comment.comment}</div>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    disabled={!auth.loggedIn}
                    className='add-comment'
                    autoComplete="comment"
                    onKeyPress={handleKeyPress}
                    onBlur={handleBlur}
                    onChange={handleUpdateText}
                />
            </div>
        );
    }
}
