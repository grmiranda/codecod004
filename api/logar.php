<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
        $request = json_decode($postdata);
        $socialID =  $request->token;
        $push = $request->push;
        
        $sql = "SELECT * FROM usuario WHERE socialID = '$socialID'";
        $result = $con->query($sql);

        $num = $result->num_rows;
        $vetor   = array();

        if ($num !== 1) {
            $vetor[]="cadastro";
            $vetor[]=$socialID;
            echo json_encode($vetor);
        } else {

            $dados  = $result->fetch_assoc();
            $banido = $dados['banido'];
            $id     = $dados['IDUsuario'];


            $sql = "UPDATE usuario SET Push = '' WHERE Push = '$push'";
            $con->query($sql);

            $sql = "UPDATE usuario SET Push =  '$push' WHERE socialID = '$socialID'";
            $result = $con->query($sql);            

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
                $sql = "UPDATE usuario SET Push = '' WHERE socialID = '$socialID'";
                $result = $con->query($sql);
                $vetor[]="banido";
                $vetor[]=$socialID;
                echo json_encode($vetor);
            } else {

                if ($dados['genero'] == 'm'){
                    $dados['genero'] = 'male';
                } else {
                    $dados['genero'] = 'female';
                }
                $vetor[]="existe";
                $vetor[]=$dados;


                echo json_encode($vetor);
            }
        }      
	}

    $con->close();
?>