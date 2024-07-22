'use client'
import { useRouter } from 'next/navigation';
import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
import styles from './page.module.scss';
// import { useEffect } from 'react';
import { useLanguage } from '@/context/languageDetails';
import ReviewForm from './ReviewsAndRatings/ReviewsAndRatings';

export default function ReviewsAndRatings() {
  const router = useRouter();
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


  return (
    <>
    <PageHeader headerName={isArabic ? "اكتب تقييمك" : "Write your review"}  />
    <ReviewForm/>
    </>
  );
}
    