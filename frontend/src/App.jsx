import { Outlet } from "react-router-dom";
import Navigation from "./pages/auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <Navigation />
      <ToastContainer />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
