
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
    
    //number of bars to generate 
    let nBars = Math.floor(screen.width / 14);  
    generateArr(nBars); 
    console.log("nbars is ", nBars); 
    console.log(arr); 
    for(let i = 0; i < nBars; ++i){
        //style the div 
        //let div = document.createElement("div"); 
        let bar = document.createElement("div"); 
        bar.classList.add("bar");
        bar.style.height = arr[i] + "px";  
        barContainer.appendChild(bar); //(document.createElement("div")); 

        //var container = document.getElementsByClassName("barContainer"); 

        //container.createElement();
        console.log("inserting stuff"); 
    }

    //add the divs back in 
}

/****************
 * sorting algo
 ****************/
//const delay = ms => new Promise(res => setTimeout(res, ms));

// function delay(ms){
//     return new Promise(res => setTimeout(res, ms)); 
// }

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swap(lhs, rhs){
    let bars = document.getElementsByClassName("bar"); 

    bars[lhs].style.height = arr[rhs].toString() + "px"; 
    bars[rhs].style.height = arr[lhs].toString() + "px"; 
    
    bars[lhs].style.backgroundColor = "lightGreen"; 
    bars[rhs].style.backgroundColor = "lightGreen"; 
    await sleep(10); 
    bars[lhs].style.backgroundColor = "#ddd2c9";
    bars[rhs].style.backgroundColor = "#ddd2c9";
    //swaps two elements with index lhs and rhs and perform animation   
    let temp = arr[lhs]; 
    arr[lhs] = arr[rhs]; 
    arr[rhs] = temp;   
}

// async function cmp(lhs, rhs){
//     let bars = document.getElementsByClassName("bar"); 

//     if(arr[lhs] < arr[rhs]){

//         //adjust size 
//         bars[lhs].style.height = arr[rhs].toString() + "px"; 
//         bars[rhs].style.height = arr[lhs].toString() + "px"; 
        
//         bars[lhs].style.backgroundColor = "lightGreen"; 
//         bars[rhs].style.backgroundColor = "lightGreen"; 
//         await sleep(50); 
//         bars[lhs].style.backgroundColor = "#ddd2c9";
//         bars[rhs].style.backgroundColor = "#ddd2c9";

//         //console.log("after 2000ms delay"); 
//         await swap(lhs, rhs);
    
//     }
//     else{
//         bars[lhs].style.backgroundColor = "lightGreen"; 
//         bars[rhs].style.backgroundColor = "lightGreen"; 
//         await sleep(50); 
//         bars[lhs].style.backgroundColor = "#ddd2c9";
//         bars[rhs].style.backgroundColor = "#ddd2c9";
//     }
//     //console.log("end of cmp function"); 

//     //await sleep(50); 
//     //do some animation idk 

//     //compare i and j and determine if need to swap or not and then animate 
// }

async function sort(){
    //setTimeout(function() {console.log("timeout for 5s");},  5000); 

    //alert("sort"); 
    console.log("staring arr"); 
    console.log(arr); 
   
    let arrSize = arr.length; 
    for(let i = 0; i < arrSize; ++i){
        for(let j = 0; j < arrSize - i - 1; ++j){
            if(arr[j + 1] < arr[j]){
                await swap(j + 1, j); 
            }
        }
    }
    

    console.log("ending arr"); 
    console.log(arr); 
}

/****************
 * events
 ****************/
resetButton.addEventListener("click", reset); 
sortButton.addEventListener("click", sort); 

