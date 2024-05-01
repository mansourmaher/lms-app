import React from 'react'
import SingleCheckPage from './_components/single-check-page'
import { getAllEtudiantWithCompteRendu } from '@/actions/teacher/get-all-etduiant-with-compte-rendu'
import { getthebeststudentinthe5bestcourse } from '@/actions/teacher/getthebeststudentinthebest5course'





export default async function CheckCompteRendu() {
  const usersWork=await getAllEtudiantWithCompteRendu()
  const topstudnet=await getthebeststudentinthe5bestcourse()
  return (
    <div>
      <SingleCheckPage  usersWork={usersWork} topstudent={topstudnet}/>
    </div>
  )
}
