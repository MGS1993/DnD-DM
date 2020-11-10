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
        heroPosition: {
          hero1: [1,2],
          hero2: [3,5],
        },
        enemyPosition: {
          enemy1: [10,10],
          enemy2: [12,11],
        },
      isHeroMovable: false,
      clickedObject: null,
      
  }
  
  // async componentDidMount() {
  //   const response = await fetch(
  //     `https://www.dnd5eapi.co/api/monsters/kobold`)
  //   const data = await response.json();
  //   console.log(data)
  // }

  handleFlagForMovement = (e) => {
    this.setState({
      isHeroMovable: !this.state.isHeroMovable
    })
  }


  handleMoveClick = (e) => {
    let currentTarget = e.target.parentElement.id
    const cordStrArray = (e.target.id.split(','))
   
    if(cordStrArray.length <= 1) {

      return this.setState({clickedObject: currentTarget})
      
    } else {
      let newCord = cordStrArray.map(x => parseInt(x))
      return(this.state.isHeroMovable ? this.moveHero(newCord) : null)
    }
   
  }
  
  moveHero = (coordinates) => {
    console.log('moveHero ran...')
    let target = this.state.clickedObject
    let newPos = Object.assign({}, this.state.heroPosition);
    let newEnemyPos = Object.assign({}, this.state.enemyPosition);

    for(let i=1; i<=Object.keys(newPos).length; i++) {
      
      if(target === `hero${i}`) {
        newPos[`hero${i}`] = coordinates
        this.setState({
          heroPosition: newPos
        })
        this.handleFlagForMovement();
        
      }
    }
    
    for(let i=1; i<=Object.keys(newEnemyPos).length; i++) {
      
      if(target === `enemy${i}`) {
        newEnemyPos[`enemy${i}`] = coordinates
        this.setState({
          enemyPosition: newEnemyPos
        })
        this.handleFlagForMovement();
        
      }
    }

  }

  render() {
   

    return(
      <div className={styles.BoardWrapper}>
        <div className={styles.mapWrap}>
         <img className={styles.map} src={map} alt="clifftop"/>
          <div className={styles.mapCover}>
            <sizingContext.Provider value={this.state}>
              <Renderer moveCmd={this.handleFlagForMovement}  
              clicked={this.handleMoveClick} />
            </sizingContext.Provider>
            <button onClick={this.test}>test</button>
          </div>
         </div>
         {/* <button onClick={this.handleMoveClick}>Move Hero 1</button> */}
      </div>
    )
  }
}

export default Board