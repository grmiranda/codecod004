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
        $id = $_GET["id"];

        $sql = " SELECT * FROM usuario WHERE IDUsuario = '$id' ";
        $result = $con->query($sql);

        $num = $result->num_rows;

        if ($num !== 1) {

            echo $cript->enc(false);

        } else {
            $dados = $result->fetch_assoc();
            $acesso = $dados['permissao'];

            if ($acesso == 1) {
                $sql = "SELECT * FROM usuario WHERE IDUsuario != '$id'";
                $result = $con->query($sql);
                while ($row = $result->fetch_assoc()) {
                    $userID = $row['IDUsuario'];

                    $sql = "SELECT * FROM telefone WHERE IDUsuario = '$userID'";
                    $resultado = $con->query($sql);
                    $telefone = $resultado->fetch_assoc();

                    $sql = "SELECT * FROM endereco WHERE IDUsuario = '$userID'";
                    $resultado = $con->query($sql);
                    $end = $resultado->fetch_assoc();

                    if ($row['genero'] == 'm') {
                        $row['genero'] = 'male';
                    } else {
                        $row['genero'] = 'female';
                    }

                    $temp = array();

                    $temp['IDUsuario'] = $row['IDUsuario'];
                    $temp['nome'] = $row['nome'];
                    $temp['email'] = $row['email'];
                    $temp['genero'] = $row['genero'];
                    $temp['fotoURL'] = $row['fotoURL'];
                    $temp['socialID'] = $row['socialID'];
                    $temp['cpf'] = $row['cpf'];
                    $temp['nascimento'] = $row['nascimento'];
                    $temp['telefone'] = $telefone['numero'];
                    $temp['endereco'] = $end['endereco'];
                    $temp['bairro'] = $end['bairro'];
                    $temp['cidade'] = $end['cidade'];
                    $temp['UF'] = $end['uf'];
                    $temp['Push'] = $row['Push'];

                    $vetor[] = $temp;
                }

                echo $cript->enc($vetor);

            } else {
                $sql = "SELECT * FROM usuario WHERE IDUsuario != '$id' AND permissao = '1'";
                $result = $con->query($sql);

                while ($row = $result->fetch_assoc()) {
                    $userID = $row['IDUsuario'];

                    $sql = "SELECT * FROM telefone WHERE IDUsuario = '$userID'";
                    $resultado = $con->query($sql);
                    $telefone = $resultado->fetch_assoc();

                    $sql = "SELECT * FROM endereco WHERE IDUsuario = '$userID'";
                    $resultado = $con->query($sql);
                    $end = $resultado->fetch_assoc();

                    if ($row['genero'] == 'm') {
                        $row['genero'] = 'male';
                    } else {
                        $row['genero'] = 'female';
                    }

                    $temp = array();

                    $temp['IDUsuario'] = $row['IDUsuario'];
                    $temp['nome'] = $row['nome'];
                    $temp['email'] = $row['email'];
                    $temp['genero'] = $row['genero'];
                    $temp['fotoURL'] = $row['fotoURL'];
                    $temp['socialID'] = $row['socialID'];
                    $temp['cpf'] = $row['cpf'];
                    $temp['nascimento'] = $row['nascimento'];
                    $temp['telefone'] = $telefone['numero'];
                    $temp['endereco'] = $end['endereco'];
                    $temp['bairro'] = $end['bairro'];
                    $temp['cidade'] = $end['cidade'];
                    $temp['UF'] = $end['uf'];
                    $temp['Push'] = $row['Push'];

                    $vetor[] = $temp;
                }

                echo $cript->enc($vetor);

            }
        }
    }

}
$con->close();
?>
