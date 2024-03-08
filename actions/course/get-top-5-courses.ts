"use server"

import { db } from "@/lib/db";
import { getFivestarscount, getForstarscount, getOnetarscount, getThreestarscount, getTwostarscount } from "./get-stars-number";



export async function getTop3Courses() {
    const courses = await db.course.findMany({
        where: {
            isPublished: true
        },
        include:{
            review:true,
            chapters:true,
            category:true,
            

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
    const exxludedCourses = coursesWithAvgOfRatings.filter(course=>course.avg>0)
    const top5Courses = exxludedCourses.sort((a,b)=>b.avg-a.avg).slice(0,3)
    console.log(top5Courses)
    return top5Courses

   
}