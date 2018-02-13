//@Author Katherine Blake and Anthony Simpson
var Collection = {
  values : {},
  addData : function(id, value){
    Collection.values[id] = value;
  },
  isFilled : function(id) {
    return document.getElementById(id).value != 'default';
  },
  color : function() {
    var ia = document.getElementById('ishihara1');
    var ib = document.getElementById('ishihara9');
    var ic = document.getElementById('ishihara23');
    if((ia.value != '') && (ib.value != '') && (ic.value != '')) {
      Collection.addData('ishihara1', ia.value);
      Collection.addData('ishihara9', ib.value);
      Collection.addData('ishihara23', ic.value);
      next();
    }
    else {
      alert('Please enter the numbers written in the plates in the text boxes provided.');
    }
  },
  demoInfo : function(id1, id2, id3, id4) {
    var complete = Collection.continue(id1, false, 'Please answer the question about gender before continuing the survey by selecting an option from the dropdown list.');
    complete = complete && Collection.continue(id2, false, 'Please answer the question about age before continuing the survey by selecting an option from the dropdown list.');
    complete = complete && Collection.continue(id3, false, 'Please answer the question about education level before continuing the survey by selecting an option from the dropdown list.');
    Collection.continue(id4, complete, 'Please answer the question about location before continuing the survey by selecting an option from the dropdown list.');
  },
  continue : function(id, cont = true, message) {
    if(Collection.isFilled(id)) {
       var list = document.getElementById(id);
       Collection.addData(id, list.options[list.selectedIndex].value);
       if (cont) next();
       return true;
     }else{
       if (message === undefined) message = 'Please answer the question before continuing the survey by selecting an option from the dropdown list.';
       alert(message);
       return false;
     }
   },
   comment : function() {
     var c = document.getElementById('comments');
     if(c.value != '') {
       Collection.addData('comments', c.value);
     }
      next();
   },
   submit : function() {
     var url = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + '/Assets/submission.php?';
     for (var key in Collection.values){
       if (Collection.values.hasOwnProperty(key)){
         url += key + "=" + Collection.values[key] + "&";
       }
     }
     window.location.href = url.substring(0, url.length - 1).replace(" ", "_");
   }
}
