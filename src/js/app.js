import initPanorama from './modules/panorama'
import initMenu from './modules/menu'
import initMap from './modules/como_llegar'
import initCotizar from './modules/cotizar'
import initMultimedia from './modules/multimedia'


document.addEventListener("DOMContentLoaded", function() {
  initMenu()
  initPanorama()
  initMap()
  initCotizar()
  initMultimedia()
});