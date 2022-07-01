export default function (context, { menu, catalogBtn, close }) {
  let added = false

  function initTouchEvents (breakpoint) {
    const menuWidth = menu.offsetWidth
    const innerWidth = window.innerWidth
    let firstX
    let lastX
    let diff

    if (innerWidth <= +breakpoint && added === false) {
      menu.addEventListener('touchstart', touchStartListener)
      menu.addEventListener('touchmove', touchMoveListener)
      menu.addEventListener('touchend', touchEndListener)

      added = true
    }

    function touchStartListener (e) {
      if (window.innerWidth <= +breakpoint) {
        menu.style.transitionProperty = 'none'
        catalogBtn.style.transitionProperty = 'none'
        close.style.transitionProperty = 'none'
        firstX = e.touches[0].clientX
      }
    }

    function touchMoveListener (e) {
      if (window.innerWidth <= +breakpoint) {
        lastX = e.touches[0].clientX
        diff = firstX - lastX
        if (diff > 0) {
          menu.style.transform = `translateX(-${diff}px)`
          catalogBtn.style.transform = `translateX(-${diff}px)`
          close.style.transform = `translateX(-${diff}px)`
        }
      }
    }

    function touchEndListener () {
      if (window.innerWidth <= +breakpoint) {
        menu.style.transitionProperty = ''
        catalogBtn.style.transitionProperty = ''
        close.style.transitionProperty = ''
        setTimeout(() => {
          menu.style.transform = ''
          catalogBtn.style.transform = ''
          close.style.transform = ''

          if (menuWidth / diff <= 2 && menuWidth / diff > 0) {
            context.toggleMenu(false)
          }
        }, 0.01)
      }
    }
  }

  window.addEventListener('resize', () => {
    initTouchEvents('1024')
  })

  initTouchEvents('1024')
}
