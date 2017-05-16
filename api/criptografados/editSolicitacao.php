<?php
include 'addPontuacao.php';
include 'mySQL.php';
include 'apagaImagem.php';
require 'mySQL.php';
include 'salvaImagem.php';
include 'criptografia.php';

?>

<?php
$cript = new Criptografia;

$the_request = &$_POST;

$postdata = file_get_contents("php://input");

if (isset($postdata)) {
    $request = $cript->dec($postdata);

    $IDSolicitacao = $request->IDSolicitacao;
    $fotoURL = $request->fotoURL;
    $titulo = $request->titulo;
    $descricao = $request->descricao;
    $andamento = $request->andamento;
    $IDUsuario = $request->IDUsuario;
    $estado = $request->estado;

    if (!isset($andamento)) {
        $andamento = "";
    }

    //busca a solicitacao p verificar se ela existe
    $sql = "SELECT * FROM solicitacao WHERE IDSolicitacao = '$IDSolicitacao'";
    $result = $con->query($sql);
    $numrow = $result->num_rows;


    //se $numrow for 0, solicitacao nao existe
    if ($numrow !== 1) {
        //solicitacao nao existe
        echo json_encode(false);
    } else {
        //atualiza a solicitacao
        $sql = "UPDATE solicitacao SET titulo = '$titulo', descricao = '$descricao', andamento = '$andamento', estado = '$estado' WHERE IDSolicitacao = '$IDSolicitacao'";
        $con->query($sql);

        //se for ap, indica que a foto pode ter sido editada, tendo que atualizar as fotos tambem
        if ($estado == "ap") {

            //busca as fotos antigas e salva num array para vefiricar se alguma foi apagada
            $sql = "SELECT * FROM fotourl WHERE id = '$IDSolicitacao' AND tipo = 'solicitacao'";
            $fotosAntigas = array();
            $result = $con->query($sql);
            //salvando fotos antigas num array
            while ($row = $result->fetch_assoc()) {
                $fotosAntigas[] = $row['fotoURL'];
            }

            //deletando as fotos relacionadas
            $sql = "DELETE FROM fotourl WHERE id = '$IDSolicitacao' AND tipo = 'solicitacao'";
            $con->query($sql);

            //inserindo novas fotos
            $i = 0;
            foreach ($fotoURL as $foto) {
                if (strpos($foto, 'base')) {
                    $arquivo = 'imagens/solicitacao/' . time() . $i . $IDSolicitacao . '.jpeg'; //nome do arquivo que será gerado
                    $url = 'http://www.dsoutlet.com.br/apiLuiz/' . $arquivo; //url que leva até a imagem
                    $i++;
                    base64_to_jpeg($foto, $arquivo); //converte a foto base64 em jpeg
                } else {
                    $url = $foto;
                }
                $sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$url', '$IDSolicitacao', 'solicitacao')";
                $con->query($sql);
            }

            //retorna para usuario
            echo json_encode(true);


            //apagando fotos da publicacao antiga
            //verifica se a foto antiga esta na lista de fotos novas
            foreach ($fotosAntigas as $foto) {
                if (!in_array($foto, $fotoURL)) {
                    apagarImagem($foto, 'imagens/solicitacao/');
                }
            }

        } else {
            //retorna para usuario
            echo json_encode(true);
        }


        //se a solicitacao for aceita o usuario criador recebe sua pontuacao
        if ($estado == 'ap') {
            pontuarUsuario($IDUsuario, 1, $con);
        } else {

            //se a solicitacao for realizada o usuario criador recebe pontuacao
            if ($estado == 'cp') {
                pontuarUsuario($IDUsuario, 3, $con);
            }

            //deleta as curtidas da solicitacao para livrar espaco e diminuir as buscas
            $sql = "DELETE FROM apoiosolicitacao WHERE IDSolicitacao = '$IDSolicitacao'";
            $con->query($sql);

        }
    }
}

$con->close();

?>
