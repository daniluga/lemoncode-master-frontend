import React from 'react';
import { getMembers } from './api';
import { Router } from './router';
import { CookiesDialog } from './cookies-dialog';

export const App: React.FunctionComponent = () => {
  React.useEffect(() => {
    getMembers()
      .then((members) => {
        console.log(members);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>05-Testing / 01 React</h1>
      <Router />
      <CookiesDialog
        onAgreeClick={() => {
          console.log('Click agree');
        }}
      />
    </>
  );
};
