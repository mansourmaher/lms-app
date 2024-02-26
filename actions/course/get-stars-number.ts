"use server"

import { db } from "@/lib/db"
import { get } from "http";



export async function getFivestarscount(courseId:string){

   const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      review: true,
    },
    });
    const reviews=course?.review
    const fivestars=await reviews?.filter((review)=>review.starts===5)
    if(fivestars===null){
      return 0
  }
  if(fivestars===undefined){
      return 0
  }

 return fivestars.length

}

 export async function getForstarscount(courseId:string){

    const course = await db.course.findUnique({
     where: {
       id: courseId,
     },
     include: {
       review: true,
     },
     });
     const reviews=course?.review
     const fivestars=await reviews?.filter((review)=>review.starts===4)
     if(fivestars===null){
      return 0
  }
  if(fivestars===undefined){
      return 0
  }

 return fivestars.length
 
 }
 export async function getThreestarscount(courseId:string){

    const course = await db.course.findUnique({
     where: {
       id: courseId,
     },
     include: {
       review: true,
     },
     });
     const reviews=course?.review
     const fivestars=await reviews?.filter((review)=>review.starts===3)
     if(fivestars===null){
      return 0
  }
  if(fivestars===undefined){
      return 0
  }

 return fivestars.length
 
 }
 export async function getTwostarscount(courseId:string){

    const course = await db.course.findUnique({
     where: {
       id: courseId,
     },
     include: {
       review: true,
     },
     });
     const reviews=course?.review
     const fivestars=await reviews?.filter((review)=>review.starts===2)
     if(fivestars===null){
      return 0
  }
  if(fivestars===undefined){
      return 0
  }

 return fivestars.length
 
 }
 export async function getOnetarscount(courseId:string){

    const course = await db.course.findUnique({
     where: {
       id: courseId,
     },
     include: {
       review: true,
     },
     });
     const reviews=course?.review
     const fivestars=await reviews?.filter((review)=>review.starts===1)
     if(fivestars===null){
          return 0
      }
      if(fivestars===undefined){
          return 0
      }

     return fivestars.length
 
 }

 const getAvgStars=async(courseId:string)=>{
    const course = await db.course.findUnique({
     where: {
       id: courseId,
     },
     include: {
       review: true,
     },
     });

     const averageOfCourseStars=await getFivestarscount(courseId)*5+await getForstarscount(courseId)*4+ await getThreestarscount(courseId)*3+ await getTwostarscount(courseId)*2+ await getOnetarscount(courseId)*1
      const totalStars=await getFivestarscount(courseId)+await getForstarscount(courseId)+ await getThreestarscount(courseId)+ await getTwostarscount(courseId)+ await getOnetarscount(courseId)
      const avg=averageOfCourseStars/totalStars
      return avg
    }

 
export async function getCoursesSortedByAvgStars()
{
    const courses=await db.course.findMany({
        where:{
            isPublished:true
        }
    })
    const coursesSortedByStars=await Promise.all(courses.map(async(course)=>{
        const avg=await getAvgStars(course.id)
        return {
            ...course,
            avg:avg
        }
    }))
    return coursesSortedByStars
}


 

  