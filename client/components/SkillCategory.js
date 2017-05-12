const React = require('react');
const Modal = require('react-modal');
const Hexagon=require('./Hexagon');
const Galary=require('./Gallery');
class SkillCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false,set:false,name:props.categoryName,key:1,SkillBoxes:[],skillSelected:0,
      description:`Learning Outcome

After following this skill path, you should be able to:
+ display confidence in using systems concepts and language
+ describe accurately the set of key systems concepts
+ understand what is distinctive about systems thinking as opposed to other forms of thinking
+ understand how systems thinking is useful in analysing and improving situations
+ understand the notion of a system as a creation of the observer, i.e. as an intellectual construct,
 as opposed to using the term system in other ways, i.e. as entities that exist ‘out there’.` ,
 modules:[]
    }
    this.onCategoryNameChanged=this.onCategoryNameChanged.bind(this)
    this.changeInputValue=this.changeInputValue.bind(this)
    this.startEditMode=this.startEditMode.bind(this)

  }

  onCategoryNameChanged(e){

    this.setState({
      name: e.target.value,
      key: Math.random(),
   })
  }

  componentWillReceiveProps(nextProps) {
  // very neccessary to set this.skillBoxes state to the this.props.skills value 
      if (nextProps.skills !== this.state.SkillBoxes) {
            this.setState({
          SkillBoxes:nextProps.skills.map((item,index)=>{return[item,{isEditMode:false}]})
        })
      }   
      if (nextProps.categoryName !== this.state.name) {
            this.setState({
          name:nextProps.categoryName
        })
      }     
  }

  onEnter(e){
    if( e.which==13){ (e.target).blur()}
  }


  changeInputValue(e){
    //
    const index=parseInt(e.target.id.split('-')[1])
    let SkillBoxes=this.state.SkillBoxes
    SkillBoxes[index-1][0].title=e.target.value
    this.setState({SkillBoxes});
  }
  addSkillField(e) {
    let SkillBoxes = this.state.SkillBoxes;
    //console.log(sbs[sbs.length-1])
    SkillBoxes.push([{},{isEditMode:true}])
    this.setState({SkillBoxes: SkillBoxes});
    //this.startEditMode(e)
  }
  removeSkill(e){
    let index=e.target.id.split('-')[1]
    let sbs = this.state.SkillBoxes;
    sbs.splice(index-1,1)
    this.setState({SkillBoxes: sbs});
  }
  componentDidMount(){
    let SkillBoxes=this.props.skills.map((item,index)=>{return[item,{isEditMode:false}]})
    this.setState({SkillBoxes})
    //console.log(SkillBoxes)
  }
  startEditMode(e) {
    if(e.target==this.refs.descriptionBtn   || e.target==this.refs.descriptionBtnFa){
       // alert('ok');
        this.refs.description.readOnly = false;
        this.refs.description.focus();this.refs.description.select();
        this.refs.description.style.backgroundColor="white";
        this.refs.description.style.color="blue";
        }
    else{
      e.stopPropagation()
      e.preventDefault()
      let index=parseInt((e.target.id).split('-')[1])-1;
      let SkillBoxes=this.state.SkillBoxes
      SkillBoxes[index][1].isEditMode=true
      this.setState({ SkillBoxes:SkillBoxes })
    }
      // let input =e.target.parentNode.childNodes[1]
      // console.log(input)
      // input.select())
  }

  finishEditMode(e) {
    
    if(e.target==this.refs.description){this.refs.description.readOnly = true;}
    else
      e.stopPropagation()
      let index=parseInt((e.target.id).split('-')[1])-1;
      let SkillBoxes=this.state.SkillBoxes
      SkillBoxes[index][1].isEditMode=false
      this.setState({ SkillBoxes})
      //this.forceUpdate()
      this.changeInputValue(e)

  
  }
  displayCurrentSkill(e,index){

    //e.target.style.color='green'
    //e.target.parentNode.id
    this.setState({
                      description:this.state.SkillBoxes[index][0].description,
                      skillSelected:index
                      // modules:this.state.SkillBoxes[index][0].path.modules,

                     })

  }
  DescriptionChanged(e){
      let description=e.target.value
      let index=parseInt((e.target.id).split('-')[1])-1;
      let SkillBoxes=this.state.SkillBoxes
      SkillBoxes[index][0].description=description
      this.setState({ SkillBoxes}) 
      this.displayCurrentSkill(e,index)
    }
  toggleSkillStatus(e){
      let description=e.target.value
      let index=parseInt((e.target.id).split('-')[1])-1;
      let SkillBoxes=this.state.SkillBoxes
      SkillBoxes[index][0].disabled=! SkillBoxes[index][0].disabled
      this.setState({ SkillBoxes}) 

  }
  render () {
    
    const outcome =this.state.SkillBoxes.map((item,index)=>{
      let element;
      let key=Math.random()
      let greenIfSelected= index==this.state.skillSelected ? 'green' : '#38417a'
      let redLineIfDisabled= item[0].disabled ? 'block' : 'none'
      let btnIcon=item[0].disabled ? 'fa-unlock-alt' : 'fa-lock'
      let isDisabled=item[0].disabled ? 'readOnly' : ''
      if(this.state.SkillBoxes[index][1].isEditMode){
        element=(                
          <input 
                  style={{border:'none',borderSize:'0px',display: 'inline-block',
                  readOnly:false,fontSize:'14px',fontWeight:'bold',textOverflow: 'ellipsis',overflow:'hidden'}}  
                  onBlur={(e)=>this.finishEditMode(e)}
                  defaultValue={item[0].title} 
                  onFocus={(e)=>{e.target.focus();e.target.select()}}
                  onKeyUp={this.onEnter}
                  key={index} 
                  ref={function(input) {
                                          if (input != null) {
                                            input.focus();
                                          } } }
                  id={`skill_input-${index+1}`} 
                 />)
      }else{
        element=(                
          <input   readOnly href="#"  onClick={(e)=>this.displayCurrentSkill(e,index)}
                  style={{border:'none',borderSize:'0px',width:'190px',whiteSpace: 'no-wrap',
                  textDecoration:'none',color:`${greenIfSelected}`,
                  fontSize:'14px',fontWeight:'bold',overflow:'hidden'}}  
                  key={index} 
                  id={`skill_link-${index+1}`} defaultValue={item[0].title}
                 />
                 ) 
      }
      return(
        
        <span key={key} onClick={(e)=> e.target.blur()} className='row'
          style={{backgroundColor:'',whiteSpace:'wrap'}} >
            <div style={{padding: '0px'}}>
              <span style={{position:'absolute',color:'red',display:`${redLineIfDisabled}`}} >{'----------------'}</span>
              <li style={{color:`${greenIfSelected}`,listStylePosition: 'inside'}}>{element}</li> 
            </div>
            <div style={{marginTop:'0px'}}> 
              <button disabled={item[0].disabled}
                className={!item[0].disabled ? `button patica-bg-color` : `button-inactive`}
                style={{display: 'inline-block',margin:'0px 3px',border:'none'}} 
                id={`Editkill-${index+1}`} 
                onClick={this.startEditMode} >
                <i id={`fa_EditSkill-${index+1}`} className="fa fa-edit white"></i>
              </button>

              <a 
                className="button patica-bg-color"
                style={{display: 'inline-block'  ,margin:'0px 3px'}} 
                id={`Removeskill-${index+1}`} 
                onClick={(e)=>this.removeSkill(e)} >
                <i id={`fa_removeSkill-${index+1}`} className="fa fa-remove white"></i>
              </a>
              <a 
                className="button patica-bg-color"
                style={{display: 'inline-block'  ,margin:'0px 3px'}} 
                id={`skillStatus-${index+1}`} 
                onClick={(e)=>this.toggleSkillStatus(e)} >
                <i className={`fa ${btnIcon} white`} id={`fa_skillStatus-${index+1}`} ></i>
              </a>
            </div>
        </span>
      )
    })

    return (
    <div style={{height:'20%' , with:'20%'}}>
        <Modal 
            style={{
                  content : {
                          top                   : '50%',borderSize:'10px',padding:'0px',margin:'0px',
                          left                  : '50%',
                          right                 : 'auto',
                          bottom                : 'auto',
                          marginRight           : '-50%',
                          transform             : 'translate(-50%, -50%)',
                          width:'65%' ,height:'65%',borderColor:'#2a9639'
                        },


            }}
            isOpen={this.state.isModalOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={() => this.closeModal(false)}
            contentLabel="Interact With Skill"
          >
          <div className='main-container'  style={{
            justifyContent:'space-around',border:'solid 5px #2a9639',margin:'0px',padding:'0px',minHeight:'100%'
          }}>
              <div className='col-left' style={{width:'40%',backgroundColor:''}}>
                  <div 
                     style={{display:'inline-flex',justifyContent:'space-around'}} >
                    <Hexagon size={5} className="item-hexagon" isActive={false} key={Math.random()}  setIcon={this.props.iconUrl}  />
                      <div style={{margin:'6% 0%'}}> 
                        <label className="upcase" style={{fontSize:'16px',fontWeight:'bold'}}>
                          <input size='15' 
                            className="upcase"
                            style={{border:'none',borderSize:'0px',whiteSpace: 'no-wrap',
                                    fontSize:'16px',fontWeight:'bold',overflow:'hidden'}} 
                            key={Date.now()} 
                            defaultValue={this.state.name} 
                            type='text' ref='cn'
                            onBlur={this.onCategoryNameChanged}
                           />
                        </label>
                      </div>
                  </div>  
    
                  <div className='' >
                          <label>
                           Skills:
                          </label>
                            {outcome}
                          <a className="button patica-bg-color white"
                            onClick={(e) =>this.addSkillField(e)} >
                            <i className="fa fa-plus white"></i>Add New Skill
                          </a>
                      </div>
              </div>
    
                  <div className='col-right patica-bg-color' style={{width:'60%',padding:'5px'  }}>
                      <div  >
                        <h3 className="white">
                          {this.state.SkillBoxes.length>0 ? this.state.SkillBoxes[this.state.skillSelected][0].title: ''}
                        </h3>
                      </div>
                      
                      <div>
                          <a 
                            className="button " ref="descriptionBtn"
                            style={{display: 'inline-block',margin:'0px 3px',backgroundColor:'#fff',float:'right'}} 
                            
                            onClick={this.startEditMode} >
                            <i  ref="descriptionBtnFa" className="fa fa-edit " style={{color:'green'}}></i>
                          </a>

                          <textarea ref="description" readOnly
                             style={{border:'none',borderSize:'0px',width:'48em',height:'30em',resize:'none',
                                   readOnly:false,fontSize:'10px',fontWeight:'bold',
                                   textOverflow: 'ellipsis',overflow:'hidden'}} 
                             onFocus={this.toggleShow}
                             onKeyUp={this.onEnter}
                             onBlur={(e)=>this.DescriptionChanged(e)}
                             placeholder='Skill Description'
                             key={Math.random()} id={`skill_description-${(this.state.skillSelected)+1}`}
                             cols="42" rows="5" defaultValue={this.state.description}
                             className="patica-bg-color white"  >
                          </textarea>
                      </div>
                  </div>
  
          </div>    
        </Modal>
    </div>
    )
    }
  //handleClick(e){this.openModal(e)}
  openModal(e) {

      this.setState({ isModalOpen: true })
  }

  closeModal(set) {
       this.setState({ isModalOpen: false,set:set }) 
       

       this.props.onCategoryNameChanged(this.props.id,this.state.name)
       this.props.onCategorySkillsChanged(this.props.id,this.state.SkillBoxes.map((item,index)=>item[0]))
       
  }

}
module.exports = SkillCategory
