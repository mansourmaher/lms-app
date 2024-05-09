"use server"

import { db } from "@/lib/db";
import { getFivestarscount, getForstarscount, getOnetarscount, getThreestarscount, getTwostarscount } from "./get-stars-number";
import { getCourseRating } from "./get-course-rating";



export async function getTop3Courses() {
    const courses = await db.course.findMany({
        where: {
            isPublished: true,
            status:"verified",
            review: {
                some: {
                    starts: {
                        gte: 1
                    }
                }
            }
        },
        include:{
            
            chapters:{
                where:{
                    isPublished:true
                },
                select:{
                    id:true
                }
            },
            category:true,
            

        },
        orderBy: {
            
            totalStars: 'desc'
        },
        take: 5
    })
    const coursesWithAvgOfRatings = await Promise.all(courses.map(async (course) => {
        const avg=course.totalStars!/course.totalReviews!
        return {
            ...course,
            avg
        }
    }
    ))
    const exxludedCourses = coursesWithAvgOfRatings.filter(course=>course.avg>0)
     const top5Courses = exxludedCourses.sort((a,b)=>b.avg-a.avg)
    
        return top5Courses



    // const coursesWithAvgOfRatings = await Promise.all(courses.map(async (course) => {
       
    //      const totalReviews=course.review.length
    //         const avg=await getCourseRating(course.id)
    //     return {
    //         ...course,
    //         avg,
    //         totalReviews
    //     }
    // }
    // ))
    // const exxludedCourses = coursesWithAvgOfRatings.filter(course=>course.avg>0)
    // const top5Courses = exxludedCourses.sort((a,b)=>b.avg-a.avg).slice(0,5)

    
    
   

   
}