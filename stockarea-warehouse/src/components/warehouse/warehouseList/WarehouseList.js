import React, { useEffect, useState } from 'react'
import styles from './warehouseList.module.scss';

import {BsFillGridFill} from 'react-icons/bs';
import {FaListAlt} from 'react-icons/fa';
import Search from '../../search/Search';
 
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_ORDER, FILTER_BY_SEARCH, selectFilteredWarehouses } from '../../../redux/slice/filterSlice';
import WarehouseItem from '../warehouseItem/WarehouseItem';
 

const WarehouseList = ({warehouses}) => {

  // console.log(warehouses);
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("All");
  const filteredWarehouses = useSelector(selectFilteredWarehouses);
 
 
 



  const currentWarehouses = filteredWarehouses.length === 0 ?  warehouses : filteredWarehouses.slice(0,); 
  const dispatch = useDispatch();

  useEffect(()=>{

    
    
    dispatch(FILTER_BY_SEARCH({

      warehouses:warehouses, search

    }));

  },[dispatch, search, warehouses]);


  useEffect(()=>{

    dispatch(FILTER_BY_ORDER({

      warehouses,sort
    }))
  },[dispatch,sort])

  

  return (
    <div className={styles["warehouse-list"]} id="warehouse">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{currentWarehouses.length}</b> Warehouses found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
        {/* Sort Warehouses */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value  = {sort} onChange={(e)=>setSort(e.target.value)} >

            <option value="increasing">Space increasing</option>
            <option value="decreasing">Space decreasing</option>
            <option value="live">Live</option>
            <option value="offline">Offline</option>
             
            
             
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {currentWarehouses.length === 0 ? (
          <p>No Warehouse found.</p>
        ) : (
          <>
            {currentWarehouses.map((warehouse) => {
              return (
                <div key={warehouse.id}>
                  <WarehouseItem {...warehouse} grid={grid} warehouse={warehouse} />
                </div>
              );
            })}
          </>
        )} 
        
      </div>
    </div>
  )
}

export default WarehouseList
