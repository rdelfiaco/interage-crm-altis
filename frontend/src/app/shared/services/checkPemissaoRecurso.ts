import { UsuarioLogado } from '../../models/usuarioLogado';

import { LocalStorage } from "./localStorage";



export class CheckPermissaoRecurso{

    
    private localStorage: LocalStorage = new LocalStorage();
    private usuarioLogado = this.localStorage.getLocalStorage('usuarioLogado') as UsuarioLogado;


    usuarioLocadoAcessaRecurso(recurso){
        debugger
        let permissoesUsuarioLocado = [];
        (this.usuarioLogado.permissoes || []).forEach(elem =>{
            permissoesUsuarioLocado.push(elem.id_recursos)
        });

        if (permissoesUsuarioLocado.indexOf(recurso) != -1) return true;
    }
}
 
