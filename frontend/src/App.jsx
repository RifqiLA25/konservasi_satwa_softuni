import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./components/Auth/Register";
import UserProfile from "./components/Auth/UserProfile";
import Animals from "./pages/Animals";
import EditAnimal from "./pages/EditAnimal";
import AnimalDetail from "./components/AnimalDetail";
import News from "./pages/News";
import Contact from "./pages/Contact";
import CreateAnimal from "./pages/CreateAnimal";
import CreateNews from "./pages/CreateNews";
import CreateConservation from "./pages/CreateConservation";
import EditNews from "./pages/EditNews";
import Conservation from "./pages/Conservation";
import EditConservation from "./pages/EditConservation";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          {/* Protected Routes (Staff/Admin Only) */}
          <Route
            path="/animals/create"
            element={
              <PrivateRoute>
                <CreateAnimal />
              </PrivateRoute>
            }
          />
          <Route
            path="/animals/edit/:id"
            element={
              <PrivateRoute>
                <EditAnimal />
              </PrivateRoute>
            }
          />
          <Route
            path="/news/create"
            element={
              <PrivateRoute>
                <CreateNews />
              </PrivateRoute>
            }
          />
          <Route
            path="/conservation/create"
            element={
              <PrivateRoute>
                <CreateConservation />
              </PrivateRoute>
            }
          />
          <Route path="/news/edit/:id" element={<EditNews />} />
          <Route path="/conservation" element={<Conservation />} />
          <Route path="/conservation/create" element={<CreateConservation />} />
          <Route path="/conservation/edit/:id" element={<EditConservation />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
