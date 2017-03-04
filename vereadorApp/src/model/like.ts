export class Like {

  public IDApoioSolicitacao: number;
  public tipo: string;
  public IDSolicitacao: string;
  public IDUsuario: string;

  constructor(tipo, idU, idS) {
    this.tipo = tipo;
    this.IDUsuario = idU;
    this.IDSolicitacao = idS;
  }
}
