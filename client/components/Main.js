import React from 'react';
import { Link } from 'react-router'
const Show = require('./Show');
const New = require('./New');
 class Main extends React.Component {
	  constructor(props) {
    super(props)
    this.state={
       roles:[] , displayPage:"home",selectedRoleId:""

    }
     this.renderRole=this.renderRole.bind(this)
  
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
  renderRole(e){
  	let id=e.target.id 
  	this.setState({displayPage:"show",selectedRoleId:id})

  }
  renderBlankRole(){
  	this.setState({displayPage:"new"})
  }
  render() {
  	let links=this.state.roles.map((item,index)=>{
  		return(<li style={{textAlign:'right'}} key={index}><label >{item.name}</label> <button id={item.id} onClick={this.renderRole}>View</button></li>)
  	   }
  		)
    
    if(this.state.displayPage=="home")
       return (
        <div className='main-container' style={{width:'250%'}} >
             <div className="col-left" >
                    <h1> All Roles</h1><br /> 
                    <ul>{links}</ul>
             </div>
             <div className="col-center" >

                <div className="item" style={{clear:'both',display:'inline-flex'}}>
                </div>

            </div>
            <div className="col-right" >
                <div style={{marginTop:'1.8em'}} >
                    <a onClick={(e)=>this.renderBlankRole()} className='white button patica-bg-color' >
                         <i className="fa fa-plus-square white"></i> New Role
                    </a>
                </div>    
             </div>


        </div>
             )
    else if(this.state.displayPage=="show") 
    	return(
    		<div><Show roleId={this.state.selectedRoleId} /></div>
    		)
    else return(<div><New /></div>)	
  }
}
module.exports = Main