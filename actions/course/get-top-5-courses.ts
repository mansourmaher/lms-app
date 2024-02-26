"use server"

import { db } from "@/lib/db";
import { getFivestarscount, getForstarscount, getOnetarscount, getThreestarscount, getTwostarscount } from "./get-stars-number";



export async function getTop2Courses() {
    const courses = await db.course.findMany({
        include:{
            review:true
        }
    })

    const coursesWithAvgOfRatings = await Promise.all(courses.map(async (course) => {
       const Totalstars=await getFivestarscount(course.id)*5+await getForstarscount(course.id)*4+await getThreestarscount(course.id)*3+await getTwostarscount(course.id)*2+await getOnetarscount(course.id)*1
         const TotalReviews=course.review.length
            const avg=Totalstars/TotalReviews
        return {
            ...course,
            avg
        }
    }
    ))
    const top5Courses = coursesWithAvgOfRatings.sort((a,b)=>b.avg-a.avg).slice(0,2)
    return top5Courses

   
}