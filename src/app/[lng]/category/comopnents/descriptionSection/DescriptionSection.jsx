import React from 'react';
import style from './description-section.module.scss'
import { useCountry } from '@/context/contryDetails';


const DescriptionSection = ({description}) => {
  const { selectedCountry={} } = useCountry();
  console.log("selectedCountry",selectedCountry)

    console.log("collectiondescription", description)
  return (
    <>
   { description && <div className={style.DescriptionSection}>
    <div className={style.descriptionData} dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>}
    </>
  )
}

export default DescriptionSection