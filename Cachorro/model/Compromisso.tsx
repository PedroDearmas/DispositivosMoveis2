export class Compromisso {
    public id:        string;
    public descricao: string;
    public valor:     number;
    public local:     string;
  
    constructor(obj?: Partial<Compromisso>) {
      if (obj) {
        this.id=        obj.id;
        this.descricao= obj.descricao;
        this.valor=     obj.valor;
        this.local=     obj.local;
      }
    }
  
    toString() {
        const objeto = `{
            "id":         "${this.id}",
            "descricao":  "${this.descricao}",
            "valor":      "${this.valor}",
            "local":       "${this.local}",
        }`;
        return objeto;
    }
  
    toFirestore() {
      const servico = {
        id:         this.id,
        descricao:  this.descricao,
        valor:      this.valor,
        local:      this.local,
      };
      return servico;
    }
  }