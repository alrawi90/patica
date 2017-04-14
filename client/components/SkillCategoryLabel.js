const React = require('react');
const 	Hexagon = require('./Hexagon');
const SkillCategory = require('./SkillCategory');
const  Col=require('react-bootstrap').Col
const  Row=require('react-bootstrap').Row
const  Grid=require('react-bootstrap').Grid

class SkillCategoryLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {key:1,name:this.props.categoryName,skills:this.props.skills,icon:this.props.iconUrl,
      isShown:[true,true,true,true,true,true]}
    this.handler = this.handler.bind(this)
    this.toggleShow=this.toggleShow.bind(this)
    this.updateCategory=this.updateCategory.bind(this)
    this.onEnter=this.onEnter.bind(this)
  }
  updateCategory(){
    this.props.setCategoryDetails(this.props.id,this.state.name,this.state.skills,this.state.iconUrl)
  }
  handleClick(e){this.refs.sc.openModal(e)}
  toggleShow(e){
    e.stopPropagation()
    let input =e.target.parentNode.childNodes[0]
    let index=input.id.split('-')[1]-1
    let skills=this.state.skills
    let isShown=this.state.isShown
    isShown[index]=true;
    input.readOnly = false
    input.borderSize='1px'
    this.setState({
      isShown:isShown
    })
    //e.target.visibility='visible'
  //  e.target.parentNode.childNodes[1].innerHtml=''
  }
  showText(e){
    e.stopPropagation()

    let index=e.target.id.split('-')[1]-1
    let skills=this.state.skills
    let isShown=this.state.isShown
    isShown[index]=false
    skills[index]=e.target.value
    this.setState({
      skills:skills,isShown:isShown
    })
    this.updateCategory()
    //e.target.parentNode.childNodes[1].innerHtml=e.target.value;
    }//alert(e.target.value)}
  onEnter(e){
    //alert()
    //e.target.parentNode.childNodes[0].innerHtml=e.target.value;

    if( e.which==13){ (e.target).blur()}
  }
  handler(cn,skills,iconUrl) {
    this.props.setCategoryDetails(this.props.id,cn,skills,iconUrl)

    this.setState({
      //categoryName: cn, skills: skills ,
       //iconUrl: iconUrl,
      key: Math.random()
    })
  }
  render() {
    const skills=this.props.skills.map((skill,index)=>{
      return(
        <div  style={{Width:'5em'}} key={index} >
        <input className={this.state.isShown[index] ? '' : 'hidden'}  id={`skill-${index+1}`}
          key={index} size='7' placeholder='skill'
          onKeyPress={this.onEnter}
          style={{border:'none',borderSize:'0px',readOnly:true,marginLeft:'1px' }}
          onBlur={(e)=>this.showText(e)} onChange={this.updateCategoryName}
          defaultValue={skill} />
          <label onClick={this.toggleShow} style={skill==''? {Width:'5em',borderColor:'silver',borderStyle:'solid',borderSize:'1px'} : {Width:'5em'}} className={this.state.isShown[index] ? 'small-font hidden' : 'small-font'}>{this.state.skills[index]}</label>
        </div>

    )})
    return (

      <div className="main-container" style={{backgroundColor:'white',width:'270px'}}>
        <div className="col"  style={{}}>
          <div className='row' style={{}}>
              <input size='20' style={{border:'none',borderSize:'0px',readOnly:true}} onFocus={this.toggleShow}
                 className="item-category-name" defaultValue={this.props.categoryName} />
          </div>
          <div className='' style={{display:'flex',flexBasis:'max-content',flexWrap:'wrap',justifyContent:'space-between'}}>
                {skills}
          </div>

      </div>

      <Hexagon size={6} className="item-hexagon" key={this.state.key}  setIcon={this.props.iconUrl} click={(e)=>this.handleClick(e)} />

      </div>
    )
  }

}
module.exports = SkillCategoryLabel
