export class Evento {

    public IDEvento: string;
    public Titulo: string;
    public Descricao: string;
    public DataInicio: string;
    public DataFim: string;
    public Allday: boolean;
    public IDUsuario: string;
    public Local: string;

    constructor() {
        this.IDEvento = "0";
        this.IDUsuario = "";
        this.Titulo = "";
        this.Descricao = "";
        this.Allday = false;
        this.DataInicio = "";
        this.DataFim = "";
        this.Local = "";

    }

}
