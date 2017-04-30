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


  RoleNameChanged(data) {
    // data = { description: "New validated text comes here" }
    // Update your model from here
    console.log(data)
    this.props.setRoleName(data.message.toUpperCase())

    //this.setState({RoleName:data.message.toUpperCase()})
}
  DescriptionChanged(data){
      let description=e.target.value
      this.props.setRoleDescription(description)

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

              <textarea
                 style={{border:'none',borderSize:'0px',width:'70em',height:'7em',resize:'none',
                 readOnly:false,fontSize:'10px',fontWeight:'bold',textOverflow: 'ellipsis',overflow:'hidden'}} 
                 onFocus={this.toggleShow}
                 onKeyUp={this.onEnter}
                 onBlur={this.DescriptionChanged}
                 placeholder='Role Description'
                 key={Math.random()}
                 cols="42" rows="5"
                 className="item-category-name" >{this.props.description}</textarea>
          </div>
          <ReactTags  
                     style={{margin:'2px'}}          
                     key={this.key}
                     tags={keywords}
                     suggestions={suggestions}
                     handleDelete={this.handleDelete}
                     handleAddition={this.handleAddition}
                     />

        </div>

    )
  }

}
module.exports = RoleLabel
