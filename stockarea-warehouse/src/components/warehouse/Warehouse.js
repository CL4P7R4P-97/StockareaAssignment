import React, { useEffect, useState } from 'react'
import styles from './Warehouse.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import useFetchWarehouses from '../../customHook/useFetchWarehouses';
import { GET_SPACE_RANGE, STORE_WAREHOUSES, getWarehouses } from '../../redux/slice/warehouseSlice';
import WarehouseFilter from './warehouseFilter/WarehouseFilter';
import WarehouseList from './warehouseList/WarehouseList';
import { FaCogs } from 'react-icons/fa';
import spinnerImg from '../../assets/spinner.jpg';
const Warehouse = () => {

    const {data, isLoading} = useFetchWarehouses();
     
    const [showFilter, setShowFilter] = useState(false);
    const dispatch = useDispatch();

    const warehouses = useSelector(getWarehouses);

    useEffect(()=>{

      dispatch(GET_SPACE_RANGE({
        warehouses
      }));
    },[dispatch,warehouses])
    useEffect(()=>{

        
        
       

    },[dispatch, data]);


  const toggleFilter = ()=>{

    setShowFilter(!showFilter);
  }


  return (
    <section >
      <div className={`container ${styles.warehouse}`}>
        <aside
                 className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}

        >
          {isLoading ? null : <WarehouseFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <WarehouseList warehouses={warehouses} />
           
          )}
          <div className={styles.icon} onClick={toggleFilter} >
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Warehouse
