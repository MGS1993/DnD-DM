import React, { Component } from "react";
import styles from "./MapControls.module.css";

class MapControls extends Component {
  state = {
    isEnemyModClicked: false,
    isHeroModClicked: false,
    isMapModClicked: false,
  };

  enemyModClicked = (e) => {
    let opposite = this.state.isEnemyModClicked;
    this.setState({ isEnemyModClicked: !opposite });
  };
  heroModClicked = (e) => {
    let opposite = this.state.isHeroModClicked;
    this.setState({ isHeroModClicked: !opposite });
  };
  mapModClicked = (e) => {
    let opposite = this.state.isMapModClicked;
    this.setState({ isMapModClicked: !opposite });
  };
  render() {
    let dropDown = [];
    for (let i = 0; i <= 11; i++) {
      dropDown.push(
        <option key={`value:${i}`} value={i}>
          {i}
        </option>
      );
    }

    let enemyOptionsBtn = (
      <React.Fragment>
        <button className={styles.stylizedBtn} onClick={this.enemyModClicked}>
          Modify Enemies
        </button>
      </React.Fragment>
    );

    let enemyOptions = (
      <React.Fragment>
        <div className={styles.addEnemyInput}>
          <label>
            Add
            <select onChange={this.props.enemyQuantity}>{dropDown}</select>
            enemies
          </label>
        </div>
        <div className={styles.deleteEnemyInput}>
          <label>
            Reduce enemies to
            <select onChange={this.props.deleteEnemyQuantity}>
              {dropDown}
            </select>
          </label>
        </div>
        <button className={styles.stylizedBtn} onClick={this.enemyModClicked}>
          All done!
        </button>
      </React.Fragment>
    );
    let enemyOptionsDisplay = null;

    if (this.state.isEnemyModClicked !== true) {
      enemyOptionsDisplay = enemyOptionsBtn;
    } else {
      enemyOptionsDisplay = enemyOptions;
    }

    let heroOptionsBtn = (
      <React.Fragment>
        <button className={styles.stylizedBtn} onClick={this.heroModClicked}>
          Modify Heroes
        </button>
      </React.Fragment>
    );

    let heroOptions = (
      <React.Fragment>
        <div className={styles.addHeroInput}>
          <label>
            Add
            <select onChange={this.props.heroQuantity}>{dropDown}</select>
            heroes
          </label>
        </div>
        <div className={styles.deleteHeroInput}>
          <label>
            Reduce heroes to
            <select onChange={this.props.deleteHeroQuantity}>{dropDown}</select>
          </label>
        </div>
        <button className={styles.stylizedBtn} onClick={this.heroModClicked}>
          All done!
        </button>
      </React.Fragment>
    );
    let heroOptionsDisplay;
    if (this.state.isHeroModClicked !== true) {
      heroOptionsDisplay = heroOptionsBtn;
    } else {
      heroOptionsDisplay = heroOptions;
    }

    let mapSettingsDisplay = null;
    let mapSettingsBtn = 
    <React.Fragment>
    <button className={styles.stylizedBtn} onClick={this.mapModClicked}>
      Modify Map
    </button>
  </React.Fragment>
    let mapSettings = 
    <React.Fragment>
    <div className={styles.uploadSettings}>
            <label>
              Upload
              <input 
              type="file" onChange={this.props.uploadEvent} />
              <button className={styles.stylizedBtn} 
              onClick={this.props.clicked}>Upload</button>
              <progress value={this.props.loader} max="100" />
            </label>
          </div>
          <div className={styles.dimensionsInput}>
            <label>
              Grid height:
              <br/>
              <input onChange={this.props.heightInput} type="text" />
            </label>

            <label>
              Grid width:
              <br/>
              <input onChange={this.props.widthInput} type="text" />
            </label>

            <button className={styles.stylizedBtn} onClick={this.props.submitDimensions}>
              Submit Map dimension
            </button>
            <button className={styles.stylizedBtn} onClick={this.mapModClicked}>All Done!</button>
          </div>
          
          </React.Fragment>

           if (this.state.isMapModClicked !== true) {
            mapSettingsDisplay = mapSettingsBtn;
          } else {
            mapSettingsDisplay = mapSettings;
          }
    return (
      <div className={styles.MapControlsWrapper}>
        <div className={styles.enemySettings}>{enemyOptionsDisplay}</div>

        <div className={styles.heroSettings}>{heroOptionsDisplay}</div>

        <div className={styles.mapSettings}>{mapSettingsDisplay}</div>
          
        
      </div>
    );
  }
}

// console.log(ref.enemiesQuantity)

///(e) => console.log(e.target.value)
export default MapControls;
