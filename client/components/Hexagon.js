const React = require('react');

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
    return (
      <div className="hexagon-container">
        <svg viewBox='0 0 300 300'
          id="image-fill" xmlns="http://www.w3.org/2000/svg"
          version="1.1" width="20%" height="20%"
          xmlnsXlink="http://www.w3.org/1999/xlink">

          <defs key={this.state.key}>
            <pattern id={imageKey} x="0" y="0"
              height="300" width="300"
              patternUnits="userSpaceOnUse">
              <image width="300" height="300" xlinkHref={this.state.url}></image>
            </pattern>
          </defs>

          <polygon onClick={this.props.click}
            className="hex" points="300,150 225,280 75,280 0,150 75,20 225,20"
            fill={imageUrl}></polygon>
        </svg>
      </div>
    );
  }
}

module.exports = Hexagon;