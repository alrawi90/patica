const React = require('react');
const Role = require('./Role');
class RoleLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { RoleName:'role Name', keywords: ['keyword-1','keyword-2','keyword-3'] , key:1}
    this.handler = this.handler.bind(this)
  }
  handleClick(e){this.refs.r.openModal(e)}

  handler(rn,keywords) {
    this.setState({
      RoleName: rn, keywords: keywords , key: Math.random()
    })
  }
  render() {

    return (

      <div className="item-role-container">
        <div className="item-role-details">
          <label className="item-role-name" onClick={(e)=>this.handleClick(e)} >{this.state.RoleName}</label><br />
          <label><i>{this.state.keywords.join(' ')}</i> </label>
          <Role ref='r' handler={this.handler}  />
        </div>
      </div>

    )
  }

}
module.exports = RoleLabel
