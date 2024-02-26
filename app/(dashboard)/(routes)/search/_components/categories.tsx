"use client"

import { Category } from "@prisma/client"

import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSportsMode,
    FcSalesPerformance,


}from 'react-icons/fc'
import { IconType } from "react-icons"
import { CategoryItem } from "./categoryItem"


interface CategoriesProps {
    items:Category[]
}
const iconsMap:Record<Category['name'],IconType> = {
    "Computer Science":FcMultipleDevices,
    "Mathematics":FcEngineering,
    "Physics":FcOldTimeCamera,
    "Chemistry":FcSalesPerformance,
    "Biology":FcSportsMode,
    "Economics":FcFilmReel,
    "Business":FcSalesPerformance,
    "Psychology":FcMusic,
    "History":FcOldTimeCamera,
}



export const Categories = ({items}:CategoriesProps) => {
    return(
        <div className="flex items-center gap-x-2 overflow-auto pb-2">
            {
                items.map((item)=>(
                    <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconsMap[item.name]}
                    value={item.id}
                
                    />
                
                )
                )
            }

        </div>
    )
}