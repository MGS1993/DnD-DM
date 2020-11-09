import React, { useContext} from 'react';
import sizingContext from '../../Context/sizingContext';
import Square from '../Square/Square';
import Hero from '../Heroes/Hero';


const Renderer = (props) => {

  // useEffect(()=> {
  //   console.log('renderer rendering...')
  // })
let context = useContext(sizingContext)

let heroPosition = context.heroPosition
let height = context.mapGrid.gridHeight;
let width = context.mapGrid.gridWidth;
// const totalSquares = width * height;

// console.log(heroPosition)
const RenderSquare = (x, y) => {

  let heroIsHere = null
  let heroId = null
  // const heroIsHere = 
  // (heroPosition.hero1[0] === x && heroPosition.hero1[1] === y) 
  // ||
  // (heroPosition.hero2[0] === x && heroPosition.hero2[1] === y)
  if(heroPosition.hero1[0] === x && heroPosition.hero1[1] === y) {
    heroIsHere = heroPosition.hero1[0] === x && heroPosition.hero1[1] === y
    heroId = 'hero1'
  }
  if(heroPosition.hero2[0] === x && heroPosition.hero2[1] === y) {
    heroIsHere = heroPosition.hero2[0] === x && heroPosition.hero2[1] === y
    heroId = 'hero2'
  }


  const piece = heroIsHere ? <Hero 
  id={heroId}
  moveCmd={props.moveCmd} /> : null
  
  
  
  return <Square 
  id={[x, y]} 
  key={Math.random()*4}
  clicked={props.clicked}>{piece}</Square>
}
let squares = [];

  const grid = () => {
    
    let x, y;
        for (x=1; x <= height; x += 1) {

          squares[x] = [];
            for (y=1; y <= width; y += 1) {
            
              squares[x][y] = RenderSquare(x, y);
            }
            
        }
      return squares
  }

  
  grid();
  return(
          <React.Fragment>
            {squares}
          </React.Fragment>
  )
}


export default Renderer;