import { useContext, useState } from "react";
import GlobalStoreContext from "../store";

export default function Comments() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur();
        }
    }

    function handleBlur() {
        if (text === "") return;
        console.log(store.currentScreen);
        store.addCommentById(store.listBeingPlay._id, text);
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    if (!store.listBeingPlay || !store.listBeingPlay.isPublished)
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
        // console.log(store.listBeingPlay.comments);
        return (
            <div>
                <div className='comments'>
                    {store.listBeingPlay.comments.map(comment => (
                        <div key={comment} className='comment-card'>
                            {comment}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
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
