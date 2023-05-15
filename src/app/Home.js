'use client'
import { useAuth } from '@/context/userDetail'
import { useCountry } from '@/context/contryDetails'
import { useEffect, useState } from 'react';

export default function Home({data}) {

  const userDetails = useAuth();
  const countryDetails = useCountry();

  useEffect(()=>{})



  return (
    <>
      <div>{countryDetails.data}</div>
    </>

  )
}
