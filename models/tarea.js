import { nanoid } from "nanoid";

class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ) {
        this.desc = desc;
        this.id = nanoid();
        this.completadoEn = null;
    }
    
}


export default Tarea;