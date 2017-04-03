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
    return (
      <Grid >
        <Row >
          <Col md={4}>
              <Item />
          </Col>
          <Col md={4}>
              <Item />
          </Col>
          <Col md={4}>
              <Item />
          </Col>
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
