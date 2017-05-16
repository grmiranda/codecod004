<?php
include 'mySQL.php';
require 'mySQL.php';
include 'salvaImagem.php';
?>

<?php
$the_request = &$_POST;
$postdata = file_get_contents("php://input");

if (isset($postdata)) {
    $request = json_decode($postdata);

    $titulo = $request->titulo;
    $ementa = $request->ementa;
    $fotoURL = $request->fotoURL;
    $IDUsuario = $request->IDUsuario;
    $estado = $request->estado;

    if (isset($titulo)) {
        $sql = "INSERT INTO pl (titulo, ementa, IDUsuario, estado) VALUES ('$titulo', '$ementa', '$IDUsuario', '$estado')";
        $con->query($sql);

        $sql = "SELECT * FROM pl WHERE titulo = '$titulo' AND ementa = '$ementa' AND IDUsuario = '$IDUsuario' AND estado = '$estado'";
        $result = $con->query($sql);

        $id = $result->fetch_assoc();
        $id = $id['IDPL'];

        foreach ($fotoURL as $foto) {
            $arquivo = 'imagens/projetodelei/' . time() . $IDUsuario . '.jpeg'; //nome do arquivo que será gerado
            $url = 'http://www.dsoutlet.com.br/apiLuiz/' . $arquivo; //url que leva até a imagem
            base64_to_jpeg($foto, $arquivo); //converte a foto base64 em jpeg

            $sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$url' , '$id', 'pl')";

            $con->query($sql);
        }

        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}
$con->close();
?>