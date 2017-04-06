<?php
include 'mySQL.php';
require 'mySQL.php';
include 'apagaImagem.php';
?>

<?php

$the_request = &$_POST;

$postdata = file_get_contents("php://input");

if (isset($postdata)) {
    $solicitacao = json_decode($postdata);
    $fotos = $solicitacao->fotoURL;
    $id = $solicitacao->IDSolicitacao;


    $sql = "SELECT * FROM solicitacao WHERE IDSolicitacao = '$id'";
    $result = $con->query($sql);
    $row = $result->fetch_assoc();
    $numrow = $result->num_rows;

    if ($numrow !== 1) {
        //caso nao exista solicitacao com o id recebido
        echo json_encode(false);
    } else {

        //apagando a solicitacao
        $sql = "DELETE FROM solicitacao WHERE IDSolicitacao = '$id'";
        $con->query($sql);
        echo json_encode(true);

        //apagando as fotos do servidor
        foreach ($fotos as $foto) {
            apagarImagem($foto, 'imagens/solicitacao/');
        }

        //apagando as fotos do banco
        $sql = "DELETE FROM fotourl WHERE id = '$id' AND tipo = 'solicitacao'";
        $con->query($sql);

        //apagando as curtidas do banco
        $sql = "DELETE FROM apoiosolicitacao WHERE IDSolicitacao = '$id'";
        $con->query($sql);
    }
}
$con->close();
?>
