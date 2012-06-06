var Order = can.Construct({
  init: function(title){
  	this.name = title;
  },
  
  title: function(){},
  details: function() {},
  materials: function() {},
  design: function() {},
  setting: function() {},
  signature: function() {},
  status: function() {},
});
  
var Victoria_M_Soaring_Hawk = Order({
  init('hawk');
});