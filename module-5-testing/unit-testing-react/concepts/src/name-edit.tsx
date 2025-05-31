import { Display } from '#display';
import { Edit } from '#edit';
import React from 'react';

export const NameEdit: React.FC = () => {
  const [userName, setUserName] = React.useState('');

  return (
    <>
      <Display userName={userName} />
      <Edit userName={userName} onSetUserName={setUserName} />
    </>
  );
};
