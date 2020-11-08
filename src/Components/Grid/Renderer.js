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
// const totalSquares = width * height;

console.log(heroPosition)

const RenderSquare = (x, y, heroCord) => {


  const heroIsHere = heroCord[0] === x && heroCord[1] === y
  const piece = heroIsHere ? <Hero moveCmd={props.moveCmd} /> : null
  
  
  
  return <Square id={[x, y]} key={Math.random()*4}clicked={props.clicked}>{piece}</Square>
}
let squares = [];
// let squares2 = [];
  const grid = () => {
    
    let heroPositions = [...heroPosition]
    console.log(heroPositions)
    let x, y;
    
        for (x=1; x <= height; x += 1) {
          
          squares[x] = [];
            for (y=1; y <= width; y += 1) {
              
              squares[x][y] = RenderSquare(x, y, heroPositions[0]);
             
              // console.log('test')
            }
            
        }
      return squares
  }
  // const grid2 = () => {
    
  //   let heroPositions = [...heroPosition]
  //   let x, y;
    
  //       for (x=1; x <= height; x += 1) {
          
  //         squares2[x] = [];
  //           for (y=1; y <= width; y += 1) {
              
  //             squares2[x][y] = RenderSquare(x, y, heroPositions[1]);
             
  //             console.log('test')
  //           }
            
  //       }
  //     return squares2
  // }
  grid()
  // grid2();
  // console.log(squares)
  return(
          <React.Fragment>
          {squares}
          {/* {squares2} */}
          </React.Fragment>
  )
}


export default Renderer;