import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    filteredWarehouses: [],

}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {

    FILTER_BY_SEARCH: (state,action)=>{

     
      const {warehouses, search} = action.payload;
     if(search === ""){
      state.filteredWarehouses = warehouses;
      // console.log("fHouses with name"+ search);
     }
     else{
      state.filteredWarehouses = warehouses.filter((warehouse)=>warehouse.name.toLowerCase().includes(search.toLowerCase())||warehouse.city.toLowerCase().includes(search.toLowerCase()));
     }
    },

    FILTER_BY_CITY: (state,action)=>{

      const {warehouses, city} = action.payload;
      if(city == "All"){
        state.filteredWarehouses = warehouses.slice(0,);
      }

      else{
        // console.log("filtering by city" + city, warehouses);
      state.filteredWarehouses = warehouses.filter((warehouse)=>warehouse.city === city);
      // console.log(city);
      }


    },

    FILTER_BY_CLUSTER: (state,action)=>{
        
      const {warehouses, cluster, city} = action.payload;
      if(cluster == "All"){
        state.filteredWarehouses = warehouses.slice(0,);
      }

      else{
        // console.log("filtering by cluster" + cluster, warehouses);
      state.filteredWarehouses = warehouses.filter((warehouse)=>warehouse.cluster === cluster );
      // console.log(cluster);
      }
    },

    FILTER_BY_SPACE: (state,action)=>{
      const {warehouses,space} = action.payload;

      if(space == null || space === undefined){
        state.filteredWarehouses = warehouses.slice(0,);
      }

      else{
        // console.log("filtering by space" + space, warehouses);
      state.filteredWarehouses = warehouses.filter((warehouse)=>warehouse.space_available <= space );
      // console.log(space);
      }
      
      

    }
,
    FILTER_BY_ORDER:(state,action)=>{

      const {warehouses, sort} = action.payload;
      let tempWarehouses = [];

      if(sort === "live"){
        tempWarehouses = warehouses.filter((warehouse)=>warehouse.is_live === true)
      }
      else if(sort === "offline"){
        tempWarehouses = warehouses.filter((warehouse)=>warehouse.is_live === false)
      }
      
     else if(sort === "increasing"){
      tempWarehouses = warehouses.slice().sort((a,b)=>{return Number(a.space_available) - Number(b.space_available)})
      }
      else{
        tempWarehouses = warehouses.slice().sort((a,b)=>{return Number(b.space_available) - Number(a.space_available) })
      }


      state.filteredWarehouses = tempWarehouses;
    },
     
  }
});

export const {FILTER_BY_CITY, FILTER_BY_CLUSTER,FILTER_BY_ORDER, FILTER_BY_SPACE, FILTER_BY_SEARCH} = filterSlice.actions

export const selectFilteredWarehouses = (state)=>{

  // console.log(state);
  return state.filter.filteredWarehouses;
};

export default filterSlice.reducer