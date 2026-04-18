import React,{useState, useEffect} from 'react'
import styles from './Admin.module.css'
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC'; 
import axios from '../../utils/axios';
const Admin = () => {
     
       const [data, setData] = useState([]);
       const [loader, setLoader] = useState(false);
       
        useEffect(() => {
          setLoader(true);
          const fetchAllData = async () => {
             try{
               const results = await axios.get("/api/resume/get");
               console.log(results.data.resume);
               setData(results.data.resume);
             }catch(err){
               console.log(err);
               alert("Something Went Wrong");
             }finally{
               setLoader(false);
             }
          }
          fetchAllData();
        }, []);
          


  return (
    <div className={styles.Admin}>
        <div className={styles.AdminBlock}>
           
            {
               loader &&  <>
                    <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={400} />
                    <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={400} />
                    <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={400} />
               </>

            }
             {
             data.map((item, index) =>{
               return(
                    <div className={styles.AdminCard}>
                       <h2>{item?.user?.name}</h2>
                       <p style={{ color: "blue" }}>{item?.user?.email}</p>
                       <h3>Score : {item?.score}%</h3>
                        <p>{item.feedback}</p>
                   </div>
               );
             })
             }
           
          
           
        </div>
    </div>
  )
}
export default WithAuthHOC(Admin);
