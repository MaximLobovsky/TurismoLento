function play_sound(soundobj) {
    let thissound=document.getElementById(soundobj);
    thissound.currentTime = 0;
    thissound.play();
}