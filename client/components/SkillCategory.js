const React = require('react');
const Modal = require('react-modal');
const Hexagon=require('./Hexagon');
const Galary=require('./Gallery');
class SkillCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false,name:'',iconUrl:'',selectedIconUrl:'' ,key:1,SkillBoxes:['']}
    this.handleChange=this.handleChange.bind(this)
    this.handleClick=this.handleClick.bind(this)
    this.changeInputValue=this.changeInputValue.bind(this)
    this.setIcon=this.setIcon.bind(this)
  }
  setIcon(url){this.setState({iconUrl: url,key: Math.random()})}
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
    const skillsBoxes =this.state.SkillBoxes.map((value,index)=>{
      return(
        <div key={index}><input style={{marginRight:0}} onChange={this.changeInputValue} value={value} key={index} id={`skill-${index+1}`} /><button id={`Removeskill-${index+1}`} onClick={(e)=>this.removeSkill(e)} >-</button><br /></div>
      )
    })

    return (
    <div style={{height:'100%' , with:'100%'}}>
        <Hexagon key={this.state.key}  setIcon={this.state.iconUrl} click={this.handleClick} />
        <Modal
            isOpen={this.state.isModalOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={() => this.closeModal()}
            contentLabel="Create New Category "
          >
          <Galary pickedIcon={this.setIcon} />
          <label>
            Category Name: <input  type='text' ref='cn' />
          </label>
          <br />
          <label>
          <br />
            Skills: {skillsBoxes}
          </label>
          <button onClick={(e) =>this.addSkillField(e)} > + </button>
          <p><button onClick={() => this.closeModal()}>Cancel</button></p>
          <p><button onClick={this.handleChange}>Set</button></p>
        </Modal>
    </div>
    )
    }
  handleClick(e){this.openModal(e)}
  openModal(e) {

      this.setState({ isModalOpen: true })
  }

  closeModal() {
       this.setState({ isModalOpen: false })
  }
  handleChange(e){
        e.preventDefault()
        this.props.handler(this.refs.cn.value,this.state.SkillBoxes);
        this.closeModal()
  }
}
module.exports = SkillCategory
