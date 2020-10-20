import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms'
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 2;
const NUMBER_OF_ARRAY_BARS = 200;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array});
    }

    mergeSort() {
        // const javaScriptSortedArray = this.state.array.slice().sort((a,b) => a - b);
        // const sortedArray = sortingAlgorithms.mergeSort(this.state.array);

        // console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
        const animations = sortingAlgorithms.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }

    // testSortingAlgorithms() {
    //     for (let i = 0; i < 100; i++) { //Simmulations
    //         const array = [];
    //         const randomLength = randomIntFromInterval(1,1000);  // Length of the array
    //         for (let i = 0; i < randomLength; i++) {
    //             array.push(randomIntFromInterval(-1000,1000));
    //         }
    //         const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    //         const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice());
    //         console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    //     }
    // }

    render() {
        const {array} = this.state;

        return (
            <div className="container">
                <div className="navbar">
                    <div className="button new-array" onClick={() => this.resetArray()}>Generate New Array</div>
                    <div className="button merge-sort" onClick={() => this.mergeSort()}>Merge Sort</div>
                    <div className="button quick-sort" onClick={() => this.quickSort()}>Quick Sort</div>
                    <div className="button heap-sort" onClick={() => this.heapSort()}>Heap Sort</div>
                    <div className="button bubble-sort" onClick={() => this.bubbleSort()}>Bubble Sort</div>
                </div>
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
                {/* <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button> */}
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(arrayOne, arrayTwo) {
//     if (arrayOne.length !== arrayTwo.length) return false;
//     for (let i = 0; i < arrayOne.length; i++) {
//         if (arrayOne[i] !== arrayTwo[i]) return false;
//     }
//     return true;
// }