

import "./App.css";
import React from "react";

class Affiliations extends React.Component {
  render() {
    return (
      <li>
        <p>{this.props.element}</p>
      </li>
    );
  }
}

class StarWars extends React.Component {
  constructor() {
    super();
    this.state = {
      loadedCharacter: false,
      name: null,
      height: null,
      homeworld: null,
      species:null,
      wiki: null,
      affiliations: [],
      image: null,
      error: null, 
    };
  }

  async getNewCharacter() {
    const randomNumber = Math.floor(Math.random() * 88) + 1; 
    const url = `https://akabab.github.io/starwars-api/api/id/${randomNumber}.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch character data");
      }
      const data = await response.json();
      this.setState({
        name: data.name,
        height: data.height,
        homeworld: data.homeworld,
        species: data.species,
        wiki: data.wiki,
        affiliations: data.affiliations,
        image: data.image,
        loadedCharacter: true,
        error: null, 
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }


  render() {
    const { loadedCharacter, name, height, homeworld, species, wiki, affiliations, image, error } = this.state;

    const affiliationItems = affiliations.map((element, i) => (
      <Affiliations key={i} element={element} />
    ));

    return (
      <div>
        <h1 className="main-title">Star Wars Characters</h1> 
        <button
          type="button"
          onClick={() => this.getNewCharacter()}
          className="btn"
        >
          Randomize Character
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loadedCharacter && (
          <div className="content-wrapper">
            <div className="left-column">
              <h3 className="character-title">Characters' Features</h3>
              <h2 className="name">{name}</h2>
              <p className="height">Height: {height} cm</p>
              <p className="home">Homeworld: {homeworld}</p>
              <p className="species">Species: {species}</p>
              <p className="wiki">
                Wiki: <a href={wiki} target="_blank" rel="noopener noreferrer">Learn More About this Character</a>
              </p>
              
            </div>
            <img className="image" src={image} alt={name} />
            <div className="right-column">
              <h3 className="affiliations-title">Affiliations</h3>
              <ul>{affiliationItems}</ul>
            </div>
          </div>
        )}

       
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWars />
      </header>
    </div>
  );
}

export default App;
