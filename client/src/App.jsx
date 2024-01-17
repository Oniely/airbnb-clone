import axios from "axios";
import { UserContextProvider } from "./utility/UserContext";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import BookingPage from "./pages/BookingPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";

// adding a base URL for http request with axios
// from: axios.get('http://localhost:4000/something')
// to: axios.get('/something') because there is a base url that start with localhost:4000
axios.defaults.baseURL = "http://localhost:4000";
// to set cookies when making http request with axios, axios makes the HTTP request using credentials
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/account/user-places" element={<PlacesPage />} />
          <Route path="/account/user-places/new" element={<PlacesFormPage />} />
          <Route path="/account/user-places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
