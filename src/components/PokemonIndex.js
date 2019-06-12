import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemons: [],
      displayPokemons: [],
      serachTerm: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(data =>{
      this.setState({
        pokemons: data,
        displayPokemons: data
      })
    })    
  }

  searchPokemon = (e, {value}) => {
    let arr = this.state.pokemons.filter(pokemon => pokemon.name.includes(value))
    this.setState({
      displayPokemons: arr,
      searchTerm: value
    })
  }

  createPokemon = pokemon => {
    let newArr = this.state.pokemons
    newArr.push(pokemon) 
    this.setState({
      pokemons: newArr,
      displayPokemons: newArr
    })
  }
  

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce((e, {value}) => this.searchPokemon(e, {value}), 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.state.displayPokemons}/>
        <br />
        <PokemonForm createPokemon={this.createPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
