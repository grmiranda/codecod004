<?php
include 'mySQL.php';
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

    $titulo = $request->titulo;
    $texto = $request->texto;
    $fotoURL = $request->fotoURL;
    $video = $request->video;

    $data = date('Y-m-d');

    if (isset($titulo)) {
        $sql = "INSERT INTO publicacao (titulo, texto, data, video) VALUES ('$titulo', '$texto', '$data', '$video')";
        $con->query($sql);

        //Selecionando a tabela adicionada para obter o id
        $sql = "SELECT * FROM publicacao WHERE titulo = '$titulo' AND texto = '$texto' AND data = '$data' AND video = '$video'";
        $result = $con->query($sql);
        //Obtendo o id da publicacao
        $id = $result->fetch_assoc();
        $id = $id['IDPublicacao'];

        //adicionando todas as fotos relacionadas a publicacao
        $i = 0;
        foreach ($fotoURL as $foto) {
            $arquivo = 'imagens/noticias/' . time() . $i . '.jpeg'; //nome do arquivo que será gerado
            $url = 'http://www.dsoutlet.com.br/apiLuiz/' . $arquivo; //url que leva até a imagem
            $i++;
            base64_to_jpeg($foto, $arquivo); //converte a foto base64 em jpeg
            $sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$url', '$id', 'publicacao')";
            $con->query($sql);
        }

        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}
$con->close();
?>