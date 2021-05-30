var cur_rates;
$(document).ready(function() {
  showRates();

});



function showRates() {

  $.get(
    "https://www.nbrb.by/api/exrates/rates?periodicity=0",
    function(data) {
      let list = document.getElementById('rates_list');
      for (let i = 0; i < data.length; i++) {
        let listItem = document.createElement('li');
        listItem.textContent = `1  BYN = ${Math.ceil((data[i].Cur_OfficialRate* data[i].Cur_Scale)*100)/100} ${data[i].Cur_Abbreviation}`;
        list.appendChild(listItem);
      }
    }
  );


}
