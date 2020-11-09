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
      isHeroMovable: false,
      clickedObject: null,
      
  }
  
  async componentDidMount() {
    const response = await fetch(
      `https://www.dnd5eapi.co/api/monsters/kobold`)
    const data = await response.json();
    console.log(data)
  }

  handleFlagForMovement = (e) => {
    this.setState({
      isHeroMovable: !this.state.isHeroMovable
    })
  }


  handleMoveClick = (e) => {
    let currentHero = e.target.parentElement.id
    // console.log(e.target.parentElement.id)
    const cordStrArray = (e.target.id.split(','))
   
    if(cordStrArray.length <= 1) {
      return this.setState({clickedObject: currentHero})
    } else {
      let newCord = cordStrArray.map(x => parseInt(x))
      return(this.state.isHeroMovable ? this.moveHero(newCord) : null)
    }
   
  }
  moveHero = (coordinates) => {
    console.log('moveHero ran...')
    let test = this.state.clickedObject
    let newPos = Object.assign({}, this.state.heroPosition);

    if(test === "hero1") {
      newPos.hero1 = coordinates
      this.setState({
        heroPosition: newPos
      })
      this.handleFlagForMovement();
      return 
    }
    if(test === "hero2") {
      newPos.hero2 = coordinates
      this.setState({
        heroPosition: newPos
      })
      this.handleFlagForMovement();
      return 
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