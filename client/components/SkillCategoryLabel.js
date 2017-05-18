const React = require('react')
const Modal = require('react-modal')
const Hexagon=require('./Hexagon')
const Gallery=require('./Gallery')

class SkillCategoryLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key:Math.random(),
      name:this.props.categoryName,
      skills:this.props.skills, 
      icon:this.props.iconUrl,
      isModalOpen: false,
      currentWidth:'64px',
      items:[

           '\uf19c',
           '\uf15a',
           '\uf2dc',
           '\uf17a',
           '\uf13c',
           '\uf13b',
           '\uf270',
           '\uf179',
           '\uf294',
           '\uf1f4',
           '\uf06e'
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
    input.select()
    let index=input.id.split('-')[1]-1
    let skills=this.state.skills
    //let isShown=this.state.isShown
    //isShown[index]=true
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
  componentWillMount(){}
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
    inputs= [ ...inputs ]
    let value=e.target.value

    let skills=this.props.skills//inputs.map((input,index)=>input.value)
    let index=e.target.id.split('-')[1]-1
    //let skills=this.state.skills
    value.length > 15 ?  skills[index].title = skills[index].title.slice(0,15) : skills[index].title=value
    e.target.value=skills[index]
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
    let style = {
                        content : {
                          top                   : '50%',
                          left                  : '50%',
                          right                 : 'auto',
                          bottom                : 'auto',
                          marginRight           : '-50%',
                          transform             : 'translate(-50%, -50%)',
                          width:'20em' ,height:'20em',overflow:'hidden'
                        }
                  }
    const skills=this.props.skills.map((skill,index)=>{
      let key=  Math.random() // this line is very important to keep track of skills when add/remove Cretory & skill
       let dir;(parseInt(this.props.id)-1) %2 >0 ? dir='left' : dir='right'
       this.props.activeSort ? dir='left': null
       let redLineIfDisabled=skill.disabled ? 'block': 'none'
       //let comma= index!=(this.props.skills.length-1) ? ',' : '' 
      return(

        <div  style={{width:'4em'}} key={key} >
         <span style={{ 
            position:'absolute',margin:'0px 1px 0px',
            fontSize:'20px',color:'red',
            display:`${redLineIfDisabled}`,
            width:`${this.state.currentWidth}`,
             textAlign:`center`}} >&mdash;&mdash;&mdash;&mdash;</span>

          <input   id={`skill-${index+1}`} disabled={skill.disabled}
            key={index}  
            placeholder='skill' 
            onKeyUp={this.onEnter}
            style={{border:'none',borderSize:'0px',readOnly:true,margin:'auto',width:`${this.state.currentWidth}`,
               color:skill.disabled? '#8e423b' : '#595959',
            textOverflow: 'ellipsis',textAlign:`center`}}
            
            onFocus={(! this.props.activeSort) ? (e)=>e.target.select() : (e)=>e.target.blur()}
            onBlur={(! this.props.activeSort) ? (e)=>this.syncSkills(e) : null} 
            defaultValue={skill.title} />
        </div>
        
    )})
    let key=  Date.now()
    if (! this.props.activeSort)
      if(this.props.id % 2 >0)
          return (
            
            <div className="main-container" style={{backgroundColor:'white',width:'350px'}}>
              <div className="col"  style={{marginTop:'10px'}}>
                <div className='row' style={{}}>
                    <input size='20' 
                       style={{border:'none',borderSize:'0px',readOnly:false,fontSize:'16px',
                         textAlign:'right',    textTransform: 'uppercase',color:'#556d7e',
                         fontFamily: "Montserrat",
                         marginTop: '0px',
                         fontWeight: '400px',
                         textOverflow: 'ellipsis'}} 
                       onFocus={(e)=>e.target.select()}
                       onKeyUp={this.onEnter}
                       onBlur={this.syncCategoryName}
                       placeholder='Category'
                       key={Math.random()}
                       className="item-category-name" 
                       defaultValue={this.props.categoryName} />
                </div>
                  <div className='' style={{display:'flex',flexBasis:'max-content',flexWrap:'wrap',justifyContent:'flex-end'}}>
                      {skills}
                  </div>

              </div>

            <Hexagon size={7} isActive={true} className="item-hexagon" key={Math.random()}  setIcon={this.props.iconUrl} click={(e)=>this.handleClick(e)} />
            <div style={{height:'20%' , with:'20%'}}>
                <Modal
                    style={style}
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={() => this.closeModal()}
                    contentLabel="Icon Picker"
                  >
                  <Gallery pickedIcon={this.setIcon} icons={this.state.items}/>
                </Modal>
            </div>
            </div>
          )
      else  
          return (
            
            <div className="main-container" style={{backgroundColor:'white',width:'350px'}}>

            <Hexagon size={7} isActive={true} className="item-hexagon" key={Math.random()}  setIcon={this.props.iconUrl} click={(e)=>this.handleClick(e)} />
            <div style={{height:'20%' , with:'20%'}}>
                <Modal
                    style={style}
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={() => this.closeModal()}
                    contentLabel="Icon Picker"
                  >
                  <Gallery pickedIcon={this.setIcon} icons={this.state.items}/>
                </Modal>
            </div>
              <div className="col"  style={{marginTop:'10px'}}>
                <div className='row' style={{}}>
                    <input size='20' 
                       style={{border:'none',borderSize:'0px',readOnly:false,fontSize:'16px',
                         textAlign:'left',    textTransform: 'uppercase',color:'#556d7e',
                         fontFamily: 'Montserrat',
                         marginTop: '0px',
                         fontWeight: '400px',
                         textOverflow: 'ellipsis'}}                       
                       onFocus={this.toggleShow}
                       onKeyUp={this.onEnter}
                       onBlur={this.syncCategoryName}
                       placeholder='Category'
                       key={Math.random()}
                       className="item-category-name" 
                       defaultValue={this.props.categoryName} />
                </div>
                <div className='' style={{display:'flex',flexBasis:'max-content',flexWrap:'wrap',justifyContent:'flex-start'}}>
                      {skills}
                </div>

            </div>

            </div>
          )
    else
            return (      
          <div className="main-container" style={{backgroundColor:'white',width:'350px'}}>

            <Hexagon size={7} className="item-hexagon" key={Math.random()}  setIcon={this.props.iconUrl}  />

              <div className="col"  style={{marginTop:'10px'}}>
                <div className='row' style={{}}>
                    <input size='20' 
                       onFocus={(e)=>e.target.blur()}
                       style={{border:'none',borderSize:'0px',fontSize:'16px',
                         textAlign:'left',    textTransform: 'uppercase',color:'#556d7e',
                         fontFamily: 'Montserrat',
                         marginTop: '0px',
                         fontWeight: '400px',
                         textOverflow: 'ellipsis'}}                       
                       placeholder='Category'
                       key={Math.random()}
                       className="item-category-name" 
                       defaultValue={this.props.categoryName} />
                </div>
                <div className='' style={{display:'flex',flexBasis:'max-content',flexWrap:'wrap',justifyContent:'space-between'}}>
                      {skills}
                </div>

              </div>

          </div>
          )      
    }


}
module.exports = SkillCategoryLabel
