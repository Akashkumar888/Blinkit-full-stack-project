import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />

      <main className="min-h-[78vh]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default App;