import mapstyle from '../../json/mapstyle.json' 

function initMap() {
  var myLatLng = { lat: -35.2606111, lng: -71.3899167 }

  var mapOptions = {
    center: myLatLng,
    zoom: 11,
    disableDefaultUI: true,
    styles: mapstyle
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions)

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Reserva Santa Victoria',
    icon: 'images/pin.png'
  })

  var customButtonDiv = document.createElement('div')
  customButtonDiv.className = 'custom-buttons'

  var zoomInButton = document.createElement('button')
  zoomInButton.innerHTML = '<i class="fa fa-plus"></i>'
  zoomInButton.className = 'zoom-button zoom-in'
  zoomInButton.addEventListener('click', function () {
    map.setZoom(map.getZoom() + 1)
  })
  customButtonDiv.appendChild(zoomInButton)

  var zoomOutButton = document.createElement('button')
  zoomOutButton.innerHTML = '<i class="fa fa-minus"></i>'
  zoomOutButton.className = 'zoom-button zoom-out'
  zoomOutButton.addEventListener('click', function () {
    map.setZoom(map.getZoom() - 1)
  })
  customButtonDiv.appendChild(zoomOutButton)

  var fullscreenButton = document.createElement('button')
  fullscreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>'
  fullscreenButton.className = 'fullscreen-button'
  fullscreenButton.addEventListener('click', function () {

    console.log(map)

    if (isFullscreen(map)) {
      exitFullscreen(fullscreenButton)
    } else {
      requestFullscreen(map,fullscreenButton)
    }
  })
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(fullscreenButton)

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(customButtonDiv)
}


function isFullscreen(map) {
  let element =  map.getDiv().firstChild;
  return (
    (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement) == element
  );
}

function requestFullscreen(map,fullscreenButton) {
  let element =  map.getDiv().firstChild;
  if (element.requestFullscreen) {
    fullscreenButton.innerHTML = '<i class="fa-solid fa-compress"></i>'
    element.requestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    fullscreenButton.innerHTML = '<i class="fa-solid fa-compress"></i>'
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    fullscreenButton.innerHTML = '<i class="fa-solid fa-compress"></i>'
    element.mozRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    fullscreenButton.innerHTML = '<i class="fa-solid fa-compress"></i>'
    element.msRequestFullScreen();
  }
}

function exitFullscreen(fullscreenButton) {

  if (document.exitFullscreen) {
    fullscreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>'
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    fullscreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>'
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    fullscreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>'
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    fullscreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>'
    document.msExitFullscreen();
  }
}


export default initMap