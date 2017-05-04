<?php
include 'mySQL.php';
include 'getLikeSolicitacao.php';
require 'mySQL.php';
?>
<?php
$the_request = &$_GET;

$idUsuario = $_GET["user"];
$idSolicitacao = $_GET["solicitacao"];

$info = getLike($idSolicitacao, $idUsuario, $con);
echo json_encode($info);

$con->close();
?>

