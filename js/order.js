// order.js
// This file contains the order-specific javascript.

(function(){
"use strict";

var order = {
    init: function (name, date, status) {
        // details
        this.name = name;
        this.details.title.sort = this.name;
        this.details.date = date;
        this.details.status = status;
    }
  , "details": {
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
        "monument": null
      , "marker": null
      , "vase": null
      , "lettering": null
      , "foundation": null
      , "setting": null
      , "fees": null
      , "paid": null
      , "subtotal": null
      , "tax": null
      , "total": null
      , "due": null
    }
  , "materials": {
        "1": {
            "part": ""
          , "material": ""
          , "kind": ""
          , "finish": ""
          , "quantity": 0
          , "length": 0
          , "width": 0
          , "height": 0
          , "notes": ""
          , "cost": 0
        }
      , "foundation": {
            "deep": false
          , "pad": "concrete"
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

var o = Object.create(order)

})();
