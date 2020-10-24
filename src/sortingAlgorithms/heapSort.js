export function getHeapSortAnimations (array) {
    // animations is an array of all the pair of indexes we're going to animate
    const animations = [];

    // Base case
    if (array.length <= 1) return array;
    
    const n = array.length;
    heapSort(array, n, animations);

    return animations;
}


function heapSort(array, n, animations) {
    // Building max heap
    for (let i = Math.floor(n/2 - 1); i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    // Reducing the max heap and sub-max-heaps 
    for (let i = n-1; i > 0; i--) {
        animations.push([i, 0, "red", "comparing"]);   // Comparing in color red

        // Swapping the largest value for the root
        animations.push([i, 0, array[0], array[i], "red", "swap"]);   // Swapping
        [array[i], array[0]] = [array[0], array[i]];
        
        animations.push([i, 0, "turquoise", "comparing"]);   // Turning back to turquoise

        // Making a max-heap to get the largest value as root, so in the next cycle we can swap it with the next small value
        heapify(array, i, 0, animations);
    }

    return;
}


function heapify(array, n, i, animations) {
    let largest = i;
    let left = i*2 + 1;
    let right = i*2 + 2;
    let swap = false;

    if (left < n && array[left] > array[largest]) {
        animations.push([left, i, "red", "comparing"]);   // Comparing in color red
        largest = left;
        swap = true;
    }

    if (right < n && array[right] > array[largest]) {
        if (swap) {
            animations.push([largest, i, "turquoise", "comparing"]);   // Turning back to turquoise
            swap = false;
        }
        animations.push([right, i, "red", "comparing"]);   // Comparing in color red
        largest = right;
    }

    if (largest !== i) {
        animations.push([largest, i, array[i], array[largest], "red", "swap"]);   // Swapping
        [array[i], array[largest]] = [array[largest], array[i]];

        animations.push([largest, i, "turquoise", "comparing"]);   // Turning back to turquoise
        heapify(array, n, largest, animations);
    }
}