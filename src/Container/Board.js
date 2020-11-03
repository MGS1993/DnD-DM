import React, { Component } from 'react';
import styles from './Board.module.css';
import map from '../Assets/Images/NorthernLand.jpg';
// import Hero from '../Components/Heroes/Hero';
// import Square from '../Components/Square/Square';
import RenderSquare from '../Components/Grid/renderSquare';
import sizingContext from '../Context/sizingContext';

class Board extends Component {

  state = {
    mapGrid: {
       gridWidth: 27,
       gridHeight: 17,
    }
  }

  
  render() {
   let heroPosition = [0,0]
   ///make it a state later
    
    return(
      <div className={styles.BoardWrapper}>
        <div className={styles.mapWrap}>
         <img className={styles.map} src={map} alt="clifftop"/>
          <div className={styles.mapCover}>
        <sizingContext.Provider 
        value={
           this.state.mapGrid}>
          {RenderSquare(0, 0, heroPosition)}
          {RenderSquare(1, 0, heroPosition)}
          {RenderSquare(2, 0, heroPosition)}
        </sizingContext.Provider>
          </div>
        
         
         </div>
      </div>
    )
  }
}

export default Board