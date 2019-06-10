import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
const URL = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {

  constructor(){
    super()
    this.state = {
      search: '',
      pokemon: []
    }
  }

  onClick = (e,id) => {
    let pokemon = this.state.pokemon.map((pkmn)=>{return parseInt(pkmn.id) === parseInt(id.children._owner.key,10) ? {...pkmn,clicked:!pkmn.clicked} : pkmn})
    this.setState({
      pokemon: pokemon
    })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({
      search: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(URL,{
      method: 'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({
        id: e.target[0].value,
        name: e.target[1].value,
        stats: [
          {
            "value": e.target[2].value,
            "name": "hp"
          }
        ],
        sprites: {
          front: e.target[3].value,
          back: e.target[4].value
        }
      })
    })
    .then(res=>res.json())
    .then(data=>{
      let pokemon = [...this.state.pokemon,{...data,clicked:false}]
      debugger
      this.setState({
        pokemon: pokemon
      })
    })
  }

  componentDidMount(){
    fetch(URL)
      .then(res=>res.json())
      .then(data=>{
        let pokemon = data.map(pkmn=>{return {...pkmn,clicked:false} })
        this.setState({
          pokemon: pokemon
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pkmn={this.state.pokemon} onClick={this.onClick} search={this.state.search} />
        <br />
        <PokemonForm handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default PokemonPage
