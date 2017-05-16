<?php
include 'addPontuacao.php';
include 'salvaImagem.php';
include 'apagaImagem.php';
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

    //busca a pl, verificando se ela existe
    $sql = "SELECT * FROM pl WHERE IDPL = '$IDPL'";
    $result = $con->query($sql);
    $numrow = $result->num_rows;

    if ($numrow !== 1) {
        //pl nao existe
        echo json_encode(false);
    } else {
        //atualiza a pl
        $sql = "UPDATE pl SET titulo = '$titulo', ementa = '$ementa', estado = '$estado' WHERE IDPL = '$IDPL'";
        $con->query($sql);

        //busca as fotos antigas e salva num array para vefiricar se alguma foi apagada
        $sql = "SELECT * FROM fotourl WHERE id = '$IDPL' AND tipo = 'pl'";
        $fotosAntigas = array();
        $result = $con->query($sql);
        //salvando fotos antigas num array
        while ($row = $result->fetch_assoc()) {
            $fotosAntigas[] = $row['fotoURL'];
        }

        //deletando as fotos relacionadas
        $sql = "DELETE FROM fotourl WHERE id = '$IDPL' AND tipo = 'pl'";
        $con->query($sql);

        //inserindo novas fotos
        $i = 0;
        foreach ($fotoURL as $foto) {
            if (strpos($foto, 'base')) {
                $arquivo = 'imagens/projetodelei/' . time() . $i . $IDPL . '.jpeg'; //nome do arquivo que será gerado
                $url = 'http://www.dsoutlet.com.br/apiLuiz/' . $arquivo; //url que leva até a imagem
                $i++;
                base64_to_jpeg($foto, $arquivo); //converte a foto base64 em jpeg
            } else {
                $url = $foto;
            }
            $sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$url', '$IDPL', 'pl')";
            $con->query($sql);
        }

        //retorna para usuario
        echo json_encode(true);

        //apagando fotos da publicacao antiga
        //verifica se a foto antiga esta na lista de fotos novas
        foreach ($fotosAntigas as $foto) {
            if (!in_array($foto, $fotoURL)) {
                apagarImagem($foto, 'imagens/projetodelei/');
            }
        }


        if ($estado == 'ap') { //se a solicitacao for aceita o usuario criador recebe pontuacao
            pontuarUsuario($IDUsuario, 5, $con);
        } else if ($estado == 'tr') { //se a solicitacao for tramitada o usuario criador recebe pontuacao
            pontuarUsuario($IDUsuario, 6, $con);
        } else if ($estado == 'cp') { //se a solicitacao for concluida o usuario criador recebe pontuacao
            pontuarUsuario($IDUsuario, 7, $con);
            //deleta as curtidas da solicitacao para livrar espaco e diminuir as buscas
            $sql = "DELETE FROM avaliapl WHERE IDPL = '$IDPL'";
            $con->query($sql);
        } else {
            //deleta as curtidas da solicitacao para livrar espaco e diminuir as buscas
            $sql = "DELETE FROM avaliapl WHERE IDPL = '$IDPL'";
            $con->query($sql);
        }
    }
}

$con->close();
?>