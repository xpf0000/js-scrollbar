import './scrollbar.css'

const checkIsXScrollBar = (target) => {
  const is = (arr) => {
    arr = [...arr]
    if (arr.length === 0)return false
    return arr.includes('x-scroll-bar-y') || arr.includes('x-scroll-bar-x')
  }
  let classList = target.classList
  if (is(classList)) {
    return true
  }
  classList = target.parentNode?.classList ?? []
  if (is(classList)) {
    return true
  }
  return false
}

export function XScrollBar(barEl, { xy = 'xy',
  offsetX = 0,
  offsetY = 0,
  className = '',
  autoHide = true,
  autoHideDelay = 5000
}) {
  const type = xy
  const position = getComputedStyle(barEl).position
  const fixed = barEl === document.documentElement || barEl === document.body || position === 'static'

  offsetX = !isNaN(Number(offsetX)) ? `${offsetX}px` : offsetX
  offsetY = !isNaN(Number(offsetY)) ? `${offsetY}px` : offsetY

  const w = (barEl.clientWidth / barEl.scrollWidth) * 100.0
  const xbar = document.createElement('div')
  const xbarPlant = document.createElement('div')
  xbar.className = `x-scroll-bar-x ${className}`
  xbar.style.left = offsetX
  xbar.style.width = `calc(100% - ${offsetX} - ${offsetX})`
  xbarPlant.className = 'bar-plant'
  xbarPlant.style.width = `${w}%`
  xbar.appendChild(xbarPlant)
  if (fixed) {
    xbar.style.position = 'fixed'
    document.documentElement.appendChild(xbar)
  } else {
    barEl.appendChild(xbar)
  }


  const h = (barEl.clientHeight / barEl.scrollHeight) * 100.0
  const ybar = document.createElement('div')
  const ybarPlant = document.createElement('div')
  ybar.className = `x-scroll-bar-y ${className}`
  ybar.style.top = offsetY
  ybar.style.height = `calc(100% - ${offsetY} - ${offsetY})`
  ybarPlant.className = 'bar-plant'
  ybarPlant.style.height = `${h}%`
  ybar.appendChild(ybarPlant)
  if (fixed) {
    ybar.style.position = 'fixed'
    document.documentElement.appendChild(ybar)
  } else {
    barEl.appendChild(ybar)
  }

  barEl.XScrollBar = {
    scrollHeight: barEl.scrollHeight,
    scrollWidth: barEl.scrollWidth,
    clientHeight: barEl.clientHeight,
    clientWidth: barEl.clientWidth,
    scrollTop: barEl.scrollTop,
    plantHeight: h,
    scrollLeft: barEl.scrollLeft,
    plantWidth: w,
    barHeight: ybar.getBoundingClientRect().height,
    barWidth: xbar.getBoundingClientRect().width,
    offsetX,
    offsetY
  }

  xbar.style.left = barEl.XScrollBar.offsetX
  ybar.style.top = barEl.XScrollBar.offsetY

  const onScroll = (e) => {
    const top = (barEl.scrollTop / barEl.scrollHeight) * 100.0
    ybarPlant.style.top = `${top}%`
    barEl.XScrollBar.scrollTop = top

    const left = (barEl.scrollLeft / barEl.scrollWidth) * 100.0
    xbarPlant.style.left = `${left}%`
    barEl.XScrollBar.scrollLeft = left
    if (!fixed) {
      ybar.style.top = `calc(${barEl.scrollTop}px + ${barEl.XScrollBar.offsetY})`
      xbar.style.left = `calc(${barEl.scrollLeft}px + ${barEl.XScrollBar.offsetX})`
    }
  }
  if (barEl === document.documentElement) {
    window.addEventListener('scroll', onScroll)
  } else {
    barEl.addEventListener('scroll', onScroll)
  }

  let XScrollBar
  let dragX
  let dragBegin
  const mouseDown = (de) => {
    dragBegin = de
    de.stopPropagation && de.stopPropagation()
    de.preventDefault && de.preventDefault()
    dragX = de.target === xbarPlant
    if (dragX) {
      xbar.classList.add('x-scroll-dragging')
    } else {
      ybar.classList.add('x-scroll-dragging')
    }
    XScrollBar = JSON.parse(JSON.stringify(barEl.XScrollBar))
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }

  const mouseMove = (me) => {
    if (dragX) {
      let p = XScrollBar.scrollLeft + ((me.screenX - dragBegin.screenX) / XScrollBar.barWidth * 100.0)
      p = Math.max(0, Math.min((100 - XScrollBar.plantWidth), p))
      xbarPlant.style.left = `${p}%`
      barEl.XScrollBar.scrollLeft = p
      const st = barEl.scrollWidth * p / 100.0
      barEl.scrollLeft = st
    } else {
      let p = XScrollBar.scrollTop + ((me.screenY - dragBegin.screenY) / XScrollBar.barHeight * 100.0)
      p = Math.max(0, Math.min((100 - XScrollBar.plantHeight), p))
      ybarPlant.style.top = `${p}%`
      barEl.XScrollBar.scrollTop = p
      const st = barEl.scrollHeight * p / 100.0
      barEl.scrollTop = st
    }
  }

  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
    xbar.classList.remove('x-scroll-dragging')
    ybar.classList.remove('x-scroll-dragging')
  }

  xbarPlant.addEventListener('mousedown', mouseDown)
  ybarPlant.addEventListener('mousedown', mouseDown)

  const doXScroll = (left, scrollLeft) => {
    const l = parseFloat(xbarPlant.style.left || 0)
    const stepLeft = (left - l) / 14.0
    const sl = barEl.scrollLeft
    const stepScrollLeft = (scrollLeft - sl) / 14.0
    function scroll () {
      if (!barEl.parentNode) {
        return
      }
      let l = parseFloat(xbarPlant.style.left)
      l = stepLeft < 0 ? Math.max(l + stepLeft, left) : Math.min(l + stepLeft, left)
      xbarPlant.style.left = `${l}%`
      let sl = barEl.scrollLeft
      sl = stepScrollLeft < 0 ? Math.max(sl + stepScrollLeft, scrollLeft) : Math.min(sl + stepScrollLeft, scrollLeft)
      barEl.scrollLeft = sl
      if (!fixed) {
        xbar.style.left = `calc(${barEl.scrollLeft}px + ${barEl.XScrollBar.offsetX})`
      }
      if (l !== left) {
        requestAnimationFrame(scroll)
      }
    }
    requestAnimationFrame(scroll)
  }

  const doYScroll = (top, scrollTop) => {
    const t = parseFloat(ybarPlant.style.top || 0)
    const stepTop = (top - t) / 14.0
    const st = barEl.scrollTop
    const stepScrollTop = (scrollTop - st) / 14.0
    function scroll () {
      if (!barEl.parentNode) {
        return
      }
      let t = parseFloat(ybarPlant.style.top)
      t = stepTop < 0 ? Math.max(t + stepTop, top) : Math.min(t + stepTop, top)
      ybarPlant.style.top = `${t}%`
      let st = barEl.scrollTop
      st = stepScrollTop < 0 ? Math.max(st + stepScrollTop, scrollTop) : Math.min(st + stepScrollTop, scrollTop)
      barEl.scrollTop = st
      if (!fixed) {
        ybar.style.top = `calc(${barEl.scrollTop}px + ${barEl.XScrollBar.offsetY})`
      }
      if (t !== top) {
        requestAnimationFrame(scroll)
      }
    }
    requestAnimationFrame(scroll)
  }

  const barMouseDown = (e) => {
    if (e.target === xbar) {
      const x = e.offsetX
      let p = x / barEl.XScrollBar.barWidth * 100
      p = Math.max(0, Math.min((100 - barEl.XScrollBar.plantWidth), p))
      p = parseFloat(p.toFixed(2))
      barEl.XScrollBar.scrollLeft = p
      const st = barEl.scrollWidth * p / 100.0
      doXScroll(p, st)
    } else {
      const y = e.offsetY
      let p = y / barEl.XScrollBar.barHeight * 100
      p = Math.max(0, Math.min((100 - barEl.XScrollBar.plantHeight), p))
      p = parseFloat(p.toFixed(2))
      barEl.XScrollBar.scrollTop = p
      const st = barEl.scrollHeight * p / 100.0
      doYScroll(p, st)
    }
  }

  xbar.addEventListener('mousedown', barMouseDown)
  ybar.addEventListener('mousedown', barMouseDown)

  xbar.style.display = 'none'
  ybar.style.display = 'none'

  const checkShow = () => {
    if (type.indexOf('x') >= 0 && barEl.scrollWidth > barEl.clientWidth) {
      xbar.style.display = 'block'
    } else {
      xbar.style.display = 'none'
    }

    if (type.indexOf('y') >= 0 && barEl.scrollHeight > barEl.clientHeight) {
      ybar.style.display = 'block'
    } else {
      ybar.style.display = 'none'
    }
  }
  checkShow()
  const reFreshBar = () => {
    if (!barEl.parentNode) {
      destroy()
      return
    }
    checkShow()

    const XScrollBar = barEl.XScrollBar
    const scrollHeight = barEl.scrollHeight
    const scrollWidth = barEl.scrollWidth
    const clientHeight = barEl.clientHeight
    const clientWidth = barEl.clientWidth

    if (scrollHeight !== XScrollBar.scrollHeight ||
      scrollWidth !== XScrollBar.scrollWidth ||
      clientHeight !== XScrollBar.clientHeight ||
      clientWidth !== XScrollBar.clientWidth) {

      XScrollBar.scrollHeight = scrollHeight
      XScrollBar.scrollWidth = scrollWidth
      XScrollBar.clientHeight = clientHeight
      XScrollBar.clientWidth = clientWidth

      XScrollBar.barHeight = ybar.getBoundingClientRect().height
      XScrollBar.barWidth = xbar.getBoundingClientRect().width

      const w = (clientWidth / scrollWidth) * 100.0
      const h = (clientHeight / scrollHeight) * 100.0
      XScrollBar.plantHeight = h
      XScrollBar.plantWidth = w

      xbarPlant.style.width = `${w}%`
      ybarPlant.style.height = `${h}%`
    }
  }

  const resizeObserver = new ResizeObserver((mutations, observer) => {
    reFreshBar()
  })
  resizeObserver.observe(barEl)

  const observer = new MutationObserver((mutations, observer) => {
    const target = mutations[0].target
    if (checkIsXScrollBar(target)) {
      return
    }
    reFreshBar()
  })
  const config = {
    attributes: true,
    subtree: true,
    childList: true
  }
  observer.observe(barEl, config)

  let hideTimer
  const setHideWhenNoMove = () => {
    hideTimer && clearTimeout(hideTimer)
    if (xbar.classList.contains('x-scroll-hide')) {
      xbar.classList.remove('x-scroll-hide')
      ybar.classList.remove('x-scroll-hide')
    }
    hideTimer = setTimeout(() => {
      xbar.classList.add('x-scroll-hide')
      ybar.classList.add('x-scroll-hide')
    }, autoHideDelay)
  }
  if (autoHide) {
    document.addEventListener('mousemove', setHideWhenNoMove)
    document.addEventListener('mousewheel', setHideWhenNoMove)
    document.addEventListener('DOMMouseScroll', setHideWhenNoMove)
    setHideWhenNoMove()
  }

  const destroy = () => {
    resizeObserver && resizeObserver.unobserve && resizeObserver.unobserve(barEl)
    observer && observer.disconnect && observer.disconnect()
    hideTimer && clearTimeout(hideTimer)
    document.removeEventListener('mousewheel', setHideWhenNoMove)
    document.removeEventListener('DOMMouseScroll', setHideWhenNoMove)
    document.removeEventListener('mousemove', setHideWhenNoMove)
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
    xbar && xbar.remove()
    ybar && ybar.remove()
    barEl && delete barEl.XScrollBar
  }

  return {
    update: reFreshBar,
    destroy
  }
}

export default {
  inserted (el, binding) {
    const { value } = binding
    if (!value) {
      return
    }
    XScrollBar(el, value)
  }
}
