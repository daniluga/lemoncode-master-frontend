import React from 'react';
import { Metadata } from 'next';
import { CarList, api, mapCarListFromApiToVm } from '#pods/car-list';

export const metadata: Metadata = {
  title: 'Rent a car - Car list',
};

const CarListPage = async () => {
  const carList = await api.getCarList();
  console.log('Car list at build time:', { carList });

  return <CarList carList={mapCarListFromApiToVm(carList)} />;
};

export default CarListPage;
