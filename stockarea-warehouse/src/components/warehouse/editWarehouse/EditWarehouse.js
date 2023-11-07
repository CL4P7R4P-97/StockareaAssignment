import React, { useEffect, useState } from 'react'
import styles from './editWarehouse.module.scss';
import Card from '../../../components/card/Card';
import { toast } from 'react-toastify';
 
import { useNavigate, useParams } from 'react-router-dom';
 
import { STORE_WAREHOUSES, UPDATE_WAREHOUSE, getWarehouses } from '../../../redux/slice/warehouseSlice';
import { useDispatch, useSelector } from 'react-redux';
import useFetchWarehouses from '../../../customHook/useFetchWarehouses';


const types = [
    
    {id: 1, name: "Warehouse Service"},
    {id: 2, name: "Leasable Space"},

]


const initialState = {
    
    name: "",
        imageURL: "",
        price: 0,
        category: "",
        brand: "",
        desc: ""
}

const EditWarehouse = () => {

    const navigate = useNavigate();
    const [warehouse, setWarehouse]  = useState({});
    
    const {data} = useFetchWarehouses();
    const [isLoading, setIsLoading] = useState(false);
     
    const {id} =useParams();
    
      
    const dispatch  = useDispatch();
   
       const warehouses = useSelector(getWarehouses);
       
        
       useEffect(()=>{
           
        //  console.log(id);
        //    console.log( data);
           dispatch(STORE_WAREHOUSES({
               warehouses: data,
           }))
          
           const w = data.find((warehouse)=>{
   
             
             if(warehouse.id == id){
               console.log(warehouse);
               setWarehouse(warehouse);
               return warehouse;
             }
           });
           
           
       },[dispatch, data]);
   
    const handleInputChange = (e) => {

        let {name, value} = e.target;
        if(name == "space_available"){
            value = Number(value);
        }
        setWarehouse({...warehouse, [name]:value})

    }
  


    
    const addWarehouse =  (e)=>{
        setIsLoading(true);
        // console.log("adding");
        e.preventDefault();
        try{

            // console.log("warehouses");
            // console.log(warehouses);
           console.log(warehouse);
            const indexToUpdate = warehouses.findIndex((w) => w.id == warehouse.id);

            //    console.log("redux updating")
            dispatch(UPDATE_WAREHOUSE({

            warehouse: warehouse, 
            index: indexToUpdate
           }));
              setIsLoading(false);
              toast.success("Product added");
             
             navigate('/');


        }
        catch(error){
           
            setIsLoading(false);
            toast.error("Error adding product");
        }
    }

    


  return (
    
    <>
    {isLoading && <h3>Loading...</h3>}
    <div className={styles.warehouse}>
            <h1>Edit Warehouse</h1>

            <Card  cardClass={styles.card}>

            <form onSubmit={(e)=>addWarehouse(e)}>
                
            <label>Product name:</label>
             <input type="text" placeholder='Warehouse name' 
             required name="name" value={warehouse.name} onChange={(e)=>handleInputChange(e)}  />  

            
         
             <label>Warehouse Space:</label>
             <input type="text" placeholder='Warehouse space' 
             required name="space_available" value={warehouse.space_available} onChange={(e)=>handleInputChange(e)}  /> 


<label>Warehouse Type:</label>
             <select type="text"   
             required name="type" value={warehouse.type} onChange={(e)=>handleInputChange(e)}  > 
            
            <option value="" disabled>--  choose warehouse type --</option>
             {types.map((type)=>{

                return (
                    <option key={type.id} value = {type.name}>{type.name}</option>
                )
             })}

            </select>

            <label>City:</label>
             <input type="text" placeholder='Warehouse city' 
             required name="city" value={warehouse.city} onChange={(e)=>handleInputChange(e)}  /> 

<label>Warehouse Live ?:</label>
             <select type="text"   
             required name="is_live" value={warehouse.is_live} onChange={(e)=>handleInputChange(e)}  > 
            
            <option value="" disabled>--  choose status --</option>
             
               
                    <option key={1} value = {true}>True</option>
                    <option key={2} value = {false}>False</option>
           

            </select> 

            <label>Warehouse Registered ?:</label>
             <select type="text"   
             required name="is_registered" value={warehouse.is_registered} onChange={(e)=>handleInputChange(e)}  > 
            
            <option value="" disabled>--  choose status --</option>
             
               
                    <option key={1} value = {true}>True</option>
                    <option key={2} value = {false}>False</option>
           

            </select> 

 
<button className='--btn --btn-primary' >Save Warehouse</button>
                </form>  


              </Card>

    </div>
    </>
  )
}

export default EditWarehouse
