import './App.css';
import Countries from "./screens/Countries"
import CountryDetail from "./screens/CountryDetail"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './screens/LandingPage';
import FormActivity from './screens/FormActivity';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LandingPage />}></Route>
      <Route exact path="/countries" element={<Countries />}></Route>
      <Route exact path="/countries/:id" element={<CountryDetail />}></Route>
      <Route exact path="/activities" element={<FormActivity />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

