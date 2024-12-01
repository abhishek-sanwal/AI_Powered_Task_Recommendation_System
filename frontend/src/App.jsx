import { Route, Routes } from "react-router-dom";

// import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectEdit from "./pages/ProjectEdit";
// import Logout from "./pages/Logout";
// import PageNotFound from "./pages/PageNotFound";
import ProjectList from "./pages/ProjectList";
import ProjectShow from "./pages/ProjectShow";
import Registration from "./pages/Registration";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<ProjectList />} />
      <Route path="/create" element={<ProjectCreate />} />
      <Route path="/update" element={<ProjectEdit />} />
      <Route path="/show" element={<ProjectShow />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
}

export default App;
