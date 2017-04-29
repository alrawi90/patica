const React = require('react');
//const FA = require('react-fontawesome')
class Hexagon extends React.Component {
  constructor(props){
    super(props)
    this.state={
      url: props.setIcon,
      key:Date.now()
    };
    //this.change=this.change.bind(this)
  }
  //change(e){this.props.change(e)}
  update(url) {
    this.setState({url: url});
  }

  render() {
    const imageKey = `image-bg-${this.state.key}`;
    const imageUrl = `url('#image-bg-${this.state.key}')`;
    return (
      <div className="hexagon-container">
        
        <svg viewBox='0 0 110 110'
          id="image-fill" xmlns="http://www.w3.org/2000/svg"
          version="1.1" width={this.props.size+'em'} height={this.props.size+'em'}
          xmlnsXlink="http://www.w3.org/1999/xlink">
            
          <defs key={this.state.key} >
            <pattern id={imageKey} x="36" y="36"
              height="110" width="110"
              patternUnits="userSpaceOnUse">
             
              <g ><text textAnchor='middle' x="25px" y="40px"  >{this.state.url}</text></g> 
            </pattern>

          </defs>
          <polygon
            className="hex" points="60,20 100,40 100,80 60,100 20,80 20,40"
            style={{fill:'lime',stroke:'purple',strokeWidth:1}}></polygon>
          <polygon onClick={this.props.click}
            className="hex" points="60,20 100,40 100,80 60,100 20,80 20,40"
            fill={imageUrl}></polygon>
        </svg>
      </div>
    );
  }
}

module.exports = Hexagon;
