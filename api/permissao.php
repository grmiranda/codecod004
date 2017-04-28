<?php
    include 'mySQL.php';
    require 'mySQL.php';
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");

	if (isset($postdata)){
		$id  = json_decode($postdata);

		$sql = "SELECT * FROM usuario WHERE IDUsuario = '$id'";
        $result = $con->query($sql);
		$row=$result->fetch_assoc();
		
		if($row['permissao'] == 1){
			$sql = "UPDATE usuario SET permissao = 0 WHERE IDUsuario = '$id'";
			$con->query($sql);
		} else if ($row['permissao'] == 0){
			$sql = "UPDATE usuario SET permissao = 1 WHERE IDUsuario = '$id'";
			$con->query($sql);
		}
		
		$sql = "SELECT * FROM telefone WHERE IDUsuario = '$id'";
		$result1 = $con->query($sql);
        $telefone = $result1->fetch_assoc();

        $sql = "SELECT * FROM endereco WHERE IDUsuario = '$id'";
        $result1 = $con->query($sql);
        $end = $result1->fetch_assoc();
			
		$sql = "SELECT * FROM usuario WHERE IDUsuario = '$id'";
        $result = $con->query($sql);
		$row=$result->fetch_assoc();

                if ($row['genero'] == 'm'){
                    $row['genero'] = 'male';
                } else {
                    $row['genero'] = 'female';
                }
				
				if($row['permissao'] == 1){
					$temp['permissao'] = "Administrador";
				} else {
					$temp['permissao'] = "Comum";
				}
				
				if($row['banido'] == 1){
					$temp['banido'] = "Banida";
				} else {
					$temp['banido'] = "Ativa";
				}

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
            

            echo json_encode($temp);
		
    
	}
	$con->close();
?>
