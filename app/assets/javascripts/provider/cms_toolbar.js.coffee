#= require 'vendor/jquery-1.10.2.min.js'
#= require 'vendor/jquery/extensions/jquery.cookie.js'

$ ->
  toolbar = $("#cms-toolbar")
  iframe = $("#developer-portal")
  toolbarMode = $("form#cms-toolbar-mode")


  toolbarMode.find('li').on 'click', ->
    $(this).closest("li").find("input").attr "checked", true
    $(toolbarMode).trigger "change"

  toolbarMode.on 'change', ->
    window.location = $(this).find("input:checked").val()

  enableAnimation = ->
    toolbar.addClass('animate')
    iframe.addClass('animate')

  toggleValues = ->
    toolbar.toggleClass('not-hidden')
    iframe.toggleClass('not-full')

  stored_toolbar_state = ->
    $.cookie('cms-toolbar-state', { path: '/' })

  save_toolbar_state = (state) ->
    $.cookie('cms-toolbar-state', state, { expires: 30, path: '/' })

  iframe.on 'load', ->
    if stored_toolbar_state() != 'hidden'
      toggleValues()
      (window.requestAnimationFrame || window.setTimeout)(enableAnimation)
    else
      enableAnimation()

  $("#hide-side-bar").on 'click', (event)->
    event.preventDefault()
    toggleValues()

    if stored_toolbar_state() == 'hidden'
      save_toolbar_state('visible')
    else
      save_toolbar_state('hidden')




