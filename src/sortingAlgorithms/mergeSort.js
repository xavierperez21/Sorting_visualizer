
export function getMergeSortAnimations(array) {
    // animations is an array of all the indexes we're going to animate
    const animations = [];

    if (array.length <= 1) return array;
    
    const auxiliaryArray = array.slice();      // Creating a copy of the original array to create the chunks of the recursive division
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

    return animations
}


function mergeSortHelper (mainArray, initialIdx, endIdx, auxiliaryArray, animations) {
    if (initialIdx === endIdx) return;
    
    const middleIdx = Math.floor((initialIdx + endIdx) / 2);
    
    // Recurively calls to divide the array.
    mergeSortHelper(auxiliaryArray, initialIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx+1, endIdx, mainArray, animations);

    doMerge(mainArray, initialIdx, middleIdx, endIdx, auxiliaryArray, animations);
}


function doMerge(mainArray, initialIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = initialIdx; // Helper index to modify the mainArray
    let i = initialIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once to change their color
        animations.push([i, j]);

        // These are the values that we're comparin, we push them a second time to revert their color
        animations.push([i, j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        else {
            // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIdx) {
        // These are the values that we're comparing, we push them once to change their color.
        animations.push([i,i]);

        // These are the values that we're comparing, we push them a second time to revert their color
        animations.push([i,i]);

        // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIdx) {
        // These are the values that we're comparing, we push them once to change their color.
        animations.push([j,j]);

        // These are the values that we're comparing, we push them a second time to revert their color
        animations.push([j,j]);

        // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}