
let pos = { left: 0, x: 0 }
const images = document.getElementById('multimedia')
  .getElementsByClassName('gallery')[0]
  .getElementsByClassName('images')[0]
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
//const gallery = document.querySelector('.items');
let isDown = false
let startX
let scrollLeft




const initMultimedia = () => {


  images.addEventListener('mousedown', (e) => {
    if (!isMobile) {
      isDown = true
      images.classList.add('active')
      startX = e.pageX - images.offsetLeft
      scrollLeft = images.scrollLeft
    }
  })


  images.addEventListener('mouseleave', () => {
    if (!isMobile) {
      isDown = false
      images.classList.remove('active')
    }
  })

  images.addEventListener('mouseup', () => {
    if (!isMobile) {
      isDown = false
      images.classList.remove('active')
    }
  })

  images.addEventListener('mousemove', (e) => {
    if (!isMobile) {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - images.offsetLeft
      const walk = (x - startX) * 3 //scroll-fast
      images.scrollLeft = scrollLeft - walk
      console.log(walk)
    }

  })

}


export default initMultimedia;

