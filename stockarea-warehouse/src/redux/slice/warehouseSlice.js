import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    warehouses:[],
    minSpace: null,
    maxSpace: null,

}

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
 
    
    STORE_WAREHOUSES:(state,action)=>{
           
          //  console.log("getting warehouses in redux" + action.payload.warehouses.slice());
           state.warehouses = action.payload.warehouses;
          // console.log(state.warehouses);
          }  

  ,

  GET_SPACE_RANGE:(state,action)=>{

             const {warehouses} = action.payload;

             let spaces = [];
             warehouses.map((warehouse)=>spaces.push(Number(warehouse.space_available)));
             state.minSpace = Math.min(...spaces);
             state.maxSpace = Math.max(...spaces);
            
               
  },

  UPDATE_WAREHOUSE:(state,action)=>{

    const { index, warehouse } = action.payload;
      const updatedObjects = [...state.warehouses]; // Create a copy of the array
      updatedObjects[index] = warehouse; // Update the object at the specified index

      state.warehouses = updatedObjects;
  }
  
 

}
});

export const {STORE_WAREHOUSES, GET_SPACE_RANGE, UPDATE_WAREHOUSE} = warehouseSlice.actions

export const getWarehouses =(state)=>state.warehouse.warehouses;
export const selectMaxSpace =(state)=>state.warehouse.maxSpace;
export const selectMinSpace =(state)=>state.warehouse.minSpace;
export default warehouseSlice.reducer