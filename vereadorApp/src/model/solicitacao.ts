export class Solicitacao {

  public IDSolicitacao: number;
  public titulo: string = "";
  public descricao: string = "";
  public fotoURL: string[] = [];
  public andamento: string = "";
  public dataEntrada: string = "";
  public dataRealizacao: string = "";
  public estado: string;
  public IDUsuario: number = 8;
  public Push;
  public pushs = [];
  public ids = [];
  public nomeUsuario: string = "";
  public fotoUsuario: string = "";

  constructor() {

  }
  converteSigraToTxt() {
    if (this.estado == "sa") {
      this.estado = "Sob Avaliação de administradores"
    } else if (this.estado == "ap") {
      this.estado = "Solicitação aceita pela administração"
    } else if (this.estado == "sl") {
      this.estado = "Solicitado na câmara de vereadores"
    } else if (this.estado == "cp") {
      this.estado = "Solicitação foi implementada"
    } else if (this.estado == "cn") {
      this.estado = "Solicitação rejeitado pela câmara de vereadores"
    }
  }
}
