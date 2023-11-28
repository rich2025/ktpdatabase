import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Home from "./pages/home/Home";
import Academics from "./pages/academics/Academics";
import Professional from "./pages/professional/Professional";
import Calendar from "./pages/calendar/Calendar";
import Error from "./pages/error/Error";

import "./App.css";

const App = () => {
  return (
    <div>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/professional" element={<Professional />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </SnackbarProvider>
    </div>
  );
};

export default App;