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

    $fotoURL = $request->fotoURL;
    $IDSolicitacao = $request->IDSolicitacao;
    $idUsuarioSolicitacao = $request->idUsuarioSolicitacao;
    $data = date('Y-m-d');

    if (isset($IDSolicitacao)) {

        //atualiza o estado da solicitacao
        $sql = "UPDATE solicitacao SET estado = 'sl' WHERE IDSolicitacao = '$IDSolicitacao'";
        $con->query($sql);

        //insere o requerimento da solicitacao escolhida
        $sql = "INSERT INTO requerimento (fotoURL, data, IDSolicitacao) VALUES ('$fotoURL', '$data', '$IDSolicitacao')";
        $con->query($sql);
        echo json_encode(true);

        pontuarUsuario($idUsuarioSolicitacao, 2, $con);

    } else {
        echo json_encode(false);
    }
}
$con->close();
?>