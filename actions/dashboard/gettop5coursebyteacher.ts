"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function getTop5PurchasedCoursesByTeacher() {
    const user=await auth()
    const userId=user?.user.id

   const courses=await db.course.findMany({
         where:{
              userId:userId,
              isPublished:true,
            status:"verified",
         },
         take:10,
            orderBy:{
                totalPurchases:"desc"
            },
            select:{
                title:true,
                totalPurchases:true,
                price:true
            }
         
        
        
        
    })
    const coursesIncludeRevenue=await Promise.all(courses.map(async (course)=>{
        const revenue=course.totalPurchases!*course.price!
        return {...course,revenue}
    }

    ))
    const orderthecourseIncludeRevenue=coursesIncludeRevenue.sort((a,b)=>b.revenue-a.revenue)
    // console.log(orderthecourseIncludeRevenue)
    return orderthecourseIncludeRevenue
    
    


 
}

export async function getMyStudentsIncludetheirageIncludetheircount() {
    const user=await auth()
    const userId=user?.user.id
    const students=await db.courseUser.findMany({
        distinct:["userId"],
        where:{
            course:{
                userId:userId
            }
        },
        select:{
            user:true
        }
    })
    const studentcount=students.length
    const newDate=new Date()
    const studentincludetheirage=students.map((student)=>{
        const age=newDate.getFullYear()-student.user?.DateOfBirth?.getFullYear()!
        return {...student,age}
    }
    )
   
    const tabofstudent=[
        {
            age:"10-20",
            userCount:studentincludetheirage.filter((s)=>s.age>=10&&s.age<=20).length
        }
        ,
        {
            age:"20-30",
            userCount:studentincludetheirage.filter((s)=>s.age>=20&&s.age<=30).length
        }
        ,
        {
            age:"30-40",
            userCount:studentincludetheirage.filter((s)=>s.age>=30&&s.age<=40).length
        }
        ,
        {
            age:"40-50",
            userCount:studentincludetheirage.filter((s)=>s.age>=40&&s.age<=50).length
        }
        ,
        {
            age:"+50",
            userCount:studentincludetheirage.filter((s)=>s.age>=50).length
        }

    ]
    return tabofstudent


}
/* const levelcount=[
        {
            level:"Intermediate",
            levelCount:intermidarecoursecount
        },
        {
            level:"Beginner",
            levelCount:beginnercoursecount
        },
        {
            level:"Advanced",
            levelCount:advancedcoursecount
        }
    ]*/