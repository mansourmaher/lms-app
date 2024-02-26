"use client"
import { getProgress } from '@/actions/course/get-progress'
import React, { useEffect, useState } from 'react'
import { Progress } from './ui/progress'
import { cn } from '@/lib/utils'

interface CourseProgressProps {

    courseId:string |undefined,
    userId:string,
    userProgress:number
      
    }

export default function CourseProgress(
    {
        courseId,
        userId,
        userProgress
    }: CourseProgressProps
) {
   
    
    


    
  return (
   <div>
         {/* <div>
              <Progress value={userProgress} max={100} />   
         </div> */}
         <div className="relative size-40">
  <svg className="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    
    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="2"></circle>
    
    <g className="origin-center -rotate-90 transform">
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        className={
            cn(
                "stroke-current text-blue-500 ",
                userProgress>=100&&"text-green-500"
            )
        }
        strokeWidth="2"
        strokeDasharray={`${userProgress}, 100`}
       ></circle>
    </g>
  </svg>
  
  <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
    <span className="text-center text-2xl font-bold text-gray-800 dark:text-white">{
        userProgress
    }%
    </span>
  </div>
</div>
    </div>
  )
}
