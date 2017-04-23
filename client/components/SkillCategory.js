const React = require('react');
const Modal = require('react-modal');
const Hexagon=require('./Hexagon');
const Galary=require('./Gallery');
class SkillCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false,name:'',set:false,skills:[] ,key:1,SkillBoxes:props.skills}
    this.set_=this.set_.bind(this)
    //this.handleClick=this.handleClick.bind(this)
    this.changeInputValue=this.changeInputValue.bind(this)
    this.setIcon=this.setIcon.bind(this)
  }

  setIcon(url){

    this.setState({
      iconUrl: url,
      key: Math.random(),
   })
  }

  componentWillReceiveProps(nextProps) {
  // very neccessary to set this.skillBoxes state to the this.props.skills value 
      if (nextProps.skills !== this.state.SkillBoxes) {
            this.setState({
          SkillBoxes:nextProps.skills
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
    sbs[index-1]=e.target.value
    this.setState({SkillBoxes: sbs});
  }
  addSkillField(e) {
    let sbs = this.state.SkillBoxes;
    console.log(sbs[sbs.length-1])
    sbs.push('')
    this.setState({SkillBoxes: sbs});
  }
  removeSkill(e){
    let index=e.target.id.split('-')[1]
    let sbs = this.state.SkillBoxes;
    sbs.splice(index-1,1)
    this.setState({SkillBoxes: sbs});
  }
  componentWillMount(){
  }
  render () {
  
    const outcome =this.state.SkillBoxes.map((value,index)=>{
      return(
        <div key={index}>
                <span style={{position:'absolute',width:'100px',height:'3px',color:'red'}} >{'ــــــــــــــــــــ'}</span>
                <input 
                  style={{marginRight:0}} 
                  onChange={this.changeInputValue} 
                  value={value} 
                  key={index} 
                  id={`skill-${index+1}`}
                 />
                <button id={`Removeskill-${index+1}`} onClick={(e)=>this.removeSkill(e)} >-</button>
                <br />
        </div>
      )
    })

    return (
    <div style={{height:'100%' , with:'100%'}}>
        <Modal
            isOpen={this.state.isModalOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={() => this.closeModal(false)}
            contentLabel="Create New Category "
          >
          
          <label>
            Category Name: <input key={Date.now()} defaultValue={this.props.categoryName} type='text' ref='cn' />
          </label>
          <br />
          <label>
          <br />
            Skills: {outcome}
          </label>
          <button onClick={(e) =>this.addSkillField(e)} > + </button>
          <p><button onClick={() => this.closeModal(false)}>Cancel</button></p>
          <p><button onClick={this.set}>Set</button></p>
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

  }
  set_(e){
        e.preventDefault()
        this.props.handler(this.refs.cn.value,this.state.SkillBoxes,this.state.iconUrl);
        this.closeModal(true)
  }
}
module.exports = SkillCategory
