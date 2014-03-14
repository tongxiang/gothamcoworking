/* ===================================================
 * bootstrap-transition.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.item.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle()
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      })

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
    $target.carousel(options)
    e.preventDefault()
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
    .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('touchstart.dropdown.data-api', '.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);/* =========================================================
 * bootstrap-modal.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
            this.removeBackdrop()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (this.options.trigger != 'manual') {
        eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })
          .insertAfter(this.$element)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .offset(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)
      self[self.tip().hasClass('in') ? 'hide' : 'show']()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  , html: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);/* ===========================================================
 * bootstrap-popover.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);/* =============================================================
 * bootstrap-scrollspy.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + self.$scrollElement.scrollTop(), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    e.preventDefault()
    $this.typeahead($this.data())
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);

// /*!
//  * Bootstrap v3.0.3 (http://getbootstrap.com)
//  * Copyright 2013 Twitter, Inc.
//  * Licensed under http://www.apache.org/licenses/LICENSE-2.0
//  */

// if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }

// /* ========================================================================
//  * Bootstrap: transition.js v3.0.3
//  * http://getbootstrap.com/javascript/#transitions
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
//   // ============================================================

//   function transitionEnd() {
//     var el = document.createElement('bootstrap')

//     var transEndEventNames = {
//       'WebkitTransition' : 'webkitTransitionEnd'
//     , 'MozTransition'    : 'transitionend'
//     , 'OTransition'      : 'oTransitionEnd otransitionend'
//     , 'transition'       : 'transitionend'
//     }

//     for (var name in transEndEventNames) {
//       if (el.style[name] !== undefined) {
//         return { end: transEndEventNames[name] }
//       }
//     }
//   }

//   // http://blog.alexmaccaw.com/css-transitions
//   $.fn.emulateTransitionEnd = function (duration) {
//     var called = false, $el = this
//     $(this).one($.support.transition.end, function () { called = true })
//     var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
//     setTimeout(callback, duration)
//     return this
//   }

//   $(function () {
//     $.support.transition = transitionEnd()
//   })

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: alert.js v3.0.3
//  * http://getbootstrap.com/javascript/#alerts
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // ALERT CLASS DEFINITION
//   // ======================

//   var dismiss = '[data-dismiss="alert"]'
//   var Alert   = function (el) {
//     $(el).on('click', dismiss, this.close)
//   }

//   Alert.prototype.close = function (e) {
//     var $this    = $(this)
//     var selector = $this.attr('data-target')

//     if (!selector) {
//       selector = $this.attr('href')
//       selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
//     }

//     var $parent = $(selector)

//     if (e) e.preventDefault()

//     if (!$parent.length) {
//       $parent = $this.hasClass('alert') ? $this : $this.parent()
//     }

//     $parent.trigger(e = $.Event('close.bs.alert'))

//     if (e.isDefaultPrevented()) return

//     $parent.removeClass('in')

//     function removeElement() {
//       $parent.trigger('closed.bs.alert').remove()
//     }

//     $.support.transition && $parent.hasClass('fade') ?
//       $parent
//         .one($.support.transition.end, removeElement)
//         .emulateTransitionEnd(150) :
//       removeElement()
//   }


//   // ALERT PLUGIN DEFINITION
//   // =======================

//   var old = $.fn.alert

//   $.fn.alert = function (option) {
//     return this.each(function () {
//       var $this = $(this)
//       var data  = $this.data('bs.alert')

//       if (!data) $this.data('bs.alert', (data = new Alert(this)))
//       if (typeof option == 'string') data[option].call($this)
//     })
//   }

//   $.fn.alert.Constructor = Alert


//   // ALERT NO CONFLICT
//   // =================

//   $.fn.alert.noConflict = function () {
//     $.fn.alert = old
//     return this
//   }


//   // ALERT DATA-API
//   // ==============

//   $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: button.js v3.0.3
//  * http://getbootstrap.com/javascript/#buttons
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // BUTTON PUBLIC CLASS DEFINITION
//   // ==============================

//   var Button = function (element, options) {
//     this.$element = $(element)
//     this.options  = $.extend({}, Button.DEFAULTS, options)
//   }

//   Button.DEFAULTS = {
//     loadingText: 'loading...'
//   }

//   Button.prototype.setState = function (state) {
//     var d    = 'disabled'
//     var $el  = this.$element
//     var val  = $el.is('input') ? 'val' : 'html'
//     var data = $el.data()

//     state = state + 'Text'

//     if (!data.resetText) $el.data('resetText', $el[val]())

//     $el[val](data[state] || this.options[state])

//     // push to event loop to allow forms to submit
//     setTimeout(function () {
//       state == 'loadingText' ?
//         $el.addClass(d).attr(d, d) :
//         $el.removeClass(d).removeAttr(d);
//     }, 0)
//   }

//   Button.prototype.toggle = function () {
//     var $parent = this.$element.closest('[data-toggle="buttons"]')
//     var changed = true

//     if ($parent.length) {
//       var $input = this.$element.find('input')
//       if ($input.prop('type') === 'radio') {
//         // see if clicking on current one
//         if ($input.prop('checked') && this.$element.hasClass('active'))
//           changed = false
//         else
//           $parent.find('.active').removeClass('active')
//       }
//       if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
//     }

//     if (changed) this.$element.toggleClass('active')
//   }


//   // BUTTON PLUGIN DEFINITION
//   // ========================

//   var old = $.fn.button

