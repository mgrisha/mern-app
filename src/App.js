import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { UserAuth } from "./pages/UserAuth";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<UserAuth textAuth="Log in" typeAuth="login" />}></Route>
            <Route path="/signup" element={<UserAuth textAuth="Sign up" typeAuth="signup" />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
