import React, { useContext, useEffect} from 'react';
import sizingContext from '../../Context/sizingContext';
import Square from '../Square/Square';
import Hero from '../Heroes/Hero';
import Enemy from '../Enemies/Enemy';

const Renderer = (props) => {
  useEffect(() => {
    console.log('Renderer.js ran...')
  })

let context = useContext(sizingContext)
let heroPosition = context.heroPosition;
let enemyPosition = context.enemyPosition;
let height = context.mapGrid.gridHeight;
let width = context.mapGrid.gridWidth;

const RenderSquare = (x, y) => {

  let heroIsHere = null;
  let enemyIsHere = null;
  let heroId = null;
  let enemyId = null

  function positionParameters(personTracked) {
    return personTracked[0] === x && personTracked[1] === y
  } 
 
  for(let i=1; i<=Object.keys(heroPosition).length; i++) {
    if(positionParameters(heroPosition[`hero${i}`])) {
      heroIsHere = positionParameters
      heroId = `hero${i}`
      }
  }

  for(let i=1; i<=Object.keys(enemyPosition).length; i++) {
    if(positionParameters(enemyPosition[`enemy${i}`])) {
      enemyIsHere = positionParameters
      enemyId = `enemy${i}`
      }
    }


  

  const piece = heroIsHere ? 
  <Hero 
  id={heroId}
  moveCmd={props.moveCmd} /> : 
  enemyIsHere ? 
  <Enemy id={enemyId} 
  moveCmd={props.moveCmd}/> : null
  
  
  
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


export default React.memo(Renderer);