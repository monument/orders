"use strict";
var ko;

// Class to represent a row in the pieces list
function Piece(qty, part, material, kind, length, width, height, notes, amount) {
    var self = this;
    self.qty      = ko.observable(qty);
    self.part     = ko.observable(part);
    self.material = ko.observable(material);
    self.kind     = ko.observable(kind);
    self.length   = ko.observable(length);
    self.width    = ko.observable(width);
    self.height   = ko.observable(height);
    self.notes    = ko.observable(notes);
    self.amount   = ko.observable(amount);
}

function Cost(part, amount) {
    var self = this;
    self.part = ko.observable(part);
    self.amount = ko.observable(amount);
}

function Payment(date, amount) {
    var self = this;
    self.date = ko.observable(date);
    self.amount = ko.observable(amount);
}

// Overall viewmodel for this screen, along with initial state
function OrderViewModel_State() {
    var self = this;

    // Editable data
    self.pieces = ko.observableArray([
        // qty, part, type, kind, length, width, height, notes, amount
        new Piece(1, "Tablet", "Granite", "Gray", "36", "24", "06", "Polish 2", 500)
      , new Piece(1, "Base",   "Granite", "Gray", "48", "14", "08", "Polish Flat-Top", 300)
      , new Piece(1, "Marker", "Bronze",  "",     "24", "12", "", "Matthews", 150)
      , new Piece(1, "Marker", "Granite", "Mahogany", "28", "14", "06", "Put Under Bronze", 100)
      , new Piece(1, "Foundation", "Granite", "Deep", "", "", "", "", 250)
    ])

    self.costs = ko.observableArray([
        new Cost("Lettering", 250)
    ])

    self.payments = ko.observableArray([
        new Payment("08/01/2012", 500)
      , new Payment("08/07/2012", 300)
    ])


    // Computed data
    function round(n) { return Math.round(n * 100) / 100 }
    function parse(o) { return parseInt(o, 10) }

    self.subtotal = ko.computed(function () {
        var subtotal = 0, i;
        for (i = 0; i < self.costs().length; i++)
            subtotal += parse(self.costs()[i].amount())
        for (i = 0; i < self.pieces().length; i++)
            subtotal += parse(self.pieces()[i].amount()) * parse(self.pieces()[i].qty())
        return subtotal;
    })

    self.tax   = ko.computed(function ()    { return round(self.subtotal() * 0.08157) })
    self.delivery = ko.observable(0)
    self.fees  = ko.observable(0)
    self.total = ko.computed(function ()    { return self.subtotal() + self.tax() + parse(self.delivery()) + parse(self.fees()) })

    self.paid = ko.computed(function () {
        var paid = 0;
        for (var i = 0; i < self.payments().length; i++)
            paid += parseInt(self.payments()[i].amount(), 10);
        return paid;
    })

    self.balance = ko.computed(function () {
        return round(self.total() - self.paid());
    })
   

    // Operations
    self.addPiece = function ()      { self.pieces.push(new Piece(1, "", "", "", "", "", "", "", 0)) }
    self.delPiece = function (piece) { self.pieces.remove(piece) }
    self.addCost = function  ()     { self.costs.push(new Cost("", 0)) }
    self.delCost = function  (cost) { self.costs.remove(cost) }
    self.addPayment = function ()        { self.payments.push(new Payment("", 0)) }
    self.delPayment = function (payment) { self.payments.remove(payment) }
    

    // Editable data
    self.note = ko.observable("")
    
    self.deliver = {
        by: ko.observable("08/19/2012")
      , to: ko.observable("Sasakwa Cemetery")
      , near: ko.observable("Sasakwa, OK")
      , spaces: ko.observable()
      , lot: ko.observable()
      , block: ko.observable()
      , section: ko.observable()
      , contact: {
            name: ko.observable()
          , phone: ko.observable()
        }
    }

    self.design = {
        title: ko.observable("")
    }

    self.sale = {
        name: "D. Mike Rives"
      , phone: "(918) 578-1234"
      , email: "example@gmail.com"
      , street: "1735 E. 11th St."
      , city: "Tulsa"
      , state: "OK"
      , zip: 74104
      , soldBy: "Kyle MacKay Rives"
      , soldAt: "BMC"
    }

    self.order = {
        title: ko.observable("Victoria M. Charging-Hawk")
      , date: ko.observable("08/08/2012")
      , status: ko.observable("Quote")
    }
    // self.a = ko.observable(ko.utils.stringifyJSON(OrderViewModel))
}

