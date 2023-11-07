import React, { useEffect } from 'react'
import Slider from '../../components/slider/Slider';
import Warehouse from '../../components/warehouse/Warehouse';
const Home = () => {


    //helps in scroll to location.
    const url = window.location.href;
  
    const scrollToProducts = ()=>{
  
      if(url.includes("#warehouse")){
        window.scrollTo({
          top: 700,
          behavior: 'smooth'
        })
  
        return
        
      }
    }
  
    useEffect(()=>{
  
      scrollToProducts();
  
    },[])
  
    return (
      <div>
       <Slider />
       <Warehouse  />
      </div>
    )
  }
  
  export default Home;
