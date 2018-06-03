var EventUtil = {

  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },

  getButton: function (event) {
    if (document.implementation.hasFeature("MouseEvents", "2.0")) {
      return event.button;
    } else {
      switch (event.button) {
        case 0:
        case 1:
        case 3:
        case 5:
        case 7:
          return 0;
        case 2:
        case 6:
          return 2;
        case 4:
          return 1;
      }
    }
  },

  getCharCode: function (event) {
    if (typeof event.charCode == "number") {
      return event.charCode;
    } else {
      return event.keyCode;
    }
  },

  getClipboardText: function (event) {
    var clipboardData = (event.clipboardData || window.clipboardData);
    return clipboardData.getData("text");
  },

  getEvent: function (event) {
    return event ? event : window.event;
  },

  getRelatedTarget: function (event) {
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else if (event.toElement) {
      return event.toElement;
    } else if (event.fromElement) {
      return event.fromElement;
    } else {
      return null;
    }

  },

  getTarget: function (event) {
    return event.target || event.srcElement;
  },

  getWheelDelta: function (event) {
    if (event.wheelDelta) {
      return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
    } else {
      return -event.detail * 40;
    }
  },

  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  setClipboardText: function (event, value) {
    if (event.clipboardData) {
      event.clipboardData.setData("text/plain", value);
    } else if (window.clipboardData) {
      window.clipboardData.setData("text", value);
    }
  },

  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }

};

function EventTarget() {
  this.handles = {};
}

EventTarget.prototype = {
  constructor: EventTarget,
  // 用于注册给定类型事件的事件处理程序
  addHandler: function (type, handler) {
    if (typeof this.handles[type] == 'undefined') {
      this.handles[type] = [];
    }

    this.handles[type].push(handler);
  },

  // 用于触发一个事件
  fire: function (event) {
    if (!event.target) {
      event.target = this;
    }

    if (this.handles[event.type] instanceof Array) {
      var handlers = this.handles[event.type];
      for (var i = 0, len = handlers.length; i < len; i++) {
        handlers[i](event);
      }
    }
  },

  // 用于注销某个事件类型的事件处理程序
  removeHandler: function (type, handler) {
    if (this.handles[type] instanceof Array) {
      var handlers = this.handles[type];
      for (var i = 0, len = handlers.length; i < len; i++) {
        if (handlers[i] === handler) {
          break;
        }
      }

      this.handles[type].splice(i, 1);
    }
  }

};


var DragDrop = function () {

  var dragdrop = new EventTarget(),
    dragging = null,
    diffX = 0,
    diffY = 0;

  function handleEvent(event) {

    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    switch (event.type) {
      case 'mousedown':
        if (target.className.indexOf('draggable') > -1) {
          dragging = target;

          diffX = event.clientX - target.offsetLeft;
          diffY = event.clientY - target.offsetTop;

          dragdrop.fire({type: 'dragstart', target: dragging, x: event.clientX, y: event.clientY});
        }
        break;

      case 'mousemove':
        if (dragging != null) {
          dragging.style.left = (event.clientX - diffX) + 'px';
          dragging.style.top = (event.clientY - diffY) + 'px';

          dragdrop.fire({type: 'drag', target: dragging, x: event.clientX, y: event.clientY});
        }
        break;

      case 'mouseup':
        dragdrop.fire({type: 'dragend', target: dragging, x: event.clientX, y: event.clientY});

        dragging = null;
        break;
    }

  }

  dragdrop.enable = function () {
    EventUtil.addHandler(document, 'mousedown', handleEvent);
    EventUtil.addHandler(document, 'mousemove', handleEvent);
    EventUtil.addHandler(document, 'mouseup', handleEvent);
  };
  dragdrop.disable = function () {
    EventUtil.removeHandler(document, 'mousedown', handleEvent);
    EventUtil.removeHandler(document, 'mousemove', handleEvent);
    EventUtil.removeHandler(document, 'mouseup', handleEvent);
  };

  return dragdrop;

}();

DragDrop.enable();

DragDrop.addHandler("dragstart", function (event) {
  var status = document.getElementById("status");
  status.innerHTML = "Started dragging " + event.target.id;
});

DragDrop.addHandler("drag", function (event) {
  var status = document.getElementById("status");
  status.innerHTML += "<br>Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
});

DragDrop.addHandler("dragend", function (event) {
  var status = document.getElementById("status");
  status.innerHTML += "<br>Dropped " + event.target.id + " at (" + event.x + "," + event.y + ")";
});

