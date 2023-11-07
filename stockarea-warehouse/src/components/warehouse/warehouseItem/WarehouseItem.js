import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./warehouse.module.scss";
import Card from "../../card/Card";
import warehouseImg from '../../../assets/warehouse.jpeg'
import {HiOutlineStatusOnline,HiOutlineStatusOffline} from 'react-icons/hi';

const WarehouseItem = ({  grid, id, name, city, space_available, is_live, type }) => {
  const dispatch = useDispatch();
  


  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/warehouse-details/${id}`}>
        <div className={styles.img}>
          <img src={warehouseImg} alt={name} />
          {is_live ? (<HiOutlineStatusOnline  size={24} style={{color:"blue"}}/>): (<HiOutlineStatusOffline  size={24} style={{color:"red"}}/>)}
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`Location: ${city}`}</p>
          <h4>{name}</h4>
        </div>
        {!grid && <p className={styles.desc}>{type}</p>}

       
          <Link to={`/warehouse-details/${id}`}> <button
          className="--btn --btn-danger">Check
         </button>
        </Link>
          
         
      </div>
    </Card>
  );
};

export default WarehouseItem;