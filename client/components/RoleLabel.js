const React = require('react');
const Role = require('./Role');
import InlineEdit from 'react-edit-inline';
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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.RoleNameChanged = this.RoleNameChanged.bind(this);
    this.DescriptionChanged = this.DescriptionChanged.bind(this);

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
    RoleNameChanged(data) {
    // data = { description: "New validated text comes here" }
    // Update your model from here
    console.log(data)
    this.props.setRoleProps(data.message.toUpperCase(),this.state.keywords,this.props.description)

    this.setState({})
}
    DescriptionChanged(data){
      console.log(data)
      this.props.setRoleProps(this.props.roleName,this.state.keywords,data.message)
    }

customValidateText(text) {
  return (text.length > 0 && text.length < 64);
}

  render() {
     const { keywords, suggestions } = this.state;
    return (

      <div className="item-role-container">
        <div className="item-role-details">
          <InlineEdit
              validate={this.customValidateText}
              activeClassName="editing"
              text={`ROLE:${this.props.roleName}`}
              paramName="message"
              change={this.RoleNameChanged}
              style={{
                minWidth: 300,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 18,
                outline: 0,
                border: 0
              }}
            />
            </div>
            <div>
            <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.props.description}
                paramName="message"
                change={this.DescriptionChanged}
                style={{
                  minWidth: 300,
                  display: 'inline-block',
                  margin: 0,
                  padding: 0,
                  fontSize: 15,
                  outline: 0,
                  border: 0
                }}
              />
              <br />
          <ReactTags tags={keywords}
                     suggestions={suggestions}
                     handleDelete={this.handleDelete}
                     handleAddition={this.handleAddition}
                     handleDrag={this.handleDrag} />

        </div>
      </div>

    )
  }

}
module.exports = RoleLabel
