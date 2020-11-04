import React, { Component } from 'react';
import styles from './Board.module.css';
import map from '../Assets/Images/NorthernLand.jpg';
// import Hero from '../Components/Heroes/Hero';
// import Square from '../Components/Square/Square';
import sizingContext from '../Context/sizingContext';
import Renderer from '../Components/Grid/Renderer';
class Board extends Component {

  state = {
    mapGrid: {
       gridWidth: 27,
       gridHeight: 17,
        },
    heroPosition: [1,1],
    
  }

  test = (e) => {
    console.log(e.target.id)
    // let oldPos = [...this.state.heroPosition];
  }
  render() {
   

    return(
      <div className={styles.BoardWrapper}>
        <div className={styles.mapWrap}>
         <img className={styles.map} src={map} alt="clifftop"/>
          <div className={styles.mapCover}>
        <sizingContext.Provider 
        value={this.state}>
         
          
          <Renderer clicked={this.test} />
        </sizingContext.Provider>
        
          </div>
        
         
         </div>
      </div>
    )
  }
}

export default Board