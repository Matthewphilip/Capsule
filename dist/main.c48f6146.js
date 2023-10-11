// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/form.js":[function(require,module,exports) {
// object variable data store
var form = {
  first_name: "",
  last_name: "",
  email: ""
};
// target elemtns in html
var modalOverlay = document.getElementById("modalOverlay");
var closeModal = document.getElementById("closeModal");
var downloadButton = document.querySelector(".lander-button");
var firstNameInput = document.getElementById("first_name");
var lastNameInput = document.getElementById("last_name");
var emailInput = document.getElementById("email");
var firstNameError = document.getElementById("first_name_error");
var lastNameError = document.getElementById("last_name_error");
var emailError = document.getElementById("email_error");
var downloadForm = document.getElementById("downloadForm");
var modalButton = document.querySelector(".modal-button");
var confirmationText = document.querySelector(".confirmation-text");

// open modal on button click
downloadButton.addEventListener("click", function () {
  // return user to top of screen for modal on mobile if the window width is <= 768px
  if (window.innerWidth <= 768) {
    window.scrollTo(0, 0);
  }
  modalOverlay.style.display = "flex";
});

// close button on 'x' click
closeModal.addEventListener("click", function () {
  modalOverlay.style.display = "none";
});

// close modal if user clicks outside of the modal
modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

// first-name input error: if user has an error but then starts typing error classes are removed
firstNameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    firstNameError.style.display = "none";
    this.classList.remove("error");
    this.placeholder = "First Name";
  }

  // if the first name input has more than 3 characters disable it
  if (this.value.length > 3) {
    this.disabled = true;
  } else {
    this.disabled = false;
  }
});

// last-name input error: if user has an error but then starts typing error classes are removed
lastNameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    lastNameError.style.display = "none";
    this.classList.remove("error");
    this.placeholder = "Last Name";
  }
});

// email input error: if user has an error but then starts typing error classes are removed
emailInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    emailError.style.display = "none";
    this.classList.remove("error");
    this.placeholder = "Email";
  }
});
downloadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // prior to form submission enable to disabled value, otherwise form won't submit
  firstNameInput.disabled = false;

  // get form data for entered values
  var formData = new FormData(downloadForm);

  // update the form object with entered form data
  form.first_name = formData.get("first_name");
  form.last_name = formData.get("last_name");
  form.email = formData.get("email");
  console.log("pre submit First Name:", form.first_name);
  console.log("pre submit Last Name:", form.last_name);
  console.log("pre submit Email:", form.email);

  // check if first name's empty
  if (form.first_name.trim() === "") {
    firstNameError.textContent = "Please enter your first name.";
    firstNameError.style.display = "flex";
    firstNameInput.classList.add("error");
    firstNameInput.placeholder = "Error";
  } else {
    firstNameInput.classList.remove("error");
    firstNameInput.placeholder = "First Name";
  }

  // check if last name's empty
  if (form.last_name.trim() === "") {
    lastNameError.textContent = "Please enter your last name.";
    lastNameError.style.display = "flex";
    lastNameInput.classList.add("error");
    lastNameInput.placeholder = "Error";
  } else {
    lastNameInput.classList.remove("error");
    lastNameInput.placeholder = "Last Name";
  }

  // check if email's empty and it doesn't include '@'
  if (form.email.trim() === "" || !form.email.includes("@")) {
    emailError.textContent = "Please enter your email.";
    emailError.style.display = "flex";
    emailInput.classList.add("error");
    emailInput.placeholder = "Error";
  } else {
    emailInput.classList.remove("error");
    emailInput.placeholder = "Email";
  }
  console.log("first validations");

  // check if values aren't empty
  if (form.first_name.trim() !== "" && form.last_name.trim() !== "" && form.email.trim() !== "") {
    console.log("pre-submit validations - pass");

    // handle form submission, e.g., send data to endpoint
    console.log("submitted First Name:", form.first_name);
    console.log("submitted Last Name:", form.last_name);
    console.log("submitted Email:", form.email);

    // create an object to send the data
    var postData = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email
    };

    // send post request to endpoint with form data
    // fetch("url", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json", // Set the content type to JSON
    //     },
    //     body: JSON.stringify(postData), // Convert the data to JSON format
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       // Handle the response from the server if needed
    //       console.log("Server response:", data);

    //       setTimeout(function () {
    //         // reset the visuals & close modal
    //         modalOverlay.style.display = "none";
    //         modalButton.style.backgroundColor = "#444BF7";
    //         modalButton.textContent = "Submit";
    //         confirmationText.style.display = "none";

    //         // reset the form data
    //         form.first_name = "";
    //         form.last_name = "";
    //         form.email = "";
    //       }, 3000);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });

    //set success status of submit button
    modalButton.style.backgroundColor = "#07b547";
    modalButton.textContent = "Sent";
    confirmationText.style.display = "flex";
    console.log("SUBMITTED");

    // functionality pulled out of post req for now as we aren't sending it
    setTimeout(function () {
      // reset the form data
      form.first_name = "";
      form.last_name = "";
      form.email = "";

      // reset input fields in html
      document.getElementById("first_name").value = "";
      document.getElementById("last_name").value = "";
      document.getElementById("email").value = "";

      // reset the visuals & close modal
      modalOverlay.style.display = "none";
      modalButton.style.backgroundColor = "#444BF7";
      modalButton.textContent = "Submit";
      confirmationText.style.display = "none";
    }, 3000);
  }
});
},{}],"src/js/menu.js":[function(require,module,exports) {
var hamburgerMenu = document.getElementById("hamburger-menu");
var menuBody = document.getElementById("menu-body");
hamburgerMenu.addEventListener("click", function (event) {
  event.stopPropagation(); // stop the click from propagating to the document

  //only open if screen is =< 1050px
  if (window.innerWidth <= 1050) {
    if (menuBody.style.display === "block") {
      menuBody.style.display = "none";
    } else {
      menuBody.style.display = "block";
    }
  }
});

// close menu if user clicks elsewhere on the screen
document.addEventListener("click", function (event) {
  if (menuBody.style.display === "block" && event.target !== hamburgerMenu && !menuBody.contains(event.target)) {
    menuBody.style.display = "none";
  }
});
},{}],"src/js/main.js":[function(require,module,exports) {
"use strict";

require("./form.js");
require("./menu.js");
},{"./form.js":"src/js/form.js","./menu.js":"src/js/menu.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60592" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/main.js"], null)
//# sourceMappingURL=/main.c48f6146.js.map