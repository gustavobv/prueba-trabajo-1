<template>
    <div id="Listas_modificar" v-if="id_trabajador">
        <div>
            <table v-for="campo of lista_campos">
                <thead>
                    <tr>
                        <th>{{campo}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(val,indice) in listas[campo]">
                        <td>
                            <input type="text" v-model="listas[campo][indice]" v-on:keyup="tr_mod(campo,indice)" v-bind:id="campo+'_'+indice" >
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button v-on:click="guardar()">Guardar</button>
        <button v-on:click="limpiar()">Limpiar</button>
        <div>
            <span>{{mensaje}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Listas_modificar',
    data() {
      return {
        id_trabajador:'',
        trabajador:'',
        titulo: 'modificar listas',
        listas: {a:[]},
        lista_campos_rec:[],
        lista_campos:[],
        mensaje:''
      }
    },
    mounted() {
        this.$parent.listas_modificar_listo(this);
    },
    methods: {
        agregar_campos(lista){
            for(var i in lista) this.lista_campos_rec[i] = lista[i];
            this.lista_campos = lista;
            this.lista_campos.push('a')
            for(var i in lista) {
                this.listas[lista[i]] = [];
                this.listas[lista[i]].push('')
            }
        },//agregar_campos
        tr_mod(campo,indice){
            if(event.key == "Enter" && this.listas[campo][indice+1] != ''){
                this.listas[campo].splice((indice+1),0, '');
                this.listas['a'].push('')
                this.$nextTick(function () {
                    document.getElementById(campo+'_'+(indice+1)).focus();
                })
            }else{
                if((event.key == "Delete" || event.key == "Backspace") && this.listas[campo][indice] == '' && this.listas[campo].length > 1) {
                    this.listas[campo].splice(indice, 1);
                    this.listas['a'].push('');
                    this.$nextTick(function () {
                        document.getElementById(campo+'_'+(indice-1)).focus();
                    })
                }
            }//if
        },//tr_mod
        guardar(){
            var listas = {};
            for(var i in this.lista_campos_rec) {
                listas[this.lista_campos_rec[i]] = [];
                for(var i2 in this.listas[this.lista_campos_rec[i]]) {
                    if (this.listas[this.lista_campos_rec[i]][i2] != '') listas[this.lista_campos_rec[i]].push(this.listas[this.lista_campos_rec[i]][i2]);
                }//for
            }//for
            fetch('/api/listas_modificar', {
              method: 'PUT',
              body: JSON.stringify({'listas':listas,'id_trabajador':this.id_trabajador}),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
                .then(res => res.json())
                .then(data => {
                    //this.limpiar()
                    this.mensaje = data.estado;
                    setTimeout(this.reset_msj,3000)
                });
        },//guardar
        reset_msj(){
            this.mensaje = '';
        },
        set_trabajador(trabajador){
            this.id_trabajador = trabajador._id
            this.trabajador = trabajador
            this.cargar_listas()
        },//set_id_trabajador
        limpiar(){
            for(var i in this.listas) this.listas[i] = [''];
            this.listas['a'].push('');
        },//limpiar
        cargar_listas(){
            this.mensaje = '';
            for(var i in this.lista_campos) {
                if(this.lista_campos[i] != 'a'){
                    this.trabajador[this.lista_campos[i]].length != 0 ? this.listas[this.lista_campos[i]] = this.trabajador[this.lista_campos[i]]: this.listas[this.lista_campos[i]] = [''];
                }//if
            }//for
            this.listas['a'].push('');
        }
    }
}
</script>