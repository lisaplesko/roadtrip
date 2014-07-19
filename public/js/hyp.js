// var origin = '41.385872, 2.193626';
// var destination = '41.350251, 2.060760';
// var waypoints = [{location: ''}];
// var rendererOptions = {
//   draggable: true
// };
// var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
// var directionsService = new google.maps.DirectionsService();
// var map;
// var australia = new google.maps.LatLng(39.002494960757794, -96.15518062500001);
// var hyperlapse, camera_pin, lastRoute;

// function initialize() {
//   var target = document.getElementById('pano');

//   hyperlapse = new Hyperlapse(target, {
//     width: target.offsetWidth,
//     height: target.offsetHeight,
//     zoom: 1,
//     use_lookat: false,
//     distance_between_points: 2,
//     max_points: 1000,
//     millis: 50
//   });

//   hyperlapse.onError = function(e) {
//     show( "ERROR: "+ e.message );
//   };

//   hyperlapse.onRouteProgress = function(e) {
//     show ( "Loading route..." )
//   };

//   hyperlapse.onRouteComplete = function(e) {
//     hyperlapse.load();
//   };

//   hyperlapse.onLoadProgress = function(e) {
//     show( "Loading: "+ (e.position+1) +" of "+ hyperlapse.length() );
//   };

//   hyperlapse.onLoadComplete = function(e) {
//     show( "Loading done, playing" )
//     hyperlapse.play();
//   };

//   hyperlapse.onFrame = function(e) {
//     show( "Position: "+ (e.position+1) +" of "+ hyperlapse.length() );
//     camera_pin.setPosition(e.point.location);
//   };

//   var mapOptions = {
//     zoom: 4,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     center: australia
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   directionsDisplay.setMap(map);
//   /* Display streetview coverage */
//   //var overlay = new google.maps.StreetViewCoverageLayer();
//   //overlay.setMap(map);

//   google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
//     computeTotalDistance(directionsDisplay.directions);
//     updateWaypoints(directionsDisplay.directions);
//     lastRoute = directionsDisplay.directions
//   });

//   camera_pin = new google.maps.Marker({
//     map: map
//   });

//   calcRoute();
// }

// function calcRoute() {

//   var request = {
//     origin: origin,
//     destination: destination,
//     waypoints: waypoints,
//     travelMode: google.maps.DirectionsTravelMode.DRIVING
//   };
//   directionsService.route(request, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       lastRoute = response
//       directionsDisplay.setDirections(response);
//     }
//   });
// }

// function getStringByWaypoint(waypoint) {
//   if (typeof waypoint == 'object') {
//     if (waypoint.location == undefined) {
//       return waypoint.jb + ', ' + waypoint.kb;
//     } else if (typeof waypoint.location == 'object') {
//       return waypoint.location.jb + ', ' + waypoint.location.kb;
//     } else {
//       return waypoint.location;
//     }
//   } else {
//     return waypoint;
//   }
// }

// function updateWaypoints(directions) {
//   directions = directions.Vb
//   waypoints = directions.waypoints
//   var waypointElements = document.getElementsByClassName('routepoint');
//   waypointElements[0].value = getStringByWaypoint(directions.origin)
//   for(var i = 0; i < waypoints.length; i++) {
//     if(waypointElements[i+1] == undefined) {
//       var el = addWaypoint();
//     } else {
//       el = waypointElements[i+1]
//     }
//     el.value = getStringByWaypoint(waypoints[i])
//   }
//   if (waypointElements[1 + waypoints.length] == undefined) {
//     var el = addWaypoint();
//   } else {
//     var el = waypointElements[1 + waypoints.length]
//   }
//   el.value = getStringByWaypoint(directions.destination)
// }

// function computeTotalDistance(result) {
//   var total = 0;
//   var myroute = result.routes[0];
//   for (var i = 0; i < myroute.legs.length; i++) {
//     total += myroute.legs[i].distance.value;
//   }
//   total = total / 1000.
//   document.getElementById('total').innerHTML = total + ' km';
// }

// function changeRoute() {
//   var routePoints = ['41.385872, 2.193626','41.441134, 1.985959','41.350251, 2.060760'];
//   waypoints.length = 0
//   for(var i = 0; i < routePoints.length; i++) {
//     if (routePoints[i].value == '')
//       break;
//     if (i == 0)
//       origin = routePoints[i].value;
//     else if (i == routePoints.length - 1)
//       destination = routePoints[i].value;
//     else if (routePoints[i])
//       waypoints.push({location: routePoints[i].value});
//   }
//   calcRoute();
//   return false;
// }

// function addWaypoint() {
//   var br = document.createElement ("br")
//   var waypoint = document.createElement('input');
//   waypoint.type = 'text';
//   waypoint.className = 'routepoint';
//   var elements = document.getElementsByClassName('routepoint');
//   var lastElement = elements[elements.length - 1]
//   lastElement.parentNode.insertBefore(waypoint, lastElement.nextSibling);
//   waypoint.parentNode.insertBefore(br, waypoint);
//   return waypoint
// }

// function removeWaypoint() {
//   var elements = document.getElementsByClassName('routepoint');
//   var lastElement = elements[elements.length - 1]
//   lastElement.parentNode.removeChild(lastElement.nextSibling);
//   lastElement.parentNode.removeChild(lastElement);
// }

// function show(text) {
//   var el = document.getElementById('hud');
//   el.innerHTML = text;
// }

// function loadHyperlapse() {
//   hyperlapse.generate( {route: lastRoute} );
// }

// google.maps.event.addDomListener(window, 'load', initialize);

