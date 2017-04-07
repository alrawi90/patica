const React = require('react');
const 	Hexagon = require('./Hexagon');
const SkillCategory = require('./SkillCategory');
class SkillCategoryLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {  key:1}
    this.handler = this.handler.bind(this)
  }
  handleClick(e){this.refs.sc.openModal(e)}

  handler(cn,skills,iconUrl) {
    this.props.setCategoryDetails(this.props.id,cn,skills,iconUrl)

    this.setState({
      //categoryName: cn, skills: skills ,
       //iconUrl: iconUrl,
      key: Math.random()
    })
  }
  render() {

    return (

      <div className="item-container">
        <div className="item-details">
          <label className="item-category-name" >{this.props.categoryName}</label><br />
          <label><i>{this.props.skills.join(', ')}</i> </label>
          <SkillCategory ref='sc' name={this.props.categoryName} handler={this.handler}  />
        </div>
          <Hexagon size={7} className="item-hexagon" key={this.state.key}  setIcon={this.props.iconUrl} click={(e)=>this.handleClick(e)} />
      </div>

    )
  }

}
module.exports = SkillCategoryLabel
