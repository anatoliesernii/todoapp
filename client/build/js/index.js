facebookLoginUrl();

// Remove '#_=_' from path after loggin with facebook.
// https://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url?noredirect=1&lq=1&fbclid=IwAR11wBwLurR5G-o4i-HAH25fLvfwqwK-q7_ixumvcmvjjfS0T9nKEMtCMGY
function facebookLoginUrl() {
   const idx = window.location.toString().indexOf("#_=_");
   if (idx > 0) {
      window.location = window.location.toString().substring(0, idx);
   }
}
