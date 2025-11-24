<?php
$url = 'https://www.google.es/maps/place/Doctor+Phone:+Reparacion+express+de+tel%C3%A9fonos+moviles/@39.4884985,-0.3721368,15.5z/data=!4m18!1m9!3m8!1s0xd604756d90c1675:0x9d5c567e1210feba!2sDoctor+Phone:+Reparacion+express+de+tel%C3%A9fonos+moviles!8m2!3d39.4892891!4d-0.3698881!9m1!1b1!16s%2Fg%2F11g4cz7sld!3m7!1s0xd604756d90c1675:0x9d5c567e1210feba!8m2!3d39.4892891!4d-0.3698881!9m1!1b1!16s%2Fg%2F11g4cz7sld?hl=es&entry=ttu';
$html = file_get_contents($url);
file_put_contents('google_maps.html', $html);
echo 'HTML descargado y guardado correctamente.';
?>
