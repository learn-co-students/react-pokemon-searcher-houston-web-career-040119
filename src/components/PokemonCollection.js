import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {

  renderPokemonCards = (search) => {
    if (search === ""){
      return this.props.pkmn.map((pkmn)=>{return <PokemonCard pkmn={pkmn} key={pkmn.id} onClick={this.props.onClick} />})
    }
    else {
      return this.props.pkmn.filter((p)=>{return p.name.includes(search)}).map((p)=>{return <PokemonCard pkmn={p} key={p.id} onClick={this.props.onClick} />})
    }
  }

  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.renderPokemonCards(this.props.search)}
      </Card.Group>
    )
  }
}

export default PokemonCollection
