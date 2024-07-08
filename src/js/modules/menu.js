

const initMenu = function() {
  const menuButton = document.getElementById('menu-button')
  const menuLinks = document.getElementById('menu-links')
  const nav = document.getElementsByTagName('nav')[0]

  menuButton.addEventListener('click', function() {
    if( menuButton.classList.contains('opened') ) {
      nav.classList.add('opened')
    } else {
      nav.classList.remove('opened')
    }
  })


  const navLinks = document.getElementsByClassName('nav-link')

  Array.from(navLinks).forEach(function(navLink) {
    navLink.addEventListener('click', () => {
      console.log('asd')
      nav.classList.remove('opened')
      menuButton.classList.remove('opened')
    })
  })

 
 
  
  window.addEventListener('scroll', function() {
    toogleBGByScroll(nav)
  })

  toogleBGByScroll(nav)
}

const toogleBGByScroll = (nav) => {
  let scrollPosY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosY > 100) {
      nav.classList.add('with-bg')
    } else {
      nav.classList.remove('with-bg')
    }
}


export default initMenu

