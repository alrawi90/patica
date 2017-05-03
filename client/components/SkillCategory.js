const React = require('react');
const Modal = require('react-modal');
const Hexagon=require('./Hexagon');
const Galary=require('./Gallery');
class SkillCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false,name:props.categoryName,set:false,key:1,SkillBoxes:props.skills}
    this.onCategoryNameChanged=this.onCategoryNameChanged.bind(this)
    this.changeInputValue=this.changeInputValue.bind(this)
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
          SkillBoxes:nextProps.skills
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
                <span style={{display:'none',position:'absolute',width:'100px',height:'3px',color:'red'}} >{'ــــــــــــــــــــ'}</span>
                
                <input 
                  style={{border:'none',borderSize:'0px',
                       readOnly:false,fontSize:'14px',fontWeight:'bold',textOverflow: 'ellipsis',overflow:'hidden'}}  
                  onChange={this.changeInputValue} 
                  value={value} 
                  key={index} 
                  id={`skill-${index+1}`}
                 />
                 
                <button id={`Removeskill-${index+1}`} onClick={(e)=>this.removeSkill(e)} ><i className="fa fa-remove"></i></button>
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
          
        <svg viewBox='0 0 110 110'
          id="image-fill" xmlns="http://www.w3.org/2000/svg"
          version="1.1" width='5em' height='5em'
          xmlnsXlink="http://www.w3.org/1999/xlink"
          > 
          <defs key={this.state.key} >
            <pattern id={`image-bg-${this.state.key}`} x="36" y="36"
              height="110" width="110"
              patternUnits="userSpaceOnUse">
              <g ><text textAnchor='middle' x="25px" y="40px"  >{this.props.iconUrl}</text></g> 
            </pattern>
          </defs>
          <polygon
            className="" points="60,20 100,45 100,87 60,110 20,87 20,45" 
            style={{fill:'#0d6d04'}}></polygon>
          <polygon onClick={this.props.click}
            className="" points="60,20 100,45 100,87 60,110 20,87 20,45"
            fill={`url('#image-bg-${Math.random()}')`}></polygon>
        </svg>

          <label>
            Category Name: <input 
            key={Date.now()} 
            defaultValue={this.state.name} 
            type='text' ref='cn'
            onBlur={this.onCategoryNameChanged}
             />
          </label>
          <br />
          <label>
          <br />
            Skills: {outcome}
          </label>
          <button onClick={(e) =>this.addSkillField(e)} ><i className="fa fa-plus"></i></button>

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
       //this.props.onCategorySkillsChanged(this.props.id,this.state.skillBoxes)
       
  }

}
module.exports = SkillCategory
