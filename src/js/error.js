var codes = {
  400: [
    "Bad Request",
    "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
  ],
  401: [
    "Unauthorized",
    "The request has not been applied because it lacks valid authentication credentials for the target resource."
  ],
  402: [
    "Payment Required",
    "Reserved for future use."
  ],
  403: [
    "Forbidden",
    "The server understood the request but refuses to authorize it."
  ],
  404: [
    "Not Found",
    "The origin server did not find a current representation for the target resource or is not willing to disclose that one exists."
  ],
  405: [
    "Method Not Allowed",
    "The method received in the request-line is known by the origin server but not supported by the target resource."
  ],
  406: [
    "Not Acceptable",
    "The target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation."
  ],
  407: [
    "Proxy Authentication Required",
    "Similar to <a href=\"https://httpstatuses.com/401\">401 Unauthorized</a>, but it indicates that the client needs to authenticate itself in order to use a proxy."
  ],
  408: [
    "Request Timeout",
    "The server did not receive a complete request message within the time that it was prepared to wait."
  ],
  409: [
    "Conflict",
    "The request could not be completed due to a conflict with the current state of the target resource. This code is used in situations where the user might be able to resolve the conflict and resubmit the request."
  ],
  410: [
    "Gone",
    "The target resource is no longer available at the origin server and that this condition is likely to be permanent."
  ],
  411: [
    "Length Required",
    "The server refuses to accept the request without a defined Content-Length."
  ],
  412: [
    "Precondition Failed",
    "One or more conditions given in the request header fields evaluated to false when tested on the server."
  ],
  413: [
    "Payload Too Large",
    "The server is refusing to process a request because the request payload is larger than the server is willing or able to process."
  ],
  414: [
    "Request-URI Too Long",
    "The server is refusing to service the request because the request-target is longer than the server is willing to interpret."
  ],
  415: [
    "Unsupported Media Type",
    "The origin server is refusing to service the request because the payload is in a format not supported by this method on the target resource."
  ],
  416: [
    "Requested Range Not Satisfiable",
    "None of the ranges in the request's Range header field1 overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges."
  ],
  417: [
    "Expectation Failed",
    "The expectation given in the request's Expect header field1 could not be met by at least one of the inbound servers."
  ],
  418: [
    "I'm a teapot",
    '<a href="https://tools.ietf.org/html/rfc2324">RFC 2324 </a> States: Any attempt to brew coffee with a teapot should result in the error code "418 I\'m a teapot". The resulting entity body MAY be short and stout. <a href="http://save418.com/">save418.com</a>'
  ],
  421: [
    "Misdirected Request",
    "The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI."
  ],
  422: [
    "Unprocessable Entity",
    "The server understands the content type of the request entity (hence a <a href=\"https://httpstatuses.com/415\">415 Unsupported Media Type</a> status code is inappropriate), and the syntax of the request entity is correct (thus a <a href=\"https://httpstatuses.com/400\">400 Bad Request</a> status code is inappropriate) but was unable to process the contained instructions."
  ],
  423: [
    "Locked",
    "The source or destination resource of a method is locked."
  ],
  424: [
    "Failed Dependency",
    "The method could not be performed on the resource because the requested action depended on another action and that action failed."
  ],
  426: [
    "Upgrade Required",
    "The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol."
  ],
  428: [
    "Precondition Required",
    "The origin server requires the request to be conditional."
  ],
  429: [
    "Too Many Requests",
    "The user has sent too many requests in a given amount of time (\"rate limiting\")."
  ],
  431: [
    "Request Header Fields Too Large",
    "The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields."
  ],
  444: [
    "Connection Closed Without Response",
    "A non-standard status code used to instruct nginx to close the connection without sending a response to the client, most commonly used to deny malicious or malformed requests. This status code is not seen by the client, it only appears in nginx log files."
  ],
  451: [
    "Unavailable For Legal Reasons",
    "The server is denying access to the resource as a consequence of a legal demand."
  ],
  499: [
    "Client Closed Request",
    "A non-standard status code introduced by nginx for the case when a client closes the connection while nginx is processing the request."
  ],
  500: [
    "Internal Server Error",
    "The server encountered an unexpected condition that prevented it from fulfilling the request."
  ],
  501: [
    "Not Implemented",
    "The server does not support the functionality required to fulfill the request."
  ],
  502: [
    "Bad Gateway",
    "The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request."
  ],
  503: [
    "Service Unavailable",
    "The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay."
  ],
  504: [
    "Gateway Timeout",
    "The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request."
  ],
  505: [
    "HTTP Version Not Supported",
    "The server does not support, or refuses to support, the major version of HTTP that was used in the request message."
  ],
  506: [
    "Variant Also Negotiates",
    "The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process."
  ],
  507: [
    "Insufficient Storage",
    "The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request."
  ],
  508: [
    "Loop Detected",
    "The server terminated an operation because it encountered an infinite loop while processing a request with \"Depth: infinity\". This status indicates that the entire operation failed."
  ],
  510: [
    "Not Extended",
    "The policy for accessing the resource has not been met in the request. The server should send back all the information necessary for the client to issue an extended request."
  ],
  511: [
    "Network Authentication Required",
    "The client needs to authenticate to gain network access."
  ],
  599: [
    "Network Connect Timeout Error",
    "This status code is not specified in any RFCs, but is used by some HTTP proxies to signal a network connect timeout behind the proxy to a client in front of the proxy."
  ],
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$( document ).ready(function() {

  /*function KeyPress(e) {
        var evtobj = window.event? event : e
        if (evtobj.keyCode == 186 && evtobj.ctrlKey && evtobj.shiftKey) {
        }
  }

  document.onkeydown = KeyPress;*/

  var urlParams = new URLSearchParams(window.location.search);
  var code;

  var cookie = getCookie('e');

  if(typeof cookie !== 'undefined'
    && typeof codes[cookie] !== 'undefined') {
    code = cookie;
  } else if(typeof urlParams.get('e') !== 'undefined'
     && urlParams.get('e') != null
     && typeof codes[urlParams.get('e')] !== 'undefined') {
    code = urlParams.get('e');
  } else if (typeof codes[window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)] !== 'undefined') {
    code = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
  } else {
    code = '404';
  }
  var summary =  'HTTP ' + code + ': ' + codes[code][0];

  var codelink = '<a href="https://httpstatuses.com/'+code+'">https://httpstatuses.com/'+code+'</a>';

  var clickcnt = 0;
  var lastclick = 0;

  /*$(document).on('click', function(e){

    var d = new Date();
    var t = d.getTime();
    if(t - lastclick < 1000) {
      clickcnt++;
      if(clickcnt > 4) {
        $('body').append($('<div id="dialog">'));
        $( "#dialog" ).dialog({
          autoOpen: false
        });
        $( "#dialog" ).dialog( "open" );

      }
    } else {
      clickcnt = 0;
      lastclick = t;
    }

  });*/

  $('#contact').on('click', function(){
    $('#dialog').remove();

    var dialog = $('<div id="dialog"><p>Feel free to fill out this form and press this button. <b>Sure</b> what you think will happen will happen.</p><form class="pure-form"><fieldset><legend>Shout into the tube below. Maybe The Wizard will hear you!</legend><input type="email" placeholder="Email"><input type="text" placeholder="Subject"><textarea placeholder="Message"></textarea></fieldset></form></div>');
    $('body').append(dialog);

    dialog.dialog({
      autoOpen: false,
      title: 'Contact Someone About Something',
      modal:true,
      width: "77%",
      maxWidth: "680px",
      buttons: [
        {
          text: "Ok",
          icon: "ui-icon-heart",
          click: function() {
            $("#preloader").show();
            $( this ).dialog( "close" );
            $("#loader").show();
            $("#loader").delay(750).fadeOut("slow", function(){

              // will fade out the whole DIV that covers the website.
              $("#preloader").delay(120).fadeOut("slow");
              //alert('Yep, that TOTALLY did something! SOMEONE\'s gonna hear about this!');
              resultDialog.dialog( "open" );
            });

          }

          // Uncommenting the following line would hide the text,
          // resulting in the label being used as a tooltip
          //showText: false
        }
      ]
    });

    var resultDialog = $('<div id="dialog"><p>Yep, that TOTALLY did something! SOMEONE\'s gonna hear about this!</p><p>No <b>way</b> that was just $("#loader").delay(750).fadeOut("slow"), or anything!</p></div>');
    $('body').append(resultDialog);

    resultDialog.dialog({
      autoOpen: false,
      title: 'You Contacted Someone About Something!',
      modal:true,
      width: "77%",
      maxWidth: "680px",
      buttons: [
        {
          text: "KTHXBAI",
          icon: "ui-icon-heart",
          click: function() {
            //$("#preloader").show();
            $( this ).dialog( "close" );
            //$("#loader").show();
            //$("#loader").delay(750).fadeOut("slow", function(){

              // will fade out the whole DIV that covers the website.
              //$("#preloader").delay(120).fadeOut("slow");
              //alert('Yep, that TOTALLY did something! SOMEONE\'s gonna hear about this!');



            //});

          }

          // Uncommenting the following line would hide the text,
          // resulting in the label being used as a tooltip
          //showText: false
        }
      ]
    });

    dialog.dialog( "open" );

  });

  $('body').css('visibility', 'visible');
  $('#tbservers').animate({opacity: 1}, 1750);

  $("title").text(summary);
  $("meta[property='description']").attr("content", summary);
  $('#error-code').text('HTTP ' + code);
  $('#error-msg').text(codes[code][0]);
  $('#error-desc').html(codes[code][1] + '<br><br>' + codelink);

  $(".kern-this").lettering();

});
