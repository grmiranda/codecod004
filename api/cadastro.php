<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);

		$nome      = $request->nome;
		$email     = $request->email;
		$nasc      = $request->nascimento;
		$cpf       = $request->cpf;
		$fotoURL   = $request->fotoURL;
		$genero    = $request->genero;
		$socialID  = $request->token;
		$permissao = 0;
		$banido    = 0;

		$telefone = $request->telefone;
		
		$endereco = $request->endereco;
		$bairro   = $request->bairro;
		$cidade   = $request->cidade;
		$UF       = $request->UF;

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
?>