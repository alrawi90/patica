
const React = require('react');
const App = require('./App');

const Modal = require('react-modal')

class New extends React.Component {
  constructor(props) {

    super(props)
       this.state={
        mode:"creator"  ,
        categories:[
            {
              name:'',
              skills:[
                {title:'', description:'',disabled:false },
                {title:'', description:'',disabled:false },
                {title:'', description:'',disabled:false },],
              image:'\uf15a'

              },
            {
              name:'',
              skills:[
                {title:'', description:'',disabled:false },
                {title:'', description:'',disabled:false },
                {title:'', description:'',disabled:false },],
              image:'\uf15a'

              }
        ]      
    }
  }

  render(){
    return(
         <App categories={this.state.categories} mode={this.state.mode}/>
      )
  }  

}
// Show.propTypes = {
//     title: React.PropTypes.string.isRequired,
//     price: React.PropTypes.number.isRequired,
//     initialQty: React.PropTypes.number
// };
//Show.defaultProps = {isModalOpen:false}

module.exports = New
