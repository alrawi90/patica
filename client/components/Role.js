const React = require('react');
const Modal = require('react-modal');
const Galary=require('./Gallery');

class Role extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isModalOpen: false,name:'' ,key:1,keywords:[''],description:''}
    this.handleChange=this.handleChange.bind(this)
    //this.changeInputValue=this.changeInputValue.bind(this)
  }

  // changeInputValue(e){
  //   //
  //   const index=parseInt(e.target.id.split('-')[1])
  //   let kws=this.state.keywords
  //   kws[index-1]=e.target.value
  //   this.setState({keywords: kws});
  // }
  // addKeywordField(e) {
  //   let kws = this.state.keywords;
  //   kws.push('')
  //   this.setState({keywords: kws});
  // }
  // removeKeyword(e){
  //   let index=e.target.id.split('-')[1]
  //   let kws = this.state.keywords;
  //   kws.splice(index-1,1)
  //   this.setState({keywords: kws});
  // }
  componentWillMount(){
  }
  render () {


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
              <label>Description:<br /><textarea ref='rd'></textarea></label>

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
        //this.props.handler(this.refs.rn.value,this.state.keywords,this.refs.rd.value);
        this.props.handler(this.refs.rn.value,this.refs.rd.value);

        this.closeModal()
  }
}
module.exports = Role
