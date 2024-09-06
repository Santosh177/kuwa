import React from 'react';
import style from './description-section.module.scss'


const DescriptionSection = ({description}) => {
    console.log("collectiondescription", description)
  return (
    <>
    <div className={style.DescriptionSection}>
    <div className={style.descriptionData} dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>
    </>
  )
}

export default DescriptionSection