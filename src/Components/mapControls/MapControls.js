import React from 'react';
import styles from './MapControls.module.css';


const MapControls = (props) => {
  
  let dropDown = [];
  for(let i=1; i<=10; i++) {
    
  dropDown.push(<option key={`value:${i}`}value={i}>{i}</option>)
  }
  
// console.log(ref.enemiesQuantity)
  return (
    <div className={styles.MapControlsWrapper}>
      <div className={styles.enemySettings}>
        <label>
          Enemies:
          <select onChange={props.enemyQuantity}>
            {dropDown}
          </select>
        </label>
      </div>
      <div className={styles.heroSettings}>
        <label>
          Heroes:
          <select onChange={props.heroQuantity}>
            {dropDown}
          </select>
        </label>
       
      </div>
    </div>
  )
}
///(e) => console.log(e.target.value)
export default MapControls