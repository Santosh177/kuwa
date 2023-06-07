'use client';
import React,{useEffect, useState} from 'react';
import styles from './star-rating.scss';

const Star = (props) => {

    const changeGrade = (rating) => {
        props.changeGradeIndex(rating);
    }

    return (
        <label className="star" onClick={(e)=>{e.stopPropagation();changeGrade(props.index)}}>
            <input
                type="radio"
                name="rating"
                id={props.grade}
                value={props.index}
                className="stars_radio-input"
            />
            <svg 
                width="21" 
                height="21" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#D6B13E" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={props.style}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        </label>
    );
}

const RatingStars = ({onUpdateRating={},rating=0}) => {
    const [gradeIndex, setGradeIndex] = useState();
    const RATING = [1, 2, 3,4,5];
    const activeStar = {
        fill: '#D6B13E'
    };

    useEffect(()=>{
        if(rating)
        {
            setGradeIndex(rating - 1)
        }

    },[rating])
    

    const changeGradeIndex = ( index ) => {
        if(!rating){
            setGradeIndex(index);
            onUpdateRating(index)
        }
       
    }

  
    console.log("gradeIndexgradeIndex",gradeIndex)

    return (
        <div className="container">
            <div className="stars">
                {
                    RATING.map((grade, index) => (
                        <Star 
                            index={index} 
                            key={grade} 
                            changeGradeIndex={changeGradeIndex}
                            style={ gradeIndex >= index ? activeStar : {}}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default RatingStars;