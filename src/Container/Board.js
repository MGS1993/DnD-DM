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
    isHeroMovable: false,
    
  }
  
  handleFlagForMovement = (e) => {
    // e.target.style.backgroundColor = "salmon";
    
    this.setState({
      isHeroMovable: !this.state.isHeroMovable
    })
  }


  handleMoveClick = (e) => {
    
    const cordStrArray = (e.target.id.split(','))
    // console.log(cordStrArray)
    if(cordStrArray.length <= 1) {
      return
    } else {
      let newCord = cordStrArray.map(x => parseInt(x))
      return(this.state.isHeroMovable ? this.moveHero(newCord) : null)
    }
   
  }
  moveHero = (coordinates) => {
    let newPosition = coordinates
    
    this.setState({
      heroPosition: newPosition
    })
    this.handleFlagForMovement();
  }
  
  render() {
   

    return(
      <div className={styles.BoardWrapper}>
        <div className={styles.mapWrap}>
         <img className={styles.map} src={map} alt="clifftop"/>
          <div className={styles.mapCover}>
            <sizingContext.Provider value={this.state}>
              <Renderer moveCmd={this.handleFlagForMovement}  clicked={this.handleMoveClick} />
            </sizingContext.Provider>
          </div>
         </div>
         {/* <button onClick={this.handleMoveClick}>Move Hero 1</button> */}
      </div>
    )
  }
}

export default Board