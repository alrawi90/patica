const React = require('react');
var Swipeable = require('react-swipeable')
class LegoGallery extends React.Component{

    constructor(props){
      super(props)
      this.handleClick=this.handleClick.bind(this)
      this.handleNext=this.handleNext.bind(this)
      this.handlePrevious=this.handlePrevious.bind(this)
      this.state={
         key:Date.now(),
         items:this.props.legos,
         counter:0
              }
    }
    handleClick(e){
      let index=e.target.id.split('-')[1] -1
      this.props.pickedLego(index);
      this.setState({
          counter:index
      })
    }
    handlePrevious(e){this.state.counter <= 0 ? this.setState({ counter: 0}) :  this.setState({ counter: this.state.counter - 1})}
    handleNext(e){this.state.counter >= this.state.items.length -1 ? this.setState({ counter: this.state.items.length -1}) : this.setState({ counter: this.state.counter + 1})}

    render(){
      const thumbs=this.state.items.map((item,index)=>{
        return(
            <div key={index+} className='thumb' >
               <img id={`thumb-${index+1}`} onClick={this.handleClick} style={{height:'75px',width:'75px'}} src={this.state.items[index]} />
            </div>
        )

      })
     return(

      <Swipeable
          onSwiping={this.swiping}
          onSwipingUp={this.swipingUp}
          onSwipingRight={this.swipingRight}
          onSwipingDown={this.swipingDown}
          onSwipingLeft={this.swipingLeft}
          onSwipedUp={this.swipedUp}
          onSwipedRight={this.swipedRight}
          onSwipedDown={this.swipedDown}
          onSwipedLeft={this.swipedLeft}
          onSwiped={this.handleSwipeAction}>

          <div className='thumbs-wrapper' >

            <div className='thumbs-container'>
              {thumbs}
            </div>

          </div>

      </Swipeable>

     )
   }

}
module.exports = LegoGallery
