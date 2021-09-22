const html_script = `

<!DOCTYPE html>

<html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
      <title>ArcGIS API for JavaScript Tutorials: Select a basemap</title>
      <style>
        html, body, #viewDiv {
          padding: 0;
          margin: 0;
          height: 100%;
          width: 100%;
        }
      </style>
      
      <!-- leaflet -->
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
       integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
       crossorigin=""/>
       <!-- Make sure you put this AFTER Leaflet's CSS -->
     <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
       integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
       crossorigin=""></script>
    
       <!--minimap-->
          <link rel='stylesheet prefetch' href='https://rawgit.com/Norkart/Leaflet-MiniMap/master/dist/Control.MiniMap.min.css'>
          <script src='https://rawgit.com/Norkart/Leaflet-MiniMap/master/dist/Control.MiniMap.min.js'></script>
    
          <!--Filtro de capas -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet-groupedlayercontrol/0.6.1/leaflet.groupedlayercontrol.min.css" />
          <script src="https://rawgithub.com/ismyrnow/Leaflet.groupedlayercontrol/master/src/leaflet.groupedlayercontrol.js"></script>
    
            <!-- Load Esri Leaflet from CDN -->
      <script src="http://cdn-geoweb.s3.amazonaws.com/esri-leaflet/1.0.0-rc.2/esri-leaflet.js"></script>
     <!-- Load Esri Leaflet from CDN -->
        <script src="https://unpkg.com/esri-leaflet"></script>
    
      <!--pulse from CDN-->
       <script src="https://unpkg.com/leaflet-pulse-icon@0.1.0/src/L.Icon.Pulse.js"></script>
       <link type="text/css" rel="stylesheet" href="https://unpkg.com/leaflet-pulse-icon@0.1.0/src/L.Icon.Pulse.css" />
    
    </head>
    <body>
    <div id="map" style="width: 100%; height: 100vh;"></div>
      
    
    
    </body>
    </html>
    
   
   
<script type="text/javascript">
  

  

var mymap1 = L.map('map').setView([3.42603,-76.52046], 12);

//Mapas base
var basemaps =
{
 Esri:  L.esri.basemapLayer('Topographic',
  {
    maxZoom: 19,
    attribution: '&copy; <a href="">Esri</a>'
  }),

  Streets: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  })
  ,
   Grayscale: L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }),
    Satelite: L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
  {
    maxZoom: 18,
    attribution: '&copy; <a href="#">Google Maps</a>'
  })

  
  


};


var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data &copy; OpenStreetMap contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 10, maxZoom: 18, attribution: osmAttrib});

    var osm2 = new L.TileLayer(osmUrl, {minZoom: 10, maxZoom: 13, attribution: osmAttrib });
    var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position: 'topright' }).addTo(mymap1);

    //   var Comunas = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
    // layers: 'idesc:mc_comunas',
    // attribution: 'Comunas',
    // format: 'image/png',
    // transparent: true
    // });

  var Comunas = L.esri.featureLayer({
       url: 'https://geoportal.cali.gov.co/agserver/rest/services/IDESC/dapm_capas_base/MapServer/2',
        style: function (feature, layer)
        {                        
            return { 
              color: "#9E7F14", 
              weight: 1, 
              // opacity: 0.25,
              zIndex:-2,
              fillColor: "transparent"
            };
        },
      });


     var Barrios = L.esri.featureLayer({
           url: 'https://geoportal.cali.gov.co/agserver/rest/services/IDESC/dapm_capas_base/MapServer/3',
            style: function (feature, layer)
            {                        
                return { 
                  color: "#92740D", 
                  weight: 1, 
                  // opacity: 0.25,
                  // zIndex:-2,
                  fillColor: "transparent"
                };
            },

         
       });

       Barrios.metadata(function(error, metadata){
            console.log(metadata);
          });



    var popupBarrios = "<h3>Nombre: {barrio}</h3>Comuna: {comuna}<p></p>";

      Barrios.bindPopup(function(e){
        return L.Util.template(popupBarrios, e.feature.properties)
        console.log(e.feature.properties);
      });





    // var Manzanas = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
    // layers: 'idesc:mc_manzanas',
    // attribution: 'Manzanas Cali',
    // format: 'image/png',
    // transparent: true
    // });
    
    // var Barrios = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
    // layers: 'idesc:mc_barrios',
    // attribution: 'Barrios Cali',
    // format: 'image/png',
    // transparent: true
    // });

    

    var Perimetro = L.esri.featureLayer({
       url: 'https://geoportal.cali.gov.co/agserver/rest/services/IDESC/pot_base_clasificacion_suelo/MapServer/1',
        style: function (feature, layer)
        {                        
            return { 
              color: "#92740D", 
              weight: 2, 
              // opacity: 0.25,
              zIndex:-2,
              fillColor: "transparent"
            };
        },
      });



 
    var Rios = L.esri.featureLayer({
       url: 'https://geoportal.cali.gov.co/agserver/rest/services/IDESC/pot_base_clasificacion_suelo/MapServer/6', 
       style: function (feature, layer)
        {                        
            return { 
              color: "#0C73AA", 
              weight: 1, 
              opacity: 80,
               zIndex:5
                };
        },
        });

       Rios.metadata(function(error, metadata){
        console.log(metadata);
      });



    var popupRios = "<h3>{nombre}</h3>";

      Rios.bindPopup(function(e){
        return L.Util.template(popupRios, e.feature.properties)
        console.log(e.feature.properties);
      });


    //  var Humedales = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
    // layers: 'pot_2014:bcs_hid_humedales',
    // attribution: 'Humedales',
    // format: 'image/png',
    // transparent: true
    // });

    var Humedales = L.esri.featureLayer({
       url: 'https://geoportal.cali.gov.co/agserver/rest/services/IDESC/pot_base_clasificacion_suelo/MapServer/5',
     style: function (feature, layer)
        {                        
            return { 
              color: "#0C82C1", 
              weight: 1, 
              opacity: 80 };
        },
     
    });
    // var Rios = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
    // layers: 'pot_2014:bcs_hid_rios',
    // attribution: 'Rios',
    // format: 'image/png',
    // transparent: true
    // });


    //   var Corregimientos = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
    // layers: 'idesc:mc_corregimientos',
    // attribution: 'Corregimientos',
    // format: 'image/png',
    // transparent: true
    // });

     var Corregimientos = L.esri.featureLayer({
       url: 'https://geoportal.cali.gov.co/agserver/rest/services/IDESC/dapm_capas_base/MapServer/1',
        style: function (feature, layer)
        {                        
            return { 
              color: "#BE9E30", 
              weight: 2, 
              // opacity: 0.25,
              zIndex:-5,
              fillColor: "transparent"
            };
        },
      });




  // var ZonaDesboramiento = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
  //   layers: 'pot_2014:amb_ari_amenaza_desborde_creciente',
  //   attribution: 'Zonas de desbordamiento',
  //   format: 'image/png',
  //   transparent: true
  //   });

   var ZonaDesboramiento = L.esri.featureLayer({
       url: 'https://geoportal.cali.gov.co/agserver/rest/services/IDESC/pot_ambiental/MapServer/1', 
       style: function (feature, layer)
        {                        
            return { 
              color: "#DE0808", 
              weight: 1, 
              opacity: 80,
               // zIndex:5
                };
        },
      });


   // var inundacionFluvial = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
   //  layers: 'pot_2014:amb_ari_inundacion_fluvial',
   //  attribution: 'Inundacion fluvial',
   //  format: 'image/png',
   //  transparent: true
   //  });

    var inundacionFluvial = L.esri.featureLayer({
       url: 'https://geoportal.cali.gov.co/agserver/rest/services/IDESC/pot_ambiental/MapServer/4', 
       style: function (feature, layer){                        
            return { 
              color: "#1B08DE", 
              weight: 1, 
              opacity: 80,
               // zIndex:5
                };
        },
        });


    //  var inundacionPluvial = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
    // layers: 'pot_2014:amb_ari_inundacion_pluvial',
    // attribution: 'Inundacion pluvial',
    // format: 'image/png',
    // transparent: true
    // });

    var inundacionPluvial = L.esri.featureLayer({
       url: 'https://geoportal.cali.gov.co/agserver/rest/services/IDESC/pot_ambiental/MapServer/5',style: function (feature, layer)
        {                        
            return { 
              color: "#1B08DE", 
              weight: 1, 
              opacity: 80,
               // zIndex:5
                };
        },
      });








var iconcvc = L.icon({
    iconUrl: './img/images_entities/cvc3.png',
    iconSize:     [50, 50], 
    shadowSize:   [50, 64], 
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62],  
    popupAnchor:  [-3, -76]
});

    var latlng= null;
    var estacionesCvc = L.esri.featureLayer({
       url: 'https://www.geo.cvc.gov.co/arcgis/rest/services/Gestion_Hidrometria/hidrometeorologia/MapServer/0', 
       where: "ID_MUNICIPIO = 76001   and  ESTADO_OP = 'Activa'",

        pointToLayer: function (geojson, latlng) {
          return L.marker(latlng, {
            icon: iconcvc
         });
         
        }
        });
      
       estacionesCvc.metadata(function(error, metadata){
        console.log(metadata);
      });

    
    
            

    var popupCvc = "<h3>{CODIGO}</h3>Categoria: {CATEGORIA} <br><small>Estado: {ESTADO_OP}<small><P>Tipo Estacion: {TIPOESTACION}</P><P>X: {X}</P><P>Y: {Y}</P>";

      estacionesCvc.bindPopup(function(e){
        return L.Util.template(popupCvc, e.feature.properties)
      });

     console.log(estacionesCvc.feature); 

 


var iconIdeam = L.icon({
    iconUrl: './img/images_entities/ideam2.png',
    iconSize:     [50, 50], 
    shadowSize:   [50, 64], 
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62],  
    popupAnchor:  [-3, -76]
});

    var latlng= null;
    var estacionesIdeam = L.esri.featureLayer({
       url: 'http://dhime.ideam.gov.co/server/rest/services/CNE/Estaciones/MapServer/0', 
       where:"IDMUNICIPIO = 76001 and idestadoestaciontm  ='ESTA001' ",

        pointToLayer: function (geojson, latlng) {
          return L.marker(latlng, {
            icon: iconIdeam
         });
        }
        });


    
    // var Perimetro = L.tileLayer.wms('http://idesc.cali.gov.co:8081/geoserver/wms?', {
    // layers: 'idesc:mc_perimetro_urbano_anno_2000',
    // attribution: 'Perimetro Cali',
    // format: 'image/png',
    // transparent: true
    // });

/////ICONOS PULSO
      // var redIcon = L.icon.pulse({ color: "red", fillColor: "red", animate: true});

      // var mymarker = L.marker([1062138.7555,871296.8763], {icon: redIcon}).addTo(mymap1);

      // var blueIcon = L.icon.pulse({ color: "blue", fillColor: "blue", animate: true});
      //    var mymarker = L.marker([3.44228254493,-76.53367472715], {icon: blueIcon}).addTo(mymap1);

      // var mymarker = L.marker([3.42603,-76.52046], {icon: blueIcon}).addTo(mymap1);

/////// CALCULO DE DISTANCIA

  // var firstLatLng,
  //     secondLatLng;
  // mymap1.on('click', function(e) {
  //   if (!firstLatLng) {
  //     firstLatLng = e.latlng;
  //       L.marker(firstLatLng).addTo(mymap1).bindPopup('Point A<br/>' + e.latlng).openPopup();
  //   } else {
  //     secondLatLng = e.latlng;
  //       L.marker(secondLatLng).addTo(mymap1).bindPopup('Point B<br/>' + e.latlng).openPopup();
  //   }

  //   if (firstLatLng && secondLatLng) {
  //     // Dibujamos una línea entre los dos puntos
  //     L.polyline([firstLatLng, secondLatLng], {
  //       color: 'red'
  //     }).addTo(mymap1);

  //     medirDistancia();
  //   }
  // })

  //   function medirDistancia() {
  //   var distance = mymap1.distance(firstLatLng ,secondLatLng);
  //   //document.getElementById('distance').innerHTML = distance;
  //   alert('Distancia:'+ distance)
  // }



// 3.42603,-76.52046
// 3.46953071490,76.47916681119

// 3.44228254493,-76.53367472715

      // var popupIdeam = "<h3>{IDESTACION}</h3>Categoria: {IDCATEGORIA } <br><small>Estado: {IDESTADOESTACIONTM}<small><P>Tipo Estacion: {IDTIPOTRANSMISIONTM }</P>";

      // estacionesCvc.bindPopup(function(e){
      //   return L.Util.template(popupIdeam, e.feature.properties)

      // });



    


    basemaps.Esri.addTo(mymap1);
    // wmsLayer2.addTo(mymap1); //manzana
    // wmsLayer3.addTo(mymap1); //barios
    Perimetro.addTo(mymap1); //perimetro
    Rios.addTo(mymap1); //rios
    Humedales.addTo(mymap1); //humedales
    // wmsLayer7.addTo(mymap1); //corregimientos
    // wmsLayer8.addTo(mymap1); //comunas
    // estacionesCvc.addTo(mymap1); //estaciones CVC
    // estacionesIdeam.addTo(mymap1); // estciones IDEAM
    
  var groupedOverlays = {
    "Amenazas y Riesgos":{
    "Zonas desbordamiento":ZonaDesboramiento,
    "inundacionFluvial":inundacionFluvial,
    "inundacionPluvial":inundacionPluvial,
    },
    "Capas Base": {
    // "Manzanas": Manzanas,
    "Barrios": Barrios,
    "Comunas": Comunas,
    "Perimetro urbano": Perimetro,
    "Corregimientos": Corregimientos
    },
    "Estaciones":{
      "CVC":estacionesCvc,
      "IDEAM":estacionesIdeam
    },
     "Hidrologia":{
      "Rios":Rios,
      "Humedales":Humedales
    }
    
  };


 var groupControl= L.control.groupedLayers(basemaps, groupedOverlays, { position: 'bottomleft' });
      groupControl.addTo(mymap1);




</script>
`

export default html_script