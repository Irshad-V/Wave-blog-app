import React, { useEffect, useState } from 'react'

function InputTag({ updateTags, Alltag }) {
    const [tags, setTags] = useState(['Waves'])
    useEffect(() => {
        if (Alltag) {
            setTags([...Alltag])
        }
    }, [Alltag])

    console.log(Alltag);
    console.log("innput Alltag");

    console.log(tags);
    const addTag = (e) => {
        if (e.key === " " || e.key === "Spacebar" || e.keyCode === 32)  {
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
