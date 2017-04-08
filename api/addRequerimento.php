<?php
include 'addPontuacao.php';
include 'salvaImagem.php';
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

        //adicionando todas as fotos relacionadas ao requerimento
        $i = 0;
        foreach ($fotoURL as $foto){
            $arquivo = 'imagens/requerimento/'.time().$i.$IDSolicitacao.'.jpeg'; //nome do arquivo que será gerado
            $url = 'http://www.dsoutlet.com.br/apiLuiz/'.$arquivo; //url que leva até a imagem
            $i++;
            base64_to_jpeg($foto, $arquivo); //converte a foto base64 em jpeg
            $sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$url', '$id', 'requerimento')";
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