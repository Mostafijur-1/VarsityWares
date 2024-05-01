import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../layouts/Navbar";
import AllProducts from "../components/AllProducts";

const Index = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Index;
