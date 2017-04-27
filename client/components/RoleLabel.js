const React = require('react');
const Role = require('./Role');
import InlineEdit from 'react-edit-inline';
import { WithContext as ReactTags } from 'react-tag-input';
class RoleLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // RoleName:props.roleName,
      // keywords:props.keywords,
      // suggestions:props.suggestions,
       key:1
     }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.RoleNameChanged = this.RoleNameChanged.bind(this);
    this.DescriptionChanged = this.DescriptionChanged.bind(this);

  }

  handleDelete(i) {
    //alert()
     this.props.onRoleKeywordsDelete(i)
  }

  handleAddition(keyword) {

          this.props.setRoleKeywords(keyword)

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
    this.props.setRoleName(data.message.toUpperCase())

    //this.setState({RoleName:data.message.toUpperCase()})
}
  DescriptionChanged(data){
      console.log(data)
      this.props.setRoleDescription(data.message)
    }

  customValidateText(text) {
    return (text.length > 0 && text.length < 64);
}

  render() {
    const { keywords, suggestions } = this.props;
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
          <ReactTags  
                     key={this.key}
                     tags={keywords}
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
