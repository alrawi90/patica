
const React = require('react');
const SkillCategoryLabel = require('./SkillCategoryLabel');
const RoleLabel = require('./RoleLabel');
const Lego = require('./Lego');
const SkillCategory = require('./SkillCategory');
import Draggable from 'react-draggable'; // The default
import DragSortableList from 'react-drag-sortable'
import {SortableContainer, SortableElement,arrayMove,SortableHandle} from 'react-sortable-hoc';
const Modal = require('react-modal')

class Fork extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isModalOpen:false,
      roleId:'5909976af3958abbc84d19c4',//show be a prop (set from the router)
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
      key:Date.now(),
      RelatedRoles:['Product Owner (Scrum)','Head of Product ', 'Director of Product' , 'Product Manager' ,
       'Product Marketing Manager'],
      //  activeDrags: 0,
      // deltaPosition: {
      //   x: 0, y: 0
      // },
      // controlledPosition: {
      //   x: -400, y: 200
      // }
    
    }
    this.setRoleName=this.setRoleName.bind(this)
    this.setRoleDescription=this.setRoleDescription.bind(this)
    this.setRoleKeywords=this.setRoleKeywords.bind(this)
    this.onCategoryNameChanged=this.onCategoryNameChanged.bind(this)
    this.onCategoryImageChanged=this.onCategoryImageChanged.bind(this)
    this.onCategorySkillsChanged=this.onCategorySkillsChanged.bind(this)
    this.setLego=this.setLego.bind(this)
    this.create=this.create.bind(this)
    this.addNewCategory=this.addNewCategory.bind(this)
    this.removeCategory=this.removeCategory.bind(this)
    this.onRoleKeywordsDelete=this.onRoleKeywordsDelete.bind(this)
    this.showAdvancedSettings=this.showAdvancedSettings.bind(this)
    // this.handleDrag=this.handleDrag.bind(this)
    // this.onStart=this.onStart.bind(this)
    // this.onStop=this.onStop.bind(this)
    this.onSortEnd=this.onSortEnd.bind(this)
  }

  showAdvancedSettings(e){
   e.stopPropagation()
   let factor=e.target.id.split('-')[1];
   this.refs['sc-' + factor].openModal(e)
  }

  addNewCategory(){
    let SkillCategory={name:'',skills:['','',''],image:''}
    let categories=this.state.categories
    categories.push(SkillCategory)
    this.setState({categories:categories,    activeDrags: 0,  
      deltaPosition: {
        x: 0,
        y: 0
      }})

  }

  removeCategory(e){

    let CategoryIndex=parseInt(e.target.id.split('-')[1])-1
    let categories=this.state.categories
    categories.splice(CategoryIndex,1)// remove Category
    this.setState({categories:categories})
     console.log(CategoryIndex+1 +' removed')
  }
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
      })  .catch(function(error) {
    console.log(error);
  });

  }
  setRoleName(roleName){

    this.setState({
      roleName: roleName
    });

  }
    
  setRoleDescription(description){

    this.setState({
      description:description
    });

  }
  
  setRoleKeywords(keyword){

    const keywords = [ ...this.state.keywords ];
    let t=this.state.keywords.map((obj,i)=>obj.text)
    //console.log('keywords ##',t)
    if(! t.includes(keyword)) {
        this.setState({
          keywords: [
            ...this.state.keywords,
            {
              id: keywords.length + 1,
              text: keyword
            }
          ],key:Math.random()
        });
      }

  }
  onRoleKeywordsDelete(i){

    this.setState({
      keywords: this.state.keywords.filter((tag, index) => index !== i)
    });

  }
  setLego(legoImg){this.setState({lego:legoImg})}

  onCategoryNameChanged(id,categoryName){
    let categories=this.state.categories
    categories[id-1].name=categoryName;
    this.setState({
      categories: categories
    });
  }
  onCategoryImageChanged(id,image){
    let categories=this.state.categories
    categories[id-1].image=image;
    this.setState({
      categories: categories
    });
  }
  onCategorySkillsChanged(id,skills){
    let categories=this.state.categories
    categories[id-1].skills=skills;
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
      opts.skillCategory=this.state.categories.map((item,index)=>{
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


  onSortEnd (obj) {
    let {categories} = this.state;
    console.log(obj)
    this.setState({
      categories: arrayMove(categories, obj.oldIndex, obj.newIndex),
    });
  }
  openModal(e) {

    this.setState({ isModalOpen: true })
  }

  closeModal() {
     this.setState({ isModalOpen: false })
     //this.updateCategory()
  }
  handleClick(e){this.openModal(e)}
  render() {
  
    const DragHandle = SortableHandle(() => 
      <button className='button' style={{backgroundColor:'#0d6d04'}}><i className='fa fa-hand-paper-o white'></i></button>);
    const SortableItem = SortableElement(({value}) => {
      return (
        <div>
          <DragHandle index={value.index}/>
          {value}
        </div>
      );
    });

    const SortableList = SortableContainer(({items}) => {
      
      return (
        
          <div className='row' style={{  
            display: '-ms-flexbox',

            flexFlow: 'row wrap', 
            display: '-webkit-box',
            display: 'flex',
            overflow: 'hidden'}}
            >

          {items.map((category, index) =>{
             let value =(

              <div  className="box" style={{border:'solid 1px',padding:'5px',backgroundColor:'gray'}} key={index} >                  
                    <SkillCategoryLabel
                      activeSort={true}
                      key={index}
                      id={index+1}
                      skills={category.skills}
                      iconUrl={category.image}
                      categoryName={category.name}
                    />
              </div>
              )

            return (
            <SortableItem key={`item-${index}`} index={index} value={value} /> 
            ) 
            }
           )
          }
        
            

         </div>
      );
    });

    const items=this.state.categories.map((category, index) =>{
      let dir;(index+1) %2 >0 ? dir='left' : dir='right'

        return(
             
              <div  className="box"  key={index} >
                <div style={{textAlign:`${dir}`}} >
                  <a  className="button white"
                    id={`removeBtn-${index+1}`} onClick={this.removeCategory}
                    style={{backgroundColor:'#0d6d04',margin:'3px'}}
                    >
                    <i  id={`faRemoveBtn-${index+1}`} style={{margin:'2px'}} className="fa fa-remove white"></i>
                  </a>
                  <a className="button white"
                     id={`editBtn-${index+1}`} 
                     onClick={this.showAdvancedSettings}
                     style={{backgroundColor:'#0d6d04',margin:'3px'}}
                     >
                     <i id={`faBtn-${index+1}`} style={{margin:'2px 0px 2px 2px'}} className="fa fa-edit white"></i>
                  </a>
                </div>
                 
                <SkillCategory 
                  id={index+1} 
                  ref={'sc-'+(index+1)} 
                  onAdvancedEdit={this.onAdvancedEdit}
                  iconUrl={category.image}
                  onCategoryNameChanged={this.onCategoryNameChanged}
                  onCategorySkillsChanged={this.onCategorySkillsChanged}
                  skills={category.skills}
                  categoryName={category.name}
                  />
                <SkillCategoryLabel
                  activeSort={false}
                  key={index}
                  id={index+1}
                  onCategoryNameChanged={this.onCategoryNameChanged}
                  onCategoryImageChanged={this.onCategoryImageChanged}
                  onCategorySkillsChanged={this.onCategorySkillsChanged}
                  skills={category.skills}
                  iconUrl={category.image}
                  categoryName={category.name}
                />
              </div>
        ) })

    return (
      
      <div className='col' >
      
      <Modal
                  style={{}}
                  isOpen={this.state.isModalOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={() => this.closeModal()}
                  contentLabel="Icon Picker"
                >

              <SortableList axis="xy" items={this.state.categories} onSortEnd={this.onSortEnd} useDragHandle={true} />

                             
      </Modal>

          <div className='row' style={{justifyContent:'center'}}>
           <div className='' >
              <RoleLabel 
                 setRoleName={this.setRoleName} 
                 setRoleDescription={this.setRoleDescription}
                 setRoleKeywords={this.setRoleKeywords}
                 onRoleKeywordsDelete={this.onRoleKeywordsDelete}
                 roleName={this.state.roleName} 
                 keywords={this.state.keywords}
                 description={this.state.description} 
                 suggestions={this.state.suggestions}
              />
              <div className='row' style={{justifyContent:'center',marginBottom:'15px',
                    cursor: 'auto',fontSize:'17px',fontWeight:'300px',
                    fontFamily:'Inconsolata'}}>Related Roles:
                  {this.state.RelatedRoles.map((role,index)=>{
                    return (
                      <span key={index} >
                          <a style={{textDecoration:'none',cursor: 'auto',fontSize:'17px',color:'#2a9639',
                                      fontWeight:'300px',fontFamily:'Inconsolata'}}
                           href='#'>{role}</a>{index!=(this.state.RelatedRoles.length-1) ? ' - ' : '' }
                      </span>)
                  })}
              </div>

              <div className='row' style={{justifyContent:'space-around'}}>
                    <div className="item" >
                       <a onClick={this.create} className='white button' style={{backgroundColor:'#0d6d04'}}>
                         <i className="fa fa-plus-square white"></i> Create New Role
                       </a>
                    </div>
                    
              <div className="item"  >
                       <a className="white button"
                          onClick={this.copy} style={{backgroundColor:'#0d6d04'}} >
                          <i className="fa fa-copy white"></i> Copy Role
                       </a>
              </div>
              <div className="item" >
                       <a className="white button"
                          onClick={(e)=>this.handleClick(e)} style={{backgroundColor:'#0d6d04'}} >
                          <i className="fa fa-sort-amount-asc white"></i> Sort Categories
                       </a>
              </div>
                    <div className='' key={Date.now()} style={{position:'relative'}}>
                        <a onClick={this.addNewCategory} className="button white" style={{backgroundColor:'#0d6d04'}} >
                          <i className="fa fa-plus-circle white"></i> Add New Category
                        </a>
                    </div>                   
              </div> 


          </div>

         </div>
          <div className='main-container' >
             <div className="col-left" >
                 {items.map((item,index)=>{if(index % 2==0) return (item)})}
             </div>
             <div className="col-center" >

                <div className="item" >
                  <Lego setLego={this.setLego} currentLego={this.state.lego}/>
                </div>

            </div>

             <div className="col-right" >
              {items.map((item,index)=>{if(index % 2 >0) return (item)})}
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
