'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const CarListPage = () => {
  const router = useRouter();

  const onNavigateBack = () => {
    router.push('/');
  };

  return (
    <>
      <h2>Car list page</h2>
      <ul>
        <li>Audi Q8</li>
        <li>BMW X7</li>
      </ul>
      <button onClick={onNavigateBack}>Back home</button>
    </>
  );
};

export default CarListPage;
