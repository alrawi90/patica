const React = require('react');
const Modal = require('react-modal');
const Hexagon=require('./Hexagon');
const Galary=require('./Gallery');
class SkillCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false,name:'',iconUrl:'',selectedIconUrl:'' ,key:Math.random()}
    this.handleChange=this.handleChange.bind(this)
    this.handleClick=this.handleClick.bind(this)
    this.setIcon=this.setIcon.bind(this)
  }
  setIcon(url){this.setState({iconUrl: url})}
  render () {
    return (
    <div style={{height:'100%' , with:"100%"}}>
        <Hexagon ref='hexagon' setIcon={this.state.iconUrl} click={this.handleClick} />
        <Modal
            isOpen={this.state.isModalOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={() => this.closeModal()}
            contentLabel="Create New Category "
          >
          <Galary pickedIcon={this.setIcon} />
          <form>
            <label>
              Category Name: <input  type='text' ref='cn' />
            </label>
            <p><button onClick={() => this.closeModal()}>Cancel</button></p>
            <p><button onClick={this.handleChange}>Set</button></p>
          </form>
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
      //  var cn = this.refs.cn.value;
        //const url=this.state.selectedIconUrl
        //this.setState({key: Math.random()})
        this.refs.hexagon.update(this.state.iconUrl)
        this.props.handler(this.refs.cn.value);
        this.closeModal()
  }
}
module.exports = SkillCategory
