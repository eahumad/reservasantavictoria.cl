'use strict'

import lotes from '../../json/lotes.json' 
import lugares from '../../json/lugares.json' 


var viewer
var hotSpots = []







const initPanorama = async function() {
  createViewer()


  //Iniciar Buttons
  document.querySelector('#panorama #details .cerrar').addEventListener('click', (e) => {
    cerrarDetails()
  })

  document.querySelector('#panorama #details .cotizar').addEventListener('click', (e) => {
    irACotizar()
  })
  
}


const cerrarDetails = async function() {
  console.log('cerrar details')
  document.querySelector('#panorama #details').classList.remove('active')
}

const irACotizar = async function() {
  console.log('ir a contacto')
  window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#cotizar"
}





const generateHotspot =  function(points) {
  let response = []
  points.filter( (point)  => point.visible ).forEach(point => {
    if( point.isLugar ) {
      console.log({point})
      response.push(generateLugarHostpost( point))
    }else { //generar Hostpo
      response.push(generateAHotspot( point))
    }
    
  })
  
  response.push(generateDisableMouseHotSpot());
  
  return response
}

const createViewer = async function() {
  let params = getViewerParams();
    
  
  
  document.getElementById("panorama").style.height = params.height+"px";
  
  viewer = pannellum.viewer('panorama', {
    "autoLoad": true,
    "type": "equirectangular",
    "panorama": "/images/panorama.jpg",
    "pitch": params.pitch,
    "yaw": params.yaw,
    "hfov": params.hfov,
    "hotSpots":generateHotspot([...lotes,...lugares])
  })
  
  //Print cords
  viewer.on('mousedown', function(e) {
    let cords = viewer.mouseEventToCoords(e);
    console.log(cords);
  })

  //right click
  viewer.on('contextmenu', function(e) {
    let cords = viewer.mouseEventToCoords(e);
    console.log(cords);
  })
  
}

const getViewerParams = function() {
  let params = {
    /* pitch : -67.49588568441906,
    yaw : 115.70633233176454, */
    pitch : -87,
    yaw : 0,
    hfov : 500,
    height: window.innerHeight-100,
  }
  
  if( window.innerWidth < window.innerHeight)  {
    params.pitch = -87;
    params.yaw = 90;
  }
  
  if(  window.innerWidth <= 768 ) {
    params.hfov = 80
  } else if( window.innerWidth <= 375) {
    params.pitch = -71.03763260297659
    params.yaw = 46.76916574997824
    params.hfov = 74
  }
  
  
  return params;
}



var generateDisableMouseHotSpot= function() {
  return {
    pitch:0,
    yaw:0,
    cssClass:'disableMouseHotSpot active'
  }
}

var generateDetailHotSpot= function() {
  return {
    pitch:0,
    yaw:0,
    cssClass:'detailMouseHotSpot active'
  }
}

const generateLugarHostpost = function(lugar) {
  return {
    "pitch": lugar.pitch ,
    "yaw": lugar.yaw,
    "cssClass": "hotspot-lugar",
    "createTooltipArgs": lugar,
    "createTooltipFunc": (hotSpotDiv, lugar) => {
      let clearHeight = (Math.floor(lugar.nombre.length/12)+1)*55
      hotSpotDiv.innerHTML = `<div>
      <span>${lugar.nombre}</span>
      <div class="line"></div>
      <div class="dot"></div>
      <div class="clear" style="height:${clearHeight}px;"></div>
</div>
      `
    }
  }
}

const generateAHotspot = function(lote) {
  return {
    "pitch": lote.pitch ,
    "yaw": lote.yaw,
    "cssClass": "hotspot-lote "+lote.estado.toLowerCase(),
    "createTooltipFunc": (hotSpotDiv, lote) => {
      
      hotSpotDiv.innerHTML = lote.numero
      
      
      let h3 = document.createElement('h3')
      h3.innerHTML = lote.estado
      
      /* let h5 = document.createElement('h5')
      h5.innerHTML = "Ver ficha" */
      
      
      let innerDiv = document.createElement('div')
      innerDiv.classList.add('hotspot-tooltip')
      innerDiv.appendChild(h3)
      //innerDiv.appendChild(h5)
      
      
      hotSpotDiv.appendChild(innerDiv);
      
      hotSpotDiv.addEventListener('click',(e) => {showDetails(lote)})

    },
    "createTooltipArgs": lote
  }
}

const showDetails = function(lote) {
  console.log({lote})

  let content = document.querySelector('#panorama #details .content');
  let innerDiv = document.createElement('div')

  let txt = `
  <h6>Lote ${lote.numero}</h6>

  Estado: ${lote.estado}<br>
  Superficie: ${parseInt(lote.mts).toLocaleString('es-CL')} m2<br>

  Tipo: ${lote.tipo}<br>
` 
  
  if( parseInt(lote.uf) ) {
    txt = txt + `Valor: ${parseInt(lote.uf).toLocaleString('es-CL')} UF<br>`
  }

  content.innerHTML = txt

  document.querySelector('#panorama #details').classList.add('active')

}




document.addEventListener('click', function (event) {
  
  // If the clicked element doesn't have the right selector, bail
  if (!event.target.matches('.hotspot-lote')) return;
  
  // Don't follow the link
  event.preventDefault();
  
  
  let haveActive = event.target.classList.contains('active');
  
  var elementos = document.getElementsByClassName('hotspot-lote');
  
  
  
  
  [...elementos].forEach(function (elemento) {
    elemento.classList.remove('active');
  });
  
  
  // Log the clicked element in the console
  event.target.classList.toggle('active');
  
}, false);


export default initPanorama;