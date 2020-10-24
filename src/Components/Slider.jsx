import React from 'react';
import './styles/Slider.css';

class Slider extends React.Component {
    render() {
        return(
            <div className="slider_container">
                <p>Change the number of bars and also the speed</p>
                <input onChange={this.props.onChange} type="range" min="1" max="100" id="slider" className="slider"/>
            </div>
        );
    }
}

export default Slider;