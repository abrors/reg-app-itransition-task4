import { Route, Routes } from "react-router-dom";

import Users from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Users />}/>
        <Route path="/sign-up" element={<Signup />}/>
        <Route path="/log-in" element={<Login />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
