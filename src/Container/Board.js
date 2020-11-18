import React, { PureComponent } from "react";
import styles from "./Board.module.css";
import map from "../Assets/Images/NorthernLand.jpg";
import firebase from "firebase";
import sizingContext from "../Context/sizingContext";
import Renderer from "../Components/Grid/Renderer";
import MapControls from '../Components/mapControls/MapControls';
import { storage } from '../index';
class Board extends PureComponent {
  state = {
    mapGrid: {
      gridWidth: 27,
      gridHeight: 17,
    },
    heroPosition: {
      hero1: [1, 2],
    },
    enemyPosition: {
      enemy1: [10, 10],
    },
    isHeroMovable: false,
    clickedObject: null,
    image: null,
    mapUrl: null,
    progress: 0,
    mapHeightInput: null,
    mapWidthInput: null,
  };

  async componentDidMount() {
    this.getUserData();
    console.log("componentdidmount ran...");
  }

 


  componentDidUpdate(prevState) {
    if (prevState !== this.state.heroPosition || prevState !== this.state.enemyPosition) {
      this.writeUserData();
    }
    console.log("ComponentDidUpdate ran...");
  }

  getUserData = () => {
    let ref = firebase.database().ref();

    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState({
        heroPosition: state.heroPositions,
        enemyPosition: state.enemyPositions,
      });
    });
  };

  writeUserData = () => {
    firebase.database().ref("/heroPositions").set(this.state.heroPosition);
    firebase.database().ref("/enemyPositions").set(this.state.enemyPosition);
    console.log("WriteUserData ran...");
  };


  handleFlagForMovement = (e) => {
    this.setState({
      isHeroMovable: !this.state.isHeroMovable,
    });
  };

  handleMoveClick = (e) => {
    let currentTarget = e.target.parentElement.id;
    const cordStrArray = e.target.id.split(",");

    if (cordStrArray.length <= 1) {
      return this.setState({ clickedObject: currentTarget });
    } else {
      let newCord = cordStrArray.map((x) => parseInt(x));
      return this.state.isHeroMovable ? this.moveHero(newCord) : null;
    }
  };

  moveHero = (coordinates) => {
    console.log("moveHero ran...");
    let target = this.state.clickedObject;
    let newPos = Object.assign({}, this.state.heroPosition);
    let newEnemyPos = Object.assign({}, this.state.enemyPosition);

    for (let i = 1; i <= Object.keys(newPos).length; i++) {
      if (target === `hero${i}`) {
        newPos[`hero${i}`] = coordinates;
        this.setState({
          heroPosition: newPos,
        });
        this.handleFlagForMovement();
      }
    }

    for (let i = 1; i <= Object.keys(newEnemyPos).length; i++) {
      if (target === `enemy${i}`) {
        newEnemyPos[`enemy${i}`] = coordinates;
        this.setState({
          enemyPosition: newEnemyPos,
        });
        this.handleFlagForMovement();
      }
    }
  };

  handleEnemyQuantity = (e) => {
    let amountOfEnemies = 0;
    let currentQuantity = Object.assign({}, this.state.enemyPosition)
    // eslint-disable-next-line
    for(const enemies in currentQuantity) {
      amountOfEnemies++
    }
    
    for(let i=1; i<=e.target.value; i++) {
      amountOfEnemies++
      currentQuantity[`enemy${amountOfEnemies}`] = [Math.ceil(Math.random() * 10), Math.floor(Math.random() * 10)]
    }
    this.setState({enemyPosition: currentQuantity})
    
  }
  handleHeroQuantity = (e) => {
    let amountOfHeroes = 0;
    let currentQuantity = Object.assign({}, this.state.heroPosition)
    // eslint-disable-next-line
    for(const heroes in currentQuantity) {
      amountOfHeroes++
    }
    for(let i=1; i<=e.target.value; i++) {
      amountOfHeroes++
      currentQuantity[`hero${amountOfHeroes}`] = [Math.ceil(Math.random() * 10), Math.floor(Math.random() * 10)]
    }
    this.setState({heroPosition: currentQuantity})
  }

  fileSelectedHandler = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  fileUploadHandler = () => {
    let image =  this.state.image

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          
        );
        this.setState({progress: progress})
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({mapUrl: url})
          })
      }
    )
  }

  heightInputHandler = (e) => {
    this.setState({mapHeightInput: parseInt(e.target.value)})

    ///FIND OUT HOW TO GET BOTH HEIGHT AND WIDTH VALUES FROM PROP FUNCTIONS
    ///TO UPDATE THE STATE GRID DIMENSIONS
  }
  widthInputHandler = (e) => {
    this.setState({mapWidthInput: parseInt(e.target.value)})
  }

  submitDimensionsHandler = e => {
    let newGrid = {
      newGridHeight: this.state.mapHeightInput,
      newGridWidth: this.state.mapWidthInput
    }
    this.setState({
      mapGrid: {
        gridHeight: newGrid.newGridHeight,
        gridWidth: newGrid.newGridWidth
      }
    })
  }
  render() {
    let gameMap = null;
    console.log("board.js rendered...");
    if( this.state.mapUrl === null) {
      gameMap = <img className={styles.map} src={map} alt="clifftop" />
    } else if(this.state.mapUrl !== null) {
       let uploadedMap = this.state.mapUrl
      gameMap = <img className={styles.map} src={uploadedMap} alt="clifftop" />
      
    }
    return (
      <div className={styles.mainWrap}>
          <div className={styles.BoardWrapper}>
            <div className={styles.mapWrap}>
              {gameMap}
              <div className={styles.mapCover}>
                <sizingContext.Provider value={this.state}>
                  <Renderer
                    moveCmd={this.handleFlagForMovement}
                    clicked={this.handleMoveClick}/>
                </sizingContext.Provider>
              </div>
            </div>
          </div>
          <div className={styles.boardSettings}>
            <MapControls
              enemyQuantity={this.handleEnemyQuantity}
              heroQuantity={this.handleHeroQuantity}
              uploadEvent={this.fileSelectedHandler}
              clicked={this.fileUploadHandler}
              loader={this.state.progress}
              heightInput={this.heightInputHandler}
              widthInput={this.widthInputHandler}
              submitDimensions={this.submitDimensionsHandler}
              />
          </div>
          <div className={styles.boardMiscStats}></div>
      </div>
    );
  }
}

export default Board;
