const React = require('react');
var Swipeable = require('react-swipeable')
class LegoGallery extends React.Component{

    constructor(props){
      super(props)
      this.handleClick=this.handleClick.bind(this)
      this.state={
         key:Date.now(),
         items:this.props.legos,
         counter:0
              }
    }
    handleClick(e){

      let index=e.target.id.split('-')[1] -1
      if (this.props.mode!="viewer" )
        this.props.pickedLego(index);
        this.setState({
            counter:index
        })
    }


    render(){
      const thumbs=this.state.items.map((item,index)=>{
        return(
            <div key={Math.random()} className='thumb' >
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
