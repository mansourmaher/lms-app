"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import CourseForm from "./courseForm";




const ListCourse=()=>{
    const[myCourses,setMycourses]=useState([])

    useEffect(()=>{
        const fetchCourses=async()=>{
            try{
                const response=await axios.get("/api/courses");
                setMycourses(response.data);
                console.log(response.data);
            }catch(error){
                console.log(error);

            }

        }
        fetchCourses();
    },[])//[] bech mayd5olch fi boucle infin whowa yconsoli fihom
  

    console.log(myCourses);
    
    return(
        <div className="mt-3 ml-3">
            
            <h1>List Course</h1>
            <div className="grid grid-cols-3 gap-4">
                {myCourses.map((course:any)=>(
                    <div key={course._id}>
                        <CourseForm
                        initialeData={course}
                        />
                    </div>
                
                ))}
            </div>
        </div>
    )
}

export default ListCourse;