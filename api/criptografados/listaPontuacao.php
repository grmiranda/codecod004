<?php
include 'mySQL.php';
require 'mySQL.php';
include 'criptografia.php';

?>
<?php
$cript = new Criptografia;

$the_request = &$_GET;
if (isset($_GET["id"]) && $_GET["id"] !== "") { //busca da pontuacao de um usuario especifico

    $IDUsuario = $_GET["id"];

    $sql = "SELECT IDUsuario, nome, pontos, fotoURL FROM usuario ORDER BY pontos DESC";
    $result = $con->query($sql);

    $i = 0;
    while ($row = $result->fetch_assoc()) {
        $i++;
        if ($row['IDUsuario'] == $IDUsuario) {
            $row['pos'] = $i;

            echo $cript->enc($row);

            return;
        }
    }

    echo $cript->enc(false);


} else if (isset($_GET["rank"])) {
    $vetor = array();
    if ($_GET["rank"] == "") {
        $sql = "SELECT nome, pontos, fotoURL FROM usuario ORDER BY pontos DESC";
        $result = $con->query($sql);
        while ($row = $result->fetch_assoc()) {
            $vetor[] = $row;
        }
        echo $cript->enc($vetor);//retorna uma lista de usuarios ordenada pela pontuacao

    } else {
        $quantidade = $_GET["rank"];
        $sql = "SELECT nome, pontos, fotoURL FROM usuario ORDER BY pontos DESC LIMIT $quantidade";
        $result = $con->query($sql);
        while ($row = $result->fetch_assoc()) {
            $vetor[] = $row;
        }

        echo $cript->enc($vetor); //retorna uma lista de usuarios ordenada pela pontuacao e com a quantidade requerida

    }

}
?>