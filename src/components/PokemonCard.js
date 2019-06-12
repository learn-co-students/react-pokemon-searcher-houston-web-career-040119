import React from 'react'
import { Card } from 'semantic-ui-react'


class PokemonCard extends React.Component {
  constructor() {
    super()
    this.state = {
      clicked: false
    }
  }

  flipCard = () => {
    this.setState({
      clicked: !this.state.clicked 
    })
  }


  render() {
    
    return (
      <Card onClick={this.flipCard}>
        <div>
          <div className="image">
            <img alt={"oh no!"} src={this.state.clicked?this.props.pokemon.sprites.back:this.props.pokemon.sprites.front} />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(stat => stat.name === 'hp').value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
