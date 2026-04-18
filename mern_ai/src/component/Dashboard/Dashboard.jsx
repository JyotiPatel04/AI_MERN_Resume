import React, { useContext, useState } from 'react'
import styles from './Dashboard.module.css'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';
import { AuthContext } from '../../utils/AuthContext';
import profilePic from '../../assets/Jyotiphoto.jpg';
const Dashboard = () => {
  const [uploadFiletext, setUploadFileText] = useState("Upload your Resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const { userInfo } = useContext(AuthContext);

  const handleOnChangeFile = (e) => {
    console.log(e);
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name);
  };

  const handleUpload = async () => {
    setResult(null);

    if (!jobDesc || !resumeFile) {
      alert("Please upload resume and paste job description");
      return;
    }

    if (!userInfo?._id) {
      alert("User not logged in properly");
      console.log("userInfo:", userInfo);
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", userInfo._id);

    setLoading(true);

    try {
      const response = await axios.post('/api/resume/addResume', formData);
      console.log("Resume API Response:", response.data);
      setResult(response.data);
    } catch (err) {
      console.log("Upload Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLeft}>
        <div className={styles.DashboardHeader}>
          <div className={styles.DashboardHeaderTitle}>Smart Resume Screening</div>
          <div className={styles.DashboardHeaderLargeTitle}> Resume Match Score</div>
        </div>

        <div className={styles.alertInfo}>
          <div> 📌 Important Instructions</div>
          <div className={styles.dashboardInstruction}>
            <div> 📋 Please paste the complete job description in the "Job Description" field before submitting.</div>
            <div> 📄 Only PDF format (.pdf) resumes are accepted.</div>
          </div>
        </div>

        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>
            {uploadFiletext}
          </div>
          <div className={styles.DashboardInputField}>
            <label htmlFor='inputField' className={styles.analyzeAIBtn}>Upload Resume</label>
            <input type='file' accept=".pdf" id='inputField' onChange={handleOnChangeFile} />
          </div>
        </div>

        <div className={styles.jobDesc}>
          <textarea
            className={styles.textArea}
            placeholder='Paste Job Description'
            rows={10}
            cols={50}
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          ></textarea>

          <div className={styles.AnalyzeBtn} onClick={handleUpload}>Analyze</div>
        </div>
      </div>

      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
  <div>Analyze With AI</div>
 <div className={styles.profileAvatar}>
  {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
</div>
<h2>{userInfo?.name}</h2>
</div>

        {result && (
          <div className={styles.DashboardRightTopCard}>
            <div>Result</div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
              <h1>
                {result?.score || result?.data?.score || "0"}%
              </h1>
              <CreditScoreIcon sx={{ fontSize: 22 }} />
            </div>

            <div className={styles.feedback}>
              <h3>Feedback</h3>
              <p>
                {result?.feedback ||
                  result?.data?.feedback ||
                  result?.result ||
                  "No feedback available"}
              </p>
            </div>
          </div>
        )}

        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "20px" }}
            width={280}
            height={280}
          />
        )}
      </div>
    </div>
  )
}

export default WithAuthHOC(Dashboard);