//   $.fn.button = function (option) {
//     return this.each(function () {
//       var $this   = $(this)
//       var data    = $this.data('bs.button')
//       var options = typeof option == 'object' && option

//       if (!data) $this.data('bs.button', (data = new Button(this, options)))

//       if (option == 'toggle') data.toggle()
//       else if (option) data.setState(option)
//     })
//   }

//   $.fn.button.Constructor = Button


//   // BUTTON NO CONFLICT
//   // ==================

//   $.fn.button.noConflict = function () {
//     $.fn.button = old
//     return this
//   }


//   // BUTTON DATA-API
//   // ===============

//   $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
//     var $btn = $(e.target)
//     if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
//     $btn.button('toggle')
//     e.preventDefault()
//   })

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: carousel.js v3.0.3
//  * http://getbootstrap.com/javascript/#carousel
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // CAROUSEL CLASS DEFINITION
//   // =========================

//   var Carousel = function (element, options) {
//     this.$element    = $(element)
//     this.$indicators = this.$element.find('.carousel-indicators')
//     this.options     = options
//     this.paused      =
//     this.sliding     =
//     this.interval    =
//     this.$active     =
//     this.$items      = null

//     this.options.pause == 'hover' && this.$element
//       .on('mouseenter', $.proxy(this.pause, this))
//       .on('mouseleave', $.proxy(this.cycle, this))
//   }

//   Carousel.DEFAULTS = {
//     interval: 5000
//   , pause: 'hover'
//   , wrap: true
//   }

//   Carousel.prototype.cycle =  function (e) {
//     e || (this.paused = false)

//     this.interval && clearInterval(this.interval)

//     this.options.interval
//       && !this.paused
//       && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

//     return this
//   }

//   Carousel.prototype.getActiveIndex = function () {
//     this.$active = this.$element.find('.item.active')
//     this.$items  = this.$active.parent().children()

//     return this.$items.index(this.$active)
//   }

//   Carousel.prototype.to = function (pos) {
//     var that        = this
//     var activeIndex = this.getActiveIndex()

//     if (pos > (this.$items.length - 1) || pos < 0) return

//     if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
//     if (activeIndex == pos) return this.pause().cycle()

//     return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
//   }

//   Carousel.prototype.pause = function (e) {
//     e || (this.paused = true)

//     if (this.$element.find('.next, .prev').length && $.support.transition.end) {
//       this.$element.trigger($.support.transition.end)
//       this.cycle(true)
//     }

//     this.interval = clearInterval(this.interval)

//     return this
//   }

//   Carousel.prototype.next = function () {
//     if (this.sliding) return
//     return this.slide('next')
//   }

//   Carousel.prototype.prev = function () {
//     if (this.sliding) return
//     return this.slide('prev')
//   }

//   Carousel.prototype.slide = function (type, next) {
//     var $active   = this.$element.find('.item.active')
//     var $next     = next || $active[type]()
//     var isCycling = this.interval
//     var direction = type == 'next' ? 'left' : 'right'
//     var fallback  = type == 'next' ? 'first' : 'last'
//     var that      = this

//     if (!$next.length) {
//       if (!this.options.wrap) return
//       $next = this.$element.find('.item')[fallback]()
//     }

//     this.sliding = true

//     isCycling && this.pause()

//     var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

//     if ($next.hasClass('active')) return

//     if (this.$indicators.length) {
//       this.$indicators.find('.active').removeClass('active')
//       this.$element.one('slid.bs.carousel', function () {
//         var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
//         $nextIndicator && $nextIndicator.addClass('active')
//       })
//     }

//     if ($.support.transition && this.$element.hasClass('slide')) {
//       this.$element.trigger(e)
//       if (e.isDefaultPrevented()) return
//       $next.addClass(type)
//       $next[0].offsetWidth // force reflow
//       $active.addClass(direction)
//       $next.addClass(direction)
//       $active
//         .one($.support.transition.end, function () {
//           $next.removeClass([type, direction].join(' ')).addClass('active')
//           $active.removeClass(['active', direction].join(' '))
//           that.sliding = false
//           setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
//         })
//         .emulateTransitionEnd(600)
//     } else {
//       this.$element.trigger(e)
//       if (e.isDefaultPrevented()) return
//       $active.removeClass('active')
//       $next.addClass('active')
//       this.sliding = false
//       this.$element.trigger('slid.bs.carousel')
//     }

//     isCycling && this.cycle()

//     return this
//   }


//   // CAROUSEL PLUGIN DEFINITION
//   // ==========================

//   var old = $.fn.carousel

//   $.fn.carousel = function (option) {
//     return this.each(function () {
//       var $this   = $(this)
//       var data    = $this.data('bs.carousel')
//       var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
//       var action  = typeof option == 'string' ? option : options.slide

//       if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
//       if (typeof option == 'number') data.to(option)
//       else if (action) data[action]()
//       else if (options.interval) data.pause().cycle()
//     })
//   }

//   $.fn.carousel.Constructor = Carousel


//   // CAROUSEL NO CONFLICT
//   // ====================

//   $.fn.carousel.noConflict = function () {
//     $.fn.carousel = old
//     return this
//   }


//   // CAROUSEL DATA-API
//   // =================

//   $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
//     var $this   = $(this), href
//     var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
//     var options = $.extend({}, $target.data(), $this.data())
//     var slideIndex = $this.attr('data-slide-to')
//     if (slideIndex) options.interval = false

//     $target.carousel(options)

