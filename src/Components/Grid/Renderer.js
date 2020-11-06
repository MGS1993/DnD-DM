import React, { useContext} from 'react';
import sizingContext from '../../Context/sizingContext';
// import RenderSquare from './renderSquare';
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
const totalSquares = width * height;

console.log(totalSquares)

const RenderSquare = (x, y, [heroPositionX, heroPositionY]) => {


  const heroIsHere = heroPositionX === x && heroPositionY === y
  const piece = heroIsHere ? <Hero moveCmd={props.moveCmd} /> : null
  

  return <Square id={[x, y]} key={Math.random()*4}clicked={props.clicked}>{piece}</Square>
}
let squares = [];

  const grid = () => {
    
    let x, y;
        for (x=1; x <= height; x += 1) {
          squares[x] = [];
            for (y=1; y <= width; y += 1) {
              squares[x][y] = RenderSquare(x, y, heroPosition);
            }
        }
      return squares
  }

  grid()

  return(
          <React.Fragment>
          {squares}
          </React.Fragment>
  )
}


export default Renderer;