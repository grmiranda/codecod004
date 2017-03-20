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
		$telefone = $request->telefone;
		$endereco = $request->endereco;
		$bairro   = $request->bairro;
		$cidade   = $request->cidade;
		$UF       = $request->UF;

		$sql = "SELECT * FROM usuario WHERE socialID = '$socialID'";
        $result = $con->query($sql);

		$num = $result->num_rows;

		if ($num !== 1){

			echo json_encode(false);

		} else {
			$vetor = array();
			$dados = $result->fetch_assoc();

			if ($genero == 'male'){
				$genero = 'm';
			} else {
				$genero = 'f';
			}

			$sql = "UPDATE usuario SET nome = '$nome', email = '$email', nascimento = '$nasc', cpf = '$cpf', fotoURL = '$fotoURL', genero = '$genero' WHERE socialID = '$socialID'";
			$con->query($sql);

			if ($genero == 'm'){
				$genero == 'male';
			} else {
				$genero = 'female';
			}

			

			$vetor['IDUsuario']  = $dados['IDUsuario'];
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
			$vetor['permissao']  = $dados['permissao'];
			$vetor['Push']       = $dados['Push'];
			$vetor['pontos']     = $dados['pontos'];

			echo json_encode($vetor);

		}
	}
	$con->close();
?>