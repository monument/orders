function f(element) { return document.querySelectorAll(element)[0] }

function calc() {
    var money = [ f('#money-monument'), f('#money-marker'), f('#money-vase'), f('#money-lettering'), f('#money-foundation'), f('#money-subtotal'), f('#money-tax'), f('#money-installation'), f('#money-fees'), f('#money-total'), f('#money-paid'), f('#money-balance') ];

    var subtotal = money[0].valueAsNumber + money[1].valueAsNumber + money[2].valueAsNumber + money[3].valueAsNumber + money[4].valueAsNumber;

    var taxRate = 0.08517;            // The local tax rate.
    var tax     = subtotal * taxRate;   // The amount of tax.
    var setting = money[7].valueAsNumber; // The setting fees.
    var fees    = money[8].valueAsNumber;   // Any other fees.
    var total   = tax + subtotal + setting + fees;  // Add these together...
    var paid    = money[10].valueAsNumber;          // ...mix in the amount paid...
    var balance = total - paid;                     // ...and return the balance.
    
    money[5].value  = subtotal;
    money[6].value  = tax;
    money[9].value  = total;
    money[11].value = balance;

    // Set the onchange attribute to call calc for each money cell that is editable.
    for (var i = 0; i < money.length; i++)
        if(money[i].readOnly === false)
            money[i].onchange = calc;
}

var order = {
    "details": {
        "date": "5-23-2012", 
        "by": "Kyle MacKay Rives", 
        "at": "Benchmark", 
        "notes": "Pick up June 20th.\nCall to come see proof when it is ready." 
    },
    "name": {
        "full": "Victoria M. Charging Hawk", 
        "sort": "hawk_victoria_m",
        "first": "Victoria", 
        "middle": "M.", 
        "last": "Charging Hawk", 
        "prefix": "", 
        "suffix": "" 
    }
}

function nameMerge() {
    var full   = order.name.full
    var first  = order.name.first
    var middle = order.name.middle
    var last   = order.name.last

    full = first + " " + middle + " " + last;
    order.name.full = full
}

function init() {
    calc();

    function loadOrder() {
        f('#date-ordered').value = order.order.date
        f('#info-rep').value = order.order.by
    }

    function material() {

    }
}
