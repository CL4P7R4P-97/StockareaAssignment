 
import { useEffect, useState } from 'react';
import {warehousesData} from '../../src/data/warehouseData';
import { toast } from 'react-toastify';



const useFetchWarehouses = () => {
  
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const getWarehouses = () =>{

        setIsLoading(true);

        try{
             
    setData(warehousesData);
    setIsLoading(false);
    //  console.log(warehousesData);
    
     

           

        }
        catch(error){
            console.log(error);
            setIsLoading(false);
            toast.error("Unable to load data");
        }
    }

    useEffect(()=>{

        getWarehouses();
    },[]);

    
    return {data, isLoading};
}

export default useFetchWarehouses;
