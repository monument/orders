function f(element) {
    if (element.substring(0,1) === '#')
        return document.getElementById(element.substring(1));
    else if (element.substring(0,1) === '.')
        return document.getElementsByClassName(element.substring(1));
    else if (element.substring(0,1) === "'")
        return document.getElementsByTagName(element.substring(1,element.length-1));
}

function calc() {
    money = [ f('#money-monument'), f('#money-marker'), f('#money-vase'), 
              f('#money-lettering'), f('#money-foundation'), 
              f('#money-subtotal'), f('#money-tax'),
              f('#money-installation'), f('#money-fees'), 
              f('#money-total'), f('#money-paid'), f('#money-balance') ];

    var subtotal = money[0].valueAsNumber + money[1].valueAsNumber + money[2].valueAsNumber 
               + money[3].valueAsNumber + money[4].valueAsNumber;

    var taxRate = 0.08517;
    var tax     = subtotal * taxRate;
    var installation = money[7].valueAsNumber;
    var fees    = money[8].valueAsNumber;
    var total   = tax + subtotal + installation + fees;
    var paid    = money[10].valueAsNumber;
    var balance = total - paid;
    
    money[5].value  = subtotal;
    money[6].value  = tax;
    money[9].value  = total;
    money[11].value = balance;

    for (var i = 0; i < money.length; i++) {
        money[i].onchange = calc;
    };
}

var order = {
    "order": {
        "date": "5-23-2012", 
        "by": "Kyle MacKay Rives", 
        "at": "Benchmark", 
        "notes": "Pick up June 20th.\nCall to come see proof when it is ready." 
    },
    "name": {
        "full": "Victoria M. Charging Hawk", 
        "first": "Victoria", 
        "middle": "M.", 
        "last": "Charging Hawk", 
        "prefix": "", 
        "suffix": "" 
    },
    "materials": {
        "piece": {
            "material": "granite", 
            "color": "gray", 
            "type": "tablet", 
            "quantity": 1, 
            "length": 24, 
            "width": 6, 
            "height": 16, 
            "shape": "serp-top", 
            "finish": "pol2", 
            "size": "single" 
        },
        "piece": {
            "material": "granite",
            "color": "gray",
            "type": "base",
            "quantity": 1,
            "length": 36,
            "width": 12,
            "height": 6,
            "margin": ""
        },
        "piece": {
            "material": "granite",
            "color": "gray",
            "type": "vase",
            "quantity": 2,
            "length": 4,
            "width": 4,
            "height": 9,
            "shape": "square", 
            "finish": "pol2"
        },
        "piece": {
            "material": "granite",
            "color": "gray",
            "type": "slant",
            "quantity": 1,
            "length": 20,
            "width": 10,
            "height": 16,
            "finish": "face"
        },
        "foundation": {
            "deep": true, 
            "depth": 18, 
            "pad": "granite", 
            "thickness": 3 
        }
    },
    "design": {
        "preview": "./preview.svg",
        "title": "Wild roses in an oval panel.",
        "carving": "flat", 
        "artwork": "",
        "family-name": "",
        "match": false,
        "face": {
            "direction": "east", 
            "on-left": "",
            "verified": ""
        }
    },
    "setting": {
        "cemetery": "", 
        "pick-up": true 
    },
    "signature": {
        "image": "./signature.png",
        "name": "Roger Whipple",
        "address": {
            "street": "4811 S. Jackson Ave, Apt. 33",
            "city": "Tulsa", 
            "state": "OK", 
            "zip": 74107, 
            "phone": 9188925544 
        }
    },
    "status": {
        "date": {
            "written": "5-24-2012",
            "special": "ASAP",
            "ordered": ""
        },
        "drawing": {
            "completed": "5-24-2012",
            "sent": "",
            "approved": "",
            "production": ""
        },
        "bronze": {
            "ordered": "",
            "recieved": ""
        },
        "vases": {
            "ordered": "",
            "recieved": ""
        },
        "stone": {
            "ordered": "",
            "recieved": "",
            "production": "",
            "office": "",
            "contacted": "",
            "approved": ""
        },
        "setting": {
            "fee": "",
            "installed": "",
            "notified": "",
            "via": "" 
        }
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

//var date = new Date(parseInt(jsonDate.substr(6)));
t = $('table')[1];
td = $('td')[47]
tr = $('tr')[16]
tb = $('tbody')[1]

function init() {
    calc();

    function loadOrder() {
        f('#date-ordered').value = order.order.date
        f('#info-rep').value = order.order.by
    }

    function material() {

    }
}
