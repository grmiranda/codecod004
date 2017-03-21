<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php

    $the_request = &$_POST;
    $postdata = file_get_contents("php://input");
    $vetor   = array();

	if (isset($_GET["evento"])){
        $the_request = &$_GET;
		if ($_GET["evento"] == ""){
            $sql = "SELECT * FROM evento";
            $result = $con->query($sql);
            while ($row=$result->fetch_assoc()){
                if($row['EventoDiario'] == '0'){
                    $row['EventoDiario'] = false;
                } else {
                    $row['EventoDiario'] = true;
                }
                $vetor[] = $row;
            }
            echo json_encode($vetor);
		} else {
            echo json_encode(false);
        }
	} else if(isset($postdata)){
        $the_request = &$_POST;
        $postdata = file_get_contents("php://input");
        $request  = json_decode($postdata);
        $Titulo   = $request->Titulo;
        $Descricao   = $request->Descricao;
        $DataInicio   = $request->DataInicio;
        $DataFim   = $request->DataFim;
        $Allday   = $request->Allday;
        $EventoDiario   = $request->EventoDiario;
        $IDUsuario   = $request->IDUsuario;
        $Local   = $request->Local;

        if($Allday == true){
            $EventoDiario = "1";
        } else{
            $EventoDiario = "0";
        }

        $sql = "INSERT INTO evento (DataInicio, DataTermino, Titulo, Descricao, Local, IDUsuario, EventoDiario) 
                VALUES ('$DataInicio', '$DataFim', '$Titulo', '$Descricao', '$Local', '$IDUsuario', '$EventoDiario')";
        $con->query($sql);

        $sql = "SELECT * FROM evento WHERE DataInicio = '$DataInicio' AND DataTermino = '$DataFim' AND Titulo = '$Titulo' AND Descricao = '$Descricao' AND Local = '$Local' AND IDUsuario = '$IDUsuario' AND EventoDiario ='$EventoDiario'";
        $result = $con->query($sql);
        while ($row=$result->fetch_assoc()){
            if($row['EventoDiario'] == '0'){
                $row['EventoDiario'] = false;
            } else {
                $row['EventoDiario'] = true;
            }
            $vetor[] = $row;
        }


        echo json_encode($vetor[0]);

    } else {
        echo json_encode(false);
    }
	$con->close();	
?>