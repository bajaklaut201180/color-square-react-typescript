import React from 'react';
import Square from './components/Square';
import data1 from "./data/data-color.json";
import './App.css';

interface State {
  currentColor: string;
  currentSaturationRange: any;
  currentData: any;
  currentCategory: string;
  checkDarker?: boolean
}


class App extends React.Component<any, State> {

  state: State = {
    currentColor: "",
    currentSaturationRange: 0,
    currentData: data1,
    currentCategory: "select",
    checkDarker: false
  }

  handleSaturationRange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    var replace = this.state.currentColor.replace('hsl', '').slice(1, -1).split(',')
    replace[1] = `${e.currentTarget.value}%`;
    
    this.setState({
      currentSaturationRange: e.currentTarget.value,
      currentColor: `hsl(${replace})`
    })
  }

  handleSaturation = (e: React.FormEvent<HTMLInputElement>) => {
    let randomData: any;
    if(!this.state.checkDarker === true) {
      randomData = new Array(this.state.currentData[Math.floor(Math.random() * this.state.currentData.length)])
      var replaceText = randomData[0].hslColor.replace('hsl', '').slice(1, -1).split(',')
    }
    
    this.setState({
      checkDarker: !this.state.checkDarker,
      currentColor: !this.state.checkDarker ? randomData[0].hslColor : "",
      currentSaturationRange: !this.state.checkDarker ? parseInt(replaceText[1].replace('%', '')) : this.state.currentSaturationRange
    })
   
  }

  handleCategory = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault()
    let filterColor: any;
    
    switch(e.currentTarget.value){
      case "red":
        filterColor = data1.filter((value, key) => {
          return key >= 0 && key < 5
        })
        break
      case "orange":
        filterColor = data1.filter((value, key) => {
          return key >= 5 && key < 10
        })
        break
      case "yellow":
        filterColor = data1.filter((value, key) => {
          return key >= 10 && key < 15
        })
        break
      case "green":
        filterColor = data1.filter((value, key) => {
          return key >= 15 && key < 20
        })
        break
      case "cyan":
        filterColor = data1.filter((value, key) => {
          return key >= 20 && key < 25
        })
        break
      case "blue":
        filterColor = data1.filter((value, key) => {
          return key >= 25 && key < 30
        })
        break
      case "purple":
        filterColor = data1.filter((value, key) => {
          return key >= 30 && key < 35
        })
        break
      case "mixed":
        filterColor = data1.filter((value, key) => {
          return key >= 35 && key < 40
        })
        break
      default:
        filterColor = data1
    }

    this.setState({
      currentCategory: e.currentTarget.value,
      currentData: filterColor,
      currentColor: "",
      checkDarker: false
    })
  }

  handleClick = (data: string) => {
    var replaceText = data.replace('hsl', '').slice(1, -1).split(',')
    
    this.setState({
      currentColor: data,
      currentSaturationRange: parseInt(replaceText[1].replace('%', ''))
    })
    
  }

  renderCurrentColor = () => {
    if(this.state.currentColor.length > 0) {
      return (
        <>
        <div className="wrapped__current-color">
          <h1>Current Color:</h1>
          <div className="current-color" style={{backgroundColor: this.state.currentColor}}></div>
          <span>{this.state.currentColor}</span>
        </div>
        <div className="saturation__wrapper">
          <h5>Saturation:</h5>
          <input id="mySaturation" type="range" min="1" max="100" step="1" value={this.state.currentSaturationRange} className="saturation" onChange={this.handleSaturationRange} />
        </div>
        </>
      )
    }
  }

  render(){
    
    return (
      <>
        <div className="title__wrapper">
          <h1>Color Square</h1>
        </div>
        <Square
          title="bro"
          data={this.state.currentData}
          handleClick={this.handleClick}
          />
        <div className="filter__wrapper">
          <div className="filter--category">
            <select id="selectCategory" onChange={this.handleCategory} value={this.state.currentCategory}>
              <option value="select">--Select Category--</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="cyan">Cyan</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          <div className="filter--saturation">
            <label htmlFor="filterSaturation">Darker</label>
            <input id="filterSaturation" type="checkbox" onChange={this.handleSaturation} checked={this.state.checkDarker} />
          </div>
        </div>
        
        {this.renderCurrentColor()}
        
      </>
    );
  }
}

export default App;
