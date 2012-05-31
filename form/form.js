document.body.onload = init;
function f(element) { return document.getElementById(element) }

function calc() {
    var money = [ f('money-monument'), f('money-marker'), f('money-vase'), f('money-lettering'), f('money-foundation'), f('money-subtotal'), f('money-tax'), f('money-installation'), f('money-fees'), f('money-total'), f('money-paid'), f('money-balance') ];

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
        if (money[i].readOnly === false)
            money[i].onchange = calc;
}

var file = {
    'name': "hawk_victoria_m",
    'set': function(data) { return "../data/" + data + ".json" },
    'load': function(data) { $.getJSON(data, function(obj) { order = obj }) },
    //'string': function() { var data = JSON.stringify(order); order.bits.stringy = data; },
    'parsed': function() { var data = JSON.parse(order); order.bits.parsed = data; },
    'get': function() {
        orderFile('load', 'details');
        orderFile('load', 'name');
        //orderFile('load', 'materials');
        //orderFile('load', 'design');
        //orderFile('load', 'setting');
        //orderFile('load', 'signature');
        //orderFile('load', 'status');
    },
    'set': function() {
        // /file.string();
        orderFile('save', 'details');
        orderFile('save', 'name');
        localStorage.setItem(order.name.sort, order.stringy);
    }
}



function init() {
    file.load( file.set(file.name) )
    calc();
    //$.Callbacks().add( getOrder)
    file.get();
    //$.Callbacks().fire()
}
