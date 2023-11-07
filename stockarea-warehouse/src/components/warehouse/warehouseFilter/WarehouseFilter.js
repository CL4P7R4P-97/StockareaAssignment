import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  GET_SPACE_RANGE,
  getWarehouses,

  selectMaxSpace,
  
  selectMinSpace,

} from "../../../redux/slice/warehouseSlice";
import styles from "./warehouse.module.scss";
import { FILTER_BY_CITY, FILTER_BY_CLUSTER, FILTER_BY_SPACE, selectFilteredWarehouses } from "../../../redux/slice/filterSlice";

const WarehouseFilter = () => {
 
 
  
  const warehouses = useSelector(getWarehouses);
  const minSpace = useSelector(selectMinSpace);
  const maxSpace = useSelector(selectMaxSpace);
  const [cluster , setCluster] = useState("");
  const [city, setCity] = useState("");
  const [space, setSpace] = useState(minSpace||1);

  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch(FILTER_BY_SPACE({ warehouses , space}));
   
  }, [dispatch, warehouses, space]);

  


  const allCities = [
    "All",
    ...new Set(warehouses.map((warehouse) => warehouse.city)),
  ];
//   console.log(allCategories);
  const allClusters = [
    "All",
    ...new Set(warehouses.map((warehouse) => warehouse.cluster)),
  ];
//   console.log(allBrands);


useEffect(()=>{

  dispatch(FILTER_BY_CLUSTER({
    warehouses: warehouses,
    cluster:cluster,
  
  }))
},[dispatch,cluster,warehouses])

useEffect(()=>{

 

    dispatch(FILTER_BY_CITY({

      warehouses: warehouses,
      city: city,
    

    }));
},[dispatch,warehouses,city])






  
  const clearFilters = () => {
   
    setSpace(maxSpace);
    setCity("All");
    setCluster("All");
  };

  return (
    <div className={styles.filter}>

<h4>Cities</h4>
      <div className={styles.category}>
        {allCities.map((city, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${city}` === city ? `${styles.active}` : null}
              onClick={()=>setCity(city)}
            >
              &#8250; {city}
            </button>
          );
        })}
      </div>
      



      <div className={styles.brand}>
       <h4> Clusters</h4>
        <select value={cluster} onChange={(e)=>setCluster(e.target.value)}>
        {allClusters.map((cluster, index) => {
          return (
            <option
              key={index}
            >
               {cluster}
            </option>
          );
        })}
        </select>
        <h4>Space</h4>
        <p>{`${space}`}</p>
        <div className={styles.space}>
          <input
            type="range"
            value={space}
            onChange={(e) => setSpace(e.target.value)}
            min={minSpace}
            max={maxSpace}
          />
        </div>
        <br />
        <button className="--btn --btn-danger"  onClick={clearFilters}>
          Clear Filter
        </button>
      </div>
       
        
      </div>
   
  );
};

export default WarehouseFilter;