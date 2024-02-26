

const Bannner=(props:{title:string})=>{
    return(
       // o want to affiche a banner with color yellow on the top of the page

        <div className="bg-yellow-500 text-white  m-3 p-3">
            {props.title}
        </div>
    )
}


export default Bannner