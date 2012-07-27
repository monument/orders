// Class to represent a row in the pieces list
function Piece(qty, part, material, kind, finish, length, width, height, notes, cost) {
    var self = this;
    self.qty      = ko.observable(qty);
    self.part     = ko.observable(part);
    self.material = ko.observable(material);
    self.kind     = ko.observable(kind);
    self.finish   = ko.observable(finish);
    self.length   = ko.observable(length);
    self.width    = ko.observable(width);
    self.height   = ko.observable(height);
    self.notes    = ko.observable(notes);
    self.cost     = ko.observable(cost);
}

// Overall viewmodel for this screen, along with initial state
function MaterialViewModel() {
    var self = this;
  
    self.partList = ["Tablet", "Base", "Vase", "Bench", "Slant", "Bevel", "Sub-base", "Statuary", "Landscape"];
    self.materialList = ["Bronze", "Granite", "Marble", "Concrete"];
    self.graniteKind = ["Gray", "Morning Rose", "Mahogany", "Black", "Green"],
    self.finishList = ["Polish 2", "Polish 3", "Polish 5", "All-Polish"];
    self.foundationList = ["Concrete Pad", "Granite Pad"];
    self.foundationTypes = ["Pad Only", "Deep (18 inches)"];
    self.carvingType = ["Flat", "Shape", "Etching"];
    self.designFacings = ["East", "West", "North", "South"];
    self.commonDesigns = ["Roses"];

    // Editable data
    self.pieces = ko.observableArray([
        new Piece(1, "Die", "Granite", "Gray", "Polish 2", "", "", "", "", ""),
        new Piece(1, "Base", "Granite", "Gray", "Polish Flat-Top", "", "", "", "", "")
    ]);
    
    // Operations
    self.addPiece = function() {
        self.pieces.push(new Piece(0, "", "","","","","","","","",""));
    };
    self.delPiece = function(piece) { self.pieces.remove(piece); };

    ko.dirtyFlag = function(root) {
        var _isDirty = ko.observable(false);

        var result = ko.computed(function() {
            if (!_isDirty()) { ko.toJS(root); }
            return _isDirty();
        });

        result.subscribe(function() {
            if (!_isDirty()) { _isDirty(true); }
        });

        return result;
    };
}

ko.applyBindings(new MaterialViewModel());