//     if (slideIndex = $this.attr('data-slide-to')) {
//       $target.data('bs.carousel').to(slideIndex)
//     }

//     e.preventDefault()
//   })

//   $(window).on('load', function () {
//     $('[data-ride="carousel"]').each(function () {
//       var $carousel = $(this)
//       $carousel.carousel($carousel.data())
//     })
//   })

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: collapse.js v3.0.3
//  * http://getbootstrap.com/javascript/#collapse
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // COLLAPSE PUBLIC CLASS DEFINITION
//   // ================================

//   var Collapse = function (element, options) {
//     this.$element      = $(element)
//     this.options       = $.extend({}, Collapse.DEFAULTS, options)
//     this.transitioning = null

//     if (this.options.parent) this.$parent = $(this.options.parent)
//     if (this.options.toggle) this.toggle()
//   }

//   Collapse.DEFAULTS = {
//     toggle: true
//   }

//   Collapse.prototype.dimension = function () {
//     var hasWidth = this.$element.hasClass('width')
//     return hasWidth ? 'width' : 'height'
//   }

//   Collapse.prototype.show = function () {
//     if (this.transitioning || this.$element.hasClass('in')) return

//     var startEvent = $.Event('show.bs.collapse')
//     this.$element.trigger(startEvent)
//     if (startEvent.isDefaultPrevented()) return

//     var actives = this.$parent && this.$parent.find('> .panel > .in')

//     if (actives && actives.length) {
//       var hasData = actives.data('bs.collapse')
//       if (hasData && hasData.transitioning) return
//       actives.collapse('hide')
//       hasData || actives.data('bs.collapse', null)
//     }

//     var dimension = this.dimension()

//     this.$element
//       .removeClass('collapse')
//       .addClass('collapsing')
//       [dimension](0)

//     this.transitioning = 1

//     var complete = function () {
//       this.$element
//         .removeClass('collapsing')
//         .addClass('in')
//         [dimension]('auto')
//       this.transitioning = 0
//       this.$element.trigger('shown.bs.collapse')
//     }

//     if (!$.support.transition) return complete.call(this)

//     var scrollSize = $.camelCase(['scroll', dimension].join('-'))

//     this.$element
//       .one($.support.transition.end, $.proxy(complete, this))
//       .emulateTransitionEnd(350)
//       [dimension](this.$element[0][scrollSize])
//   }

//   Collapse.prototype.hide = function () {
//     if (this.transitioning || !this.$element.hasClass('in')) return

//     var startEvent = $.Event('hide.bs.collapse')
//     this.$element.trigger(startEvent)
//     if (startEvent.isDefaultPrevented()) return

//     var dimension = this.dimension()

//     this.$element
//       [dimension](this.$element[dimension]())
//       [0].offsetHeight

//     this.$element
//       .addClass('collapsing')
//       .removeClass('collapse')
//       .removeClass('in')

//     this.transitioning = 1

//     var complete = function () {
//       this.transitioning = 0
//       this.$element
//         .trigger('hidden.bs.collapse')
//         .removeClass('collapsing')
//         .addClass('collapse')
//     }

//     if (!$.support.transition) return complete.call(this)

//     this.$element
//       [dimension](0)
//       .one($.support.transition.end, $.proxy(complete, this))
//       .emulateTransitionEnd(350)
//   }

//   Collapse.prototype.toggle = function () {
//     this[this.$element.hasClass('in') ? 'hide' : 'show']()
//   }


//   // COLLAPSE PLUGIN DEFINITION
//   // ==========================

//   var old = $.fn.collapse

//   $.fn.collapse = function (option) {
//     return this.each(function () {
//       var $this   = $(this)
//       var data    = $this.data('bs.collapse')
//       var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

//       if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
//       if (typeof option == 'string') data[option]()
//     })
//   }

//   $.fn.collapse.Constructor = Collapse


//   // COLLAPSE NO CONFLICT
//   // ====================

//   $.fn.collapse.noConflict = function () {
//     $.fn.collapse = old
//     return this
//   }


//   // COLLAPSE DATA-API
//   // =================

//   $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
//     var $this   = $(this), href
//     var target  = $this.attr('data-target')
//         || e.preventDefault()
//         || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
//     var $target = $(target)
//     var data    = $target.data('bs.collapse')
//     var option  = data ? 'toggle' : $this.data()
//     var parent  = $this.attr('data-parent')
//     var $parent = parent && $(parent)

//     if (!data || !data.transitioning) {
//       if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
//       $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
//     }

//     $target.collapse(option)
//   })

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: dropdown.js v3.0.3
//  * http://getbootstrap.com/javascript/#dropdowns
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // DROPDOWN CLASS DEFINITION
//   // =========================

//   var backdrop = '.dropdown-backdrop'
//   var toggle   = '[data-toggle=dropdown]'
//   var Dropdown = function (element) {
//     $(element).on('click.bs.dropdown', this.toggle)
//   }

//   Dropdown.prototype.toggle = function (e) {
//     var $this = $(this)

//     if ($this.is('.disabled, :disabled')) return

//     var $parent  = getParent($this)
//     var isActive = $parent.hasClass('open')

//     clearMenus()

//     if (!isActive) {
//       if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
//         // if mobile we use a backdrop because click events don't delegate
//         $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
//       }

//       $parent.trigger(e = $.Event('show.bs.dropdown'))

//       if (e.isDefaultPrevented()) return

