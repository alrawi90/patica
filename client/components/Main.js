import React from 'react';
import { Link } from 'react-router'
const Show = require('./Show');
const New = require('./New');
 class Main extends React.Component {
    constructor(props) {
    super(props)
    console.log(props)
    let lang=(props.location.search.split("language=")[1] =="En" || props.location.search.split("language=")[1]=="Ar") ?  props.location.search.split("language=")[1] : "En"
    this.state={
       roles:[] , displayPage:"home",selectedRoleId:"",language:lang

    }
     this.renderRole=this.renderRole.bind(this)
     this.swichLanguage=this.swichLanguage.bind(this)
  }
  componentWillReceiveProps(NewProps){
    NewProps.location.search.split("language=")[1]!=this.state.language ? this.state.language=NewProps.location.search.split("language=")[1] : null
  }
  componentWillMount(){
      let app=this;
      console.log('reading from database ...')
      fetch('http://patica-role.mertdogar.com/role?skip=2&limit=100'
          ).then(function(response) {
              return response.json();
            }).then(function(data) {
               let roles=data.rows.map((item,index)=>{
                 return(
                   {id:item._id,name:item.name}
                 )
               })
              

               app.setState({
                  roles:roles
               });
      })  .catch(function(error) {
    console.log(error);
  });

  }
  swichLanguage(e){
    
    e.preventDefault()
    e.stopPropagation()
    let language=this.state.language
    language=="En" ? language="Ar" : language="En"
    this.setState({language})

  }
  renderRole(e){
    let id=e.target.id 
    this.setState({displayPage:"show",selectedRoleId:id})

  }
  renderBlankRole(){
    this.setState({displayPage:"new"})
  }
  render() {
    let links=this.state.roles.map((item,index)=>{
      return(<li style={{textAlign:'right'}} key={index}><label >{item.name}</label> <button id={item.id} onClick={this.renderRole}>
        {this.state.language=="En" ? "View" : "معاينة"}
        </button></li>)
       }
      )
    
    if(this.state.displayPage=="home")
       return (
        <div className='main-container' style={{width:'201%'}} >
             <div className="col-left" >
                    <h1>{this.state.language=="En" ? "All Roles" : "كل الادوار الوظيفية"}</h1><br /> 
                    <ul>{links}</ul>
             </div>
             <div className="col-center" >

                <div className="item" style={{clear:'both',display:'inline-flex'}}>
                </div>

            </div>
            <div className="col-right" style={{width:"300px"}} >
                <div style={{marginTop:'1.8em'}} >
                    <a onClick={(e)=>this.renderBlankRole()} className='white button patica-bg-color' style={{margin:'0 0.5em'}} >
                         <i className="fa fa-plus-square white"></i> {this.state.language=="En" ? "New Role" : "دور وظيفي جديد"}
                    </a>

                    <a onClick={this.swichLanguage} className='white button patica-bg-color' style={{margin:'0 0.5em'}}  >
                         <i className="fa fa-language white"></i> {this.state.language=="Ar" ? "English" : "عربي"}
                    </a>
                </div>    
             </div>


        </div>
             )
    else if(this.state.displayPage=="show") 
      return(
        <div><Show language={this.state.language} roleId={this.state.selectedRoleId} /></div>
        )
    else return(<div><New language={this.state.language} /></div>)  
  }
}
module.exports = Main