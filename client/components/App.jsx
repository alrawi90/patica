const React = require('react');
const Item = require('./Item');

// const Row = require('./Row');
// const Col = require('./Col');
// const Container = require('./Container');
//const ReactBootstrap=require('react-bootstrap')
//import { Row,Col,Container,Navbar,Nav,Input,Button,NavItem} from 'react-bootstrap';
class App extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    // require('react-bootstrap').Alert;
     var Grid = require('react-bootstrap').Grid;
     var Row = require('react-bootstrap').Row;
     var Col=require('react-bootstrap').Col;
    // var code = require('react-bootstrap').code;
    const items =[1,2,3].map((e,i)=>{
         return(   
          <Col key={i} md={4}>
              <Item key={i}/>
          </Col>
               )

    })
    return (
      <Grid >
        <Row >
          {items}
        </Row>
          <Row >
            <Col md={12}>

            </Col>

          </Row>
      </Grid>
    )
  }

}

module.exports = App
