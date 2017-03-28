export class ProjetoDeLei{

    public IDPL: number;
    public titulo: string = "";
    public ementa: string = "";
    public fotoURL: string = "";
    public fotos: string[] = [];
    public IDUsuario: number;
    public estado: string;
    //sa - sob aprovação pr-proposto pelo publico
    //ap - aprovada
    //pr - proposta recusada
    //tr - tramitando na camara
    //cp - concluido positivo
    //cn - faça analogia
    public nomeUsuario:string = "";
    public fotoUsuario:string = "";
    constructor(){

    }

}
