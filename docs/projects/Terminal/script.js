class Terminal
  
  constructor: ->
    @_init_terminal("terminal")

  _init_terminal: (name) ->
    $terminal = $("##{name}")

    $terminal.terminal({

      hack: (who) =>
        if who == "me"
          $terminal.echo(document.cookie)
        else
          $terminal.echo("unknown user")
         
      add_effect: (effect) =>
        if effect == "glitch"
          $("span", $terminal).each (idx, el) =>
            $el     = $(el)
            content = $el.text()
            $el.attr("data-text", content)
            $el.addClass("effect-glitch")
        else
          $terminal.addClass("effect-#{effect}")

        term = false

      remove_effect: (effect) =>
        if effect == "glitch"
          $("span", $terminal).each (idx, el) =>
            $el = $(el)
            $el.attr("data-text", "")
            $el.removeClass("effect-glitch")
        else
          $terminal.removeClass("effect-#{effect}")
          
        term = false

    }, {
      prompt: "> ",
      name:   "#{name}"
    })

$ ->
  new Terminal