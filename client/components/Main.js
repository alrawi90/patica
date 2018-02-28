import React from 'react';
import { Link } from 'react-router'
const Show = require('./Show');

 class Main extends React.Component {
	  constructor(props) {
    super(props)
    this.state={
       roles:[] , displayHome:true,selectedRoleId:""

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
  	this.setState({displayHome:false,selectedRoleId:id})

  }
  render() {
  	let links=this.state.roles.map((item,index)=>{
  		return(<li style={{textAlign:'right'}} key={index}><label >{item.name}</label> <button id={item.id} onClick={this.renderRole}>View</button></li>)
  	   }
  		)
    if(this.state.displayHome)
       return (
         <div style={{textAlign: 'center'}}>
         <h1> All Roles</h1><br />
          <ul>{links}</ul>
         </div>)
    else 
    	return(
    		<div><Show roleId={this.state.selectedRoleId} /></div>
    		)
  }
}
module.exports = Main