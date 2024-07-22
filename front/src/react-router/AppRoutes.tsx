import {
    BrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
import Home from '../Home';
import About from '../About';
import Header from '../layout/header';
import Footer from '../layout/footer';
import WalletDetail from "../WalletDetail";
  
  const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/wallet/:id' element={<WalletDetail />} />
            <Route path='/about' element={<About />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    )
  }
  
  export default AppRoutes;