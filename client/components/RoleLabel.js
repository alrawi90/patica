const React = require('react');
const Role = require('./Role');
class RoleLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { RoleName:this.props.roleName, keywords: this.props.keywords , key:1}
    this.handler = this.handler.bind(this)
  }
  handleClick(e){this.refs.r.openModal(e)}

  handler(rn,keywords,description) {
    this.setState({
      //RoleName: rn, keywords: keywords ,
       key: Math.random()
    })
    this.props.setRoleProps(rn,keywords,description)
  }
  render() {

    return (

      <div className="item-role-container">
        <div className="item-role-details">
          <label className="item-role-name" onClick={(e)=>this.handleClick(e)} >{`ROLE:${this.props.roleName}`}</label><br />
          <span className='item-role-description' >{this.props.description}</span><br />
          <label><i>{this.props.keywords.join(' ')}</i> </label>
          <Role ref='r' handler={this.handler}  />
        </div>
      </div>

    )
  }

}
module.exports = RoleLabel
