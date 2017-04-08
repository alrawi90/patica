const React = require('react');
const Role = require('./Role');
//const ReactTags = require('react-tag-input').WithOutContext;
import { WithContext as ReactTags } from 'react-tag-input';
class RoleLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RoleName:this.props.roleName,
      keywords:this.props.keywords,
      suggestions:this.props.suggestions,
       key:1
     }
    this.handler = this.handler.bind(this)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  handleClick(e){this.refs.r.openModal(e)}

  handler(rn,keywords,description) {
    this.setState({
      //RoleName: rn, keywords: keywords ,
       key: Math.random()
    })
    this.props.setRoleProps(rn,keywords,description)
  }

  handleDelete(i) {
    this.setState({
      keywords: this.state.keywords.filter((tag, index) => index !== i)
    });
  }

  handleAddition(tag) {
    const keywords = [ ...this.state.keywords ];
    let t=this.state.keywords.map((obj,i)=>obj.text)
    console.log(t)
    if(! t.includes(tag)) {
        this.setState({
          keywords: [
            ...this.state.keywords,
            {
              id: keywords.length + 1,
              text: tag
            }
          ]
        });
      }
  }

  handleDrag(tag, currPos, newPos) {
      const keywords = [ ...this.state.keywords ];

      // mutate array
      keywords.splice(currPos, 1);
      keywords.splice(newPos, 0, tag);

      // re-render
      this.setState({ keywords });
    }
  render() {
     const { keywords, suggestions } = this.state;
    return (

      <div className="item-role-container">
        <div className="item-role-details">
          <label className="item-role-name" onClick={(e)=>this.handleClick(e)} >{`ROLE:${this.props.roleName}`}</label><br />
          <span className='item-role-description' >{this.props.description}</span><br />
          <ReactTags tags={keywords}
                     suggestions={suggestions}
                     handleDelete={this.handleDelete}
                     handleAddition={this.handleAddition}
                     handleDrag={this.handleDrag} />
          <Role ref='r' handler={this.handler}  />
        </div>
      </div>

    )
  }

}
module.exports = RoleLabel
