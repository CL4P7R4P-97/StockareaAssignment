import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import spinnerImg from '../../../assets/spinner.jpg';
import styles from './warehouseDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GET_WAREHOUSE, STORE_WAREHOUSES, getWarehouses } from '../../../redux/slice/warehouseSlice';
import useFetchWarehouses from '../../../customHook/useFetchWarehouses';
import {HiOutlineStatusOffline, HiOutlineStatusOnline} from 'react-icons/hi';
import imgW from '../../../assets/warehouse.jpeg';
import EditWarehouse from '../editWarehouse/EditWarehouse';
 

const WarehouseDetails = () => {

  
     
 const {id} =useParams();
 
    const dispatch = useDispatch();
    const [warehouse, setWarehouse] = useState({});

    const warehouses = useSelector(getWarehouses);
    
     
    useEffect(()=>{
         
        const w = warehouses.find((warehouse)=>{

          
          if(warehouse.id == id){
            // console.log(warehouse);
            setWarehouse(warehouse);
            return warehouse;
          }
        });
        
        
    },[dispatch,warehouse,warehouses]);

   



  return (
    <section>
      <div className={`container ${styles.warehouse}`}>
        <h2>Warehouse Details</h2>
        <div>
          <Link to="/#warehouses">&larr; Back To Warehouses</Link>
        </div>
        {warehouse === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={imgW} alt={warehouse.name} />
              </div>
              <div className={styles.content}>
                <h3>{warehouse.name +" || "+warehouse.code}</h3>
                <p className={styles.city}>{`Space Available: ${warehouse.space_available}`}</p>
                <p><b>Type:</b> {warehouse.type}</p>
                <p>
                  <b>City</b> {warehouse.city}
                </p>
                <p>
                  <b>Cluster</b> {warehouse.cluster}
                </p>
                <div className={styles.content}>
                  <b>Active</b> <p>{warehouse.is_live ? (<HiOutlineStatusOnline  size={24} style={{color:"blue"}}/>): (<HiOutlineStatusOffline  size={24} style={{color:"red"}}/>)}</p>
                </div>

                <div className={styles.count}>
                  
                </div>
                <Link to={`/edit-warehouse/${id}`}> <button
          className="--btn --btn-danger">Edit
         </button></Link>
              </div>
            </div>
          </>
        )}
        
      </div>
    </section>
    
  )
}

export default WarehouseDetails;
