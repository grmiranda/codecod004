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
        $sql = "INSERT INTO requerimento (data, IDSolicitacao) VALUES ('$data', '$IDSolicitacao')";
        $con->query($sql);

        $sql = "SELECT * FROM requerimento WHERE data = '$data' AND IDSolicitacao = '$IDSolicitacao'";
        $result = $con->query($sql);

        $id = $result->fetch_assoc();
        $id = $id['IDRequerimento'];

        foreach ($fotoURL as $foto){
            $sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$foto', '$id', 'requerimento')";
            $con->query($sql);
        }

        echo json_encode(true);
		
		//deleta as curtidas da solicitacao para livrar espaco e diminuir as buscas
        $sql = "DELETE FROM apoiosolicitacao WHERE IDSolicitacao = '$IDSolicitacao'";
        $con->query($sql);

        pontuarUsuario($idUsuarioSolicitacao, 2, $con); //pontua o usuario de acordo com a acao efetuada

    } else {
        echo json_encode(false);
    }
}
$con->close();
?>