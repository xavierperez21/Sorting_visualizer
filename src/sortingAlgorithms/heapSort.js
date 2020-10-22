export function getHeapSortAnimations (array) {
    // animations is an array of all the pair of indexes we're going to animate
    const animations = [];

    // Base case
    if (array.length <= 1) return array;
    
    
    // Creating an auxiliary array to not modify the original
    const auxiliaryArray = array.slice();
    const n = auxiliaryArray.length;

    heapSort(auxiliaryArray, n, animations);

    return animations;
}


function heapSort(auxiliaryArray, n, animations) {
    // Building max heap
    for (let i = Math.floor(n/2 - 1); i >= 0; i--) {
        heapify(auxiliaryArray, n, i, animations);
    }

    // Reducing the max heap and sub-max-heaps 
    for (let i = n-1; i > 0; i--) {
        animations.push([i, 0, "comparing-red"]);   // Comparing in color red

        // Swapping the largest value for the root
        animations.push([i, auxiliaryArray[0], 0, auxiliaryArray[i], "swap-largest"]);   // Swapping
        [auxiliaryArray[i], auxiliaryArray[0]] = [auxiliaryArray[0], auxiliaryArray[i]];
        
        animations.push([i, 0, "comparing-blue"]);   // Turning back to turquoise

        // Making a max-heap to get the largest value as root, so in the next cycle we can swap it with the next small value
        heapify(auxiliaryArray, i, 0, animations);
    }

    return;
}


function heapify(auxiliaryArray, n, i, animations) {
    let largest = i;
    let left = i*2 + 1;
    let right = i*2 + 2;
    let swap = false;

    if (left < n && auxiliaryArray[left] > auxiliaryArray[largest]) {
        animations.push([left, i, "comparing-red"]);   // Comparing in color red
        largest = left;
        swap = true;
    }

    if (right < n && auxiliaryArray[right] > auxiliaryArray[largest]) {
        if (swap) {
            animations.push([largest, i, "comparing-blue"]);   // Turning back to turquoise
            swap = false;
        }
        animations.push([right, i, "comparing-red"]);   // Comparing in color red
        largest = right;
    }

    if (largest !== i) {
        animations.push([largest, auxiliaryArray[i], i, auxiliaryArray[largest], "swap"]);   // Swapping
        [auxiliaryArray[i], auxiliaryArray[largest]] = [auxiliaryArray[largest], auxiliaryArray[i]];

        animations.push([largest, i, "comparing-blue"]);   // Turning back to turquoise
        heapify(auxiliaryArray, n, largest, animations);
    }
}