import React from "react";
import './map.css';

const Map = () => {
  return (
<div>
  <div className="map-responsive">
  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12035.930161474927!2d28.8968787!3d41.0475109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba84fffd6e93%3A0x2929ccdd474199d!2sForum%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1702679614458!5m2!1str!2str" 
width="600" 
height="400" 
allowFullScreen="" 
loading="lazy" 
referrerPolicy="no-referrer-when-downgrade"
title="Responsive Google Map"
></iframe>
  </div>

</div>
  );
};




export default Map;

