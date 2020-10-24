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


    async resetArray(numberOfBars = this.state.numberOfBars) {
        const array = [];
        for (let i = 0; i < numberOfBars; i++) {
            array.push(randomIntFromInterval(5, 450));
        }
        this.setState({array});
    }


    async mergeSort() {
        let done = false;
        this.selectingAlgorithm("merge-sort", done);
        const animations = mergeSortAlgorithm.getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            
            // Change color from turquoise to red and viceversa
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                
                await sleep(this.state.speed);

                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }

            // Swaping bars
            else {
                await sleep(this.state.speed);

                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }
        }
        this.finishColor();
        done = true;
        this.selectingAlgorithm("merge-sort", done);
    }


    async quickSort() {
        let done = false;
        this.selectingAlgorithm("quick-sort", done);

        const animations = quickSortAlgorithm.getQuickSortAnimations(this.state.array);
        await this.animateSortingAlgorithm(animations);

        done = true;
        this.selectingAlgorithm("quick-sort", done);

        console.log("DONE!");
    }


    async heapSort() {
        let done = false;
        this.selectingAlgorithm("heap-sort", done);
        
        const animations = heapSortAlgorithm.getHeapSortAnimations(this.state.array);
        await this.animateSortingAlgorithm(animations);
        
        done = true;
        this.selectingAlgorithm("heap-sort", done);
        console.log("DONE!");
    }


    async bubbleSort() {
        let done = false;
        this.selectingAlgorithm("bubble-sort", done);
        
        const animations = bubbleSortAlgorithm.getBubbleSortAnimations(this.state.array);
        await this.animateSortingAlgorithm(animations);

        done = true;
        this.selectingAlgorithm("bubble-sort", done);
        console.log("DONE!");
    }


    selectingAlgorithm(algorithm_id, done) {
        let buttons = document.getElementsByClassName("button");
        let slide_bar = document.getElementById("slider");

        if (!done) {
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].id === algorithm_id) {
                    buttons[i].style.backgroundColor = "green";
                }
                else {
                    buttons[i].style.backgroundColor = "gray";
                }
                buttons[i].style.pointerEvents = "none";
            }
            slide_bar.disabled = true;
        }

        else {
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].id === "new-array") {
                    buttons[i].style.backgroundColor = "rgb(145, 22, 79)";
                }
                else {
                    buttons[i].style.backgroundColor = "royalblue";
                }

                buttons[i].style.pointerEvents = "auto";
            }
            slide_bar.disabled = false;
        }
        
    }


    async animateSortingAlgorithm(animations) {
        // let numberOfanimations = 0;
        let arrayBars = document.getElementsByClassName('array-bar');
        
        for (let i = 0; i < animations.length; i++) {
            
            const barStateIdx = animations[i].length - 1;
            const barColorIdx = animations[i].length - 2;
            const barState = animations[i][barStateIdx];
            const barColor = animations[i][barColorIdx];

            const [barOneIdx, barTwoIdx, newHeight, newHeight2] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            if (barState === "traveling") {
                await sleep(this.state.speed);
                
                barOneStyle.backgroundColor = barColor;
                barTwoStyle.backgroundColor = PIVOT_COLOR;
                // numberOfanimations = numberOfanimations + 1;
            }

            else if (barState === "comparing") {
                await sleep(this.state.speed);

                barOneStyle.backgroundColor = barColor;
                barTwoStyle.backgroundColor = barColor;
            }

            else if (barState === "swap") {
                await sleep(this.state.speed);

                barOneStyle.height = `${newHeight}px`;
                barTwoStyle.height = `${newHeight2}px`;
            }
        }
        this.finishColor();
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
                speed: 250
            })
        }
    }


    async finishColor() {
        let arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            await sleep(20);
            arrayBars[i].style.backgroundColor = "green";
        }
        for (let i = 0; i < arrayBars.length; i++) {
            await sleep(20);
            arrayBars[i].style.backgroundColor = "turquoise";
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}