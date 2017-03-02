<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);
		
		$user      = $request->usuario;

		$nome      = $user->nome;
		$email     = $user->email;
		$nasc      = $user->nascimento;
		$cpf       = $user->cpf;
		$fotoURL   = $user->fotoURL;
		$genero    = $user->genero;
		$socialID  = $user->socialID;
		$permissao = 0;
		$banido    = 0;

		$telefone = $user->telefone;
		
		$endereco = $user->endereco;
		$bairro   = $user->bairro;
		$cidade   = $user->cidade;
		$UF       = $user->UF;

		$sql = "SELECT * FROM usuario WHERE socialID = '$socialID'";
        $result = $con->query($sql);

		$num = $result->num_rows;

		if ($num !== 1 && $nome != ""){

			if ($genero == 'male'){
				$genero = 'm';
			} else {
				$genero = 'f';
			}

			$sql = "INSERT INTO usuario (nome, email, nascimento, cpf, fotoURL, genero, socialID, permissao, banido)
					VALUES ('$nome', '$email', '$nasc', '$cpf', '$fotoURL', '$genero', '$socialID', '$permissao', '$banido')";
			$con->query($sql);
			
			$sql = "SELECT * FROM usuario WHERE socialID = '$socialID'";
			$result = $con->query($sql);

			$dados = $result->fetch_assoc();

			$id = $dados['IDUsuario'];

			$sql = "INSERT INTO telefone (numero, IDUsuario) VALUES ('$telefone', '$id')";
			$con->query($sql);

			$dados['telefone'] = $telefone;

			$sql = "INSERT INTO endereco (endereco, bairro, cidade, uf, IDUsuario) VALUES ('$endereco', '$bairro', '$cidade', '$UF', '$id')";
			$con->query($sql);

			$dados['endereco'] = $endereco;
			$dados['bairro']   = $bairro;
			$dados['cidade']   = $cidade;
			$dados['UF']       = $UF;

			echo json_encode($dados);

		} else {
			echo json_encode(false);
		}
	}
	$con->close();
?>