export class LikeSolicitacao {

  public IDApoioSolicitacao: number;
  public tipo: string;
  public IDSolicitacao: number;
  public IDUsuario: number;

  constructor(tipo, idU, idS) {
    this.tipo = tipo;
    this.IDUsuario = idU;
    this.IDSolicitacao = idS;
  }
}
