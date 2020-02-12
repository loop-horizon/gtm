function() {
  // customTask function wrapper
  return  function (model) {
  
  //function for declaring Client ID, Session ID and Hit ID and sending to Cookies / Custom Dimensions
function setClientSessionAndHitId () {
        
    var gaClientIdCookie = '_gaclientid';
      
    var gaSessionIdCookie = '_gasessionid';
      
    var gaHitIdCookie = '_gahitid';
      
    var domainPath = (function () {
      
          var hostname = window.location.hostname;
          var myDomain = 'domain=' + hostname + ';path=/';
         
          return myDomain;
        
        }) ();
      
    var clientId = model.get('clientId');
      
    var newSessionId = (function () {
  
        var currentDate = (function () {
           var today = new Date();
       var dd = today.getDate().toString();
       var mm = (today.getMonth()+1).toString(); //January is 0!
       var yyyy = today.getFullYear().toString();
      
            if (dd.length<2) {
             dd = '0' + dd;
         } 
         if (mm.length<2) {
             mm = '0' + mm;
         } 
         return yyyy + mm + dd;
          }) ();
        var randomNumberString = Math.floor((Math.random() * 10000000) + 1).toString();
        var randomEightDigitNumber = (function () { if (randomNumberString.length === 8) {
            return randomNumberString; 
          } else { 
                                  while (randomNumberString.length < 8) {
                                    randomNumberString = '0' + randomNumberString;
                                  } return randomNumberString;
                                }
                               }) ();
       return currentDate + '|' + randomEightDigitNumber; 
      }) ();
  
   var newHitId = (function () {
        var currentTime = (function () {
                          var today = new Date();
                          var hh = today.getHours();
                          var mm = today.getMinutes();
                          var ss = today.getSeconds();
                          
                           if (hh<10) {
                              hh = '0' + hh;
                            }
                           if (mm<10) {
                              mm = '0' + mm;
                            }
                           if (ss<10) {
                              ss = '0' + ss;
                            }
                          return hh + ":" + mm + ":" + ss;
                        }) ();
       return currentTime;
       }) ();
  
 //function for setting 30 minute cookie (mimic GA session)
  
 function set30MinuteCookie(cname, cvalue) {
      var d = new Date();
      d.setTime(d.getTime() + (30 * 60 * 1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";" + domainPath;
 }
//function for setting 10 year cookie (until user clears cookies or it's reset)
function set10YearCookie(cname, cvalue) {
      var d = new Date();
      d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";" + domainPath;
 }
//function for getting cookies
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
//function for setting Client ID
function setClientId() {
      set30MinuteCookie(gaClientIdCookie, clientId);
      
      model.set('dimension' + 8, clientId);
    }  
      
    //function for setting Session ID
  
    function setSessionId() {
      var sessionId = getCookie(gaSessionIdCookie);
      
      if (sessionId === "") {
        sessionId = newSessionId;
     } else {
        sessionId = sessionId;
     }
      
      set30MinuteCookie(gaSessionIdCookie, sessionId);
      
      model.set('dimension' + 7, sessionId);
    }
  
    //function for setting Hit ID
function setHitId() {
      set30MinuteCookie(gaHitIdCookie, newHitId);
      
      model.set('dimension' + 6, newHitId);
    }
//final execution
setClientId();
      
    setSessionId();
      
    setHitId();
}
    
    setClientSessionAndHitId();
    
 }
}
