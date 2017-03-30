<?php
/*
 * Pontua o Usuario do id recebido com um pontuacao de acordo com o tipo passado no parametro
*/
function pontuarUsuario($IDUsuario, $tipo, $con)
{


    switch ($tipo) {
        case 1: //solicitacao aceita pelo app
            $pontos = 30;
            break;
        case 2: //solicitacao solicitada na camara
            $pontos = 100;
            break;
        case 3: //solicitacao realizada
            $pontos = 500;
            break;
        case 4: //receber curtida em solicitacao
            $pontos = 10;
            break;
        case 5: //sugestão de projeto de lei aceita
            $pontos = 200;
            break;
        case 6: //projeto de lei aceito na camara
            $pontos = 800;
            break;
        case 7: //projeto de lei efetivado
            $pontos = 7000;
            break;
        case 8: //receber curtida em projeto de lei
            $pontos = 15;
            break;
        case 9: //depoimento aceito
            $pontos = 30;
            break;
    }

    $sql = "SELECT * FROM usuario WHERE IDUsuario = '$IDUsuario'";
    $result = $con->query($sql);
    $numrow = $result->num_rows;

    if ($numrow == 1) {
        $row = $result->fetch_assoc();
        $pontos = $row['pontos'] + $pontos;

        $sql = "UPDATE usuario SET pontos = '$pontos' WHERE IDUsuario = '$IDUsuario'";
        $con->query($sql);
    }

    return;

}

?>