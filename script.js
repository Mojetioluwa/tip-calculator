
function getInput() {
    let form = document.forms[0];
    
    return ({
        bill: form.bill.value,
        tip: form.tip.value,
        custom: form.custom.value,
        numPeople: form['num-people'].value,
        form: form
    })
}

function toggleDisable(e, a = "", b = "") {
    switch(e){
        case 'button':
            if (a === 'disable') {
                document.querySelector(e).disabled = true;
            }
            else if (a === "enable") {
                document.querySelector(e).disabled = false;
            }
            else {
                document.querySelector(e).disabled = !document.querySelector(e).disabled
            }
            
        break;
        
        case 'tip':
            if (a === 'disable') {
                document.forms[0].tip.forEach(a => {
                    a.checked = false;
                })
            }
            else if (a === "ensble") {
                toggleDisable('custom', 'disable')
            }
        break;
            
        case 'custom':
            if (a === 'disable') {
               document.forms[0].custom.value = "";
            }
            else if (a === 'enable') {
                toggleDisable('tip','disable')
            }
        break;
            
        case 'bill':
            if (a === 'disable') document.forms[0].bill.value = "";
        break;
            
        case 'num-people':
            if (a === 'disable') document.forms[0]['num-people'].value = "";
    } 
            
}

function reset() {
    
    let Output = {amount: "0.00", total: "0.00"};
    
    toggleDisable('bill','disable')
    toggleDisable('tip','disable')
    toggleDisable('custom','disable')
    toggleDisable('num-people','disable')
    Display(Output)
    toggleDisable('button','disable')
}

function Aproximate(value,dp) {
    
    let result;
    let strValue = value.toString();
    
    let decimal;
    let unit;
    
    if (strValue.includes('.')) {
        decimal = strValue.slice(strValue.indexOf('.'), strValue.length--);
        unit = strValue.slice(0, strValue.indexOf('.'));
    } else {
        decimal = '.0000';
        unit = strValue;
    };
    
    
    switch (dp) {
        case 2:
            
            let newDecimal = decimal.slice(0, 3);
            
            if (newDecimal === '0') newDecimal = '.00';
        
            result = `${unit}${newDecimal}`;
        break;
        default: 
            result = value;
    }
    return result
}



function Validate({bill, tip, custom, numPeople}) {
    if (!numPeople) return false;
    
    else if (numPeople <= 0) return false;
    
    else if (!bill) return false;
    
    else if (bill <= 0) return false;
    
    else if (!tip) {
        if (!custom) return false;
        else if (custom <= 0 || custom >= 100) return false
        else return true
    }
    
    else  return true
}

function Calculate({bill, tip, custom, numPeople}) {
    
    let persent;
    
    if (!tip) persent = custom;
    else persent = tip;
    
    let roundAmountValue = Math.fround(((persent / 100) * bill) / numPeople);
    
    let amount = Aproximate(roundAmountValue,2);
    let total = Aproximate((amount * numPeople), 2);
    
    return ({
        amount,
        total
    })
}

function Display({amount, total}){
    let amountUI = document.querySelector('#amount');
    let totalUI = document.querySelector('#total');
    
    amountUI.innerText = amount;
    totalUI.innerText = total;
}

function Init() {
    
    let Output = {amount: "", total: ""};
    
    let input = getInput()
    
    if(Validate(input)){
        let {amount, total} = Calculate(input);
        Output.amount = amount;
        Output.total = total;
        Display(Output);
        toggleDisable('button','enable');
    }     
}