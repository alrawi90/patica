
const React = require('react');
const SkillCategoryLabel = require('./SkillCategoryLabel');
const RoleLabel = require('./RoleLabel');
const Lego = require('./Lego');
const ReactBootstrap=require('react-bootstrap')
class Fork extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      roleId:'58f4660bf3958abbc84d199a',//show be a prop (set from the router)
      error:'' ,
      categories:[
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},],
      roleName:'',lego:'',description:'',
      keywords: [],// each element is an object of  {id:1,text:'keyword-1'}
      suggestions:["Banana", "Mango", "Pear", "Apricot"],
      key:Date.now()
    }
    this.setRoleProps=this.setRoleProps.bind(this)
    this.setCategoryDetails=this.setCategoryDetails.bind(this)
    this.setLego=this.setLego.bind(this)
    this.create=this.create.bind(this)
  }
  componentDidUpdate(){console.log('categories', this.state.categories)}
  componentWillMount(){
      let app=this;
      console.log('forking ...')
      fetch('http://patica-role.mertdogar.com/role/'+this.state.roleId
          ).then(function(response) {
              return response.json();
            }).then(function(data) {
               let kwrds=data.keywords.map((item,index)=>{
                 return(
                   {id:index,text:item}
                 )
               })
               console.log(kwrds)
               let categories=data.skillCategory.map((item,index)=>{
                 return(

                   {name:item.name,skills:item.skills,image:item.image}
                 )
               })
               app.setState({
                 roleName: data.name,
                 description:data.description,
                 lego:data.image,
                 keywords:kwrds,
                 categories:categories
               });
              console.log(data)
      })  .catch(function(error) {
    console.log(error);
  });

  }
  setRoleProps(roleName_,keywords_,description_){

    this.setState({
      roleName: roleName_, keywords: keywords_,description:description_
    });

  }
  setLego(legoImg){this.setState({lego:legoImg})}

  setCategoryDetails(id,categoryName,skills,iconUrl){
    console.log('New.js',iconUrl)
    let categories=this.state.categories
    categories[id-1].name=categoryName;
    categories[id-1].skills=skills;
    categories[id-1].image=iconUrl;
    this.setState({
      categories: categories
    });
  }

  //componentDidUpdate(){console.log(this.state.categories[0].categoryImg)}

  create(){
      console.log('posting .....')
      const opts={}
      opts.name=this.state.roleName
      opts.description=this.state.description
      opts.image=this.state.lego
      opts.keywords=this.state.keywords.map((item,index)=>{return(item.text)})//['a','b','c']
      opts.skillCategory=[]
      opts.skillCategory=[1,2,3,4,5,6].map((item,index)=>{
        return(
        {         name:this.state.categories[index].name,
                  skills:this.state.categories[index].skills,
                  image:this.state.categories[index].image
                }
      )})
      console.log(opts)
      const app=this
      fetch('http://patica-role.mertdogar.com/role', {
       method: 'post',
       headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
       body: JSON.stringify(opts)
           }).then(function(response) {
             return response.json();
           }).then(function(data) {
              app.setState({ error: data.error.message });

     });
  }
  render() {

    return (
      <div className='col' >
          <div className='row' style={{justifyContent:'center'}}>
           <div className='' >
              <RoleLabel setRoleProps={this.setRoleProps} roleName={this.state.roleName} keywords={this.state.keywords}
                description={this.state.description} suggestions={this.state.suggestions}
              />
          </div>
         </div>
          <div className='main-container' >
             <div className="col-left" >
               <div className="item" >
               <SkillCategoryLabel
                    id={1}
                    obj={this.state.categories[0]}
                    setCategoryDetails={this.setCategoryDetails}
                    skills={this.state.categories[0].skills}
                    iconUrl={this.state.categories[0].image}
                    categoryName={this.state.categories[0].name}
                 />
                 </div>
               <div className="item" >
               <SkillCategoryLabel
                    id={2}
                    obj={this.state.categories[1]}
                    setCategoryDetails={this.setCategoryDetails}
                    skills={this.state.categories[1].skills}
                    iconUrl={this.state.categories[1].image}
                    categoryName={this.state.categories[1].name}
                 />           
                 </div>
               <div className="item" >
               <SkillCategoryLabel
                    id={3}
                    obj={this.state.categories[2]}
                    setCategoryDetails={this.setCategoryDetails}
                    skills={this.state.categories[2].skills}
                    iconUrl={this.state.categories[2].image}
                    categoryName={this.state.categories[2].name}
                 />
                  </div>
             </div>
             <div className="col-center" >

             <div className="item" >
                <Lego setLego={this.setLego} currentLego={this.state.lego}/>
             </div>

             </div>
             <div className="col-right" >
                 <div className="item" >
                   <SkillCategoryLabel
                        id={4}
                        obj={this.state.categories[3]}
                        setCategoryDetails={this.setCategoryDetails}
                        skills={this.state.categories[3].skills}
                        iconUrl={this.state.categories[3].image}
                        categoryName={this.state.categories[3].name}
                     />
                   </div>
                 <div className="item" >
                 <SkillCategoryLabel
                      id={5}
                      obj={this.state.categories[4]}
                      setCategoryDetails={this.setCategoryDetails}
                      skills={this.state.categories[4].skills}
                      iconUrl={this.state.categories[4].image}
                      categoryName={this.state.categories[4].name}
                   />
                 </div>
                 <div className="item" >
                 <SkillCategoryLabel
                      id={6}
                      obj={this.state.categories[5]}
                      setCategoryDetails={this.setCategoryDetails}
                      skills={this.state.categories[5].skills}
                      iconUrl={this.state.categories[5].image}
                      categoryName={this.state.categories[5].name}
                   />
                   </div>
             </div>
          </div>
          <div className='row' style={{justifyContent:'center'}}>
              <div className="item" >
                 <button onClick={this.create}>Create Role</button>
              </div>
              <div className="item" >
                 <label style={{color:'red',fontSize:'12px'}}>{this.state.error}</label>
              </div>
          </div>
          <div className='row' style={{justifyContent:'center'}}>
              <div className="item" >
                 <label style={{color:'red',fontSize:'12px'}}>{this.state.error}</label>
              </div>
          </div>
        </div>
    )
  }

}

module.exports = Fork
