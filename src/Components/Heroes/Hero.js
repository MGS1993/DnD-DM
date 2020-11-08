import React from 'react';
import styles from './Hero.module.css';


const Hero = (props) => {


  return(
    <div onClick={props.moveCmd} className={styles.Hero}>
      ♘
    </div>
  )
}


export default Hero