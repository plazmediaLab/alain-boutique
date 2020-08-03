import { useState } from 'react';

export default function useToggleActions(){

  const [status, setToggleStatus] = useState(false);
  
  function FadeIn(element, maxOpacity = 1) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= maxOpacity){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
  };
  function FadeOut(element, initialOpacity = 1) {
    var op = initialOpacity;  // initial opacity
    var timer = setInterval(function () {
        if (op < 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 8);
  }
  
  const openToggle = (backgroundToggle, containerToggle) => {
    containerToggle.current.classList.toggle("shadow-menutoggle");
    if(!status){
      setToggleStatus(true)
      FadeIn(backgroundToggle.current, 0.8);
      containerToggle.current.style.width = '350px';
    }else{
      setToggleStatus(false)
      containerToggle.current.style.width = '0px';
      setTimeout(() => {
        FadeOut(backgroundToggle.current, 0.8);
      }, 300);
    }
  };

  return [ status, openToggle ];
};