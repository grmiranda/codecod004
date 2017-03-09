export class CorpoMensagem {
    public id:number;               //id da mensagem no banco
    public remetente:string;        //id do remetente
    public destinatario:string;     //id do destinatario
    public mensagem:string;         //mensagem
    public data:string;             //data de envio
    public lida:number;             //controle se mensagem foi lida ou nao
    public nome: string;            //nome da pessoa com quem fez comunicacao
    public foto: string;            //foto da pessoa que fez operacao
    public marcado: boolean;        //controle se a mensagem foi selecionada
    public IDOutro: string;        //id da pessoa com quem fez a operacao

    constructor(){
        this.mensagem = "";
        this.lida = 0;
        this.destinatario = "";
        this.nome = "";
        this.foto = "";
        this.IDOutro = "";
    }
}