import React from 'react';
import styles from './Hero.module.css';


const Hero = (props) => {


  return(
    <div onClick={props.moveCmd} className={styles.Hero} id={props.id}>
      ♘
    </div>
  )
}


export default Hero