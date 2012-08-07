"use strict"; var ko;

// Class to represent a row in the pieces list
function Piece(qty, part, material, kind, length, width, height, notes, cost) {
    var self = this;
    self.qty      = ko.observable(qty) || 1;
    self.part     = ko.observable(part) || "";
    self.material = ko.observable(material) || "";
    self.kind     = ko.observable(kind) || "";
    self.length   = ko.observable(length) || "";
    self.width    = ko.observable(width) || "";
    self.height   = ko.observable(height) || "";
    self.notes    = ko.observable(notes) || "";
    self.cost     = ko.observable(cost) || 0;
}

function Payment(date, amount) {
    var self = this;
    self.date = ko.observable(date);
    self.amount = ko.observable(amount);
}

function Cost(part, amount) {
    var self = this;
    self.part = ko.observable(part);
    self.amount = ko.observable(amount);
}

function Order(name, date, status) {
    var self = this;
    self.name = ko.observable(name);
    self.date = ko.observable(date);
    self.status = ko.observable(status);
}

// Overall viewmodel for this screen, along with initial state
function MaterialViewModel() {
    var self = this;

    // Editable data
    self.pieces = ko.observableArray([
        new Piece(1, "Tablet", "Granite", "Gray", "", "", "", "Polish 2", 200)
      , new Piece(1, "Base", "Granite", "Gray", "", "", "", "Polish Flat-Top", 300)
      , new Piece(1, "Foundation", "Deep", "Granite", "", "", "", "", 250)
    ]);
    
    // Operations
    self.addPiece = function() {
        self.pieces.push(new Piece(1, "", "", "", "", "", "", "", "", 0));
    };
    self.delPiece = function(piece) { self.pieces.remove(piece); };
}

function PaymentsViewModel() {
    var self = this;

    // Editable data
    self.payments = ko.observableArray([
        new Payment("08/01/2012", 500)
      , new Payment("08/07/2012", 300)
    ])
    
    // Operations
    self.addPayment = function() {
        self.payments.push(new Payment("", 0));
    }
    self.delPayment = function(payment) { self.payments.remove(payment); };
}

function CostsViewModel() {
    var self = this;

    // Editable data
    self.costs = ko.observableArray([
        new Cost("Tablet", 500)
      , new Cost("Foundation", 300)
      , new Cost("Lettering", 250)
    ]);
    
    // Operations
    self.addCost = function() {
        self.costs.push(new Cost("", 0));
    };
    self.delCost = function(cost) { self.costs.remove(cost); };
}

function OrderViewModel() {
    var self = this;

    // Editable data
    self.orders = ko.observableArray([
        new Order("Victoria M. Soaring Hawk", "08/01/2012", "Quote")
    ]);

    // Operations
    self.addOrder = function() {
        self.costs.push(new Cost("", 0));
    };
    self.delOrder = function(order) { self.orders.remove(order); };
}

ko.applyBindings(new MaterialViewModel(), document.getElementById("material"));
ko.applyBindings(new PaymentsViewModel(), document.getElementById("payments"));
ko.applyBindings(new CostsViewModel(), document.getElementById("costs"));
// ko.applyBindings(new OrderViewModel(), document.getElementById("order"));