//       $parent
//         .toggleClass('open')
//         .trigger('shown.bs.dropdown')

//       $this.focus()
//     }

//     return false
//   }

//   Dropdown.prototype.keydown = function (e) {
//     if (!/(38|40|27)/.test(e.keyCode)) return

//     var $this = $(this)

//     e.preventDefault()
//     e.stopPropagation()

//     if ($this.is('.disabled, :disabled')) return

//     var $parent  = getParent($this)
//     var isActive = $parent.hasClass('open')

//     if (!isActive || (isActive && e.keyCode == 27)) {
//       if (e.which == 27) $parent.find(toggle).focus()
//       return $this.click()
//     }

//     var $items = $('[role=menu] li:not(.divider):visible a', $parent)

//     if (!$items.length) return

//     var index = $items.index($items.filter(':focus'))

//     if (e.keyCode == 38 && index > 0)                 index--                        // up
//     if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
//     if (!~index)                                      index=0

//     $items.eq(index).focus()
//   }

//   function clearMenus() {
//     $(backdrop).remove()
//     $(toggle).each(function (e) {
//       var $parent = getParent($(this))
//       if (!$parent.hasClass('open')) return
//       $parent.trigger(e = $.Event('hide.bs.dropdown'))
//       if (e.isDefaultPrevented()) return
//       $parent.removeClass('open').trigger('hidden.bs.dropdown')
//     })
//   }

//   function getParent($this) {
//     var selector = $this.attr('data-target')

//     if (!selector) {
//       selector = $this.attr('href')
//       selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
//     }

//     var $parent = selector && $(selector)

//     return $parent && $parent.length ? $parent : $this.parent()
//   }


//   // DROPDOWN PLUGIN DEFINITION
//   // ==========================

//   var old = $.fn.dropdown

//   $.fn.dropdown = function (option) {
//     return this.each(function () {
//       var $this = $(this)
//       var data  = $this.data('bs.dropdown')

//       if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
//       if (typeof option == 'string') data[option].call($this)
//     })
//   }

//   $.fn.dropdown.Constructor = Dropdown


//   // DROPDOWN NO CONFLICT
//   // ====================

//   $.fn.dropdown.noConflict = function () {
//     $.fn.dropdown = old
//     return this
//   }


//   // APPLY TO STANDARD DROPDOWN ELEMENTS
//   // ===================================

//   $(document)
//     .on('click.bs.dropdown.data-api', clearMenus)
//     .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
//     .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
//     .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: modal.js v3.0.3
//  * http://getbootstrap.com/javascript/#modals
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // MODAL CLASS DEFINITION
//   // ======================

//   var Modal = function (element, options) {
//     this.options   = options
//     this.$element  = $(element)
//     this.$backdrop =
//     this.isShown   = null

//     if (this.options.remote) this.$element.load(this.options.remote)
//   }

//   Modal.DEFAULTS = {
//       backdrop: true
//     , keyboard: true
//     , show: true
//   }

//   Modal.prototype.toggle = function (_relatedTarget) {
//     return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
//   }

//   Modal.prototype.show = function (_relatedTarget) {
//     var that = this
//     var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

//     this.$element.trigger(e)

//     if (this.isShown || e.isDefaultPrevented()) return

//     this.isShown = true

//     this.escape()

//     this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

//     this.backdrop(function () {
//       var transition = $.support.transition && that.$element.hasClass('fade')

//       if (!that.$element.parent().length) {
//         that.$element.appendTo(document.body) // don't move modals dom position
//       }

//       that.$element.show()

//       if (transition) {
//         that.$element[0].offsetWidth // force reflow
//       }

//       that.$element
//         .addClass('in')
//         .attr('aria-hidden', false)

//       that.enforceFocus()

//       var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

//       transition ?
//         that.$element.find('.modal-dialog') // wait for modal to slide in
//           .one($.support.transition.end, function () {
//             that.$element.focus().trigger(e)
//           })
//           .emulateTransitionEnd(300) :
//         that.$element.focus().trigger(e)
//     })
//   }

//   Modal.prototype.hide = function (e) {
//     if (e) e.preventDefault()

//     e = $.Event('hide.bs.modal')

//     this.$element.trigger(e)

//     if (!this.isShown || e.isDefaultPrevented()) return

//     this.isShown = false

//     this.escape()

//     $(document).off('focusin.bs.modal')

//     this.$element
//       .removeClass('in')
//       .attr('aria-hidden', true)
//       .off('click.dismiss.modal')

//     $.support.transition && this.$element.hasClass('fade') ?
//       this.$element
//         .one($.support.transition.end, $.proxy(this.hideModal, this))
//         .emulateTransitionEnd(300) :
//       this.hideModal()
//   }

//   Modal.prototype.enforceFocus = function () {
//     $(document)
//       .off('focusin.bs.modal') // guard against infinite focus loop
//       .on('focusin.bs.modal', $.proxy(function (e) {
//         if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
//           this.$element.focus()
//         }
//       }, this))
//   }

//   Modal.prototype.escape = function () {
//     if (this.isShown && this.options.keyboard) {
//       this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
//         e.which == 27 && this.hide()
//       }, this))
//     } else if (!this.isShown) {
//       this.$element.off('keyup.dismiss.bs.modal')
//     }
//   }

//   Modal.prototype.hideModal = function () {
//     var that = this
//     this.$element.hide()
//     this.backdrop(function () {
//       that.removeBackdrop()
//       that.$element.trigger('hidden.bs.modal')
//     })
//   }

