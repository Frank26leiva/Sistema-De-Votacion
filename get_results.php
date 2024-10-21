<?php
header('Content-Type: application/json');

// Leer los resultados del archivo
$filename = 'votes.json';
$votes = [];

if (file_exists($filename)) {
    $votes = json_decode(file_get_contents($filename), true);
}

// Devolver los resultados en formato JSON
echo json_encode($votes);
?>
