const React = require('react');
//const FA = require('react-fontawesome')
class Hexagon extends React.Component {
  constructor(props){
    super(props)
    this.state={
      url: props.setIcon,
      key:Date.now()
    };
    
  }
  
  update(url) {
    this.setState({url: url});
  }

  render() {
    const imageKey = `image-bg-${this.state.key}`;
    const imageUrl = `url('#image-bg-${this.state.key}')`;
    let fillParent=this.props.isActive ? 'fill-parent' : ''
    return (
      <div className={`hexagon-container ${fillParent}` } >
        
        <svg viewBox='0 18 110 110' style={{margineft:'0px'}}
          id="image-fill" xmlns="http://www.w3.org/2000/svg"
          version="1.1" width={this.props.size+'em'} height={this.props.size+'em'}
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <filter id="blur-filter" x="-2" y="-2" width="200" height="200">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
          </filter>

          <defs key={this.state.key} >
            <pattern id={imageKey} x="36" y="36"
              height="110" width="110"
              patternUnits="userSpaceOnUse">
             
              <g ><text textAnchor='middle' x="25px" y="40px"  >{this.state.url}</text></g> 
            </pattern>

          </defs>
          <polygon id='glow'
            className="" points="60,20 100,45 100,87 60,110 20,87 20,45" 
            strokeMiterlimit="10"    style={{fill:'#0d6d04'}}></polygon>
          <polygon onClick={this.props.click}
             className={this.props.isActive ? "hex" :""} points="60,20 100,45 100,87 60,110 20,87 20,45"
            fill={imageUrl}></polygon>
        </svg>
      </div>
    );
  }
}

module.exports = Hexagon;
