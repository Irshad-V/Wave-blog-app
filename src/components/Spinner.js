import React from 'react'

function Spinner() {
    return (

        <div className='spinner-center'>
            <div className="spinner-border text-primary mt-5 spinner" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner
