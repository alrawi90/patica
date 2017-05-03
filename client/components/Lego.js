const React = require('react');
const Swipeable = require('react-swipeable')
const Trapezoid=require('./Trapezoid') ;
const LegoGallery=require('./LegoGallery') ;
const Modal=require('react-modal') ;


class Lego extends React.Component{

   constructor(props){
      super(props)
      this.style = {
                        content : {
                          top                   : '50%',
                          left                  : '50%',
                          right                 : 'auto',
                          bottom                : 'auto',
                          marginRight           : '-50%',
                          transform             : 'translate(-50%, -50%)',
                          width:'20em' ,height:'20em',
                        }
                  };
      this.handleClick=this.handleClick.bind(this)
      this.handleNext=this.handleNext.bind(this)
      this.handlePrevious=this.handlePrevious.bind(this)
      this.openModal=this.openModal.bind(this)
      this.pick=this.pick.bind(this)
      this.state={
         items:[
           './client/assets/legos/360x450/01.png',
           './client/assets/legos/360x450/02.png',
           './client/assets/legos/360x450/03.png',
           './client/assets/legos/360x450/04.png',
           './client/assets/legos/360x450/05.png',
           './client/assets/legos/360x450/06.png',
           './client/assets/legos/360x450/07.png',
           './client/assets/legos/360x450/08.png',
           './client/assets/legos/360x450/09.png',
           './client/assets/legos/360x450/10.png',
           './client/assets/legos/360x450/11.png',
           './client/assets/legos/360x450/12.png',
           './client/assets/legos/360x450/13.png',
           './client/assets/legos/360x450/14.png',
           './client/assets/legos/360x450/15.png',
           './client/assets/legos/360x450/16.png',
           './client/assets/legos/360x450/17.png',
           './client/assets/legos/360x450/18.png',
           './client/assets/legos/360x450/19.png',
           './client/assets/legos/360x450/20.png',
           './client/assets/legos/360x450/21.png',
           './client/assets/legos/360x450/22.png',
           './client/assets/legos/360x450/23.png',
           './client/assets/legos/360x450/24.png',
           './client/assets/legos/360x450/25.png',
           './client/assets/legos/360x450/26.png',

               ],
         url:'',
         counter:0,isModalOpen:false
       }
   }
   handleClick(e){this.props.pickedIcon(e.target.src)}
   handlePrevious(e){
     this.state.counter <= 0 ? this.setState({ counter: 0}) :  this.setState({ counter: this.state.counter - 1})
     this.props.setLego(this.state.items[this.state.counter])// set the lego img url in the main App's state
   }
   handleNext(e){
     this.state.counter >= this.state.items.length -1 ? this.setState({ counter: this.state.items.length -1}) : this.setState({ counter: this.state.counter + 1})
     this.props.setLego(this.state.items[this.state.counter])// set the lego img url in the main App's state
   }
   pick(index){
     this.setState({counter:index})
     this.props.setLego(this.state.items[index]) // set the lego img url in the main App's state
     this.closeModal()
   }
   openModal(e) {

       this.setState({ isModalOpen: true })
   }

   closeModal() {
        this.setState({ isModalOpen: false })
   }

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
                 <img  className='lego-img' onClick={this.openModal}
                    src={this.props.currentLego !=='' ? this.props.currentLego : this.state.items[this.state.counter]}
                     />
            </div  >
            <div className='lego-down'>
              <Trapezoid className='down-trapezoid' size={3} points="300,150 0,150 75,300 225,300" click={this.handlePrevious} />
            </div>
            <Modal
              style={this.style}
              isOpen={this.state.isModalOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={() => this.closeModal()}
              contentLabel="Lego Gallery"
              >
                 <LegoGallery pickedLego={this.pick} legos={this.state.items}/>
            </Modal>
          </div>

        </Swipeable>

     )
   }

}
module.exports = Lego
