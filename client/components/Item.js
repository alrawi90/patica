const React = require('react');
const 	Hexagon = require('./Hexagon');
const SkillCategory = require('./SkillCategory');
class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = { categoryName:'' ,skills:[]}
     this.handler = this.handler.bind(this)
  }
     handler(cn,skills) {
    this.setState({
      categoryName: cn,skills:skills
    })
  }
  render() {

    return (

        <div>

         <label>Skill Category Name: <i>{this.state.categoryName}</i> </label><br />
         <label>Skills: <i>{this.state.skills.join(', ')}</i> </label>
          <SkillCategory handler={this.handler} />

        </div>

    )
  }

}
module.exports = Item