//   Modal.prototype.removeBackdrop = function () {
//     this.$backdrop && this.$backdrop.remove()
//     this.$backdrop = null
//   }

//   Modal.prototype.backdrop = function (callback) {
//     var that    = this
//     var animate = this.$element.hasClass('fade') ? 'fade' : ''

//     if (this.isShown && this.options.backdrop) {
//       var doAnimate = $.support.transition && animate

//       this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
//         .appendTo(document.body)

//       this.$element.on('click.dismiss.modal', $.proxy(function (e) {
//         if (e.target !== e.currentTarget) return
//         this.options.backdrop == 'static'
//           ? this.$element[0].focus.call(this.$element[0])
//           : this.hide.call(this)
//       }, this))

//       if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

//       this.$backdrop.addClass('in')

//       if (!callback) return

//       doAnimate ?
//         this.$backdrop
//           .one($.support.transition.end, callback)
//           .emulateTransitionEnd(150) :
//         callback()

//     } else if (!this.isShown && this.$backdrop) {
//       this.$backdrop.removeClass('in')

//       $.support.transition && this.$element.hasClass('fade')?
//         this.$backdrop
//           .one($.support.transition.end, callback)
//           .emulateTransitionEnd(150) :
//         callback()

//     } else if (callback) {
//       callback()
//     }
//   }


//   // MODAL PLUGIN DEFINITION
//   // =======================

//   var old = $.fn.modal

//   $.fn.modal = function (option, _relatedTarget) {
//     return this.each(function () {
//       var $this   = $(this)
//       var data    = $this.data('bs.modal')
//       var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

//       if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
//       if (typeof option == 'string') data[option](_relatedTarget)
//       else if (options.show) data.show(_relatedTarget)
//     })
//   }

//   $.fn.modal.Constructor = Modal


//   // MODAL NO CONFLICT
//   // =================

//   $.fn.modal.noConflict = function () {
//     $.fn.modal = old
//     return this
//   }


//   // MODAL DATA-API
//   // ==============

//   $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
//     var $this   = $(this)
//     var href    = $this.attr('href')
//     var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
//     var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

//     e.preventDefault()

//     $target
//       .modal(option, this)
//       .one('hide', function () {
//         $this.is(':visible') && $this.focus()
//       })
//   })

//   $(document)
//     .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
//     .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: tooltip.js v3.0.3
//  * http://getbootstrap.com/javascript/#tooltip
//  * Inspired by the original jQuery.tipsy by Jason Frame
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // TOOLTIP PUBLIC CLASS DEFINITION
//   // ===============================

//   var Tooltip = function (element, options) {
//     this.type       =
//     this.options    =
//     this.enabled    =
//     this.timeout    =
//     this.hoverState =
//     this.$element   = null

//     this.init('tooltip', element, options)
//   }

//   Tooltip.DEFAULTS = {
//     animation: true
//   , placement: 'top'
//   , selector: false
//   , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
//   , trigger: 'hover focus'
//   , title: ''
//   , delay: 0
//   , html: false
//   , container: false
//   }

//   Tooltip.prototype.init = function (type, element, options) {
//     this.enabled  = true
//     this.type     = type
//     this.$element = $(element)
//     this.options  = this.getOptions(options)

//     var triggers = this.options.trigger.split(' ')

//     for (var i = triggers.length; i--;) {
//       var trigger = triggers[i]

//       if (trigger == 'click') {
//         this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
//       } else if (trigger != 'manual') {
//         var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
//         var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

//         this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
//         this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
//       }
//     }

//     this.options.selector ?
//       (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
//       this.fixTitle()
//   }

//   Tooltip.prototype.getDefaults = function () {
//     return Tooltip.DEFAULTS
//   }

//   Tooltip.prototype.getOptions = function (options) {
//     options = $.extend({}, this.getDefaults(), this.$element.data(), options)

//     if (options.delay && typeof options.delay == 'number') {
//       options.delay = {
//         show: options.delay
//       , hide: options.delay
//       }
//     }

//     return options
//   }

//   Tooltip.prototype.getDelegateOptions = function () {
//     var options  = {}
//     var defaults = this.getDefaults()

//     this._options && $.each(this._options, function (key, value) {
//       if (defaults[key] != value) options[key] = value
//     })

//     return options
//   }

//   Tooltip.prototype.enter = function (obj) {
//     var self = obj instanceof this.constructor ?
//       obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

//     clearTimeout(self.timeout)

//     self.hoverState = 'in'

//     if (!self.options.delay || !self.options.delay.show) return self.show()

//     self.timeout = setTimeout(function () {
//       if (self.hoverState == 'in') self.show()
//     }, self.options.delay.show)
//   }

//   Tooltip.prototype.leave = function (obj) {
//     var self = obj instanceof this.constructor ?
//       obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

//     clearTimeout(self.timeout)

//     self.hoverState = 'out'

//     if (!self.options.delay || !self.options.delay.hide) return self.hide()

//     self.timeout = setTimeout(function () {
//       if (self.hoverState == 'out') self.hide()
//     }, self.options.delay.hide)
//   }

//   Tooltip.prototype.show = function () {
//     var e = $.Event('show.bs.'+ this.type)

//     if (this.hasContent() && this.enabled) {
//       this.$element.trigger(e)

//       if (e.isDefaultPrevented()) return

//       var $tip = this.tip()

//       this.setContent()

//       if (this.options.animation) $tip.addClass('fade')

