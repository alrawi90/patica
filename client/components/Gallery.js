const React = require('react');
//const Swipeable = require('react-swipeable')

class Gallery extends React.Component{

    constructor(props){
      super(props)
      this.handleClick=this.handleClick.bind(this)
      this.handleNext=this.handleNext.bind(this)
      this.handlePrevious=this.handlePrevious.bind(this)
      this.state={
         key:Date.now(),
         items:this.props.icons,
         counter:0
              }
    }

    handleClick(e){
      e.stopPropagation()
      let index=e.target.id.split('-')[1] -1
      this.props.pickedIcon(index);
      this.setState({
          counter:index
      })
    }

    handlePrevious(e){this.state.counter <= 0 ? this.setState({ counter: 0}) :  this.setState({ counter: this.state.counter - 1})}
    
    handleNext(e){this.state.counter >= this.state.items.length -1 ? this.setState({ counter: this.state.items.length -1}) : this.setState({ counter: this.state.counter + 1})}
    
    render(){

        const thumbs=this.state.items.map((item,index)=>{
          let key=Math.random() + index
        return(
            <div key={key} className='thumb' >
            <svg 
             width='75px' 
             height='75px'
             viewBox='0 0 75 75'
             > 
              <g >
                <text
                  onClick={this.handleClick}
                  id={`thumb-${index+1}`}  
                  textAnchor='middle' 
                  x='40px' y='50px' 
                  >
                    {this.state.items[index]}
                  </text>
              </g>
            </svg>

            </div>
        )

      })
        
     return(


          <div className='thumbs-wrapper' >

            <div className='thumbs-container'>
              {thumbs}
            </div>

         </div>


     )
   }

}
module.exports = Gallery
