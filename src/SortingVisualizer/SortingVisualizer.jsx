import React from 'react';

import Slider from '../inputRange/Slider.jsx';

import * as mergeSortAlgorithm from '../sortingAlgorithms/mergeSort';
import * as quickSortAlgorithm from '../sortingAlgorithms/quickSort';
import * as heapSortAlgorithm from '../sortingAlgorithms/heapSort';
import * as bubbleSortAlgorithm from '../sortingAlgorithms/bubbleSort';
import './SortingVisualizer.css';

// const ANIMATION_SPEED_MS = 50;
// const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const PIVOT_COLOR = 'purple';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            numberOfBars: 50,
            speed: 20,
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray(numberOfBars = 30) {
        const array = [];
        for (let i = 0; i < numberOfBars; i++) {
            array.push(randomIntFromInterval(5, 450));
        }
        this.setState({array});
    }

    mergeSort() {
        this.selectingAlgorithm("merge-sort");
        const animations = mergeSortAlgorithm.getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            
            // Change color from turquoise to red and viceversa
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * this.state.speed);
            }

            // Swaping bars
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * this.state.speed);
            }
        }
    }

    quickSort() {
        this.selectingAlgorithm("quick-sort");
        const animations = quickSortAlgorithm.getQuickSortAnimations(this.state.array);
        this.animateSortingAlgorithm(animations);
    }


    heapSort() {
        this.selectingAlgorithm("heap-sort");
        const animations = heapSortAlgorithm.getHeapSortAnimations(this.state.array);
        this.animateSortingAlgorithm(animations);
    }


    bubbleSort() {
        this.selectingAlgorithm("bubble-sort");
        const animations = bubbleSortAlgorithm.getBubbleSortAnimations(this.state.array);
        this.animateSortingAlgorithm(animations);
    }


    selectingAlgorithm(algorithm_id) {
        let buttons = document.getElementsByClassName("button");
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].id === algorithm_id) {
                buttons[i].style.backgroundColor = "green";
                buttons[i].style.flex = 2;
            }
            else {
                buttons[i].style.backgroundColor = "gray";
                buttons[i].style.flex = 1;
            }
            buttons[i].style.pointerEvents = "none";
        }
        
        let slide_bar = document.getElementById("slider");
        slide_bar.disabled = true;
        console.log(slide_bar)
    }


    animateSortingAlgorithm(animations) {
        
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            
            const barStateIdx = animations[i].length - 1;
            const barColorIdx = animations[i].length - 2;
            const barState = animations[i][barStateIdx];
            const barColor = animations[i][barColorIdx];

            if (barState === "traveling") {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = barColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = PIVOT_COLOR;
                }, i * this.state.speed);
            }
            else if (barState === "comparing") {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = barColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * this.state.speed);
            }
            else if (barState === "swap") {
                setTimeout(() => {
                    const [barOneIdx, newHeight, barTwoIdx, newHeight2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    barTwoStyle.height = `${newHeight2}px`;
                }, i * this.state.speed);
            }
        }
    }


    changeNumberOfBars = event => {
        this.setState({
            numberOfBars: event.target.value
        })

        this.resetArray(this.state.numberOfBars);
        let numberOfBars = this.state.numberOfBars;

        if (numberOfBars >= 60) {
            this.setState({
                speed: 5
            })
        }
        else if (numberOfBars >= 30){
            this.setState({
                speed: 20
            })
        }
        else if (numberOfBars >= 20){
            this.setState({
                speed: 100
            })
        }
        else {
            this.setState({
                speed: 500
            })
        }
    }


    render() {
        const {array} = this.state;

        return (
            <div className="container">
                <div className="navbar">
                    <div id="new-array" className="button new-array" onClick={() => this.resetArray()}>Generate New Array</div>
                    <div id="merge-sort" className="button merge-sort" onClick={() => this.mergeSort()}>Merge Sort</div>
                    <div id="quick-sort" className="button quick-sort" onClick={() => this.quickSort()}>Quick Sort</div>
                    <div id="heap-sort" className="button heap-sort" onClick={() => this.heapSort()}>Heap Sort</div>
                    <div id="bubble-sort" className="button bubble-sort" onClick={() => this.bubbleSort()}>Bubble Sort</div>
                </div>
                
                <Slider onChange={this.changeNumberOfBars}/>

                <div className="container_array">
                    <div className="array-container">
                        {array.map((value, idx) => (
                            <div 
                                className="array-bar"
                                key={idx}
                                style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                }}>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}