function OrderViewModel() {
    var self = this;

    // Editable data
    self.pieces = ko.observableArray([new Piece(1, "", "", "", "", "", "", "", 0)])
    self.costs = ko.observableArray([new Cost("", 0)])
    self.payments = ko.observableArray([new Payment("", 0)])


    // Computed data
    function round(n) { return Math.round(n * 100) / 100 }
    function parse(o) { return parseInt(o, 10) }

    self.subtotal = ko.computed(function () {
        var subtotal = 0, i;
        for (i = 0; i < self.costs().length; i++)
            subtotal += parse(self.costs()[i].amount())
        for (i = 0; i < self.pieces().length; i++)
            subtotal += parse(self.pieces()[i].amount()) * parse(self.pieces()[i].qty())
        return subtotal;
    })

    self.tax   = ko.computed(function ()    { return round(self.subtotal() * 0.08517) })
    self.delivery = ko.observable(0)
    self.fees  = ko.observable(0)
    self.total = ko.computed(function ()    { return round(self.subtotal() + self.tax() + parse(self.delivery()) + parse(self.fees())) })

    self.paid = ko.computed(function () {
        var paid = 0;
        for (var i = 0; i < self.payments().length; i++)
            paid += parseInt(self.payments()[i].amount(), 10);
        return paid;
    })

    self.balance = ko.computed(function () {
        return round(self.total() - self.paid());
    })
   

    // Operations
    self.addPiece = function ()      { self.pieces.push(new Piece(1, "", "", "", "", "", "", "", 0)) }
    self.delPiece = function (piece) { self.pieces.remove(piece) }
    self.addCost = function  ()      { self.costs.push(new Cost("", 0)) }
    self.delCost = function  (cost)  { self.costs.remove(cost) }
    self.addPayment = function ()        { self.payments.push(new Payment("", 0)) }
    self.delPayment = function (payment) { self.payments.remove(payment) }
    

    // Editable data
    self.note = ko.observable("")
    
    self.deliver = {
        by: ko.observable()
      , to: ko.observable()
      , near: ko.observable()
      , spaces: ko.observable()
      , lot: ko.observable()
      , block: ko.observable()
      , section: ko.observable()
      , contact: {
            name: ko.observable()
          , phone: ko.observable()
        }
    }

    self.design = {
        title: ko.observable("")
    }

    self.sale = {
        name: ""
      , phone: ""
      , email: ""
      , street: ""
      , city: ""
      , state: ""
      , zip: ""
      , soldBy: ""
      , soldAt: ""
      , signature: ""
    }

    self.order = {
        title: ko.observable("Order Title")
      , date: ko.observable(new Date())
      , status: ko.observable("Quote")
    }
    // self.allData = ko.observable(ko.toJSON(OrderViewModel))
}

ko.applyBindings(new OrderViewModel(), document.body)

///////////////////////////////////

// navigator.registerProtocolHandler("bmorder", "http://orders.benchmarkmonument.com/?order=%s", "Order");

///////////////////////////////////

var Order = {
    "details": {
        "status": ""
      , "date": ""
      , "by": ""
      , "at": ""
      , "notes": ""
      , "title": {
            "full": ""
          , "sort": ""
          , "names": []
        }
    }
  , "costs": {
        "lettering": 0
      , "subtotal": 0
      , "tax": 0
      , "setting": 0
      , "fees": 0
      , "total": 0
      , "paid": 0
      , "due": 0
    }
  , "materials": {
        "1": {
            "part": ""
          , "material": ""
          , "kind": ""
          , "quantity": 1
          , "length": 0
          , "width": 0
          , "height": 0
          , "notes": ""
          , "cost": 0
        }
      , "2": {
            "part": "Foundation"
          , "material": "Concrete"
          , "kind": "Deep"
          , "quantity": 1
          , "length": 0
          , "width": 0
          , "height": 0
          , "notes": ""
          , "cost": 0
        }
    }
  , "design": {
        "preview": ""
      , "title": ""
      , "carving": "flat"
      , "artwork": ""
      , "familyName": false
      , "match": false
      , "facing": {
            "direction": ""
          , "onLeft": ""
          , "verified": false
        }
    }
  , "setting": {
        "cemetery": {
            "name": ""
          , "near": ""
          , "contact": {
                "name": ""
              , "phone": ""
            }
          , "location": {
                "section": ""
              , "block": ""
              , "lot": ""
              , "spaces": ""
            }
        }
      , "fee": 0
    }
  , "signature": {
        "image": ""
      , "name": ""
      , "address": {
            "street": ""
          , "city": ""
          , "state": ""
          , "zip": null
          , "phone": null
        }
    }
  , "status": {
        "written": ""
      , "special": ""
      , "drawing": {
            "completed": null
          , "out": null
          , "approved": null
          , "production": null
        }
      , "bronze": {
            "ordered": null
          , "acknowledged": null
          , "received": null
          , "approved": null
          , "by": null
        }
      , "vases": null
      , "stone": {
            "ordered": "in-stock"
          , "acknowledged": null
          , "received": null
          , "production": null
          , "office": null
          , "contacted": null
          , "approved": null
          , "by": "LMR"
        }
      , "setting": {
            "paid": null
          , "installed": null
        }
      , "notified": {
            "date": null
          , "via": ""
          , "by": ""
        }
    }
}
