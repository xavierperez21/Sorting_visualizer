// export const mergeSort = array => {
//     if (array.length === 1) return array;
//     const middleIdx = Math.floor(array.length / 2);
//     const firstHalf = mergeSort(array.slice(0, middleIdx));
//     const secondHalf = mergeSort(array.slice(middleIdx));
//     const sortedArray = [];
//     let i=0, j=0;

//     while(i < firstHalf.length && j < secondHalf.length) {
//         if (firstHalf[i] < secondHalf[j]) {
//             sortedArray.push(firstHalf[i++]);
//         }
//         else {
//             sortedArray.push(secondHalf[j++]);
//         }
//     }

//     while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//     while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
//     return sortedArray;
// };

export function getMergeSortAnimations(array) {
    // animations is an array of all the indexes we're going to animate
    const animations = [];

    if (array.length <= 1) return array;
    
    const auxiliaryArray = array.slice();      // Creating a copy of the original array to not overwrite the original
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
    let k = initialIdx;
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