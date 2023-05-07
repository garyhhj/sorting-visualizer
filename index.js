
/****************
 * global var 
 ****************/
const resetButton = document.querySelector("#reset"); 
const sortButton = document.querySelector("#sort");

const bubbleSortButton = document.querySelector("#bubbleSort"); 
const quickSortButton = document.querySelector("#quickSort"); 
const mergeSortButton = document.querySelector("#mergeSort"); 
const heapSortButton = document.querySelector("#heapSort"); 

var sortingMethod = 0; 
const BUBBLESORT = 0; 
const QUICKSORT = 1; 
const MERGESORT = 2; 
const HEAPSORT = 3; 

let barContainer = document.getElementById("barContainer"); 
let arr = []; 

/****************
 * reset
 ****************/
function getRandomArbitrary(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateArr(number){
    arr = []; 
    const lo = 5;
    const hi = Math.floor(screen.height * 0.60);  
    console.log("screen height is ", lo, " " , hi); 

    for(let i = 0; i < number; ++i){
        arr.push(getRandomArbitrary(lo, hi)); 
    }
    return arr; 
}

function reset(){
    let divs = document.getElementsByClassName("bar");
    let nDivs = divs.length;  
    for(let i = nDivs - 1; i >= 0; --i){
        divs[i].remove(); 
    }
    
    //generate divs 
    let nBars = Math.floor(screen.width / 14);  
    generateArr(nBars); 
    for(let i = 0; i < nBars; ++i){
        //style the div 
        let bar = document.createElement("div"); 
        bar.classList.add("bar");
        bar.style.height = arr[i] + "px";  
        barContainer.appendChild(bar);
    }
}

/****************
 * sorting algo
 ****************/

/****************
 * utility 
 ****************/
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swap(lhs, rhs){
    let bars = document.getElementsByClassName("bar"); 

    bars[lhs].style.height = arr[rhs].toString() + "px"; 
    bars[rhs].style.height = arr[lhs].toString() + "px"; 
    
    bars[lhs].style.backgroundColor = "darkGreen"; 
    bars[rhs].style.backgroundColor = "darkGreen"; 
    
    await sleep(15); 

    bars[lhs].style.backgroundColor = "#ddd2c9";
    bars[rhs].style.backgroundColor = "#ddd2c9";
    let temp = arr[lhs]; 
    arr[lhs] = arr[rhs]; 
    arr[rhs] = temp;   
}

async function animate(index, newHeight){
    let bars = document.getElementsByClassName("bar"); 
    bars[index].style.height = newHeight.toString() + "px"; 
    bars[index].style.backgroundColor = "darkGreen"; 
    await sleep(5); 

    bars[index].style.backgroundColor = "#ddd2c9";
}

/****************
 * bubble sort
 ****************/
async function bubbleSort(){
    
    let arrSize = arr.length; 
    for(let i = 0; i < arrSize; ++i){
        for(let j = 0; j < arrSize - i - 1; ++j){
            if(arr[j + 1] < arr[j]){
                await swap(j + 1, j); 
            }
        }
    }
}

/****************
 * quick sort 
 ****************/
async function partition(lo, hi){
    let pivot = arr[hi]; 
    let bars = document.getElementsByClassName("bar");
    bars[hi].style.backgroundColor = "red"; 


    let leftPtr = lo; 
    let rightPtr = hi - 1; 

    while(leftPtr <= rightPtr){
        if(arr[leftPtr] <= pivot){
            ++leftPtr; 
        }
        else if(arr[rightPtr] >= pivot){
            --rightPtr; 
        }
        else{
            await swap(leftPtr, rightPtr); 
            ++leftPtr; 
            --rightPtr; 
        }
    }

    await swap(leftPtr, hi); 
    bars[leftPtr].style.backgroundColor = "#ddd2c9";
    return leftPtr; 
}

async function quickSort(lo, hi){
    if(lo < hi){
        let pivotIndex = await partition(lo, hi); 
        await quickSort(lo, pivotIndex - 1);
        await quickSort(pivotIndex + 1, hi); 
    }
}

/****************
 * merge sort  
 ****************/
async function merge(lo, mid, hi){

    let bars = document.getElementsByClassName("bar");
    bars[lo].backgroundColor = "red"; 
    bars[mid].backgroundColor = "red";
    bars[hi].backgroundColor = "red"; 

    let k; 
    let n1 = mid - lo + 1; 
    let n2 = hi - mid;  

    let left = Array.apply(null, Array(n1)).map(function(){}); 
    let right = Array.apply(null, Array(n2)).map(function(){}); 

    for(let i = 0; i < n1; ++i){
        left[i] = arr[lo + i]; 
    }
    for(let i = 0; i < n2; ++i){
        right[i] = arr[mid + 1 + i];
    }

    let i = 0;  //for left 
    let j = 0;  //for right 
    k = lo; 
    while(i < n1 && j < n2){
        if(left[i] <= right[j]){
            arr[k] = left[i]; 
            await animate(k, left[i]); 
            ++i; 
        }
        else {
            arr[k] = right[j]; 
            await animate(k, right[j]);
            ++j; 
        }
        ++k; 
    }

    //remaining left side 
    while(i < n1){
        arr[k] = left[i]; 
        await animate(k, left[i]); 
        ++i; 
        ++k; 
    }

    //remaining right side 
    while(j < n2){
        arr[k] = right[j];
        await animate(k, right[j]);  
        ++j; 
        ++k; 
    }
}

async function mergeSort(lo, hi){
    if(lo < hi){
        let mid = lo + Math.floor((hi - lo)/2); 
        await mergeSort(lo, mid); 
        await mergeSort(mid + 1, hi); 
        await merge(lo, mid, hi); 
    }
}

/****************
 * heap sort   
 ****************/

async function heapify(highestIndex, currIndex){
    let leftIndex = 2 * currIndex + 1; 
    let rightIndex = 2 * currIndex + 2; 
    let largestIndex = currIndex; 

    if(leftIndex < highestIndex && arr[leftIndex] > arr[largestIndex]){
        largestIndex = leftIndex; 
    }

    if(rightIndex < highestIndex && arr[rightIndex] > arr[largestIndex]){
        largestIndex = rightIndex; 
    }

    if(largestIndex != currIndex){
        await swap(largestIndex, currIndex); 
        await heapify(highestIndex, largestIndex); 
    }
}

async function heapSort(){
    //create max heap 
    for(let i = Math.floor(arr.length / 2 - 1); i >= 0; --i){
        await heapify(arr.length, i); 
    }

    //sort 
    for(let i = arr.length - 1; i >= 0; --i){
        await swap(0, i); 
        await heapify(i, 0); 
    }
}


/****************
 * interface 
 ****************/
async function sort(){
    if(sortingMethod === -1){
        return;
    }

    switch(sortingMethod){
        case BUBBLESORT:
            await bubbleSort();     
            break; 
        case QUICKSORT: 
            await quickSort(0, arr.length - 1); 
            break; 
        case MERGESORT: 
            await mergeSort(0, arr.length - 1);
            break; 
        case HEAPSORT: 
            await heapSort(); 
            break; 
    }
}

function initSort(sortAlgo){
    sortingMethod = sortAlgo; 

    let buttons = document.getElementsByTagName("button"); 
    for(let i = 0; i < buttons.length; ++i){
        buttons[i].style.color = "aliceblue"; 
    }

    let sortMethodStr= "";
    switch(sortingMethod){
        case BUBBLESORT:
            sortMethodStr = "bubbleSort";     
            break; 
        case QUICKSORT: 
            sortMethodStr = "quickSort"; 
            break; 
        case MERGESORT: 
            sortMethodStr = "mergeSort";
            break; 
        case HEAPSORT: 
            sortMethodStr = "heapSort"; 
            break; 
    }

    let button = document.getElementById(sortMethodStr); 
    button.style.color = "aquamarine"; 

}

function initBubbleSort(){
    initSort(BUBBLESORT); 
}

function initQuickSort(){
    initSort(QUICKSORT); 
}

function initMergeSort(){
    initSort(MERGESORT); 
}

function initHeapSort(){
    initSort(HEAPSORT); 
}

/****************
 * events
 ****************/
resetButton.addEventListener("click", reset); 
sortButton.addEventListener("click", sort); 

bubbleSortButton.addEventListener("click", initBubbleSort); 
quickSortButton.addEventListener("click", initQuickSort);
mergeSortButton.addEventListener("click", initMergeSort); 
heapSortButton.addEventListener("click", initHeapSort); 

/*********************
 * immediately called
 ********************/
reset()