//       var placement = typeof this.options.placement == 'function' ?
//         this.options.placement.call(this, $tip[0], this.$element[0]) :
//         this.options.placement

//       var autoToken = /\s?auto?\s?/i
//       var autoPlace = autoToken.test(placement)
//       if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

//       $tip
//         .detach()
//         .css({ top: 0, left: 0, display: 'block' })
//         .addClass(placement)

//       this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

//       var pos          = this.getPosition()
//       var actualWidth  = $tip[0].offsetWidth
//       var actualHeight = $tip[0].offsetHeight

//       if (autoPlace) {
//         var $parent = this.$element.parent()

//         var orgPlacement = placement
//         var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
//         var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
//         var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
//         var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

//         placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
//                     placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
//                     placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
//                     placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
//                     placement

//         $tip
//           .removeClass(orgPlacement)
//           .addClass(placement)
//       }

//       var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

//       this.applyPlacement(calculatedOffset, placement)
//       this.$element.trigger('shown.bs.' + this.type)
//     }
//   }

//   Tooltip.prototype.applyPlacement = function(offset, placement) {
//     var replace
//     var $tip   = this.tip()
//     var width  = $tip[0].offsetWidth
//     var height = $tip[0].offsetHeight

//     // manually read margins because getBoundingClientRect includes difference
//     var marginTop = parseInt($tip.css('margin-top'), 10)
//     var marginLeft = parseInt($tip.css('margin-left'), 10)

//     // we must check for NaN for ie 8/9
//     if (isNaN(marginTop))  marginTop  = 0
//     if (isNaN(marginLeft)) marginLeft = 0

//     offset.top  = offset.top  + marginTop
//     offset.left = offset.left + marginLeft

//     $tip
//       .offset(offset)
//       .addClass('in')

//     // check to see if placing tip in new offset caused the tip to resize itself
//     var actualWidth  = $tip[0].offsetWidth
//     var actualHeight = $tip[0].offsetHeight

//     if (placement == 'top' && actualHeight != height) {
//       replace = true
//       offset.top = offset.top + height - actualHeight
//     }

//     if (/bottom|top/.test(placement)) {
//       var delta = 0

//       if (offset.left < 0) {
//         delta       = offset.left * -2
//         offset.left = 0

//         $tip.offset(offset)

//         actualWidth  = $tip[0].offsetWidth
//         actualHeight = $tip[0].offsetHeight
//       }

//       this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
//     } else {
//       this.replaceArrow(actualHeight - height, actualHeight, 'top')
//     }

//     if (replace) $tip.offset(offset)
//   }

//   Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
//     this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
//   }

//   Tooltip.prototype.setContent = function () {
//     var $tip  = this.tip()
//     var title = this.getTitle()

//     $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
//     $tip.removeClass('fade in top bottom left right')
//   }

//   Tooltip.prototype.hide = function () {
//     var that = this
//     var $tip = this.tip()
//     var e    = $.Event('hide.bs.' + this.type)

//     function complete() {
//       if (that.hoverState != 'in') $tip.detach()
//     }

//     this.$element.trigger(e)

//     if (e.isDefaultPrevented()) return

//     $tip.removeClass('in')

//     $.support.transition && this.$tip.hasClass('fade') ?
//       $tip
//         .one($.support.transition.end, complete)
//         .emulateTransitionEnd(150) :
//       complete()

//     this.$element.trigger('hidden.bs.' + this.type)

//     return this
//   }

//   Tooltip.prototype.fixTitle = function () {
//     var $e = this.$element
//     if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
//       $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
//     }
//   }

//   Tooltip.prototype.hasContent = function () {
//     return this.getTitle()
//   }

//   Tooltip.prototype.getPosition = function () {
//     var el = this.$element[0]
//     return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
//       width: el.offsetWidth
//     , height: el.offsetHeight
//     }, this.$element.offset())
//   }

//   Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
//     return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
//            placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
//            placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
//         /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
//   }

//   Tooltip.prototype.getTitle = function () {
//     var title
//     var $e = this.$element
//     var o  = this.options

//     title = $e.attr('data-original-title')
//       || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

//     return title
//   }

//   Tooltip.prototype.tip = function () {
//     return this.$tip = this.$tip || $(this.options.template)
//   }

//   Tooltip.prototype.arrow = function () {
//     return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
//   }

//   Tooltip.prototype.validate = function () {
//     if (!this.$element[0].parentNode) {
//       this.hide()
//       this.$element = null
//       this.options  = null
//     }
//   }

//   Tooltip.prototype.enable = function () {
//     this.enabled = true
//   }

//   Tooltip.prototype.disable = function () {
//     this.enabled = false
//   }

//   Tooltip.prototype.toggleEnabled = function () {
//     this.enabled = !this.enabled
//   }

//   Tooltip.prototype.toggle = function (e) {
//     var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
//     self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
//   }

//   Tooltip.prototype.destroy = function () {
//     this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
//   }


//   // TOOLTIP PLUGIN DEFINITION
//   // =========================

//   var old = $.fn.tooltip

//   $.fn.tooltip = function (option) {
//     return this.each(function () {
//       var $this   = $(this)
//       var data    = $this.data('bs.tooltip')
//       var options = typeof option == 'object' && option

//       if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
//       if (typeof option == 'string') data[option]()
//     })
//   }

//   $.fn.tooltip.Constructor = Tooltip


//   // TOOLTIP NO CONFLICT
//   // ===================

