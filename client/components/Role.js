const React = require('react');
const Modal = require('react-modal');
const Galary=require('./Gallery');
class Role extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false,name:'' ,key:1,keywords:['']}
    this.handleChange=this.handleChange.bind(this)
    this.changeInputValue=this.changeInputValue.bind(this)
  }

  changeInputValue(e){
    //
    const index=parseInt(e.target.id.split('-')[1])
    let kws=this.state.keywords
    kws[index-1]=e.target.value
    this.setState({keywords: kws});
  }
  addKeywordField(e) {
    let kws = this.state.keywords;
    kws.push('')
    this.setState({keywords: kws});
  }
  removeKeyword(e){
    let index=e.target.id.split('-')[1]
    let kws = this.state.keywords;
    kws.splice(index-1,1)
    this.setState({keywords: kws});
  }
  componentWillMount(){
  }
  render () {
        const keywords =this.state.keywords.map((value,index)=>{
          return(
            <div key={index}><input style={{marginRight:0}} onChange={this.changeInputValue} value={value} key={index} id={`keyword-${index+1}`} /><button id={`RemoveKeyword-${index+1}`} onClick={(e)=>this.removeKeyword(e)} >-</button><br /></div>
          )
        })

        return (
             <div style={{height:'100%' , with:'100%'}}>
             <Modal
                isOpen={this.state.isModalOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={() => this.closeModal()}
                contentLabel="Create Role "
              >
              <label>
                Role Name: <input  type='text' ref='rn' />
              </label>
              <br />
              <label>
                Keywords: {keywords}
              </label>
              <button onClick={(e) =>this.addKeywordField(e)} > + </button>
              <p><button onClick={() => this.closeModal()}>Cancel</button></p>
              <p><button onClick={this.handleChange}>Set</button></p>
            </Modal>
        </div>
        )
    }
  openModal(e) {

      this.setState({ isModalOpen: true })
  }

  closeModal() {
       this.setState({ isModalOpen: false })
  }
  handleChange(e){
        e.preventDefault()
        this.props.handler(this.refs.rn.value,this.state.keywords);
        this.closeModal()
  }
}
module.exports = Role
