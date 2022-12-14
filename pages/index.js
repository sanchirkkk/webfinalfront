import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router, { withRouter } from 'next/router'

export default function Home() {


  function routerpush(){
    Router.push({

      pathname:'/login'
    })

  }
  return (
    <div className={styles.container}>
        
        
      
      <Head>
        <title>Тавтай морилно уу</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <div className={styles.title}>
          Хувийн санхүү
          </div>

          <button onClick={routerpush}> 
            Үргэлжлүүлэх 
          </button>

      </main>

    </div>
  )
}