//   $.fn.tooltip.noConflict = function () {
//     $.fn.tooltip = old
//     return this
//   }

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: popover.js v3.0.3
//  * http://getbootstrap.com/javascript/#popovers
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // POPOVER PUBLIC CLASS DEFINITION
//   // ===============================

//   var Popover = function (element, options) {
//     this.init('popover', element, options)
//   }

//   if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

//   Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
//     placement: 'right'
//   , trigger: 'click'
//   , content: ''
//   , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
//   })


//   // NOTE: POPOVER EXTENDS tooltip.js
//   // ================================

//   Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

//   Popover.prototype.constructor = Popover

//   Popover.prototype.getDefaults = function () {
//     return Popover.DEFAULTS
//   }

//   Popover.prototype.setContent = function () {
//     var $tip    = this.tip()
//     var title   = this.getTitle()
//     var content = this.getContent()

//     $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
//     $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

//     $tip.removeClass('fade top bottom left right in')

//     // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
//     // this manually by checking the contents.
//     if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
//   }

//   Popover.prototype.hasContent = function () {
//     return this.getTitle() || this.getContent()
//   }

//   Popover.prototype.getContent = function () {
//     var $e = this.$element
//     var o  = this.options

//     return $e.attr('data-content')
//       || (typeof o.content == 'function' ?
//             o.content.call($e[0]) :
//             o.content)
//   }

//   Popover.prototype.arrow = function () {
//     return this.$arrow = this.$arrow || this.tip().find('.arrow')
//   }

//   Popover.prototype.tip = function () {
//     if (!this.$tip) this.$tip = $(this.options.template)
//     return this.$tip
//   }


//   // POPOVER PLUGIN DEFINITION
//   // =========================

//   var old = $.fn.popover

//   $.fn.popover = function (option) {
//     return this.each(function () {
//       var $this   = $(this)
//       var data    = $this.data('bs.popover')
//       var options = typeof option == 'object' && option

//       if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
//       if (typeof option == 'string') data[option]()
//     })
//   }

//   $.fn.popover.Constructor = Popover


//   // POPOVER NO CONFLICT
//   // ===================

//   $.fn.popover.noConflict = function () {
//     $.fn.popover = old
//     return this
//   }

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: scrollspy.js v3.0.3
//  * http://getbootstrap.com/javascript/#scrollspy
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // SCROLLSPY CLASS DEFINITION
//   // ==========================

//   function ScrollSpy(element, options) {
//     var href
//     var process  = $.proxy(this.process, this)

//     this.$element       = $(element).is('body') ? $(window) : $(element)
//     this.$body          = $('body')
//     this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
//     this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
//     this.selector       = (this.options.target
//       || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
//       || '') + ' .nav li > a'
//     this.offsets        = $([])
//     this.targets        = $([])
//     this.activeTarget   = null

//     this.refresh()
//     this.process()
//   }

//   ScrollSpy.DEFAULTS = {
//     offset: 10
//   }

//   ScrollSpy.prototype.refresh = function () {
//     var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

//     this.offsets = $([])
//     this.targets = $([])

//     var self     = this
//     var $targets = this.$body
//       .find(this.selector)
//       .map(function () {
//         var $el   = $(this)
//         var href  = $el.data('target') || $el.attr('href')
//         var $href = /^#\w/.test(href) && $(href)

//         return ($href
//           && $href.length
//           && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
//       })
//       .sort(function (a, b) { return a[0] - b[0] })
//       .each(function () {
//         self.offsets.push(this[0])
//         self.targets.push(this[1])
//       })
//   }

//   ScrollSpy.prototype.process = function () {
//     var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
//     var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
//     var maxScroll    = scrollHeight - this.$scrollElement.height()
//     var offsets      = this.offsets
//     var targets      = this.targets
//     var activeTarget = this.activeTarget
//     var i

//     if (scrollTop >= maxScroll) {
//       return activeTarget != (i = targets.last()[0]) && this.activate(i)
//     }

//     for (i = offsets.length; i--;) {
//       activeTarget != targets[i]
//         && scrollTop >= offsets[i]
//         && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
//         && this.activate( targets[i] )
//     }
//   }

//   ScrollSpy.prototype.activate = function (target) {
//     this.activeTarget = target

//     $(this.selector)
//       .parents('.active')
//       .removeClass('active')

//     var selector = this.selector
//       + '[data-target="' + target + '"],'
//       + this.selector + '[href="' + target + '"]'

//     var active = $(selector)
//       .parents('li')
//       .addClass('active')

//     if (active.parent('.dropdown-menu').length)  {
//       active = active
//         .closest('li.dropdown')
//         .addClass('active')
//     }

//     active.trigger('activate.bs.scrollspy')
//   }


//   // SCROLLSPY PLUGIN DEFINITION
//   // ===========================

//   var old = $.fn.scrollspy

//   $.fn.scrollspy = function (option) {
//     return this.each(function () {
//       var $this   = $(this)
//       var data    = $this.data('bs.scrollspy')
//       var options = typeof option == 'object' && option

//       if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
//       if (typeof option == 'string') data[option]()
//     })
//   }

//   $.fn.scrollspy.Constructor = ScrollSpy


//   // SCROLLSPY NO CONFLICT
//   // =====================

//   $.fn.scrollspy.noConflict = function () {
//     $.fn.scrollspy = old
//     return this
//   }


//   // SCROLLSPY DATA-API
//   // ==================

