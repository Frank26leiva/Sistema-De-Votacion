<?php
// Obtener la opción seleccionada
if (isset($_POST['option'])) {
    $option = $_POST['option'];

    // Leer el archivo donde se almacenan los resultados
    $filename = 'votes.json';
    $votes = [];

    if (file_exists($filename)) {
        $votes = json_decode(file_get_contents($filename), true);
    }

    // Incrementar el conteo de la opción seleccionada
    if (isset($votes[$option])) {
        $votes[$option]++;
    } else {
        $votes[$option] = 1;
    }

    // Guardar los resultados actualizados en el archivo
    file_put_contents($filename, json_encode($votes));

    // Devolver una respuesta al cliente
    echo '¡Gracias por tu voto!';
} else {
    echo "No has seleccionado ninguna opción.";
}
?>
