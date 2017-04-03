const React = require('react');
const 	Hexagon = require('./Hexagon');
const SkillCategory = require('./SkillCategory');
class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = { categoryName:'default' }
     this.handler = this.handler.bind(this)
  }
     handler(cn) {
    this.setState({
      categoryName: cn
    })
  }
  render() {

    return (

        <div>

         <label>Skill Category Name: <i>{this.state.categoryName}</i> </label>
          <SkillCategory handler={this.handler} />

        </div>

    )
  }

}
module.exports = Item
