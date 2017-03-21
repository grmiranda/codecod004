export class LikeProjetoDeLei {

  public IDAvaliaPL: number;
  public apoio: string;
  public IDUsuario: number;
  public IDPL: number;
  public IDUsuarioPL: number;

  constructor(apoio, idU, idPL, idUPL) {
    this.apoio = apoio; //tipo de apoio s/n
    this.IDUsuario = idU; //id do usuario que curtiu
    this.IDPL = idPL; //id do projeto de lei
    this.IDUsuarioPL = idUPL; //usuario que postou o projeto de lei
  }
}
