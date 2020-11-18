import React from "react";
import styles from "./MapControls.module.css";

const MapControls = (props) => {
  let dropDown = [];
  for (let i = 0; i <= 11; i++) {
    dropDown.push(
      <option key={`value:${i}`} value={i}>
        {i}
      </option>
    );
  }

  // console.log(ref.enemiesQuantity)
  return (
    <div className={styles.MapControlsWrapper}>
      <div className={styles.enemySettings}>
        <div className={styles.addEnemyInput}>
          <label>
            Add 
            <select onChange={props.enemyQuantity}>{dropDown}</select>
            enemies
          </label>
        </div>
        <div className={styles.deleteEnemyInput}>
          <label>
            Reduce enemies to
            <select onChange={props.deleteEnemyQuantity}>{dropDown}</select>
          </label>
        </div>
      </div>

      <div className={styles.heroSettings}>
        <div className={styles.addHeroInput}>
          <label>
            Add
            <select onChange={props.heroQuantity}>{dropDown}</select>
            heroes
          </label>
        </div>
        <div className={styles.deleteHeroInput}>
          <label>
            Reduce heroes to
            <select onChange={props.deleteHeroQuantity}>{dropDown}</select>
          </label>
        </div>
      </div>

      <div className={styles.mapSettings}>
        <label>
          height:
          <input onChange={props.heightInput} type="text" />
        </label>
        <br />
        <label>
          width:
          <input onChange={props.widthInput} type="text" />
        </label>
        <br />
        <button onClick={props.submitDimensions}>Submit Map dimension</button>
        <label>
          <br />
          Upload mapSettings
          <input type="file" onChange={props.uploadEvent} />
          <button onClick={props.clicked}>Upload</button>
          <progress value={props.loader} max="100" />
        </label>
      </div>
    </div>
  );
};
///(e) => console.log(e.target.value)
export default MapControls;
