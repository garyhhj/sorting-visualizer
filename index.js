
/****************
 * global var 
 ****************/
const resetButton = document.querySelector("#reset"); 
const sortButton = document.querySelector("#sort");

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
    
    //get bound for generation 
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
        //let div = document.createElement("div"); 
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
    
    bars[lhs].style.backgroundColor = "lightGreen"; 
    bars[rhs].style.backgroundColor = "lightGreen"; 
    
    // try {
    //     let response = sleep(10);
    // }
    // catch(e){
    //     console.log(e); 
    // }
    await sleep(10); 

    bars[lhs].style.backgroundColor = "#ddd2c9";
    bars[rhs].style.backgroundColor = "#ddd2c9";
    //swaps two elements with index lhs and rhs and perform animation   
    let temp = arr[lhs]; 
    arr[lhs] = arr[rhs]; 
    arr[rhs] = temp;   
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
function merge(lo, mid, hi){
    //maybe animate the first and last bar and middle bar? 

    let k; 
    let n1 = mid - lo + 1; 
    let n2 = hi - mid; 
    //console.log("lo mid hi n1 n2", lo, " , ", mid , " , ", hi, " , ", n1, " , ", n2);

  //how to get array of certain size in js 

    let left = Array.apply(null, Array(n1)).map(function(){}); 
    let right = Array.apply(null, Array(n2)).map(function(){}); 

    //603708 
    for(let i = 0; i < n1; ++i){
        //left.push(arr[lo + i]); 
        left[i] = arr[lo + i]; 
    }
    for(let i = 0; i < n2; ++i){
        //right.push(arr[mid + 1 + i]); 
        right[i] = arr[mid + 1 + i];
    }
    //console.log("left and right arr"); 
    //console.log(left); 
    //console.log(right); 


    //need to animate the resizing of the bars here 

    let i = 0;  //for left 
    let j = 0;  //for right 
    k = lo; 
    while(i < n1 && j < n2){
        if(left[i] <= right[j]){
            arr[k] = left[i]; 
            ++i; 
        }
        else {
            arr[k] = right[j]; 
            ++j; 
        }
        ++k; 
    }

    //remaining left side 
    while(i < n1){
        arr[k] = left[i]; 
        ++i; 
        ++k; 
    }

    //remaining right side 
    while(j < n2){
        arr[k] = right[j]; 
        ++j; 
        ++k; 
    }
    //console.log(arr); 
}

function mergeSort(lo, hi){
    if(lo < hi){
        let mid = lo + Math.floor((hi - lo)/2); 
        //console.log(lo, " , ", mid, " , ", hi , " low mid hi "); 
        mergeSort(lo, mid); 
        mergeSort(mid + 1, hi); 
        merge(lo, mid, hi); 
    }
}

/****************
 * interface 
 ****************/
function sort(){
    //setTimeout(function() {console.log("timeout for 5s");},  5000); 

    //alert("sort"); 
    console.log("staring arr"); 
    console.log(arr); 

    //await bubbleSort();     
    //await quickSort(0, arr.length - 1); 
    mergeSort(0, arr.length - 1);

    //console.log("making arr with set size"); 
    //let arr = [];
    //let arr = Array.apply(null, Array(3)).map(function(){}); 
    //console.log(arr); 


    console.log("ending arr"); 
    console.log(arr); 

}


/****************
 * events
 ****************/
resetButton.addEventListener("click", reset); 
sortButton.addEventListener("click", sort); 

