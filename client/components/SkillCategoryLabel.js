const React = require('react');
const 	Hexagon = require('./Hexagon');
const SkillCategory = require('./SkillCategory');
const  Col=require('react-bootstrap').Col
const  Row=require('react-bootstrap').Row
const  Grid=require('react-bootstrap').Grid

class SkillCategoryLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {  key:1}
    this.handler = this.handler.bind(this)
    this.toggleShow=this.toggleShow.bind(this)
  }
  handleClick(e){this.refs.sc.openModal(e)}
  toggleShow(e){
    e.stopPropagation()
    console.log(e.target.childNodes[0])
    e.target.readOnly = false
    e.target.borderSize='1px'

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
        <div  key={index} >
        <input key={index} size='7' placeholder='skill'
          style={{border:'none',borderSize:'0px',readOnly:true,marginLeft:'1px' }}
          onFocus={this.toggleShow}  defaultValue={skill} />

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
