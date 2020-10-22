export function getQuickSortAnimations (array) {
    // animations is an array of all the pair of indexes we're going to animate
    const animations = [];

    // Base case
    if (array.length <= 1) return array;
    
    const n = array.length;

    // Creating an auxiliary array to not modify the original
    const auxiliaryArray = array.slice();

    quickSort(auxiliaryArray, 0, n-1, animations);

    return animations;
}


function quickSort(array, start, end, animations) {
    
    // Base case
    if (start >= end) return;

    let pivotIdx = partition(array, start, end, animations);

    quickSort(array, start, pivotIdx - 1, animations);
    quickSort(array, pivotIdx + 1, end, animations);

}


function partition(array, start, end, animations) {
    let pivotIdx = start;
    let pivotValue = array[end];
    for (let i = start; i < end; i++) {
        
        if (i !== 0) {
            animations.push([i-1, end, "turn-blue"]); // Turning in turqoise the past elements
        }

        animations.push([i, end, "traveling"]); // Traveling in red all the elements and the end is in purple
        
        if (array[i] <= pivotValue) {
            // Highlighting bars
            animations.push([pivotIdx, i, "comparing"]); // Turning into red
            
            // Swapping bars
            animations.push([pivotIdx, array[i], i, array[pivotIdx], "swap"]); // Swapping
            [ array[pivotIdx], array[i] ] = [ array[i], array[pivotIdx] ]
            
            // Turning bars in blue again
            animations.push([pivotIdx, i, "finish-comparing"]); // Turning into turqoise

            pivotIdx++;
        }

        if (i === end-1) {
            animations.push([i, end, "turn-blue"]); // Turning in turqoise the past elements
        }
    }

    // Swapping the pivot
    animations.push([pivotIdx, end, "comparing-pivot"]); // Turning into purple
    animations.push([pivotIdx, array[end], end, array[pivotIdx], "swap"]); // Swapping
    animations.push([pivotIdx, end, "finish-comparing"]); // Turning into turqoise

    [ array[pivotIdx], array[end] ] = [ array[end], array[pivotIdx] ];

    return pivotIdx;
}