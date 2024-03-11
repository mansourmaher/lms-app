import React from 'react'
import SingleCheckPage from './_components/single-check-page'
import { getAllEtudiantWithCompteRendu } from '@/actions/teacher/get-all-etduiant-with-compte-rendu'





export default async function CheckCompteRendu() {
  const usersWork=await getAllEtudiantWithCompteRendu()
  return (
    <div>
      <SingleCheckPage  usersWork={usersWork}/>
    </div>
  )
}
