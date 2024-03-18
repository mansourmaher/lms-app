"use client"


import React from 'react'

interface ChapterTitleProps {
  title: string;
}

export default function ChapterTitle({ title }: ChapterTitleProps) {
  return (
    <div className='ml-8'>
      <h1 className='text-2xl font-semibold text-blue-500'>{title}</h1>

      </div>
  )
}
