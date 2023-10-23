import React, {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { db } from '../Firebase';
import { collection, doc, updateDoc } from 'firebase/firestore/lite';

const Likebtn = ({ Dflex, like, id, setActive }) => {
    console.log(like + "like .............like")

    const postCollectionRef = collection(db, "Posts");

    const [liked, setLiked] = useState(false);
    const [clr, setClr] = useState("#a5acb9")
    const [isAnimating, setAnimating] = useState(false);



    const handleLike = async () => {
        if (!liked) {

            await updateDoc(doc(postCollectionRef, id), {
                like: like + 1
            });
            setActive("")
            setClr("red")
            setLiked(true);
            setAnimating(true)
            setTimeout(() => {
                setAnimating(false);

            }, 1000);

        }
    };

    const handleUnlike = async () => {
        if (liked) {
            await updateDoc(doc(postCollectionRef, id), {
                like: like - 1
            });
            setActive("")
            setClr("#a5acb9")
            setLiked(false);
            setAnimating(true)
            setTimeout(() => {
                setAnimating(false);
            }, 1000);


        }
    };



    return (
        <div className={Dflex ? "d-flex m-auto" : "d-flex flex-md-column pb-4'"}>
            <FontAwesomeIcon icon={faHeart}
                className={`fs-21 ${isAnimating ? "heart" : ""}`}
                style={{ color: clr }}
                onClick={liked ? handleUnlike : handleLike}
            />

            <p className='ps-2 pe-2'> {""}</p>
        </div>
    );
};

export default Likebtn;
