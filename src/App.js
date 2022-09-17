import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { UserAuth } from "./pages/UserAuth";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={ user ? <Home /> : <Navigate to="/login" /> }></Route>
            <Route path="/login" element={ !user ? <UserAuth textAuth="Log in" typeAuth="login" /> : <Navigate to="/" /> }></Route>
            <Route path="/signup" element={ !user ? <UserAuth textAuth="Sig n up" typeAuth="signup" /> : <Navigate to="/" /> }></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
