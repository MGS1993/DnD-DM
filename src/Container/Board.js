import React, { Component } from 'react';
import styles from './Board.module.css';
import map from '../Assets/Images/NorthernLand.jpg';
import firebase from 'firebase';
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
          hero3: [4,4],
          
        },
        enemyPosition: {
          enemy1: [10,10],
          enemy2: [12,11],
          enemy3: [6,6],
          enemy4: [6,2]
        },
      isHeroMovable: false,
      clickedObject: null,
      
  }
  
  async componentDidMount() {
    this.getUserData();
    console.log('componentdidmount ran...')
  }

  componentDidUpdate(prevState) {
    if(prevState !== this.state.heroPosition) {
      this.writeUserData();
    } 
    console.log('ComponentDidUpdate ran...')
    
  }
  
  getUserData = () => {
    let ref = firebase.database().ref();

    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState({
        heroPosition: state.heroPositions,
        enemyPosition: state.enemyPositions
      })
    })
    
    
  }



  writeUserData = () => {
    firebase.database().ref('/heroPositions').set(this.state.heroPosition);
    firebase.database().ref('/enemyPositions').set(this.state.enemyPosition);
    console.log('WriteUserData ran...')
  }


  testFunc = () => {
    let newState = Object.assign({}, this.state.heroPosition)
    newState.hero4 = [10,10]
    console.log(newState)
    this.setState({heroPosition: newState})
  }

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
   
    console.log('board.js rendered...')
    return(
      <div className={styles.BoardWrapper}>
        <div className={styles.mapWrap}>
         <img className={styles.map} src={map} alt="clifftop"/>
          <div className={styles.mapCover}>
            <sizingContext.Provider value={this.state}>
              <Renderer moveCmd={this.handleFlagForMovement}  
              clicked={this.handleMoveClick} />
            </sizingContext.Provider>
            {/* <button onClick={this.test}>test</button> */}
          </div>
         </div>
         <button onClick={this.testFunc}>test func</button>
      </div>
    )
  }
}

export default Board