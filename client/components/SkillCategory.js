const React = require('react');
const Modal = require('react-modal');
const Hexagon=require('./Hexagon');
const Galary=require('./Gallery');
class SkillCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false,set:false,name:props.categoryName,key:1,SkillBoxes:[],
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
  // componentWillUpdate(p,s){ 
  //   if(s.set!= this.state.set)
  //     this.state.set ? null : this.setState({SkillBoxes:this.props.skills  })
  // }

  changeInputValue(e){
    //
    const index=parseInt(e.target.id.split('-')[1])
    let sbs=this.state.SkillBoxes
    sbs[index-1][0]=e.target.value
    this.setState({SkillBoxes: sbs});
  }
  addSkillField(e) {
    let sbs = this.state.SkillBoxes;
    console.log(sbs[sbs.length-1])
    sbs.push(['',{isEditMode:false}])
    this.setState({SkillBoxes: sbs});
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
    console.log(SkillBoxes)
  }
  startEditMode(e) {
      console.log(e.target)
      e.stopPropagation()
      e.preventDefault()
      let index=parseInt((e.target.id).split('-')[1])-1;
      let SkillBoxes=this.state.SkillBoxes
      SkillBoxes[index][1].isEditMode=true
      this.setState({ SkillBoxes:SkillBoxes })
      // let input =e.target.parentNode.childNodes[1]
      // console.log(input)
      // input.select())
  }

  finishEditMode(e) {
    
      e.stopPropagation()
      let index=parseInt((e.target.id).split('-')[1])-1;
      let SkillBoxes=this.state.SkillBoxes
      SkillBoxes[index][1].isEditMode=false
      this.setState({ SkillBoxes:SkillBoxes })
      //this.forceUpdate()
  
  }
  render () {
    
    const outcome =this.state.SkillBoxes.map((item,index)=>{
      let element;
      if(this.state.SkillBoxes[index][1].isEditMode){
        element=(                
          <input 
                  style={{border:'none',borderSize:'0px',
                  readOnly:false,fontSize:'14px',fontWeight:'bold',textOverflow: 'ellipsis',overflow:'hidden'}}  
                  onChange={this.changeInputValue} 
                  onBlur={(e)=>this.finishEditMode(e)}
                  defaultValue={item[0].title} 
                  onFocus={(e)=>{e.target.focus();e.target.select()}}
                  key={index} 
                       ref={function(input) {
        if (input != null) {
          input.focus();
        } } }
                  id={`skill_input-${index+1}`} 
                 />)
      }else{
        element=(                
          <a    href="#"  onClick={
                    (e)=>this.setState({
                      description:this.state.SkillBoxes[index][0].path.description,
                      skillSelected:this.state.SkillBoxes[index][0].title,
                      modules:this.state.SkillBoxes[index][0].path.modules,

                     })}
                  style={{border:'none',borderSize:'0px',width:'190px',whiteSpace: 'no-wrap',display: 'inline-block',

                  fontSize:'14px',fontWeight:'bold',overflow:'hidden'}}  
                  key={index} 
                  id={`skill_link-${index+1}`}
                 >{item[0].title}</a>
                 ) 
      }
      return(
        <span key={index} onClick={(e)=> e.stopPropagation()} className='row' 
        style={{backgroundColor:'',whiteSpace:'wrap'}} >
          <span style={{display:'none',position:'absolute',width:'100px',height:'3px',color:'red'}} >{'ــــــــــــــــــــ'}</span>
          <div>{element}</div>
          <div> 
            <button style={{display: 'inline-block'}} id={`Editkill-${index+1}`} onClick={this.startEditMode} ><i id={`fa_Editkill-${index+1}`} className="fa fa-edit"></i></button>

            <button style={{display: 'inline-block'}} id={`Removeskill-${index+1}`} onClick={(e)=>this.removeSkill(e)} ><i className="fa fa-remove"></i></button>
          </div>
        </span>
      )
    })

    return (
    <div style={{height:'20%' , with:'20%'}}>
        <Modal
            style={{
                  content : {
                          top                   : '50%',
                          left                  : '50%',
                          right                 : 'auto',
                          bottom                : 'auto',
                          marginRight           : '-50%',
                          transform             : 'translate(-50%, -50%)',
                          width:'85%' ,height:'70%',borderColor:'green',borderSize:'5px'
                        },
                        overlay: {
  perspective: '100px',
  opacity: '1',transition: 'opacity 1500ms ease-out'
}

            }}
            isOpen={this.state.isModalOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={() => this.closeModal(false)}
            contentLabel="Create New Category "
          >
          <div className='main-container'  style={{justifyContent:'space-around'}}>
              <div className='col-left' style={{width:'380px',backgroundColor:''}}>
                  <div 
                     style={{display:'inline-flex',justifyContent:'space-around'}} >
                    <Hexagon size={5} className="item-hexagon" isActive={false} key={Math.random()}  setIcon={this.props.iconUrl}  />
                      <div style={{margin:'6% 0%'}}> 
                        <label>
                          <input size='10'
                            key={Date.now()} 
                            defaultValue={this.state.name} 
                            type='text' ref='cn'
                            onBlur={this.onCategoryNameChanged}
                           /> Skills
                        </label>
                      </div>
                  </div>  
    
                      <div className='' >
                          <label>
                           Skills:
                          </label>
                            {outcome}
                          <button className='patica-bg-color' onClick={(e) =>this.addSkillField(e)} ><i className="fa fa-plus"></i></button>
                      </div>
              </div>
    
                  <div className='col-center' style={{width:'380px' }}>
                      <div  ><h3>
                       {this.state.skillSelected}
                      </h3></div>
                      <div><p style={{color:'#fff'}}>{this.state.description}</p></div>
                  </div>
                  <div className='col-right' style={{width:'380px',backgroundColor:''}}>
                      <label>
                       Modules:
                      </label>

                      <div style={{width:'300px',height:'400px',backgroundColor:''}} >
                        <ul>{this.state.modules.map((item,index)=>{return <li><h6>{item.trim()}</h6></li>})}</ul>
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
       console.log(this.state.name)

       this.props.onCategoryNameChanged(this.props.id,this.state.name)
       this.props.onCategorySkillsChanged(this.props.id,this.state.SkillBoxes.map((item,index)=>item[0]))
       
  }

}
module.exports = SkillCategory
