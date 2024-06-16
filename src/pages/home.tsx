import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Deposits from "../components/deposits";
import UserForm from "../components/userForm";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePageChart from "../components/homePageChart";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home() {
  const [bpm, setBpm] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://192.168.1.1/data")
        .then((response) => {
          setBpm(response.data.bpm);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            height: "100%",
            width: "100vw",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 1, mb: 4 }}>
            <Grid container spacing={3} sx={{ display: "flex" }}>
              {/* Chart */}
              <Grid item lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 270,
                  }}
                >
                  <HomePageChart bpm={bpm} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 270,
                  }}
                >
                  <Deposits bpm={bpm} />
                </Paper>
              </Grid>
            </Grid>
            <UserForm bpm={bpm} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
