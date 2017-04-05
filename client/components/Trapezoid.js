const React = require('react');

class Trapezoid extends React.Component {
  constructor(props){
    super(props)
    this.state={
      key:Date.now()
    };
  }

  render() {
    return (
      <div className="hexagon-container">
        <svg viewBox='0 0 300 300' key={this.state.key}
          id="color-fill" xmlns="http://www.w3.org/2000/svg"
          version="1.1" width={this.props.size+'em'} height={this.props.size+'em'}
          xmlnsXlink="http://www.w3.org/1999/xlink">

          <polygon onClick={this.props.click}
            className="hex" points={this.props.points}
            fill='#fa5'></polygon>
        </svg>
      </div>
    );
  }
}

module.exports = Trapezoid;
