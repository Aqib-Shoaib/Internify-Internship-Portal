import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import InternshipsListingPage from "./pages/InternshipsListingPage";
import Loginpage from "./pages/Loginpage";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 80, // Trigger animation 120px before the element is in the viewport
      delay: 0, // No delay for animation start
      easing: "ease", // Easing function for animations
      once: false,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/internship" element={<InternshipsListingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
