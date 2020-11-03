import React, {useContext} from 'react';
import sizingContext from '../../Context/sizingContext';


const Square = (props) => {
  const context = useContext(sizingContext)

  const gridWidth = context.gridWidth;
  const gridHeight = context.gridHeight;
  const squareHeight = 100 / gridHeight;
  const squareWidth = 100 / gridWidth;
  // const totalSquares = gridWidth * gridHeight;

  const style = {
    // eslint-disable-next-line
    height: `${squareHeight}` + '%',
    // eslint-disable-next-line
    width: `${squareWidth}` + '%',
    backgroundColor: '#ff0c0030'
  }

  return(
    <div style={style}>
      {props.children}
    </div>
  )
}


export default Square