const React = require('react');
const Modal = require('react-modal');
const Hexagon=require('./Hexagon');
const LegoGallery=require('./LegoGallery');
const SkillCategory = require('./SkillCategory');
const  Col=require('react-bootstrap').Col
const  Row=require('react-bootstrap').Row
const  Grid=require('react-bootstrap').Grid

class SkillCategoryLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key:Math.random(),
      name:this.props.categoryName,
      skills:this.props.skills, 
      icon:this.props.iconUrl,
      isModalOpen: false,
      currentWidth:'90px',
      items:[
        './client/assets/icons/1.png',
        './client/assets/icons/2.png',
        './client/assets/icons/3.png',
        './client/assets/icons/4.png',
        './client/assets/icons/5.png',
        './client/assets/icons/6.png',
        './client/assets/icons/7.png',
        './client/assets/icons/8.png',
        './client/assets/icons/9.png',
            ]
    }
    this.toggleShow=this.toggleShow.bind(this)
    this.onEnter=this.onEnter.bind(this)
    this.setIcon=this.setIcon.bind(this)
    this.syncCategoryName=this.syncCategoryName.bind(this)

  }
//   componentDidUpdate(prevProps,prevState){
//
//   prevState !== this.state.icon ? this.updateCategory() : null
// }
  setIcon(index){
    console.log(index)
    let icon=this.state.items[index]
    this.setState({
      icon: icon ,
      key: Math.random()
   })
   this.closeModal()
 }

  openModal(e) {

    this.setState({ isModalOpen: true })
  }

  closeModal() {
     this.setState({ isModalOpen: false })
     //this.updateCategory()
  }
  handleClick(e){this.openModal(e)}

  toggleShow(e){
   // e.stopPropagation()
    let input =e.target.parentNode.childNodes[0]
    let index=input.id.split('-')[1]-1
    let skills=this.state.skills
    //let isShown=this.state.isShown
    //isShown[index]=true;
    input.readOnly = false
    input.borderSize='1px'
    // this.setState({
    //   isShown:isShown
    // })

  }
  syncCategoryName(e){
    let name=e.target.value
    this.setState({
      name:name,
    })
  }
  componentWillMount(){console.log()}
  // showText(e){
  //   e.stopPropagation()
  //   let index=e.target.id.split('-')[1]-1
  //   let isShown=this.state.isShown
  //   isShown[index]=false
  //   this.setState({
  //     isShown:isShown
  //   })
  //   this.updateCategory()
  //   }
  // adjustWidth(e){
  //
  //   let value=e.target.value
  //   let width=e.target.style.width = ((value.length + 1) * 8) + 'px'
  //   let currentWidth = parseInt(width.replace('px',''))<100 ? '90px' : width
  //   this.setState({
  //     currentWidth:currentWidth
  //   })
  // }

  // validate(e){
  //   let value=e.target.value
  //   let index=e.target.id.split('-')[1]-1
  //   let skills=this.state.skills
  //   value.length > 12 ?  skills[index] = skills[index].slice(0,15) : null
  //   this.setState({
  //     skills:skills,key: Math.random()
  //   })

  //}

  onEnter(e){
    if( e.which==13){ (e.target).blur()}
  }
  syncSkills(e) {
    let inputs=e.target.parentNode.childNodes
    inputs= [ ...inputs ];
    console.log(inputs.length)
    let value=e.target.value

    let skills=this.props.skills//inputs.map((input,index)=>input.value)
    let index=e.target.id.split('-')[1]-1
    //let skills=this.state.skills
    value.length > 15 ?  skills[index] = skills[index].slice(0,15) : skills[index]=value
    e.target.value=skills[index];
    this.setState({
      skills: skills ,
      key: Math.random()
    })
  }
  componentDidUpdate(p,s){
    s.icon!=this.state.icon ? this.props.onCategoryImageChanged(this.props.id,this.state.icon): null
    s.name!=this.state.name ? this.props.onCategoryNameChanged(this.props.id,this.state.name): null
    s.skills!=this.state.skills ? this.props.onCategorySkillsChanged(this.props.id,this.state.skills): null
  }//fixed icon image sync with App's state
  render() {
    const skills=this.props.skills.map((skill,index)=>{
      return(
        <div  style={{width:'5em'}} key={index} >
        <input   id={`skill-${index+1}`}
          key={index}  placeholder='skill' onKeyUp={this.onEnter}
          style={{border:'none',borderSize:'0px',readOnly:true,marginLeft:'1px',width:`${this.state.currentWidth}`}}
          onBlur={(e)=>this.syncSkills(e)} 
          defaultValue={skill} />
        </div>
        
    )})
    let key=  Date.now()
    console.log('name'+ name)
    return (

      <div className="main-container" style={{backgroundColor:'white',width:'270px'}}>
        <div className="col"  style={{}}>
          <div className='row' style={{}}>
              <input size='20' style={{border:'none',borderSize:'0px',readOnly:false}} 
                 onFocus={this.toggleShow}
                 
                 onBlur={this.syncCategoryName}
                 placeholder='Category'
                 key={Math.random()}
                 className="item-category-name" 
                 defaultValue={this.props.categoryName} />
          </div>
          <div className='' style={{display:'flex',flexBasis:'max-content',flexWrap:'wrap',justifyContent:'space-between'}}>
                {skills}
          </div>

      </div>

      <Hexagon size={6} className="item-hexagon" key={Math.random()}  setIcon={this.props.iconUrl} click={(e)=>this.handleClick(e)} />
      <div style={{height:'20%' , with:'20%'}}>
          <Modal
              isOpen={this.state.isModalOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={() => this.closeModal()}
              contentLabel="Icon Picker"
            >
            <LegoGallery pickedLego={this.setIcon} legos={this.state.items}/>
          </Modal>
      </div>
      </div>
    )
  }

}
module.exports = SkillCategoryLabel
