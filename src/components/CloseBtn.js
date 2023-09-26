import React, { useState, useEffect } from 'react'

function CloseBtn(props) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
            props.closeClick(false)
        }, 4000);


    }, [props]);


    const handleClose = () => {
        setVisible(false)
        props.closeClick(false)


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
