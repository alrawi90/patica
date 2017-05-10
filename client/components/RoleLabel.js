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
    this.onEnter=this.onEnter.bind(this)

  }
  
    onEnter(e){
    if( e.which==13){ (e.target).blur()}
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
  DescriptionChanged(e){
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
        <div className="item-role-details" style={{fontSize: 28,fontWeight:'400px',fontFamily:'Montserrat',textTransform: 'uppercase',color:'#556d7e'}}>
          ROLE:
          <InlineEdit
              validate={this.customValidateText}
              activeClassName="editing"
              text={`${this.props.roleName}`}
              paramName="message"
              change={this.RoleNameChanged}
              style={{
                minWidth: 300,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 28,fontWeight:'400px',fontFamily:'Montserrat',textTransform: 'uppercase',color:'#556d7e',
                outline: 0,
                border: 0
              }}
            />
            </div>
          <div>

              <textarea
                 style={{border:'none',borderSize:'0px',width:'50em',height:'5em',resize:'none',
                       readOnly:false,fontSize:'10px',fontWeight:'bold',textOverflow: 'ellipsis',overflow:'hidden'}} 
                 onFocus={this.toggleShow}
                 onKeyUp={this.onEnter}
                 onBlur={this.DescriptionChanged}
                 placeholder='Role Description'
                 key={Math.random()}
                 cols="42" rows="5" defaultValue={this.props.description}
                 className="item-category-name"  ></textarea>
          </div>
          <ReactTags  
                     style={{margin:'2px',outline:'none'}}          
                     key={this.key}
                     tags={keywords}
                     placeholder='add keyword'
                     suggestions={suggestions}
                     handleDelete={this.handleDelete}
                     handleAddition={this.handleAddition}
                     />

        </div>

    )
  }

}
module.exports = RoleLabel
