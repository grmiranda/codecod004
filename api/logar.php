<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);
		
        $socialID = $request->token;

        $sql = "SELECT * FROM usuario WHERE socialID = '$socialID'";
        $result = $con->query($sql);

        $num = $result->num_rows;

        if ($num !== 1) {
            echo json_encode("cadastro");
        } else {
            $dados  = $result->fetch_assoc();
            $banido = $dados['banido'];
            $id     = $dados['IDUsuario'];


            $sql = "SELECT * FROM telefone WHERE IDUsuario = '$id'";
            $result = $con->query($sql);

            $telefone = $result->fetch_assoc();

            $dados['telefone'] = $telefone['numero'];

            $sql = "SELECT * FROM endereco WHERE IDUsuario = '$id'";
            $result = $con->query($sql);

            $end = $result->fetch_assoc();

            $dados['endereco'] = $end['endereco'];
            $dados['bairro']   = $end['bairro'];
            $dados['cidade']   = $end['cidade'];
            $dados['UF']       = $end['uf'];

            if ($banido == 1) {
                echo json_encode("banido");
            } else {

                if ($dados['genero'] == 'm'){
                    $dados['genero'] = 'male';
                } else {
                    $dados['genero'] = 'female';
                }

                echo json_encode($dados);
            }
        }      
	}

    $con->close();
?>