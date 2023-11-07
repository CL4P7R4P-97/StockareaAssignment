
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import WarehousDetails from './components/warehouse/warehouseDetails/WarehouseDetails';
import Home from './pages/home/Home';
import EditWarehouse from './components/warehouse/editWarehouse/EditWarehouse';
 

function App() {
  return (
    <>
    <BrowserRouter>
    
    <Header>
    </Header>
    <Routes>

      <Route path='/' element={<Home />} ></Route>
      <Route path='/warehouse-details/:id' element={ < WarehousDetails/> } ></Route>
      <Route path='/edit-warehouse/:id' element={ < EditWarehouse/> } ></Route>
           
    </Routes>

     <Footer></Footer>
   
    </BrowserRouter>
    
    
    </> );
}

export default App;
