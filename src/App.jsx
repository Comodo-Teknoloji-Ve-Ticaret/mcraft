import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import './i18n'
import Nav from './Components/Nav/Nav'
import Index from './Components/Pages/Index'
import Contact from './Components/Pages/Contact'
import Footer from './Components/Footer/Footer'
import Activities from './Components/Pages/Activities'
import LanguageSwitcher from './Components/LanguageSwitcher'


function App() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {location.pathname !== '/' && <Footer />}
    </>
  )
}

export default App
