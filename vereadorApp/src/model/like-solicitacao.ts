export class LikeSolicitacao {

  public IDApoioSolicitacao: number;
  public tipo: string;
  public IDSolicitacao: number;
  public IDUsuario: number;
  public IDUsuarioSolicitacao: number = 8;

  constructor(tipo, idU, idS, idUS) {
    this.tipo = tipo; //tipo de curtida like/dislike
    this.IDUsuario = idU; //id do usuario que curtiu
    this.IDSolicitacao = idS; //id da Publicacao
    this.IDUsuarioSolicitacao = idUS; //id do usuario dono da Publicacao
  }
}
