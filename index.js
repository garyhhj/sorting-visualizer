
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



// function swap(lhs, rhs){
//     let temp = arr[lhs]; 
//     arr[lhs] = arr[rhs]; 
//     arr[rhs] = temp;   
// }

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

// async function partition(lo, hi) {
    
//     let pivot = arr[hi]; 
//     let leftIndex = lo; 
//     let rightIndex = hi - 1; 

//     while(leftIndex <= rightIndex){
//        if(arr[leftIndex] <= pivot){
//             leftIndex += 1; 
//        }
//        else if(arr[rightIndex] >= pivot){
//             rightIndex -= 1; 
//        }
//        else {
//             await swap(leftIndex, rightIndex); 
//             leftIndex += 1; 
//             rightIndex += 1; 
//        }
//     }

//     await swap(leftIndex, hi); 
//     return leftIndex; 

//     // await swap(hi, rightIndex); 
//     // return rightIndex; 
// }

async function partition(lo, hi){
    let pivot = arr[hi]; 
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
    return leftPtr; 
}

async function quickSort(lo, hi){
    if(lo < hi){
        let pivotIndex = await partition(lo, hi); 
        await quickSort(lo, pivotIndex - 1);
        await quickSort(pivotIndex + 1, hi); 
    }
}

async function sort(){
    //setTimeout(function() {console.log("timeout for 5s");},  5000); 

    //alert("sort"); 
    console.log("staring arr"); 
    console.log(arr); 

    await bubbleSort();     
    // await quickSort(0, arr.length - 1); 

    console.log("ending arr"); 
    console.log(arr); 

}


/****************
 * events
 ****************/
resetButton.addEventListener("click", reset); 
sortButton.addEventListener("click", sort); 

