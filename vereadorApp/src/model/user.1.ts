export class User1 {

    public id: String;
    public name: String;
    public email: String;
    public gender: String;
    public picture: String;
    public fbID: String;
    public gID: String;
    public cpf: String; //opcional
    public nascimento: String;
    public telefone: String; //obrigatório
    public endereco: String;
    public bairro: String;
    public cidade: String;
    public UF: String;

    constructor() {

        this.name = "";
        this.email = "";
        this.gender = "";
        this.picture = "";
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