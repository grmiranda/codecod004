export class CorpoMensagem {
    public id:number;
    public remetente:string;
    public destinatario:string;
    public mensagem:string;
    public data:string;
    public lida:number;
    public nome: string;
    public foto: string;
    public marcado: boolean;

    constructor(){
        this.mensagem = "";
        this.lida = 0;
        this.destinatario = "";
        this.nome = "";
        this.foto = "";
    }
}