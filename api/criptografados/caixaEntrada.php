<?php
include 'mySQL.php';
require 'mySQL.php';
include 'criptografia.php';

?>
<?php
$vetor = array();
$cript = new Criptografia;

$the_request = &$_GET;
if (isset($_GET["id"])) {
    if ($_GET["id"] != "") {
        $userID = $_GET["id"];
        $sql = "SELECT * FROM caixadeentrada WHERE IDUsuario = '$userID' ORDER BY IDCaixaDeEntrada DESC";
        $result = $con->query($sql);

        while ($row = $result->fetch_assoc()) {
            $id = $row['IDMensagem'];

            $sql = "SELECT * FROM mensagem WHERE IDMensagem = '$id'";
            $result1 = $con->query($sql);

            $msg = $result1->fetch_assoc();

            $userID = $msg['IDRemetente'];
            $sql = "SELECT * FROM usuario WHERE IDUsuario = '$userID'";
            $result1 = $con->query($sql);

            $rem = $result1->fetch_assoc();

            $temp = array();
            $temp['id'] = $id;
            $temp['remetente'] = $msg['IDRemetente'];
            $temp['destinatario'] = $msg['IDDestinatario'];
            $temp['mensagem'] = $msg['Texto'];
            $temp['data'] = $msg['data'];
            $temp['lida'] = $row['lido'];
            $temp['nome'] = $rem['nome'];
            $temp['foto'] = $rem['fotoURL'];
            $temp['Push'] = $rem['Push'];
            $temp['IDOutro'] = $userID;
            $vetor[] = $temp;
        }
        echo $cript->enc($vetor);
    }
}
$con->close();
?>