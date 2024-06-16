import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";

const defaultTheme = createTheme();

interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone1: string;
  phone2: string;
  gender: string;
  heartBeat: any;
  bpmCounter: { time: string; value: number }[];
}

export default function UserForm({ bpm }: { bpm: any }) {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = React.useState<FormData>({
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    phone1: "",
    phone2: "",
    gender: "",
    heartBeat: bpm,
    bpmCounter: [],
  });

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      gender: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.phone1 ||
      !formData.phone2 ||
      !formData.gender
    ) {
      enqueueSnackbar("Lütfen tüm alanları doldurun ve cinsiyeti seçin.", {
        variant: "warning",
      });
      return;
    }
    function generateShortId(): string {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }
    const newFormData: FormData = {
      ...formData,
      id: generateShortId(),
      heartBeat: bpm || null,
      bpmCounter: bpmData, // bpmCounter olarak bpmData'yı ekliyoruz
    };

    const existingData = localStorage.getItem("formDataList");
    const formDataList = existingData ? JSON.parse(existingData) : [];
    formDataList.push(newFormData);
    localStorage.setItem("formDataList", JSON.stringify(formDataList));

    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      address: "",
      phone1: "",
      phone2: "",
      gender: "",
      heartBeat: bpm || null,
      bpmCounter: [], // bpmCounter'ı sıfırlıyoruz
    });

    enqueueSnackbar("Form başarıyla gönderildi!", { variant: "success" });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="İsim"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Soyisim"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex" }}>
                <FormControl
                  component="fieldset"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FormLabel sx={{ marginRight: 2 }}>Cinsiyet</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleGenderChange}
                    row
                  >
                    <FormControlLabel
                      value="erkek"
                      control={<Radio />}
                      label="Erkek"
                    />
                    <FormControlLabel
                      value="kadin"
                      control={<Radio />}
                      label="Kadın"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Adres bilgisi"
                  name="address"
                  autoComplete="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="phone1"
                  label="Telefon 1"
                  name="phone1"
                  autoComplete="phone1"
                  value={formData.phone1}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="phone2"
                  label="Telefon 2"
                  name="phone2"
                  autoComplete="phone2"
                  value={formData.phone2}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.address ||
                !formData.phone1 ||
                !formData.phone2 ||
                !formData.gender
              }
            >
              Gönder
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
