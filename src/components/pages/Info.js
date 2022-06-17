import React from "react"

const Info = (p) => {
    return (
       
        <div>
        {/* {console.log(props)}
        {console.log(props)}
            <h1>S.no.{props.id}</h1>
            <h2>User : {props.userId}</h2>
            <h3>Title : {props.title}</h3>
            <p>Contect : {props.body}</p> */}
          

    <div class="col">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{p.carditem.id}</h5>
                <h5 class="card-title">{p.carditem.title}</h5> 
                <p class="card-text">{p.carditem.body}</p>
            </div>
        </div>
    </div>

    </div>
    )
}

 