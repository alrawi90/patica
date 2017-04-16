const React = require('react');
const Modal = require('react-modal');
const Hexagon=require('./Hexagon');
const LegoGallery=require('./LegoGallery');
const SkillCategory = require('./SkillCategory');
// const  Col=require('react-bootstrap').Col
// const  Row=require('react-bootstrap').Row
// const  Grid=require('react-bootstrap').Grid

class SkillCategoryLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key:1,name:this.props.categoryName,
      skills:this.props.skills,
      icon:this.props.iconUrl,
      //isShown:[true,true,true,true,true,true],
      isModalOpen: false,currentWidth:'90px',
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
    this.updateCategory=this.updateCategory.bind(this)
    this.onEnter=this.onEnter.bind(this)
    this.setIcon=this.setIcon.bind(this)

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
  updateCategory(e){
    this.props.setCategoryDetails(this.props.id,this.state.name,this.state.skills,this.state.icon)
  }
  openModal(e) {

    this.setState({ isModalOpen: true })
  }

  closeModal() {
     this.setState({ isModalOpen: false })
     this.updateCategory()
  }
  handleClick(e){this.openModal(e)}
  toggleShow(e){
    e.stopPropagation()
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
      name:name
    })
  }
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
    //this.props.setCategoryDetails(this.props.id,cn,skills,iconUrl)
    let value=e.target.value
    let index=e.target.id.split('-')[1]-1
    let skills=this.state.skills
    value.length > 15 ?  skills[index] = skills[index].slice(0,15) : skills[index]=value
    e.target.value=skills[index];
    this.setState({
      skills: skills ,
      key: Math.random()
    })
  }
  componentDidUpdate(p,s){s.icon!=this.state.icon ? this.updateCategory(): null}//fixed sync icon with the main state
  render() {
    const skills=this.props.skills.map((skill,index)=>{
      return(
        <div  style={{width:'5em'}} key={index} >
        <input   id={`skill-${index+1}`}
          key={index}  placeholder='skill'
          onKeyUp={this.onEnter}
          style={{border:'none',borderSize:'0px',readOnly:true,marginLeft:'1px',width:`${this.state.currentWidth}`}}
          onBlur={(e)=>this.showText(e)} onChange={(e)=>this.syncSkills(e)}
          defaultValue={skill} />
        </div>

    )})
    return (

      <div className="main-container" style={{backgroundColor:'white',width:'270px'}}>
        <div className="col"  style={{}}>
          <div className='row' style={{}}>
              <input size='20' style={{border:'none',borderSize:'0px',readOnly:true}} onFocus={this.toggleShow}
                 onChange={(e)=>this.syncCategoryName(e)}
                 onBlur={this.updateCategory}
                 className="item-category-name" defaultValue={this.props.categoryName} />
          </div>
          <div className='' style={{display:'flex',flexBasis:'max-content',flexWrap:'wrap',justifyContent:'space-between'}}>
                {skills}
          </div>

      </div>

      <Hexagon size={6} className="item-hexagon" key={this.state.key} change={this.updateCategory} setIcon={this.state.icon} click={(e)=>this.handleClick(e)} />
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
