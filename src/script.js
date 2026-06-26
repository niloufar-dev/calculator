const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')

const clear = document.getElementById('clear')
const backspace = document.getElementById('backspace')
const equal = document.getElementById('equal')

const result = document.getElementById('result')
const history = document.getElementById('history')


let display =''

let answer = ''
let flag = false


numbers.forEach((num)=>{
    num.addEventListener('click',()=>{
        if(flag){
            display=''
            flag=false
            history.textContent=''
        }
        display += num.textContent
        result.textContent=display
        

    })
})

operators.forEach((op)=>{

    op.addEventListener('click',()=>{
        if(display==''){
            display='0'
        }
        

         const lastChar = display.slice(-1);

    
    if(
      lastChar === '+' ||
      lastChar === '−' ||
      lastChar === '×' ||
      lastChar === '÷' ||
      lastChar === '%'
    ){
        display= display.slice(0, -1);
    }
    if(flag){
            display=String(answer)
            history.textContent=''
            flag=false
            

        }
    
        display+=op.textContent
    
        result.textContent=display
        
        

    })
    
})
equal.addEventListener("click",cal)

function cal(){
    answer=priority(display)
    answer = Number(answer.toFixed(3));

    result.textContent = answer;
    
    
    history.textContent=display
    display=String(answer)
    flag= true


}

clear.addEventListener('click',()=>{
    display=''
    answer=''
    flag=false
    result.textContent='0'
    history.textContent=''


})

backspace.addEventListener('click',()=>{
    if(display == '') return

    if(flag){
        display=String(answer)
        flag=false
        history.textContent=''
    }

    display=display.slice(0,-1)
    result.textContent= display || '0'
})
function priority(expression) {

    let tokens = expression.match(/\d+(\.\d+)?|[+\−×÷%]/g);

    if (!tokens) return 0;

    //  × ÷ %
    for (let i = 0; i < tokens.length; i++) {

        if (
            tokens[i] === '×' ||
            tokens[i] === '÷' ||
            tokens[i] === '%'
        ) {

            let left = Number(tokens[i - 1]);
            let right = Number(tokens[i + 1]);
            let value;

            switch (tokens[i]) {

                case '×':
                    value = left * right;
                    break;

                case '÷':
                    value = left / right;
                    break;

                case '%':
                    value = left * (right / 100);
                    break;
            }

            tokens.splice(i - 1, 3, value);
            
            i--;
        }
    }

    //   + و −
    let result = Number(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {

        let op = tokens[i];
        let num = Number(tokens[i + 1]);

        if (op === '+') {
            result += num;
        }

        if (op === '−') {
            result -= num;
        }
    }

    return result;
}




