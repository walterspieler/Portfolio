/* global window, document */
/* eslint-env es6 */
/* jshint esversion: 6 */
window.onload = function() {
  'use-strict';

  // 3 first commands and output
  $(function() {
    let data = [{
        action: 'type',
        strings: ["npm start portfolio-project"],
        output: '<span class="loading">loading components...<br></span><span class="output"> portfolio-project@1.2.2 started</span><br>',
        postDelay: 1000
      },
      {
        action: 'type',
        strings: ["cd ./"],
        output: ' ',
        postDelay: 900
      },
      {
        action: 'type',
        //clear: true,
        strings: ['init portfolio.json'],
        output: $('.run-output').html()
      }
    ];
    start(data, 0);
  });


  // Auto Running Cleaning of Typed
  function start(data, pos) {
    let prompt = $('.prompt');
    let inputPrompt = $('.input-prompt');
    script = data[pos];
    if (script.clear === true) {
      $('.commands').html('');
    }
    switch (script.action) {
      case 'type':
        // cleanup for next execution
        prompt.removeData();
        $('.typed-cursor').text('');
        prompt.typed({
          strings: script.strings,
          typeSpeed: 30,
          callback: function() {
            let commands = $('.commands').html();
            commands = commands ? [commands] : [];
            // Add commands to array
            commands.push('$ ' + prompt.text() + inputPrompt.text());
            if (script.output) {
              commands.push(script.output);
              prompt.html('');
              $('.commands').html(commands.join('<br>'));
            }
            // Run next script
            pos++;
            if (pos < data.length) {
              setTimeout(function() {
                start(data, pos);
              }, script.postDelay || 1000);
            }
          }
        });
        break;
      case 'view':

        break;
    }
  }

  let content;
  let inputPrompt = document.getElementById("input-prompt");
  let values = document.getElementById("input-prompt").value;

  function menuSelection() {
    inputPrompt.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        switch (values) {
          case "1":
            content = "Works";
            break;

          case "2":
            content = "About";
            break;

          case "2":
            content = "Contact";
            break;

          default:
            content = "You have to enter something";
        }
      }

      document.getElementById("response").innerHTML = content;

    });
  }
};