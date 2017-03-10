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
		$socialID  = $request->socialID;
		$permissao = 0;
		$push      = $request->Push;
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

			$vetor = array();

			if ($genero == 'male'){
				$genero = 'm';
			} else {
				$genero = 'f';
			}

			$sql = "INSERT INTO usuario (nome, email, nascimento, cpf, fotoURL, genero, socialID, permissao, banido, Push) VALUES ('$nome', '$email', '$nasc', '$cpf', '$fotoURL', '$genero', '$socialID', '$permissao', '$banido', '$push')";
			$con->query($sql);
			
			$sql = "SELECT * FROM usuario WHERE socialID = '$socialID'";
			$result = $con->query($sql);

			$dados = $result->fetch_assoc();

			$id = $dados['IDUsuario'];

			if ($genero == 'm'){
				$genero == 'male';
			} else {
				$genero = 'female';
			}

			$vetor['IDUsuario']         = $id;
			$vetor['nome']       = $nome;
			$vetor['email']      = $email;
 			$vetor['genero']     = $genero;
			$vetor['fotoURL']    = $fotoURL;
			$vetor['socialID']   = $socialID;
			$vetor['cpf']        = $cpf;
			$vetor['nascimento'] = $nasc;
			$vetor['telefone']   = $telefone;
			$vetor['endereco']   = $endereco;
			$vetor['bairro']     = $bairro;
			$vetor['cidade']     = $cidade;
			$vetor['UF']         = $UF;
			$vetor['permissao']  = $permissao;
			$vetor['Push']       = $push;

			$sql = "INSERT INTO telefone (numero, IDUsuario) VALUES ('$telefone', '$id')";
			$con->query($sql);
			
			$sql = "INSERT INTO endereco (endereco, bairro, cidade, uf, IDUsuario) VALUES ('$endereco', '$bairro', '$cidade', '$UF', '$id')";
			$con->query($sql);
			
			echo json_encode($vetor);

		} else {
			echo json_encode(false);
		}
	}
	$con->close();
?>