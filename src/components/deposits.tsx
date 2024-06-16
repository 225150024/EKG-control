import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./title";
import './heartBeat.css';

export default function Deposits({bpm}:{bpm:any}) {
  return (
    <React.Fragment>
      <Title>
      <div className="heart">
      <i className="fa-solid fa-heart-pulse" style={{
        color:"red"
      }}></i>
      </div>
        
        Anlık Kalp Atşı</Title>
      <Typography component="p" variant="h4">
        {bpm}
      </Typography>
    </React.Fragment>
  );
}
