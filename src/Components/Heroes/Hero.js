import React, {useEffect} from 'react';
import styles from './Hero.module.css';
import mageIcon from '../../Assets/HeroAssets/mage_hero.png'


const Hero = (props) => {

useEffect(() => {
  console.log('Hero.js rendered...')
})
  return(
    <div onClick={props.moveCmd} className={styles.Hero} id={props.id}>
      <img className={styles.heroSprite} src={mageIcon} alt="player character sprite"/>
    </div>
  )
}


export default Hero