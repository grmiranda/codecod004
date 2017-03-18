<?php
include 'addPontuacao.php';
include 'mySQL.php';
require 'mySQL.php';
?>

<?php

$the_request = &$_POST;

$postdata = file_get_contents("php://input");

if (isset($postdata)) {
    $request = json_decode($postdata);

    $IDSolicitacao = $request->IDSolicitacao;
    $fotoURL = $request->fotoURL;
    $titulo = $request->titulo;
    $descricao = $request->descricao;
    $andamento = $request->andamento;
    $IDUsuario = $request->IDUsuario;

    if (!isset($andamento)) {
        $andamento = "";
    }

    $estado = $request->estado;

    $sql = "SELECT * FROM solicitacao WHERE IDSolicitacao = '$IDSolicitacao'";
    $result = $con->query($sql);
    $numrow = $result->num_rows;

    if ($numrow !== 1) {
        echo json_encode(false);
    } else {
        $sql = "UPDATE solicitacao SET fotoURL = '$fotoURL', titulo = '$titulo', descricao = '$descricao', andamento = '$andamento', estado = '$estado' WHERE IDSolicitacao = '$IDSolicitacao'";
        $con->query($sql);
        echo json_encode(true);


        if ($estado == 'ap') { //se a solicitacao for aceita o usuario criador recebe pontuacao
            pontuarUsuario($IDUsuario, 1, $con);
        }else if($estado == 'cp'){ //se a solicitacao for realizada o usuario criador recebe pontuacao
            pontuarUsuario($IDUsuario, 3, $con);
        }
    }
}
$con->close();
?>