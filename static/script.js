function play_sound(soundobj) {
  let thissound = document.getElementById(soundobj);
  thissound.currentTime = 0;
  thissound.play();
}



function regione_filter() {
  lista = document.getElementById('selezione_regioni');
}

let checkbox_toggle = () => {
  // Get the checkbox
  let checkBox = document.getElementById("enable_regione_search");
  // Get the output text
  let coso = document.getElementById("elenco_regioni");
  let voci;
  voci = document.getElementsByClassName('single_list_item');

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    coso.style.display = "block";

  } else {
    coso.style.display = "none";
    for (let voce of voci) 
    {
      voce.style.display = "";
    }
  }

}



function discriminazione_regione() {
  let voci;
  voci = document.getElementsByClassName('single_list_item');
  let regione_selezionata = document.getElementById("elenco_regioni").value;
  for (let voce of voci) //stessa cosa di Python, for element in array
  {
    if (regione_selezionata === voce.getAttribute('data-regione')) {
      voce.style.display = "";
    } else {
      voce.style.display = "none";
    }
  }
}



// Ricerca

function ricerca(tab, lists) {
  let input;
  let filtro;
  let lista;
  let voci;
  let x;
  let i;
  let testo;
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