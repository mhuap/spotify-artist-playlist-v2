import { SessionProvider } from 'next-auth/react';
import '../styles/variables.scss';
import '../styles/globals.scss';
import '../styles/Login.scss';
import "../styles/Search.scss";
import '../styles/Artist.scss';

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
