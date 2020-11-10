import React from 'react';
import styles from './Enemy.module.css';
import monster from '../../Assets/EnemyAssets/monster_chocobo.png'

const Enemy = (props) => {


  return(
    <div  onClick={props.moveCmd} className={styles.Enemy} id={props.id}>
      <img className={styles.enemySprite} src={monster} alt="large bipedal bird"></img>
    </div>
  )
}

export default Enemy