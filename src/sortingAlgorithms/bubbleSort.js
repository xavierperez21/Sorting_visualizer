export function getBubbleSortAnimations (array) {
    // animations is an array of all the pair of indexes we're going to animate
    const animations = [];

    // Base case
    if (array.length <= 1) return array;
    
    const n = array.length;

    // Creating an auxiliary array to not modify the original
    const auxiliaryArray = array.slice();

    bubbleSort(auxiliaryArray, n, animations, array);

    return animations;
}


function bubbleSort(auxiliaryArray, n, animations) {

    for (let i = 0; i < (n - 1); i++) {
        for (let j = 0; j < (n - i - 1); j++) {
            // These are the values that we're comparing; we push them once to change their color
            animations.push([j, j+1]);

            
            if (auxiliaryArray[j] > auxiliaryArray[j+1]) {

                // These are the elements and its height that we are going to swap
                // [first_element, height_first, second_element, height_second]
                animations.push([j, auxiliaryArray[j+1], j+1, auxiliaryArray[j]]);    // Changing height
                [auxiliaryArray[j+1], auxiliaryArray[j]] = [auxiliaryArray[j], auxiliaryArray[j+1]];
            }
            else {
                // We don't swap anything but we have to keep the same consistency in the array animations
                animations.push([j, auxiliaryArray[j], j+1, auxiliaryArray[j+1]]);
            }

            // These are the values that we're comparing; we push them a second time to revert their color
            animations.push([j, j+1]);
        }
    }

    return;
}