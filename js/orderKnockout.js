// Class to represent a row in the pieces list
function Piece(qty, part, material, kind, length, width, height, notes, cost) {
    var self = this;
    self.qty      = ko.observable(qty);
    self.part     = ko.observable(part);
    self.material = ko.observable(material);
    self.kind     = ko.observable(kind);
    self.length   = ko.observable(length);
    self.width    = ko.observable(width);
    self.height   = ko.observable(height);
    self.notes    = ko.observable(notes);
    self.cost     = ko.observable(cost);
}

// Overall viewmodel for this screen, along with initial state
function MaterialViewModel() {
    var self = this;

    // Editable data
    self.pieces = ko.observableArray([
        new Piece(1, "Tablet", "Granite", "Gray", "", "", "", "Polish 2", "200"),
        new Piece(1, "Base", "Granite", "Gray", "", "", "", "Polish Flat-Top", "300")
    ]);
    
    // Operations
    self.addPiece = function() {
        self.pieces.push(new Piece(1, "", "", "", "", "", "", "", "", ""));
    };
    self.delPiece = function(piece) { self.pieces.remove(piece); };
}

ko.applyBindings(new MaterialViewModel());


