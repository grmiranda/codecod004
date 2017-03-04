<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		if ($_GET["id"] == ""){
            $sql = "SELECT * FROM usuario";
            $result = $con->query($sql);

            while ($row=$result->fetch_assoc()){
                $userID = $row['IDUsuario'];

                $sql = "SELECT * FROM telefone WHERE IDUsuario = '$userID'";
                $result = $con->query($sql);
                $telefone = $result->fetch_assoc();

                $sql = "SELECT * FROM endereco WHERE IDUsuario = '$userID'";
                $result = $con->query($sql);
                $end = $result->fetch_assoc();

                if ($row['genero'] == 'm'){
                    $row['genero'] = 'male';
                } else {
                    $row['genero'] = 'female';
                }

                $temp = array();

                $temp['id'] = $row['IDUsuario'];
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

                $vetor[] = $temp;
            }

            echo json_encode($vetor);
		} else {
            $id = $_GET["id"];
            $sql = "SELECT * FROM usuario WHERE socialID = '$id'";
            $result = $con->query($sql);

            $num = $result->num_rows;

            if($num !== 1){
                echo json_encode(false);
            } else {
                $dados = $result->fetch_assoc();
                $userID = $dados['IDUsuario'];
                $temp = array();

                $sql = "SELECT * FROM telefone WHERE IDUsuario = '$userID'";
                $result = $con->query($sql);
                $telefone = $result->fetch_assoc();

                $sql = "SELECT * FROM endereco WHERE IDUsuario = '$userID'";
                $result = $con->query($sql);
                $end = $result->fetch_assoc();

                if ($dados['genero'] == 'm'){
                    $dados['genero'] = 'male';
                } else {
                    $dados['genero'] = 'female';
                }

                $temp['id'] = $dados['IDUsuario'];
                $temp['nome'] = $dados['nome'];
                $temp['email'] = $dados['email'];
                $temp['genero'] = $dados['genero'];
                $temp['fotoURL'] = $dados['fotoURL'];
                $temp['socialID'] = $dados['socialID'];
                $temp['cpf'] = $dados['cpf'];
                $temp['nascimento'] = $dados['nascimento'];
                $temp['telefone'] = $telefone['numero'];
                $temp['endereco'] = $end['endereco'];
                $temp['bairro'] = $end['bairro'];
                $temp['cidade'] = $end['cidade'];
                $temp['UF'] = $end['uf'];

                echo json_encode($temp);
            }
        }
	} 	
	$con->close();	
?>