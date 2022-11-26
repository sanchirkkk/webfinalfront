import styles from '../styles/Home.module.css'

const AddNofi =({error})=>{
    console.log(error)
   if(error == ''){
    return(
       
            
        <div id="error"className={styles.sanchirkk}>
            ЗААВАЛ БӨГЛӨХ ШААРДЛАГАТАЙ ТАЛБАРЫГ БӨГЛӨНӨ ҮҮ
        </div>

    );
   } else {

    return(
       
            
        <div id="error"className={styles.sanchirkk}>
            {error}
        </div>

    );


   }
} 

export default AddNofi;