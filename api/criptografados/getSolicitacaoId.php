<?php
include 'mySQL.php';
require 'mySQL.php';
include 'getIdPush.php';
include 'criptografia.php';

?>
<?php
$the_request = &$_GET;

$cript = new Criptografia;


if (isset($_GET["id"])) {

    $id = $_GET["id"];
    $sql = "SELECT * FROM solicitacao WHERE IDSolicitacao = '$id'";
    $result = $con->query($sql);
    $row = $result->fetch_assoc();
    $sql = "SELECT * FROM fotourl WHERE id = '$id' AND tipo = 'solicitacao'";
    $resultado = $con->query($sql);
    $fotos = array();
    while ($f = $resultado->fetch_assoc()) {
        $fotos[] = $f['fotoURL'];
    }
    $row['fotoURL'] = $fotos;

    $idU = $row['IDUsuario'];
    $sql = "SELECT * FROM usuario WHERE IDUsuario = '$idU' ";
    $resultado = $con->query($sql);
    $dado = $resultado->fetch_assoc();
    $row['nomeUsuario'] = $dado['nome'];
    $row['fotoUsuario'] = $dado['fotoURL'];
    $idsPushs = getIdApoio($row['IDSolicitacao'], "solicitacao", $con);
    $row['ids'] = $idsPushs[0];
    $row['pushs'] = $idsPushs[1];

    echo $cript->enc(str_ireplace("\\", "*", json_encode($vetor)));

}
$con->close();
?>
