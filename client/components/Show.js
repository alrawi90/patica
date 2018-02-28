
const React = require('react');
const App = require('./App');

// import Draggable from 'react-draggable'; // The default
// import DragSortableList from 'react-drag-sortable'
import {SortableContainer, SortableElement,arrayMove,SortableHandle} from 'react-sortable-hoc';
const Modal = require('react-modal')

class Show extends React.Component {
  constructor(props) {

    super(props)
       this.state={
       	mode:"viewer"

  	    }

    }
    fork(e){
      this.setState({
      	mode:"editor"
      })
    }
  render(){
    return(
         <App fork={(e)=>this.fork(e)} roleId={this.props.roleId} mode={this.state.mode}/>
      )
  }  

}
// Show.propTypes = {
//     title: React.PropTypes.string.isRequired,
//     price: React.PropTypes.number.isRequired,
//     initialQty: React.PropTypes.number
// };
//Show.defaultProps = {isModalOpen:false}

module.exports = Show
