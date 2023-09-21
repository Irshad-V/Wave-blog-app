import React, { useState, useEffect } from 'react'

function CloseBtn(props) {
    const [visible, setVisible] = useState(true)



    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
        }, 4000);
        return () => {
            clearTimeout(timeout);

        };
    },[]);


    const handleClose = () => {
        setTimeout(() => {
            setVisible(false)

        }, 1000)


    }
    return (
        <>
            {

                visible && (
                    <div className={props.Name === "Err" ? "box-err" : props.Name === "Warn" ? "box-warn" :
                        props.Name === "Success" ? "box-succes" : ""}>
                        <button onClick={handleClose}>X</button>
                        <h2>{props.Name}</h2>
                        <p> {props.Info ? props.Info : "Something went wrong. Please try again."}</p>
                    </div>

                )
            }

        </>
    )

}

export default CloseBtn
