export class CorpoMensagem {
    public id:number;
    public remetente:string;
    public destinatario:string;
    public mensagem:string;
    public data:string;
    public lida:number;

    constructor(){
        this.mensagem = "";
        this.lida = 0;
    }
}