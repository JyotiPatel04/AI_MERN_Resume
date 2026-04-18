import React, { useState, useEffect, useContext } from 'react'
import styles from './History.module.css'
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';
import { AuthContext } from '../../utils/AuthContext';

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
  if (!userInfo?._id) return;

  const fetchUserData = async () => {
    setLoader(true);
    try {
      const results = await axios.get(`/api/resume/get/${userInfo._id}`);
      console.log("History API response full:", results.data);
      console.log("History resumes:", results.data.resume);
      setData(results.data.resume || []);
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    } finally {
      setLoader(false);
    }
  };

  fetchUserData();
}, [userInfo]);

  return (
    <div className={styles.History}>
      <div className={styles.HistoryCardBlock}>

        {loader && (
          <>
            <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
            <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
            <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
            <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
          </>
        )}

        {!loader && data.length === 0 && (
  <h2>No History Found</h2>
)}

{data.map((item) => {
  return (
    <div key={item._id} className={styles.HistoryCard}>
      <div className={styles.cardPercentage}>{item.score}%</div>
      <p>Resume Name : {item.resume_name}</p>
      <p>{item.feedback}</p>
      <p>Dated : {item.createdAt.slice(0, 10)}</p>
    </div>
  )
})}

      </div>
    </div>
  )
}

export default WithAuthHOC(History);