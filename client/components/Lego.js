const React = require('react');
var Swipeable = require('react-swipeable')
var Trapezoid=require('./Trapezoid') ;

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
           './client/assets/legos/10.png',
           './client/assets/legos/11.png',
           './client/assets/legos/12.png',
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
              <Trapezoid className='up-trapezoid' size={3} points="300,150 0,150 75,20 225,20" click={this.handleNext} />
            </div>
            <div className='logo-img' >
                 <img  className='lego-img' src={this.state.items[this.state.counter]} />
            </div  >
            <div className='lego-down'>
              <Trapezoid className='down-trapezoid' size={3} points="300,150 0,150 75,300 225,300" click={this.handlePrevious} />
            </div>
          </div>

        </Swipeable>

     )
   }

}
module.exports = Lego
