import React, { useState } from 'react'

function InputTag({ updateTags }) {
    const [tags, setTags] = useState(['Waves'])


    console.log(tags);
    const addTag = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (e.target.value.length > 0) {
                const newTags = [...tags, e.target.value];
                setTags(newTags);
                if (updateTags) {
                    updateTags(newTags);
                }

                e.target.value = ""
            }
        }
    }
    const removeTags = (tag) => {
        const newTags = tags.filter(res => res !== tag)
        setTags(newTags)
    }

    console.log("inputte rendering.........")
    return (
        <div className='tag-container'>
            {
                tags.map((tag, index) => {
                    return (

                        <div className="tag" key={index}>
                            {tag} <span onClick={() => removeTags(tag)}>X</span>
                        </div>

                    )
                })
            }

            <input type="text" placeholder='Tags' onSubmit={() => { console.log("submited"); }} onKeyDown={addTag} />
        </div>
    )
}

export default InputTag
