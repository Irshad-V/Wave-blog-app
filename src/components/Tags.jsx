import React, { useEffect, useState } from 'react'








function Tags({ blogs, tag }) {
    const [tags, setTags] = useState([])
    console.log(tags);
    useEffect(() => {
        if (blogs) {
            let tagsInput = [];
            for (let i = 0; i < blogs.length; i++) {

                tagsInput.push(blogs[i].tags);
            }
            const flattenedTags = tagsInput.flat();
            const uniqueTags =[...new Set(flattenedTags)]

                let printInput = []
            for (let i = uniqueTags.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                printInput.push(flattenedTags[j]);
            }
            const slicedArray = printInput.slice(0, 30);
            setTags(slicedArray);
        } else {
            const uniqueTags =[...new Set(tag)]
            setTags(uniqueTags)

        }
    }, [blogs, tag]);





    return (
        <div className='m-0 p-0 '>
            <div >
                <div className='blog-heading text-start py-2 mb-4'> Tags</div>
            </div>
            <div className='tags'>
                {tags?.map((tag, index) => (
                    <p className='tag' key={index}>{tag}</p> // Wrap {tag} inside a <div>
                ))}
            </div>
        </div>
    )
}

export default Tags
