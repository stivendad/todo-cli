import Tarea from "./tarea.js";

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {}
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        // console.log(this.listadoArr);

        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const index = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${index} ${desc} :: ${(completadoEn) ? completadoEn.green : estado}`);

            
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        const completada = this.listadoArr.filter((tarea) => {
            const {completadoEn} = tarea;
            return (completadas === true ) ? completadoEn !== null : completadoEn === null;
        })

        completada.forEach((tarea, i) => {
            const index = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${index} ${desc} :: ${estado}`);
        });

    } 

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

    get listadoArr () {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }
}



export default Tareas;