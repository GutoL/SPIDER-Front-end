function getInfrastructureMapToView(markers, lines, map_name) {

  var jvm = new jsVectorMap({
    map: map_name, // "world_merc",
    selector: "#map",
    zoomButtons: true,
    
    regionStyle: {
       initial: { fill: '#d1d4db' }
    },
  
    labels: {
      markers: {
        render: (marker) => marker.name
      }
    },
  
    markersSelectable: false,
    markers: markers,
    lines: lines,

    markerStyle: {
      initial: { fill: "#5c5cff" },
      selected: { fill: "#ff5050" }
    },
    markerLabelStyle: {
      initial: {
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: 13
      }
    }
  });

  window.addEventListener('resize', () => {
    jvm.updateSize()
  })
}

function getInfrastructureMapToViewSFC(markers, lines, id, map_name) {

  var jvm = new jsVectorMap({
    map: map_name,
    selector: "#"+id+"-map",
    zoomButtons: true,
    
    regionStyle: {
       initial: { fill: '#d1d4db' }
    },
  
    labels: {
      markers: {
        render: (marker) => marker.name
      }
    },
  
    markersSelectable: false,
    markers: markers,
    lines: lines,

    markerStyle: {
      initial: { fill: "#5c5cff" },
      selected: { fill: "#ff5050" }
    },
    markerLabelStyle: {
      initial: {
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: 13
      }
    }
  });

  window.addEventListener('resize', () => {
    jvm.updateSize()
  })
}

function getInfrastructureMapToSelect(markers, lines, map_name) {
  
  var jvm = new jsVectorMap({
    map: map_name,
    selector: "#map",
    zoomButtons: true,
    
    regionStyle: {
       initial: { fill: '#d1d4db' }
    },
  
    labels: {
      markers: {
        render: (marker) => marker.name
      }
    },
  
    markersSelectable: true,
    markers: markers,
    lines: lines,

    markerStyle: {
      initial: { fill: "#5c5cff" },
      selected: { fill: "#ff5050" }
    },
    markerLabelStyle: {
      initial: {
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: 13
      }
    },

    onMarkerSelected: function (code, isSelected, selectedMarkers) {
      
      if ((selectedMarkers.length > 2) | (selectedMarkers.length == 0)) {
        jvm.clearSelectedMarkers();
        document.getElementById("badgeSource").innerText = "";
        document.getElementById("badgeTarget").innerText = "";
      } 
      else {
        if (selectedMarkers.length == 1) {
          document.getElementById("badgeSource").innerText = markers[selectedMarkers[0]].name;
          document.getElementById("badgeTarget").innerText = "";
        } 
        else if (selectedMarkers.length == 2) {
          if (document.getElementById("badgeSource").innerText == markers[selectedMarkers[0]].name) {
            document.getElementById("badgeTarget").innerText = markers[selectedMarkers[1]].name;
          }
          else {
            document.getElementById("badgeSource").innerText = markers[selectedMarkers[1]].name;
            document.getElementById("badgeTarget").innerText = markers[selectedMarkers[0]].name;
          }
        }
      }
    },
      
  });

  window.addEventListener('resize', () => {
    jvm.updateSize()
  })  
}

function msgNormalAvailableInfra() {
  var msg = document.getElementById('msg-helper-available-infra');
  msg.style.opacity = "0";
}

function msgHiddenAvailableInfra() {
  var msg = document.getElementById('msg-helper-available-infra');
  msg.style.opacity = "1";
}

function msgNormalAvailableVFN() {
  var msg = document.getElementById('msg-helper-available-vnf');
  msg.style.opacity = "0";
}

function msgHiddenAvailableVFN() {
  var msg = document.getElementById('msg-helper-available-vnf');
  msg.style.opacity = "1";
}

function msgNormalSelectedVFN() {
  var msg = document.getElementById('msg-helper-selected-vnf');
  msg.style.opacity = "0";
}

function msgHiddenSelectedVFN() {
  var msg = document.getElementById('msg-helper-selected-vnf');
  msg.style.opacity = "1";
}

function msgNormalSelectedNodes() {
  var msg = document.getElementById('msg-helper-selected-nodes');
  msg.style.opacity = "0";
}

function msgHiddenSelectedNodes() {
  var msg = document.getElementById('msg-helper-selected-nodes');
  msg.style.opacity = "1";
}

function updateDivMap() { 
  $('#map').remove();
  new_map = document.createElement('div');
  new_map.setAttribute("id", "map");
  new_map.setAttribute("style", "height: 280px; width: 100%")
  document.getElementById('card-body-div').appendChild(new_map);
}

function updateDivMapSFC(div_id) { 
  console.log("div id: "+div_id)
  $('#'+div_id+"-map").remove();
  new_map = document.createElement('div');
  new_map.setAttribute("id", div_id+"-map");
  new_map.setAttribute("style", "height: 280px; width: 100%")
  document.getElementById(div_id).appendChild(new_map);
}
