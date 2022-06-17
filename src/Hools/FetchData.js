import React, { useState, useEffect } from 'react'
import axios from 'axios'
const FetchData = () => {
    const [post, setPost] = useState([])
    const [limit, setlimit] = useStste(20)

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(data) => {
    if (data.error) {
        console.log(data.error)
    }
    else {
        setPost(data.data)
        //console.log(data.data)
    }
})
.catch ()=> console.log("failed to connect")
    }, [])

return {
        <>
{
    post.slice(0, limit).map(item => { return <p>{item.id} : {item.title}</p> })
}
{
    limit < post.length &&
    <button onClick={() => setLimit(limit + 20)}>Show more</button>
}


{
    limit > 0 &&
    <button onClick={() => setLimit(limit - 20)}>Show more</button>
}
        </>
    )
    
}
export default FetchData;