export class Agenda {
    public id:          string;
    public compromisso: string;
    public cachorro:    string;
    public data:        string;

    constructor(obj?: Partial<Agenda>) {
    if (obj) {
        this.id =           obj.id;
        this.compromisso=   obj.compromisso;
        this.cachorro=      obj.cachorro;
        this.data=          obj.data;
      }
    }
  
    toString() {
        const objeto = `{
            "id":           "${this.id}", 
            "compromisso":  "${this.compromisso}",
            "cachorro":     "${this.cachorro}",
            "data":         "${this.data}",
        }`;
        return objeto;
    }
  
    toFirestore() {
        const agenda = {
            id:             this.id,
            compromisso:    this.compromisso,
            cachorro:       this.cachorro,
            data:           this.data
        };
        return agenda;
    }
}