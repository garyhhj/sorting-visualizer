
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
function sort(){
    alert("sort"); 
}

/****************
 * events
 ****************/
resetButton.addEventListener("click", reset); 
sortButton.addEventListener("click", sort); 


        // div.style.border = "2px";
        // div.style.borderColor = "#ddd2c9" 
        // div.style.backgroundColor = "#ddd2c9";
        // div.style.borderSpacing = "20px"; 
        // div.style.borderRadius = "10px"; 
        // div.style.margin = "5px"; 
        // div.style.width = "40px";  
        // div.style.height = "80px";