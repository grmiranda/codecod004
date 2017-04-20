export class ProjetoDeLei {

    public IDPL: number;
    public titulo: string = "";
    public ementa: string = "";
    public fotoURL: string[] = [];
    public IDUsuario: number;
    public estado: string;
    //sa - sob aprovação pr-proposto pelo publico
    //ap - aprovada
    //pr - proposta recusada
    //tr - tramitando na camara
    //cp - concluido positivo
    //cn - faça analogia
    public nomeUsuario: string = "";
    public fotoUsuario: string = "";
    public Push;
    public pushs = [];
    public ids = [];

    constructor() {

    }

    converteSigraToTxt() {
        if (this.estado == "sa") {
            this.estado = "Sob Avaliação de administradores"
        } else if (this.estado == "ap") {
            this.estado = "Projeto aceita pela administração"
        } else if (this.estado == "tr") {
            this.estado = "tramitando na câmara de vereadores"
        } else if (this.estado == "cp") {
            this.estado = "Projeto está sendo aplicado"
        } else if (this.estado == "cn") {
            this.estado = "Projeto rejeitado pela câmara de vereadores"
        }
    }

}
