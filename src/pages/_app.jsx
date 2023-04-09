import '@/styles/globals.css';
import { useState } from 'react';
import { AppContext } from '@/utils/context';

export default function App({ Component, pageProps }) {
  const [loggedUser, setLoggedUser] = useState();
  return (
    <AppContext loggedUser={loggedUser} setLoggedUser={setLoggedUser}>
      <Component {...pageProps} />
    </AppContext>
  );
}