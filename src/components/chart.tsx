import React from "react";
import { useTheme, Typography, Grid } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone1: string;
  phone2: string;
  gender: string;
  heartBeat: number;
  bpmCounter?: { time: string; value: number }[]; // bpmCounter optional olarak işaretlendi
}

interface DataPoint {
  time: string;
  value: number;
}

interface Props {
  userData: FormData;
}

const Chart: React.FC<Props> = ({ userData }) => {
  const theme = useTheme();

  // Veri işleme ve filtreleme
  const processData = (formData: FormData) => {
    let processedData: DataPoint[] = [];
    if (formData.bpmCounter) {
      formData.bpmCounter.forEach((entry) => {
        processedData.push({
          time: entry.time,
          value: entry.value,
        });
      });
    }
    return processedData;
  };

  const chartData: DataPoint[] = processData(userData);

  return (
    <>
      <Typography gutterBottom>Elektrokardiyogram (EKG) Grafiği</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ResponsiveContainer width={400} height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="linear"
                dataKey="value"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Chart;
