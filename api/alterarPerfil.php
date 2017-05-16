<?php
include 'mySQL.php';
require 'mySQL.php';
include 'salvaImagem.php';
include 'apagaImagem.php';
include 'criptografia.php';

?>

<?php

$cript = new Criptografia;

$the_request = &$_POST;
$postdata = file_get_contents("php://input");

if (isset($postdata)) {
    $request = $cript->dec($postdata);

    $nome = $request->nome;
    $email = $request->email;
    $nasc = $request->nascimento;
    $cpf = $request->cpf;
    $fotoURL = $request->fotoURL;
    $genero = $request->genero;
    $socialID = $request->socialID;
    $telefone = $request->telefone;
    $endereco = $request->endereco;
    $bairro = $request->bairro;
    $cidade = $request->cidade;
    $UF = $request->UF;

    if (strpos($fotoURL, 'base')) {
        $arquivo = 'imagens/perfil/' . time() . '.jpeg'; //nome do arquivo que será gerado
        $url = 'http://www.dsoutlet.com.br/apiLuiz/' . $arquivo; //url que leva até a imagem
        base64_to_jpeg($fotoURL, $arquivo); //converte a foto base64 em jpeg
    }

    $sql = "SELECT * FROM usuario WHERE socialID = '$socialID'";
    $result = $con->query($sql);

    $fotoAntiga = $result->fetch_assoc()['fotoURL'];

    $num = $result->num_rows;

    if ($num !== 1) {

        echo json_encode(false);

    } else {
        $vetor = array();
        $dados = $result->fetch_assoc();

        if ($genero == 'male') {
            $genero = 'm';
        } else {
            $genero = 'f';
        }

        $sql = "UPDATE usuario SET nome = '$nome', email = '$email', nascimento = '$nasc', cpf = '$cpf', fotoURL = '$url', genero = '$genero' WHERE socialID = '$socialID'";
        $con->query($sql);

        if ($genero == 'm') {
            $genero == 'male';
        } else {
            $genero = 'female';
        }
        $idU = $dados['IDUsuario'];

        $sql = "UPDATE telefone SET numero = '$telefone' WHERE IDUsuario = '$idU'";
        $con->query($sql);

        $sql = "UPDATE endereco SET endereco = '$endereco', bairro = '$bairro', cidade = '$cidade', uf = '$UF' WHERE IDUsuario = '$idU'";
        $con->query($sql);

        $vetor['IDUsuario'] = $dados['IDUsuario'];
        $vetor['nome'] = $nome;
        $vetor['email'] = $email;
        $vetor['genero'] = $genero;
        $vetor['fotoURL'] = $url;
        $vetor['socialID'] = $socialID;
        $vetor['cpf'] = $cpf;
        $vetor['nascimento'] = $nasc;
        $vetor['telefone'] = $telefone;
        $vetor['endereco'] = $endereco;
        $vetor['bairro'] = $bairro;
        $vetor['cidade'] = $cidade;
        $vetor['UF'] = $UF;
        $vetor['permissao'] = $dados['permissao'];
        $vetor['Push'] = $dados['Push'];
        $vetor['pontos'] = $dados['pontos'];

        echo json_encode($vetor);
        //apaga foto antiga caso seja trocada
        if ($fotoAntiga !== $fotoURL) {
            apagarImagem($fotoAntiga, 'imagens/perfil/');
        }

    }
}
$con->close();
?>