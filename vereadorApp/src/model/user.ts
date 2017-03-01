export class Usuario {

    public id: String;
    public nome: String;
    public email: String;
    public genero: String;
    public fotoURL: String;
    public socialID: String;
    public cpf: String; //opcional
    public nascimento: String;
    public telefone: String; //obrigatório
    public endereco: String;
    public bairro: String;
    public cidade: String;
    public UF: String;

    constructor() {

        this.nome = "";
        this.email = "";
        this.genero = "";
        this.fotoURL = "";
        this.fbID = "";
        this.gID = "";
        this.cpf = "";
        this.nascimento = "";
        this.telefone = "";
        this.endereco = "";
        this.bairro = "";
        this.cidade = "";
        this.UF = "";
    }

}