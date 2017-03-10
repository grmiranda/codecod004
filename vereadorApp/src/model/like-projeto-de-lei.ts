export class LikeProjetoDeLei {

  public IDAvaliaPL: number;
  public apoio: string;
  public IDUsuario: number;
  public IDPL: number;

  constructor(apoio, idU, idPL) {
    this.apoio = apoio;
    this.IDUsuario = idU;
    this.IDPL = idPL;
  }
}
