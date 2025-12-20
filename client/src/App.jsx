import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="min-h-[78vh]">

      <AppRoutes />
      </main>
      <Footer />
    </>
  );
};

export default App;
