import colors from 'colors';
import { inquirerMenu, leerInput, pausa, listadoTareasBorrar, confirmar, mostrarListadoCheckList } from './helpers/inquirer.js';
import Tareas from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';


const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu(); // Imprimir menú

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if(id !== '0') {
                    const confirmarBorrado = await confirmar('¿Está seguro?') 
                    if ( confirmarBorrado ) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
            
        }


        guardarDB(tareas.listadoArr);


        console.log('\n');

        await pausa();

    } while (opt !== '0');


    // pausa();
}

main();