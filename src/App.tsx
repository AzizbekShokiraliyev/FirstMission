import { Route, Routes } from "react-router-dom"
import RoutesLanding from "./pages/landingPage/RoutesLanding"
import LoginPage from "./pages/loginPage/LoginPage"
import RegisterPage from "./pages/registerPage/RegisterPage"
import DashboardPage from "./pages/dashboardPage/DashboradPage"

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<RoutesLanding/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
      </Routes>
  )
}

export default App
