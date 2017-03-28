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

    $IDPL = $request->IDPL;
    $titulo = $request->titulo;
    $ementa = $request->ementa;
    $fotoURL = $request->fotoURL;
    $estado = $request->estado;
    $IDUsuario = $request->IDUsuario;

    $sql = "SELECT * FROM pl WHERE IDPL = '$IDPL'";
    $result = $con->query($sql);
    $numrow = $result->num_rows;

    if ($numrow !== 1) {
        echo json_encode(false);
    } else {
        $sql = "UPDATE pl SET titulo = '$titulo', ementa = '$ementa', estado = '$estado' WHERE IDPL = '$IDPL'";
        $con->query($sql); 

        $sql = "DELETE FROM fotourl WHERE id = '$id' AND tipo = 'pl'";
        $con->query($sql);

        foreach ($fotoURL as $foto){
			$sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$foto' , '$id', 'pl')";
			$con->query($sql);
		}

        echo json_encode(true);

        if ($estado == 'ap') { //se a solicitacao for aceita o usuario criador recebe pontuacao
            pontuarUsuario($IDUsuario, 5, $con);
        } else if ($estado == 'tr') { //se a solicitacao for tramitada o usuario criador recebe pontuacao
            pontuarUsuario($IDUsuario, 6, $con);
        } else if ($estado == 'cp') { //se a solicitacao for concluida o usuario criador recebe pontuacao
            pontuarUsuario($IDUsuario, 7, $con);
			//deleta as curtidas da solicitacao para livrar espaco e diminuir as buscas
			$sql = "DELETE FROM avaliapl WHERE IDPL = '$IDPL'";
			$con->query($sql);
		}else{
			//deleta as curtidas da solicitacao para livrar espaco e diminuir as buscas
			$sql = "DELETE FROM avaliapl WHERE IDPL = '$IDPL'";
			$con->query($sql);
		}
    }
}

$con->close();
?>