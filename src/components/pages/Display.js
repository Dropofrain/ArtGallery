import React, { useState, useEffect } from "react"
import { GobalContext } from "../../Hools/GobalContext"
 
const Display = () => {

    const [post, setPost] = useState([])
    const [limit, setLimit] = useStste(20)

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(data) => {
                if (data.error) {
                      console.log(data.error)
                }
         else {
            setPost(data.data)
            console.log(data.data)
             }
            })
                .catch () => console.log("failed to connect")
    }, [])

        const item_store = useSelector(store=>store)
        console.log(item_store)

    //global context variable
    //const valu = useContext(GobalContext)

return (
    <>

    <h1>No. of item in tthe store :{item_store.no_of_item} </h1>
    <div class="row row-cols-1 row-cols-md-3 g-4"></div>
        {
            post.map((item) => {
                return <Info key={i} cardi={item}/>
            })
        }
    </>
)
}