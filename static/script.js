function play_sound(soundobj) {
    let thissound=document.getElementById(soundobj);
    thissound.currentTime = 0;
    thissound.play();
}

// Ricerca

function ricerca(tab, lists) {
    var input; 
    var filtro;
    var lista;
    var voci;
    var x;
    var i;
    var testo;
      input = document.getElementById(tab);
      filtro = input.value.toUpperCase();
      lista = document.getElementById('list_container');
      voci = lista.getElementsByClassName('single_list_item');
      for (i = 0; i < voci.length; i++) {
        x = voci[i];
        testo = x.textContent || x.innerText;
        if (testo.toUpperCase().indexOf(filtro) > -1) {
          voci[i].style.display = "";
        } else {
          voci[i].style.display = "none";
        }
      }
    }