import { useEffect, useState } from "react";
import CircularProgressWithLabelComponent from "../components/circular-progress-with-label-component.component";
import { Box } from "@mui/material";
import logo from '../logo.png';
export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box className="m-20">
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <img src={logo} width={50} />
      </Box>
      <h1>Welcome FMDCA VIEWER</h1>
      <p>Please be patient while the application loads the necessary data and files. This process may take approximately 3 to 4 minutes. <br />
        <span style={{ color:'red'}} > Note that this initial loading time occurs only the first time you open the application subsequent launches will be immidiate.</span>
      </p>
      <CircularProgressWithLabelComponent value={progress} />
      <h6>Thank you!</h6> 

    </Box>
  );
}