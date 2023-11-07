import React, { useEffect } from 'react'
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SPACE_RANGE, STORE_WAREHOUSES, getWarehouses } from '../../redux/slice/warehouseSlice';
import useFetchWarehouses from '../../customHook/useFetchWarehouses';
const Header = () => {

  const {data, isLoading} = useFetchWarehouses();
     
  const dispatch = useDispatch();

  const warehouses = useSelector(getWarehouses);

  useEffect(()=>{

    dispatch(GET_SPACE_RANGE({
      warehouses
    }));
  },[dispatch,warehouses])
  useEffect(()=>{

    
      dispatch(STORE_WAREHOUSES({
          warehouses: data,
      }))
     

  },[dispatch, data]);

  return (
    <div className={styles.header}>
          <nav className={styles.navbar}>
            <div className={styles["navbar-title"]}>Warehouse Control System</div>
            
          </nav>
        </div>
  )
}

export default Header
