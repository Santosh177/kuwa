import React from 'react';
import style from './description-section.module.scss'


const DescriptionSection = ({description}) => {
    console.log("collectiondescription", description)
  return (
    <>
    <div className={style.DescriptionSection}></div>
    <div className={style.descriptionData} dangerouslySetInnerHTML={{ __html: description }}></div>
    </>
  )
}

export default DescriptionSection