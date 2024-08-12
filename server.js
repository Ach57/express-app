const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});



//A) Function: findSummation
function findSummation(N =1){ //given a postive Number N
    // validation of N
    if(typeof N!='number' || isNaN(N) || N<= 0 || !Number.isInteger(N))
        return false;
    //base case of recursion 
    if( N===1)
        return 1;
    else
        //Recursive call
        return N+findSummation(N-1);
}

//B) Function: uppercaseFirstandLast 
function uppercaseFirstandLast(str){
    
    let words = str.split(' '); // split the words into an array
    
    let modifiedWord = words.map(element => {
        if(element.length ===1){ // if the element is just one character
            return element.toUpperCase();        }
        else{
            let lastChar = element[element.length-1];//last character of the string
            let isPunctuation = /[.,!?]/.test(lastChar); // if it is among the punctuations [].,!?]
            if(isPunctuation){
                //modify the letter before the punctuation
                return element[0].toUpperCase()+ element.slice(1,-2)+ element[element.length-2].toUpperCase()+lastChar;
            }else{
                //apply regular modification
                return element[0].toUpperCase()+ element.slice(1,-1)+ element[element.length -1].toUpperCase();
            }

        }
    });
    return modifiedWord.join(' ');
    
    


}

//C) Function: findAverageAndMedian
//Parameter: An array of numbers.
function findAverageAndMedian(arr){ //array of numbers
    if(!Array.isArray(arr)|| arr.length ===0)
        return {average:null, median:null};
    let sum = arr.reduce((total,num)=> total+num,0);
    const average = sum/arr.length;
    const sortedArr = arr.slice().sort((a,b)=>a-b);
    const median = arr[Math.floor(sortedArr.length/2)];

    return {average,median};

}

//D) Function: find4Digits
//Parameter: A string of numbers separated by spaces
function find4Digits(str){
    //Parameter: A string of numbers separated by spaces
    const arr = str.split(' ');
    for(let i = 0; i< arr.length; i++){
        if(/^\d{4}$/.test(arr[i])){
            return arr[i];
        }
    }
    return false;
}


app.get('/summation', (req, res)=>{
    const number = parseInt(req.query.number);
    if (isNaN(number) || number <= 0) {
        res.send('Please enter a valid positive number.');
    }else{
        const result = findSummation(number);
        res.send(`The summation of ${number} is equal to : ${result}`);
    }
    
});

app.get('/uppercaseFirstandLast', (req, res)=>{
    const text = req.query.text;
    const result = uppercaseFirstandLast(text);
    res.send(`The result of the modified text: ${result}`);
 
});

app.get('/findAverageAndMedian', (req, res)=>{
    const text = req.query.text;
    const arr = text.split(',').map(Number);
    const{average, median} = findAverageAndMedian(arr);
    res.send(`Average: ${average}, Median: ${median}`);
});


app.get('/find4Digits',(req,res)=>{
    const text = req.query.text;
    const result = find4Digits(text);
    res.send(result ? `Found 4-digit number: ${result}`: `No 4-digit number found` );

})



const port = process.env.PORT||3000;
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})







