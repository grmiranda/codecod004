<?php 
	class Questao { 
		public $pergunta; 
		public $resposta;
		
		function __construct($pergunta,$resposta){
			$this->pergunta = $pergunta;
			$this->resposta = $resposta;
		}
	}
	
	$questoes = array();
	
	$questoes[] = new Questao('qual?', 'sim');
	$questoes[] = new Questao('onde?', 'nao');
	
	$the_request = &$_GET;
	
	if (isset($_GET["info"])){
		echo json_encode($questoes);
	}else{
		echo json_encode(new Questao('', ''));
	}
?>