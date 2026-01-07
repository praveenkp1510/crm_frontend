import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Customer from "./pages/Customer"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </BrowserRouter>
  )
}
