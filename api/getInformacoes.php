<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

class Questao
{
    public $pergunta;
    public $resposta;

    function __construct($pergunta, $resposta)
    {
        $this->pergunta = $pergunta;
        $this->resposta = $resposta;
    }
}

$questoes = array();

$questoes[] = new Questao('Qual o endereço do gabinete do vereador?', 'Prédio anexo da Câmara Municipal, sala 301, 3º andar.');
$questoes[] = new Questao('Qual o telefone para contato do gabinete?', '(75) 3321-8728 | (75) 3321-8748');
$questoes[] = new Questao('Qual o horário de funcionamento do gabinete?', 'De segunda à sexta-feira, das 8h às 12h, das 14h às 18h.');
$questoes[] = new Questao('Quais os dias de Sessão na Câmara Municipal?', 'Segunda, quarta e sexta, a partir das 8h40.');
$questoes[] = new Questao('Qual o partido do vereador Luiz da Feira?', 'Partido Pátria Livre (PPL)');
$questoes[] = new Questao('Com quantos votos o vereador Luiz da Feira foi eleito?', '2.566 votos');
$questoes[] = new Questao('Quais são os dias de atendimento ao público no gabinete?', 'Quinta e sexta-feira, a partir das 8h.');
$questoes[] = new Questao('Qual é o facebook do vereador?', 'www.facebook.com/luizdafeira54111');
$questoes[] = new Questao('Qual é o instagram do vereador?', '@vereadorluizdafeira');
$questoes[] = new Questao('Qual papel de um vereador na câmara?', '');
$questoes[] = new Questao('Quais os procedimentos para um projeto de lei ser aceito?', '');
$questoes[] = new Questao('Quais os procedimentos para uma solicitação ser aceita?', '');
$questoes[] = new Questao('Como funciona o sitema de pontuação do troféu cidadania?', '');

$the_request = &$_GET;

if (isset($_GET["info"])) {
    echo json_encode($questoes);
} else {
    echo json_encode(new Questao('', ''));
}
?>