var myMap;
var canvas;
var myLoc;
var mappa = new Mappa("Leaflet"); //new instance of the mappa using the leaflet map provider

var homeLat = -34.5817137
var homeLon = -58.4685251

var options = {
  lat: homeLat,
  lng: homeLon,
  zoom: 2.5,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
}

function preload() {
  myLoc = getCurrentPosition();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // without canvas it won't show.

  myMap = mappa.tileMap(options); // visualize by using object and options we created before
  myMap.overlay(canvas);
}

function draw() {
  clear();

  var distance = calcGeoDistance(myLoc.latitude, myLoc.longitude, homeLat, homeLon, "km");

  // Family in Argentina
  push();
  var family = myMap.latLngToPixel(homeLat, homeLon);
  fill("grey");
  strokeWeight(10)
  stroke(0,0,0,120)
  ellipse(family.x, family.y, 20);
  pop();

  // My current Position
  push();
  fill("grey");
  strokeWeight(10)
  stroke(0,0,0,120)
  var pilar = myMap.latLngToPixel(myLoc.latitude, myLoc.longitude);
  ellipse(pilar.x, pilar.y, 20);
  pop();

  //Line that gather my family and me
  push();
  stroke("grey");
  strokeWeight(2);
  line(pilar.x, pilar.y, family.x, family.y);

  //Text
  push();
  var family = "I am  ";
  textSize(20);
  textFont("Arial");
  fill("grey");
  noStroke();
  text(family + Math.round(distance) + 'Km away of my family, but technology reduces that distance into 0km', width/8 , height/3);
  pop();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
