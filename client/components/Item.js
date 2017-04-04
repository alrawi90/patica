const React = require('react');
const 	Hexagon = require('./Hexagon');
const SkillCategory = require('./SkillCategory');
class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = { categoryName:'', skills: [] ,iconUrl: '', key:1}
    this.handler = this.handler.bind(this)
  }
  handleClick(e){this.refs.sc.openModal(e)}

  handler(cn,skills,iconUrl) {
    this.setState({
      categoryName: cn, skills: skills , iconUrl: iconUrl, key: Math.random()
    })
  }
  render() {

    return (

        <div>
           <Hexagon key={this.state.key}  setIcon={this.state.iconUrl} click={(e)=>this.handleClick(e)} />
           <label>Skill Category Name: <i>{this.state.categoryName}</i> </label><br />
           <label>Skills: <i>{this.state.skills.join(', ')}</i> </label>
           <SkillCategory ref='sc' handler={this.handler}  />
        </div>

    )
  }

}
module.exports = Item
