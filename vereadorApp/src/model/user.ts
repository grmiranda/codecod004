export class Usuario {

    public IDUsuario: string;
    public nome: string;
    public email: string;
    public genero: string;
    public fotoURL: string;
    public socialID: string;
    public cpf: string; //opcional
    public nascimento: string;
    public telefone: string; //obrigatório
    public endereco: string;
    public bairro: string;
    public cidade: string;
    public UF: string;
    public permissao : number;
    public Push : string;
    public pontos : number;

    constructor() {
        this.IDUsuario ="0";
        this.nome = "";
        this.email = "";
        this.genero = "";
        this.fotoURL = "";
        this.socialID = "";
        this.cpf = "";
        this.nascimento = "";
        this.telefone = "";
        this.endereco = "";
        this.bairro = "";
        this.cidade = "";
        this.UF = "";
    }

}
