<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

class Instituicao {
public $nome;
public $telefone;

    function __construct($nome,$telefone){
        $this->nome = $nome;
        $this->telefone = $telefone;
    }
}

class Telefone {
    public $categoria;
    public $instituicao;

    function __construct($categoria,$instituicao){
        $this->categoria = $categoria;
        $this->instituicao = $instituicao;
    }
}



$telefones = array();
$instituicoes = array();

//Secretarias
$instituicoes[] = new Instituicao("Secretaria de Governo", "(75) 3602-4532");
$instituicoes[] = new Instituicao("Secretaria de Administração", "(75) 3602-8311");
$instituicoes[] = new Instituicao("Secretaria da Fazenda", "(75) 3602-8400");
$instituicoes[] = new Instituicao("Secretaria de Comunicação", "(75) 3602-4589");
$instituicoes[] = new Instituicao("Secretaria de Educação", "(75) 3624-8450");
$instituicoes[] = new Instituicao("Secretaria de Meio Ambiente", "(75) 3322-9300");
$instituicoes[] = new Instituicao("Secretaria de Desenvolvimento Urbano", "(75) 3602-8358");
$instituicoes[] = new Instituicao("Secretaria de Agricutura", "(75) 3602-4569");
$instituicoes[] = new Instituicao("Secretaria de Saúde", "(75) 3612-6600");
$instituicoes[] = new Instituicao("Secretaria de Saúde", "(75) 3625-1068");
$instituicoes[] = new Instituicao("Secretaria de Serviços Públicos", "(75) 3602-8100");
$instituicoes[] = new Instituicao("Secretaria do Trabalho,Turismo e Desenvolvimento Econômico", "(75) 3604-0550");
$instituicoes[] = new Instituicao("Secretaria de Cultura, Esporte e Lazer", "(75) 3623-5213");
$instituicoes[] = new Instituicao("Secretaria de Cultura, Esporte e Lazer", "(75) 3614-6972");
$instituicoes[] = new Instituicao("Secretaria de Desenvolvimento Social", "(75) 3221-3439");
$instituicoes[] = new Instituicao("Secretaria de Planejamento", "(75) 3602-8351");
$instituicoes[] = new Instituicao("Secretaria de Transporte e Trânsito", "(75) 3603-7301");
$instituicoes[] = new Instituicao("Secretaria de Habitação", "(75) 3614-9058");
$instituicoes[] = new Instituicao("Superintendência Municipal de Trânsito", "(75) 3623-3580");
$instituicoes[] = new Instituicao("Secretaria de Prevenção à Violência", "(75) 3221-1257");
$telefones[] = new Telefone("Secretarias", $instituicoes);

//Departamentos
$instituicoes = array();
$instituicoes[] = new Instituicao("DEPT. Recursos Humanos", "(75) 3602-8305");
$instituicoes[] = new Instituicao("DEPT. Recursos Humanos", "(75) 3602-8343");
$instituicoes[] = new Instituicao("DEPT. Licitação e Contratos", "(75) 3602-8376");
$instituicoes[] = new Instituicao("DEPT. Licitação e Contratos", "(75) 3602-8345");
$instituicoes[] = new Instituicao("DEPT. Administração Geral", "3602-8312 / 8350");
$instituicoes[] = new Instituicao("DEPT. Modernização e Informática", "(75)	3602-8340");
$instituicoes[] = new Instituicao("DEPT. Modernização e Informática", "(75)	3602-8341");
$instituicoes[] = new Instituicao("DEPT. Veículos", "(75) 3623-6932");
$instituicoes[] = new Instituicao("DEPT. Veículos", "(75) 3223 - 8005");
$instituicoes[] = new Instituicao("DEPT. Patrimônio", "(75) 3602-8331");
$telefones[] = new Telefone("Departamento", $instituicoes);

//Gabinete
$instituicoes[] = new Instituicao("Gabinete do Prefeito", "(75) 3602-4510");
$instituicoes[] = new Instituicao("Gabinete do Secretário", "(75) 3602-8315");
$instituicoes[] = new Instituicao("Gabinete do Secretário", "(75) 3602-8338");
$telefones[] = new Telefone("Gabinete", $instituicoes);

//procuradorias
$instituicoes[] = new Instituicao("Procuradoria Geral do Município", "(75) 3226-1404");
$instituicoes[] = new Instituicao("Procuradoria Geral do Município", "(75) 3623-7222");
$telefones[] = new Telefone("Procuradoria", $instituicoes);

