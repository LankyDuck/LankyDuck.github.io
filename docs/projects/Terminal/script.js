(function() {
    var Terminal;
  
    Terminal = class Terminal {
      constructor() {
        this._init_terminal("terminal");
      }
  
      _init_terminal(name) {
        var $terminal;
        $terminal = $(`#${name}`);
        return $terminal.terminal({
          hack: (who) => {
            if (who === "me") {
              return $terminal.echo(document.cookie);
            } else {
              return $terminal.echo("unknown user");
            }
          },
          add_effect: (effect) => {
            var term;
            if (effect === "glitch") {
              $("span", $terminal).each((idx, el) => {
                var $el, content;
                $el = $(el);
                content = $el.text();
                $el.attr("data-text", content);
                return $el.addClass("effect-glitch");
              });
            } else {
              $terminal.addClass(`effect-${effect}`);
            }
            return term = false;
          },
          remove_effect: (effect) => {
            var term;
            if (effect === "glitch") {
              $("span", $terminal).each((idx, el) => {
                var $el;
                $el = $(el);
                $el.attr("data-text", "");
                return $el.removeClass("effect-glitch");
              });
            } else {
              $terminal.removeClass(`effect-${effect}`);
            }
            return term = false;
          }
        }, {
          prompt: "> ",
          name: `${name}`
        });
      }
  
    };
  
    $(function() {
      return new Terminal();
    });
  
  }).call(this);
  
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFNLFdBQU4sTUFBQSxTQUFBO0lBRUUsV0FBYSxDQUFBLENBQUE7TUFDWCxJQUFDLENBQUEsY0FBRCxDQUFnQixVQUFoQjtJQURXOztJQUdiLGNBQWdCLENBQUMsSUFBRCxDQUFBO0FBQ2xCLFVBQUE7TUFBSSxTQUFBLEdBQVksQ0FBQSxDQUFFLENBQUEsQ0FBQSxDQUFBLENBQUksSUFBSixDQUFBLENBQUY7YUFFWixTQUFTLENBQUMsUUFBVixDQUFtQjtRQUVqQixJQUFBLEVBQU0sQ0FBQyxHQUFELENBQUEsR0FBQTtVQUNKLElBQUcsR0FBQSxLQUFPLElBQVY7bUJBQ0UsU0FBUyxDQUFDLElBQVYsQ0FBZSxRQUFRLENBQUMsTUFBeEIsRUFERjtXQUFBLE1BQUE7bUJBR0UsU0FBUyxDQUFDLElBQVYsQ0FBZSxjQUFmLEVBSEY7O1FBREksQ0FGVztRQVFqQixVQUFBLEVBQVksQ0FBQyxNQUFELENBQUEsR0FBQTtBQUNsQixjQUFBO1VBQVEsSUFBRyxNQUFBLEtBQVUsUUFBYjtZQUNFLENBQUEsQ0FBRSxNQUFGLEVBQVUsU0FBVixDQUFvQixDQUFDLElBQXJCLENBQTBCLENBQUMsR0FBRCxFQUFNLEVBQU4sQ0FBQSxHQUFBO0FBQ3BDLGtCQUFBLEdBQUEsRUFBQTtjQUFZLEdBQUEsR0FBVSxDQUFBLENBQUUsRUFBRjtjQUNWLE9BQUEsR0FBVSxHQUFHLENBQUMsSUFBSixDQUFBO2NBQ1YsR0FBRyxDQUFDLElBQUosQ0FBUyxXQUFULEVBQXNCLE9BQXRCO3FCQUNBLEdBQUcsQ0FBQyxRQUFKLENBQWEsZUFBYjtZQUp3QixDQUExQixFQURGO1dBQUEsTUFBQTtZQU9FLFNBQVMsQ0FBQyxRQUFWLENBQW1CLENBQUEsT0FBQSxDQUFBLENBQVUsTUFBVixDQUFBLENBQW5CLEVBUEY7O2lCQVNBLElBQUEsR0FBTztRQVZHLENBUks7UUFvQmpCLGFBQUEsRUFBZSxDQUFDLE1BQUQsQ0FBQSxHQUFBO0FBQ3JCLGNBQUE7VUFBUSxJQUFHLE1BQUEsS0FBVSxRQUFiO1lBQ0UsQ0FBQSxDQUFFLE1BQUYsRUFBVSxTQUFWLENBQW9CLENBQUMsSUFBckIsQ0FBMEIsQ0FBQyxHQUFELEVBQU0sRUFBTixDQUFBLEdBQUE7QUFDcEMsa0JBQUE7Y0FBWSxHQUFBLEdBQU0sQ0FBQSxDQUFFLEVBQUY7Y0FDTixHQUFHLENBQUMsSUFBSixDQUFTLFdBQVQsRUFBc0IsRUFBdEI7cUJBQ0EsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsZUFBaEI7WUFId0IsQ0FBMUIsRUFERjtXQUFBLE1BQUE7WUFNRSxTQUFTLENBQUMsV0FBVixDQUFzQixDQUFBLE9BQUEsQ0FBQSxDQUFVLE1BQVYsQ0FBQSxDQUF0QixFQU5GOztpQkFRQSxJQUFBLEdBQU87UUFUTTtNQXBCRSxDQUFuQixFQStCRztRQUNELE1BQUEsRUFBUSxJQURQO1FBRUQsSUFBQSxFQUFRLENBQUEsQ0FBQSxDQUFHLElBQUgsQ0FBQTtNQUZQLENBL0JIO0lBSGM7O0VBTGxCOztFQTRDQSxDQUFBLENBQUUsUUFBQSxDQUFBLENBQUE7V0FDQSxJQUFJLFFBQUosQ0FBQTtFQURBLENBQUY7QUE1Q0EiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUZXJtaW5hbFxuICBcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQF9pbml0X3Rlcm1pbmFsKFwidGVybWluYWxcIilcblxuICBfaW5pdF90ZXJtaW5hbDogKG5hbWUpIC0+XG4gICAgJHRlcm1pbmFsID0gJChcIiMje25hbWV9XCIpXG5cbiAgICAkdGVybWluYWwudGVybWluYWwoe1xuXG4gICAgICBoYWNrOiAod2hvKSA9PlxuICAgICAgICBpZiB3aG8gPT0gXCJtZVwiXG4gICAgICAgICAgJHRlcm1pbmFsLmVjaG8oZG9jdW1lbnQuY29va2llKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgJHRlcm1pbmFsLmVjaG8oXCJ1bmtub3duIHVzZXJcIilcbiAgICAgICAgIFxuICAgICAgYWRkX2VmZmVjdDogKGVmZmVjdCkgPT5cbiAgICAgICAgaWYgZWZmZWN0ID09IFwiZ2xpdGNoXCJcbiAgICAgICAgICAkKFwic3BhblwiLCAkdGVybWluYWwpLmVhY2ggKGlkeCwgZWwpID0+XG4gICAgICAgICAgICAkZWwgICAgID0gJChlbClcbiAgICAgICAgICAgIGNvbnRlbnQgPSAkZWwudGV4dCgpXG4gICAgICAgICAgICAkZWwuYXR0cihcImRhdGEtdGV4dFwiLCBjb250ZW50KVxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKFwiZWZmZWN0LWdsaXRjaFwiKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgJHRlcm1pbmFsLmFkZENsYXNzKFwiZWZmZWN0LSN7ZWZmZWN0fVwiKVxuXG4gICAgICAgIHRlcm0gPSBmYWxzZVxuXG4gICAgICByZW1vdmVfZWZmZWN0OiAoZWZmZWN0KSA9PlxuICAgICAgICBpZiBlZmZlY3QgPT0gXCJnbGl0Y2hcIlxuICAgICAgICAgICQoXCJzcGFuXCIsICR0ZXJtaW5hbCkuZWFjaCAoaWR4LCBlbCkgPT5cbiAgICAgICAgICAgICRlbCA9ICQoZWwpXG4gICAgICAgICAgICAkZWwuYXR0cihcImRhdGEtdGV4dFwiLCBcIlwiKVxuICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKFwiZWZmZWN0LWdsaXRjaFwiKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgJHRlcm1pbmFsLnJlbW92ZUNsYXNzKFwiZWZmZWN0LSN7ZWZmZWN0fVwiKVxuICAgICAgICAgIFxuICAgICAgICB0ZXJtID0gZmFsc2VcblxuICAgIH0sIHtcbiAgICAgIHByb21wdDogXCI+IFwiLFxuICAgICAgbmFtZTogICBcIiN7bmFtZX1cIlxuICAgIH0pXG5cbiQgLT5cbiAgbmV3IFRlcm1pbmFsIl19
  //# sourceURL=coffeescript