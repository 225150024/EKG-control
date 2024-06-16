import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const navItems = [
    { label: "Ana Sayfa", action: () => navigate("/") },
    { label: "Hasta Kayıtları", action: () => navigate("/results") },
    {
      label: "Çıkış Yap",
      action: () => {
        localStorage.removeItem("userCredentials");
        navigate("/login");
      },
    },
  ];

  const storedUserCredentials = localStorage.getItem("userCredentials");
  const userCredentials = storedUserCredentials
    ? JSON.parse(storedUserCredentials)
    : null;
  return (
    <Box>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            Elektrokardiyogram
          </Typography>
          {userCredentials && userCredentials.email !== "" && (
            <Box>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  sx={{ color: "#fff" }}
                  onClick={item.action}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
