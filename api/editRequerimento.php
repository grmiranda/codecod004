<?php
include 'mySQL.php';
require 'mySQL.php';
include 'salvaImagem.php';
include 'apagaImagem.php';
?>

<?php
$the_request = &$_POST;

$postdata = file_get_contents("php://input");

if (isset($postdata)) {
    $request = json_decode($postdata);

    $IDRequerimento = $request->IDRequerimento;
    $fotoURL = $request->fotoURL;

    $sql = "SELECT * FROM requerimento WHERE IDRequerimento = '$IDRequerimento'";
    $result = $con->query($sql);
    $numrow = $result->num_rows;

    if ($numrow !== 1) {
        echo json_encode(false);
    } else {

        $sql = "SELECT * FROM fotourl WHERE id = '$IDRequerimento' AND tipo = 'requerimento'";
        $fotosAntigas = array();
        $result = $con->query($sql);

        while ($row = $result->fetch_assoc()) {
            $fotosAntigas[] = $row['fotoURL'];
        }

        //deletando todas as fotos relacioandas
        $sql = "DELETE FROM fotourl WHERE id = '$IDRequerimento' AND tipo = 'requerimento'";
        $con->query($sql);
        //inserindo no banco as fotos atualizadas.
        $i = 0;
        foreach ($fotoURL as $foto) {
            if (strpos($foto, 'base')) {
                $arquivo = 'imagens/requerimento/' . time() . $i . $IDRequerimento . '.jpeg'; //nome do arquivo que será gerado
                $url = 'http://www.dsoutlet.com.br/apiLuiz/' . $arquivo; //url que leva até a imagem
                $i++;
                base64_to_jpeg($foto, $arquivo); //converte a foto base64 em jpeg
            } else {
                $url = $foto;
            }
            $sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$url', '$IDRequerimento', 'requerimento')";
            $con->query($sql);
        }

        echo json_encode(true);

        //apagando fotos da publicacao antiga
        //verifica se a foto antiga esta na lista de fotos novas
        foreach ($fotosAntigas as $foto) {
            if (!in_array($foto, $fotoURL)) {
                apagarImagem($foto, 'imagens/requerimento/');
            }
        }
    }
}
$con->close();
?>