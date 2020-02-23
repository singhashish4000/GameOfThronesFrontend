import React from 'react';
import './AutoCompleteText.css'

export default class AutoCompleteText extends React.Component {
  constructor(props) {
    super(props);
    this.items = [];
    this.state ={
      battle_details: [],
      suggestions: [],
      text: '',
    }
  }

  async componentDidMount() {
    const url = "http://localhost:3301/list";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    this.items = data
  }


  

  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = this.items.sort().filter(v => regex.test(v));      
    }
    this.setState(() => ({ suggestions, text: value }));
  }

  async suggestionSelected (value) {
    console.log(value)
    const url = `http://localhost:3301/search?location=${value}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data, "sss")
    // data.forEach(element => {
    //   console.log(element)
    //   console.log(Object.keys(element))
    //   console.log(Object.values(element))
    // });
    this.setState(() => ({
      text: value,
      suggestions: [],
      battle_details: data,
    }))
  }

  renderSuggestion() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
      </ul>
    );
  }

  renderInformation() {
    const { battle_details } = this.state;
    if (battle_details.length === 0) {
      return null;
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Battle Number</th>
            <th>Attacker King</th>
            <th>Defender King</th>
            <th>Attacker 1</th>
            <th>Attacker 2</th>
            <th>Attacker 3</th>
            <th>Attacker 4</th>
            <th>Defender 1</th>
            <th>Defender 2</th>
            <th>Defender 3</th>
            <th>Defender 4</th>
            <th>Attacker Outcome</th>
            <th>Battle Type</th>
            <th>Major Death</th>
            <th>Major Capture</th>
            <th>Attacker Size</th>
            <th>Defender Size</th>
            <th>Attacker Commander</th>
            <th>Defender Commander</th>
            <th>Summer</th>
            <th>Location</th>
            <th>Region</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {battle_details.map((battle_detail) => 
          <tr>{Object.values(battle_detail).map((key) => <td>{key}</td>)}</tr>)}
        </tbody>
      </table>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <div className="AutoCompleteText">
          <input value={text} onChange={this.onTextChanged} type='text' placeholder="Search Battle Location" />
          {this.renderSuggestion()}
        </div>
        <div className="BattleDetails" style={{overflow: "scroll"}}>
            {this.renderInformation()}
        </div>
      </div>
    )
  }

}