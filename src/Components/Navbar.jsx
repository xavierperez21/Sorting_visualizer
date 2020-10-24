import React from 'react';
import './styles/Navbar.css';

class Navbar extends React.Component {
    render() {
        return(
            <div className="navbar">
                <div id="new-array" className="button new-array" onClick={this.props.onClickNew}>Generate New Array</div>
                <div id="merge-sort" className="button merge-sort" onClick={this.props.onClickMergeSort}>Merge Sort</div>
                <div id="quick-sort" className="button quick-sort" onClick={this.props.onClickQuickSort}>Quick Sort</div>
                <div id="heap-sort" className="button heap-sort" onClick={this.props.onClickHeapSort}>Heap Sort</div>
                <div id="bubble-sort" className="button bubble-sort" onClick={this.props.onClickBubbleSort}>Bubble Sort</div>
            </div>
        );
    }
}

export default Navbar;