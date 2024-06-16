import * as React from "react";
import { useTheme, Typography, Grid } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
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
const defaultTheme = createTheme();

export default function HomePageChart({ bpm }: { bpm: any }) {
  // BPM verilerini saklamak için bir array
  const [bpmData, setBpmData] = React.useState<
    { time: string; value: number }[]
  >([]);

  // BPM verilerini saklama ve localStorage'a kaydetme
  React.useEffect(() => {
    if (bpm !== null) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newData = { time: currentTime, value: bpm };
      const updatedBpmData = [...bpmData, newData];
      setBpmData(updatedBpmData);
    }
  }, [bpm]);

  // Component ilk yüklendiğinde localStorage'dan verileri almak
  React.useEffect(() => {
    const storedData = localStorage.getItem("bpmData");
    if (storedData) {
      setBpmData(JSON.parse(storedData));
    }
  }, []);
  const theme = useTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Typography gutterBottom>Elektrokardiyogram (EKG) Grafiği</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ResponsiveContainer width={700} height={250}>
            <LineChart
              data={bpmData}
              margin={{ right: 30, left: 20, bottom: 5 }}
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
    </ThemeProvider>
  );
}
