// orderForm.js
// This file contains the order form-specific javascript.

(function(){

"use strict";

var f = function(element) { return document.getElementById(element) } // Wrapper for document.getElementById

var calculateMoney = function () {
    var item = {
        "monument":   f("monumentCost").valueAsNumber
      , "marker":     f("markerCost").valueAsNumber
      , "vase":       f("vaseCost").valueAsNumber
      , "lettering":  f("letteringCost").valueAsNumber
      , "foundation": f("foundationCost").valueAsNumber
      , "setting":    f("settingCost").valueAsNumber
      , "fees":       f("fees").valueAsNumber
      , "paid":       f("amountPaid").valueAsNumber
      , "v": {
            "subtotal":   f("subtotal").value
          , "tax":        f("tax").value
          , "total":      f("totalCost").value
          , "due":        f("balanceDue").value
        }
    }

    var subtotal = function () { return item.monument + item.marker + item.vase + item.lettering + item.foundation }
    var tax = function (amt)   { return amt * 0.08517 }
    var fees = function ()     { return item.fees }
    var setting = function ()  { return item.setting }
    var total = function ()    { return subtotal() + tax() + setting() + fees() }
    var paid = function ()     { return item.paid }
    var balance = function ()  { return total() - paid() }

    item.v.subtotal = subtotal()
    item.v.tax      = tax()
    item.v.total    = total()
    item.v.balance  = balance()
}

var file = {
    'load'   : function (filename) { return $.getJSON(filename) },
    'save'   : function () {},
    'parse'  : function (data) { return $.parseJSON(data.responseText) },
    'string' : function (data) { return JSON.stringify(data) },
    'pickOrder' : function () {}
}

document.body.onload = function () {
    // load orders.json
    // put orders into localstorage/indexedDB
    // pick order from list
    // begin calculating money
    // var myCodeMirror = CodeMirror.fromTextArea(notes, {mode:  "markdown"});
}

var lists = {
    "part-list": ["Tablet", "Base", "Vase", "Bench", "Slant", "Bevel", "Sub-base", "Statuary", "Landscape"],
    "material-list": ["Bronze", "Granite", "Marble", "Concrete"],
    "kind-list": ["Gray", "Morning Rose", "Mahogany", "Black", "Green"],
    "finish-list": ["Polish 2", "Polish 3", "Polish 5", "All-Polish"],
    "foundation-list": ["Concrete Pad", "Granite Pad"],
    "foundation-types": ["Pad Only", "Deep (18 inches)"],
    "carving-type": ["Flat", "Shape", "Etching"],
    "design-facings": ["East", "West", "North", "South"],
}

})();
