const React = require('react');
var Swipeable = require('react-swipeable')
var Row = require('react-bootstrap').Row;
var Col=require('react-bootstrap').Col;
var Thumbnail=require('react-bootstrap').Thumbnail;

class Galary extends React.Component{

    constructor(props){
      super(props)
      this.handleClick=this.handleClick.bind(this)
      this.handleNext=this.handleNext.bind(this)
      this.handlePrevious=this.handlePrevious.bind(this)
      this.state={
         items:[
           './client/assets/icons/1.png',
           './client/assets/icons/2.png',
           './client/assets/icons/3.png',
           './client/assets/icons/4.png',
           './client/assets/icons/5.png',
           './client/assets/icons/6.png',
           './client/assets/icons/7.png',
           './client/assets/icons/8.png',
           './client/assets/icons/9.png',
           'http://placekitten.com/306/306'
               ],
         url:'./client/assets/icons/1.png',
         counter:0, selected:''
       }
   }

    handleClick(e){this.props.pickedIcon(e.target.src);
      e.target.parentNode.style.borderColor="red";
      this.setState({selected:e.target.src})
    }
    handlePrevious(e){
      this.state.counter <= 0 ? this.setState({ counter: 0}) :  this.setState({ counter: this.state.counter - 1})
      let div =this.refs.thumb;
    }
    handleNext(e){
      this.state.counter >= this.state.items.length -1 ? this.setState({ counter: this.state.items.length -1}) : this.setState({ counter: this.state.counter + 1})
    }
    componentDidUpdate(){this.refs.thumb.firstChild.src==this.state.selected  ? this.refs.thumb.style.borderColor="red" : this.refs.thumb.style.borderColor="gray"}
    render(){
  //    const cols=this.state.items.map((item,i)=>{
  //      return(
  //        <Col md={1} key={i}>
  //        <Thumbnail >
  //        <img onClick={this.handleClick} style={{height:'100%',width:'100%'}} src={this.state.items[this.state.counter]} />
  //        </Thumbnail>
  //        </Col>
  //    )
  //    })
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

          <Row >
          <Col md={6}>
          <Row>
            <Col md={1} >
              <button onClick={this.handleNext} >{'<'}</button>
            </Col>
            <Col md={4} >
              <div className='thumb' ref="thumb" >
                 <img  onClick={this.handleClick} style={{height:'100%',width:'100%'}}
                 src={this.state.items[this.state.counter]} />
              </div>
            </Col>
            <Col md={1} >
              <button    onClick={this.handlePrevious} >{'>'}</button>
            </Col>
            </Row>
          </Col>
          </Row>
        </Swipeable>

     )
   }

}
module.exports = Galary
