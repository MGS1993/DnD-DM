import React from 'react';
import styles from './Hero.module.css';
import mageIcon from '../../Assets/HeroAssets/mage_hero.png'


const Hero = (props) => {


  return(
    <div onClick={props.moveCmd} className={styles.Hero} id={props.id}>
      <img className={styles.heroSprite} src={mageIcon} alt="player character sprite"/>
    </div>
  )
}


export default Hero