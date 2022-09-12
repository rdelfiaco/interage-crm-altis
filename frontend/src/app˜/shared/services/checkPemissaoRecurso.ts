import { Usuario } from '../../models/usuario';

import { LocalStorage } from "./localStorage";



export class CheckPermissaoRecurso{

    
    private localStorage: LocalStorage = new LocalStorage();
    private usuarioLogado = this.localStorage.getLocalStorage('usuarioLogado') as Usuario;


    usuarioLocadoAcessaRecurso(recurso){
        let permissoesUsuarioLocado = [];
        (this.usuarioLogado.permissoes || []).forEach(elem =>{
            permissoesUsuarioLocado.push(elem.id_recursos)
        });

        if (permissoesUsuarioLocado.indexOf(recurso) != -1) return true;
    }
}
 