//fundações e institutos
$instituicoes[] = new Instituicao("Fundação Cultural Egberto Tavares Costa", "(75) 2101-8602");
$instituicoes[] = new Instituicao("Instituto de Previdência de Feira de Santana", "(75) 3623-5991");
$instituicoes[] = new Instituicao("Fundação Hospitalar de Feira de Santana", "(75) 3602-7100");
$instituicoes[] = new Instituicao("Instituto de Previdência", "(75) 3623-5991");
$telefones[] = new Telefone("Fundação e Instituto", $instituicoes);

//Clinicas municipais
$instituicoes[] = new Instituicao("Centro Municipal de Diagnóstico por Imagem", "(75) 3602-7335");
$instituicoes[] = new Instituicao("Clínica Municipal de Prevenção do Câncer", "(75) 3602-7338");
$telefones[] = new Telefone("Fundação e Instituto", $instituicoes);

//junta de Serviço militar
$instituicoes[] = new Instituicao("Junta do Serviço Militar", "(75) 3623-8885");
$telefones[] = new Telefone("Junta do Serviço Militar", $instituicoes);

//forum filinto bastos
$instituicoes[] = new Instituicao("Fórum - Telefone Geral", "(75) 3602-5900");
$instituicoes[] = new Instituicao("Fórum - Recepção", "(75) 3602-5977");
$instituicoes[] = new Instituicao("Fórum - Supervisão", "(75) 3602-5990");
$instituicoes[] = new Instituicao("Fórum - Secretária", "(75) 3602-5997");
$instituicoes[] = new Instituicao("Fórum - Secretária", "(75) 3602-5995");
$instituicoes[] = new Instituicao("Fórum - Sala 1", "(75) 3602-5961");
$instituicoes[] = new Instituicao("Fórum - Sala 2", "(75) 3062-5998");
$instituicoes[] = new Instituicao("Fórum - Balcão de Justiça e Cidadania – Secretária Jurídica", " (75) 3602-5996");
$telefones[] = new Telefone("Fórum Desembargador Filinto Bastos", $instituicoes);


//Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais
$instituicoes[] = new Instituicao("1ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - cartório", "(75) 3602-5945");
$instituicoes[] = new Instituicao("1ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - Gabinete", "(75) 3602-5946");
$instituicoes[] = new Instituicao("2ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - cartório", "(75) 3602-5929");
$instituicoes[] = new Instituicao("2ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - Gabinete", "(75) 3602-5943");
$instituicoes[] = new Instituicao("3ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - cartório", "(75) 3602-5927");
$instituicoes[] = new Instituicao("3ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - Gabinete", "(75) 3602-5926");
$instituicoes[] = new Instituicao("4ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - cartório", "(75) 3602-5941");
$instituicoes[] = new Instituicao("4ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - Gabinete", "(75) 3602-5924");
$instituicoes[] = new Instituicao("5ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - cartório", "(75) 3602-5942");
$instituicoes[] = new Instituicao("5ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - Gabinete", "(75) 3602-5964");
$instituicoes[] = new Instituicao("6ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - cartório", "(75) 3602-5936");
$instituicoes[] = new Instituicao("6ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - Gabinete", "(75) 3602-5950");
$instituicoes[] = new Instituicao("7ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - cartório", "(75) 3602-5905");
$instituicoes[] = new Instituicao("7ª Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais - Gabinete", "(75) 3602-5962");
$telefones[] = new Telefone("Vara dos Feitos às Relações de Consumo. Cíveis e Comerciais", $instituicoes);


//$instituicoes[] = new Instituicao("Arquivo Público", "(75) 3603-7770");
//$instituicoes[] = new Instituicao("Núcleo de Conciliação Tributária da Prefeitura", "(75) 3062-5980");
//$instituicoes[] = new Instituicao("OAB", "(75) 3623-9010");
//$instituicoes[] = new Instituicao("OAB", "(75) 3623-2954");
//$instituicoes[] = new Instituicao("SAJ/ UEFS", "(75) 3221-1658");
//$instituicoes[] = new Instituicao("OAB", "(75) 3623-2954");
//$instituicoes[] = new Instituicao("OAB", "(75) 3623-2954");
//$instituicoes[] = new Instituicao("OAB", "(75) 3623-2954");

$the_request = $_GET;

if (isset($_GET["info"])){
    echo json_encode($telefones);
}else{
    echo json_encode($telefones);
}
?>