//   $(window).on('load', function () {
//     $('[data-spy="scroll"]').each(function () {
//       var $spy = $(this)
//       $spy.scrollspy($spy.data())
//     })
//   })

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: tab.js v3.0.3
//  * http://getbootstrap.com/javascript/#tabs
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // TAB CLASS DEFINITION
//   // ====================

//   var Tab = function (element) {
//     this.element = $(element)
//   }

//   Tab.prototype.show = function () {
//     var $this    = this.element
//     var $ul      = $this.closest('ul:not(.dropdown-menu)')
//     var selector = $this.data('target')

//     if (!selector) {
//       selector = $this.attr('href')
//       selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
//     }

//     if ($this.parent('li').hasClass('active')) return

//     var previous = $ul.find('.active:last a')[0]
//     var e        = $.Event('show.bs.tab', {
//       relatedTarget: previous
//     })

//     $this.trigger(e)

//     if (e.isDefaultPrevented()) return

//     var $target = $(selector)

//     this.activate($this.parent('li'), $ul)
//     this.activate($target, $target.parent(), function () {
//       $this.trigger({
//         type: 'shown.bs.tab'
//       , relatedTarget: previous
//       })
//     })
//   }

//   Tab.prototype.activate = function (element, container, callback) {
//     var $active    = container.find('> .active')
//     var transition = callback
//       && $.support.transition
//       && $active.hasClass('fade')

//     function next() {
//       $active
//         .removeClass('active')
//         .find('> .dropdown-menu > .active')
//         .removeClass('active')

//       element.addClass('active')

//       if (transition) {
//         element[0].offsetWidth // reflow for transition
//         element.addClass('in')
//       } else {
//         element.removeClass('fade')
//       }

//       if (element.parent('.dropdown-menu')) {
//         element.closest('li.dropdown').addClass('active')
//       }

//       callback && callback()
//     }

//     transition ?
//       $active
//         .one($.support.transition.end, next)
//         .emulateTransitionEnd(150) :
//       next()

//     $active.removeClass('in')
//   }


//   // TAB PLUGIN DEFINITION
//   // =====================

//   var old = $.fn.tab

//   $.fn.tab = function ( option ) {
//     return this.each(function () {
//       var $this = $(this)
//       var data  = $this.data('bs.tab')

//       if (!data) $this.data('bs.tab', (data = new Tab(this)))
//       if (typeof option == 'string') data[option]()
//     })
//   }

//   $.fn.tab.Constructor = Tab


//   // TAB NO CONFLICT
//   // ===============

//   $.fn.tab.noConflict = function () {
//     $.fn.tab = old
//     return this
//   }


//   // TAB DATA-API
//   // ============

//   $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
//     e.preventDefault()
//     $(this).tab('show')
//   })

// }(jQuery);

// /* ========================================================================
//  * Bootstrap: affix.js v3.0.3
//  * http://getbootstrap.com/javascript/#affix
//  * ========================================================================
//  * Copyright 2013 Twitter, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * ======================================================================== */


// +function ($) { "use strict";

//   // AFFIX CLASS DEFINITION
//   // ======================

//   var Affix = function (element, options) {
//     this.options = $.extend({}, Affix.DEFAULTS, options)
//     this.$window = $(window)
//       .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
//       .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

//     this.$element = $(element)
//     this.affixed  =
//     this.unpin    = null

//     this.checkPosition()
//   }

//   Affix.RESET = 'affix affix-top affix-bottom'

//   Affix.DEFAULTS = {
//     offset: 0
//   }

//   Affix.prototype.checkPositionWithEventLoop = function () {
//     setTimeout($.proxy(this.checkPosition, this), 1)
//   }

//   Affix.prototype.checkPosition = function () {
//     if (!this.$element.is(':visible')) return

//     var scrollHeight = $(document).height()
//     var scrollTop    = this.$window.scrollTop()
//     var position     = this.$element.offset()
//     var offset       = this.options.offset
//     var offsetTop    = offset.top
//     var offsetBottom = offset.bottom

//     if (typeof offset != 'object')         offsetBottom = offsetTop = offset
//     if (typeof offsetTop == 'function')    offsetTop    = offset.top()
//     if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

//     var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
//                 offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
//                 offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

//     if (this.affixed === affix) return
//     if (this.unpin) this.$element.css('top', '')

//     this.affixed = affix
//     this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

//     this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

//     if (affix == 'bottom') {
//       this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
//     }
//   }


//   // AFFIX PLUGIN DEFINITION
//   // =======================

//   var old = $.fn.affix

//   $.fn.affix = function (option) {
//     return this.each(function () {
//       var $this   = $(this)
//       var data    = $this.data('bs.affix')
//       var options = typeof option == 'object' && option

//       if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
//       if (typeof option == 'string') data[option]()
//     })
//   }

//   $.fn.affix.Constructor = Affix


//   // AFFIX NO CONFLICT
//   // =================

//   $.fn.affix.noConflict = function () {
//     $.fn.affix = old
//     return this
//   }


//   // AFFIX DATA-API
//   // ==============

//   $(window).on('load', function () {
//     $('[data-spy="affix"]').each(function () {
//       var $spy = $(this)
//       var data = $spy.data()

//       data.offset = data.offset || {}

//       if (data.offsetBottom) data.offset.bottom = data.offsetBottom
//       if (data.offsetTop)    data.offset.top    = data.offsetTop

//       $spy.affix(data)
//     })
//   })

// }(jQuery);
