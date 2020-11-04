import React, {useContext} from 'react';
import sizingContext from '../../Context/sizingContext';


const Square = (props) => {
  const context = useContext(sizingContext)

  const gridWidth = context.mapGrid.gridWidth;
  const gridHeight = context.mapGrid.gridHeight;
  const squareHeight = 100 / gridHeight;
  const squareWidth = 100 / gridWidth;
  // const totalSquares = gridWidth * gridHeight;

  const style = {
    // eslint-disable-next-line
    height: `${squareHeight}` + '%',
    // eslint-disable-next-line
    width: `${squareWidth}` + '%',
    
  }

  return(
    <div id={props.id} onClick={props.clicked} style={style}>
      {props.children}
    </div>
  )
}


export default Square