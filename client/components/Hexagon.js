const React = require('react');
class Hexagon extends React.Component {
constructor(props){
   super(props)
   this.state={
     url: '',key:0
   }

  }
  //componentWillUpdate(){this.forceUpdate()}
  update(url){
    this.setState({ url: url,key:1});
}
  render () {
    return (
  <div className="hexagon-container" >
      <svg viewBox='0 0 300 300'  id="image-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" width="50%" height="50%"  xmlnsXlink="http://www.w3.org/1999/xlink">

        <defs  key={this.state.key} >
           <pattern id="image-bg" x="0" y="0" height="300" width="300" patternUnits="userSpaceOnUse">
            <image width="300" height="300" xlinkHref={this.state.url}></image>
          </pattern>
        </defs>

        <polygon  onClick={this.props.click} className="hex" points="300,150 225,280 75,280 0,150 75,20 225,20" fill="url('#image-bg')"></polygon>

      </svg>
  </div>
    );
  }
}

  module.exports = Hexagon
