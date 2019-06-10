import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm : "",
      data:[]
    };
  }

  getPokemon = () => {
    fetch("http://localhost:3000/pokemon")
    .then( res => res.json() )
    .then( data => {
      this.setState( { data: data } );
    });
  }

  componentDidMount() {
    this.getPokemon();
  }

  setSearchTerm = _.debounce(
    target => this.setState({searchTerm:target.value}),
    500);

  handleSearchChange = (event) => {
    var target = event.target;
    this.setSearchTerm(target);
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.handleSearchChange} showNoResults={false} />
        <br />
        <PokemonCollection data={this.state.data} searchTerm={this.state.searchTerm.toLowerCase().replace(/^\s+/,'').replace(/\s+$/,'')} />
        <br />
        <PokemonForm getPokemon={this.getPokemon} />
      </div>
    )
  }
}

export default PokemonPage
