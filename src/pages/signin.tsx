import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "../components/heartBeat.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import ChartComponent from "../components/chart";

interface UserCredentials {
  email: string;
  password: string;
}
interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone1: string;
  phone2: string;
  gender: string;
  heartBeat: any;
}
function SignIn() {
  const navigate = useNavigate();
  const [choose, setChoose] = useState<Boolean>(true);
  const [searchId, setSearchId] = useState("");
  const [userData, setUserData] = useState<any | null>(null);
  const [formDataList, setFormDataList] = React.useState<FormData[]>([]);

  React.useEffect(() => {
    const storedData = localStorage.getItem("formDataList");
    if (storedData) {
      setFormDataList(JSON.parse(storedData));
    }
  }, []);
  const handleSearch = () => {
    // Find user by id
    const foundUser = formDataList.find((user) => user.id === searchId);

    if (foundUser) {
      setUserData(foundUser);
      enqueueSnackbar("Hasta Bulundu!", { variant: "success" });
    } else {
      setUserData(null);
      enqueueSnackbar("Yanlış ID!", { variant: "error" });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("userCredentials", JSON.stringify(userCredentials));
    setUserCredentials({ email: "", password: "" });

    if (
      userCredentials.email === "kou2251" &&
      userCredentials.password === "kou2251"
    ) {
      enqueueSnackbar("Başarılı Giriş!", { variant: "success" });
      navigate("/");
    } else {
      enqueueSnackbar("Başarısiz Giriş!", { variant: "error" });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ position: "relative", top: "50px" }}>
        <Button onClick={() => setChoose(true)}>Doktor Giriş</Button>
        <Button onClick={() => setChoose(false)}>Hasta Giriş</Button>
      </Box>
      {choose ? (
        <ThemeProvider theme={createTheme()}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Giriş Yap
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={userCredentials.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={userCredentials.password}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Beni Hatırla"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Giriş yap
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Şifreni mi Unuttun?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Hesapın Yok Mu? Yeni Hesap Oluştur"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={createTheme()}>
          <Container component="main">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              maxWidth="xs"
            >
              <TextField
                fullWidth
                id="userId"
                label="Kullanıcı ID'si"
                value={searchId}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" onClick={handleSearch}>
                Ara
              </Button>
            </Box>
            <Box
              sx={{
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {userData && (
                <TableContainer sx={{ display: "flex", width: "100%" }}>
                  <Box>
                    <ChartComponent userData={userData} />
                  </Box>
                  <Box>
                    <Table
                      aria-label="user data table"
                      sx={{ width: "340px", textTransform: "capitalize" }}
                    >
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            İsim
                          </TableCell>
                          <TableCell>{userData.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Soyisim
                          </TableCell>
                          <TableCell>{userData.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Cinsiyet
                          </TableCell>
                          <TableCell>{userData.gender}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Kalp Atışı
                          </TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              columnGap: "10px",
                            }}
                          >
                            <p>{userData.heartBeat}</p>
                            <div className="heart" style={{ fontSize: "35px" }}>
                              <i
                                className="fa-solid fa-heart-pulse"
                                style={{
                                  color: "red",
                                  fontSize: "35px",
                                }}
                              ></i>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </TableContainer>
              )}
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </Box>
  );
}

export default SignIn;
