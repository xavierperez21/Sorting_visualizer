import React from 'react';

import Slider from '../Components/Slider';
import Navbar from '../Components/Navbar';

import * as mergeSortAlgorithm from '../SortingAlgorithms/mergeSort';
import * as quickSortAlgorithm from '../SortingAlgorithms/quickSort';
import * as heapSortAlgorithm from '../SortingAlgorithms/heapSort';
import * as bubbleSortAlgorithm from '../SortingAlgorithms/bubbleSort';
import './SortingVisualizer.css';

const PRIMARY_COLOR = 'turquoise';  // Main color of the bar
const PIVOT_COLOR = 'purple';       // Color of the "pivot" in quick sort

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            numberOfBars: 50,
            maxBars: 100,
            maxHeightOfBars: 450,
            speed: 20,
        };
    }


    componentDidMount() {
        this.resetArray();
    }


    async resetArray(numberOfBars = this.state.numberOfBars) {
        const array = [];
        for (let i = 0; i < numberOfBars; i++) {
            array.push(randomIntFromInterval(5, this.state.maxHeightOfBars));
        }
        this.setState({array});
    }


    async mergeSort() {
        let done = false;
        this.selectingAlgorithm("merge-sort", done);    // Blocking all the buttons of the navbar and color in green the selected algorithm
       
        const animations = mergeSortAlgorithm.getMergeSortAnimations(this.state.array);
        await this.animateSortingAlgorithm(animations);     // Wait until the animations have done

        done = true;
        this.selectingAlgorithm("merge-sort", done);
        console.log("DONE!");
    }


    async quickSort() {
        let done = false;
        this.selectingAlgorithm("quick-sort", done);    // Blocking all the buttons of the navbar and color in green the selected algorithm

        const animations = quickSortAlgorithm.getQuickSortAnimations(this.state.array);
        await this.animateSortingAlgorithm(animations);     // Wait until the animations have done

        done = true;
        this.selectingAlgorithm("quick-sort", done);
        console.log("DONE!");
    }


    async heapSort() {
        let done = false;
        this.selectingAlgorithm("heap-sort", done);     // Blocking all the buttons of the navbar and color in green the selected algorithm
        
        const animations = heapSortAlgorithm.getHeapSortAnimations(this.state.array);
        await this.animateSortingAlgorithm(animations);     // Wait until the animations have done
        
        done = true;
        this.selectingAlgorithm("heap-sort", done);
        console.log("DONE!");
    }


    async bubbleSort() {
        let done = false;
        this.selectingAlgorithm("bubble-sort", done);   // Blocking all the buttons of the navbar and color in green the selected algorithm
        
        const animations = bubbleSortAlgorithm.getBubbleSortAnimations(this.state.array);
        await this.animateSortingAlgorithm(animations);     // Wait until the animations have done

        done = true;
        this.selectingAlgorithm("bubble-sort", done);   // Unlocking all the buttons of the navbar and color in royalblue the selected algorithm
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
        let arrayBars = document.getElementsByClassName('array-bar');
        
        for (let i = 0; i < animations.length; i++) {
            
            const barStateIdx = animations[i].length - 1;   // Last position which indicates the state or type of animation
            const barState = animations[i][barStateIdx];

            const barColorIdx = animations[i].length - 2;   // Position which indicates the color of the bars to animate.
            const barColor = animations[i][barColorIdx];

            if (barState === "swap-merge") {        // The "swap-merge" is an exception of swap animation, because here we are inserting the bar and not swapping it
                await sleep(this.state.speed);

                const [barOneIdxMerge, newHeightMerge] = animations[i];
                const barOneStyleMerge = arrayBars[barOneIdxMerge].style;
                barOneStyleMerge.height = `${newHeightMerge}px`;
            }

            else {
                const [barOneIdx, barTwoIdx, newHeight, newHeight2] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
    
                if (barState === "traveling") {
                    await sleep(this.state.speed);
                    
                    barOneStyle.backgroundColor = barColor;
                    barTwoStyle.backgroundColor = PIVOT_COLOR;
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
        }
        this.finishColor();
    }
    

    // Coloring all the bars in green and then in turquoise to indicate the end of the sorting algorithm.
    async finishColor() {
        let arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            await sleep(20);
            arrayBars[i].style.backgroundColor = "green";
        }
        for (let i = 0; i < arrayBars.length; i++) {
            await sleep(20);
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }
    

    // Method to change the number of bars when the slider has moved
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


    render() {
        const {array} = this.state;
        console.log("Bars: ", this.state.numberOfBars);

        let mediaqueryList = window.matchMedia("(max-width: 768px)");
        
        // Responsive bars. Change the number of bars depending on the window width
        mediaqueryList.addListener(() => {
            console.log('Ejecutado el listener');
            if (mediaqueryList.matches) {
                this.setState({
                    maxBars: 50,
                    maxHeightOfBars: 350
                })
                this.resetArray();
                console.log("maxBars: ", this.state.maxBars);
            }
            else {
                this.setState({
                    maxBars: 100,
                    maxHeightOfBars: 450
                })
                this.resetArray();
                console.log("maxBars: ", this.state.maxBars);
            }
        });

        return (
            <div className="container">
                
                <Navbar
                    onClickNew={() => this.resetArray()}
                    onClickMergeSort={() => this.mergeSort()}
                    onClickQuickSort={() => this.quickSort()}
                    onClickHeapSort={() => this.heapSort()}
                    onClickBubbleSort={() => this.bubbleSort()}
                />

                <Slider onChange={this.changeNumberOfBars} maxBars={this.state.maxBars}/>

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

// Helper functions
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}