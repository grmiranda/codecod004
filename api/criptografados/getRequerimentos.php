<?php
include 'mySQL.php';
require 'mySQL.php';
include 'criptografia.php';
?>
<?php
$vetor = array();
$cript = new Criptografia;

$the_request = &$_GET;
if (isset($_GET["solicitacaoID"])) {
    if ($_GET["solicitacaoID"] != "") {

        $id = $_GET['solicitacaoID'];

        $sql = "SELECT * FROM requerimento WHERE IDSolicitacao = '$id'";
        $result = $con->query($sql);

        $num = $result->num_rows;

        if ($num !== 1) {
            echo $cript->enc(json_encode(false));
        } else {
            $dados = $result->fetch_assoc();
            $idrequerimento = $dados['IDRequerimento'];
            $sql = "SELECT * FROM fotourl WHERE id = '$idrequerimento' AND tipo = 'requerimento'";
            $result = $con->query($sql);
            $fotos = array();
            while ($f = $result->fetch_assoc()) {
                $fotos[] = $f['fotoURL'];
            }
            $dados['fotoURL'] = $fotos;

            echo $cript->enc(str_ireplace("\\", "*", json_encode($dados)));
        }
    }
}
$con->close();
?>
