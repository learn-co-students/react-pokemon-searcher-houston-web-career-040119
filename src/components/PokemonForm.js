import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleChange = (event) => {
    this.setState(
      {[event.target.name] : event.target.value}
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/pokemon',
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(
        {
          name: this.state.name,
          stats: [{},{},{},{},{},{value: this.state.hp}],
          sprites: {
            front: this.state.frontUrl,
            back: this.state.backUrl
          }
        }
      )
    }).then( () => {
      this.setState(
        {
         name: '',
         hp: '',
         frontUrl: '',
         backUrl: ''
        }
      );
      this.props.getPokemon();
    });
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid value={this.state.name} onChange={this.handleChange} label="Name" placeholder="Name" name="name" />
            <Form.Input fluid value={this.state.hp} onChange={this.handleChange} label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid value={this.state.frontUrl} onChange={this.handleChange} label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid value={this.state.backUrl} onChange={this.handleChange} label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
