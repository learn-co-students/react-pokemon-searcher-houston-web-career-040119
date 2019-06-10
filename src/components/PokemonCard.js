import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  render() {
    return (
      <Card onClick={this.props.onClick} >
        <div>
          <div className="image">
            <img src={this.props.pkmn.clicked ? this.props.pkmn.sprites.back : this.props.pkmn.sprites.front} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pkmn.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pkmn.stats.find((stat)=>{return stat.name === 'hp'}).value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
