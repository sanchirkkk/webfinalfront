import '../styles/globals.css'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  const router = useRouter();
    const [pageLoading, setPageLoading] = useState(false);
    useEffect(() => {
        const handleStart = () => { setPageLoading(true); };
        const handleComplete = () => { setPageLoading(false); };
    
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
      }, [router]);

      
  if (pageLoading){return (<div className='mylaoding'> <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>Түр хүлээнэ үү </div>)} else {return <Component {...pageProps} />}
}

export default MyApp
