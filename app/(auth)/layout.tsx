const LayoutPage=({children}:{
    children:React.ReactNode
})=>{
    return(
        <div className="h-full flex  justify-center my-auto mx-auto">
            {children}
        </div>
    )
}
export default LayoutPage;
