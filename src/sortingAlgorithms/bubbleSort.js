export function getBubbleSortAnimations (array) {
    // animations is an array of all the pair of indexes we're going to animate
    const animations = [];

    // Base case
    if (array.length <= 1) return array;
    
    const n = array.length;
    bubbleSort(array, n, animations);

    return animations;
}


function bubbleSort(array, n, animations) {    
    for (let i = 0; i < (n - 1); i++) {
        let swap = false;

        for (let j = 0; j < (n - i - 1); j++) {
            // These are the values that we're comparing; we push them once to change their color
            animations.push([j, j+1, "red", "comparing"]);

            
            if (array[j] > array[j+1]) {
                swap = true;

                // These are the elements and its height that we are going to swap
                // [first_element, height_first, second_element, height_second]
                animations.push([j, array[j+1], j+1, array[j], "red", "swap"]);    // Changing height
                [array[j+1], array[j]] = [array[j], array[j+1]];
            }
            
            else {
                swap = true;

                // We don't swap anything but we have to keep the same consistency in the array animations
                animations.push([j, array[j], j+1, array[j+1], "red", "swap"]);
            }

            // These are the values that we're comparing; we push them a second time to revert their color
            animations.push([j, j+1, "turquoise", "comparing"]);
        }

        if (!swap) return;
    }

    return;
}