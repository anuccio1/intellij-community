// Copyright 2000-2020 JetBrains s.r.o. Use of this source code is governed by the Apache 2.0 license that can be found in the LICENSE file.
if (window.__IntelliJTools === undefined) {
  window.__IntelliJTools = {}
}

(function() {
  var openInExternalBrowser = function(href) {
    try {
      window.JavaPanelBridge.openInExternalBrowser(href);
    }
    finally {}
  }

  window.__IntelliJTools.processClick = function(link) {
    if (!link.hasAttribute('href')) {
      return false;
    }

    var href = link.getAttribute('href')
    if (href[0] === '#') {
      var elementId = href.substring(1)
      var elementById = window.document.getElementById(elementId);
      if (elementById) {
        elementById.scrollIntoViewIfNeeded();
      }
    }
    else {
      openInExternalBrowser(link.href);
    }

    return false;
  }

  window.document.onclick = function(e) {
    var target = e.target;
    while (target && target.tagName !== 'A') {
      target = target.parentNode
    }

    if (!target) {
      return true;
    }

    if (target.tagName === 'A' && target.hasAttribute('href')) {
      e.stopPropagation()
      return window.__IntelliJTools.processClick(target)
    }
  }

})()
