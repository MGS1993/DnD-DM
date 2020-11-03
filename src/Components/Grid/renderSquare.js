import React, {useContext} from 'react';
import Square from '../Square/Square';
import Hero from '../Heroes/Hero';
// import sizingContext from '../../Context/sizingContext';



  const RenderSquare = (x,y, [heroPositionX, heroPositionY]) => {

    // const context = useContext(sizingContext)
    // console.log(context)

    const heroIsHere = heroPositionX === x && heroPositionY === y
    const piece = heroIsHere ? <Hero /> : null
    

    return <Square >{piece}</Square>
  }
  
export default RenderSquare