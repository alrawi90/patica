const React = require('react');
var Swipeable = require('react-swipeable')
var Row = require('react-bootstrap').Row;
var Col=require('react-bootstrap').Col;
var Thumbnail=require('react-bootstrap').Thumbnail;

class Lego extends React.Component{

   constructor(props){
      super(props)
      this.handleClick=this.handleClick.bind(this)
      this.handleNext=this.handleNext.bind(this)
      this.handlePrevious=this.handlePrevious.bind(this)
      this.state={
         items:[
           './client/assets/legos/1.png',
           './client/assets/legos/2.png',
           './client/assets/legos/3.png',
           './client/assets/legos/4.png',
           './client/assets/legos/5.png',
           './client/assets/legos/6.png',
           './client/assets/legos/7.png',
           './client/assets/legos/8.png',
           './client/assets/legos/9.png',
               ],
         url:'./client/assets/legos/1.png',
         counter:0
       }
   }
   handleClick(e){this.props.pickedIcon(e.target.src)}
   handlePrevious(e){this.state.counter <= 0 ? this.setState({ counter: 0}) :  this.setState({ counter: this.state.counter - 1})}
   handleNext(e){this.state.counter >= this.state.items.length -1 ? this.setState({ counter: this.state.items.length -1}) : this.setState({ counter: this.state.counter + 1})}

    render(){
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

          <div className='lego-container' >
            <div className='lego-up' >
              <button onClick={this.handleNext} >{'^'}</button>
            </div>
            <div className='logo-img' >
                 <img  onClick={this.handleClick} style={{height:'100%',width:'100%'}} src={this.state.items[this.state.counter]} />
            </div  >
            <div className='lego-down'>
              <button  onClick={this.handlePrevious} >{'v'}</button>
            </div>
          </div>

        </Swipeable>

     )
   }

}
module.exports = Lego
