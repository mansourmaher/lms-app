"use server"

import { getAllUnstroctor } from "./get-all-unstroctor"


export async function getThePostionOftheteacherById(teacherId:string)
{
    const teachers=await getAllUnstroctor(null)
    const teacher=teachers.find((teacher)=>teacher.user?.id===teacherId)
    // @ts-ignore
    const index=teachers.indexOf(teacher)
    return index

}