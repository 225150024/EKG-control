import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from "./routes/rout";

function App() {
  const router = createBrowserRouter(Routes);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
