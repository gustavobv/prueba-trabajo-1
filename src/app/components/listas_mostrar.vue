<template>
    <div id="Listas_mostrar" v-if="trabajador != false">
        <div>
            <table v-for="campo of lista_campos" >
                <thead>
                    <tr>
                        <th>{{campo}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(val,indice) in listas[campo]">
                        <td>
                            {{val}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Listas_agregar',
    data() {
      return {
        listas: {'a':['']},
        lista_campos:['a'],
        trabajador: false
      }
    },
    mounted() {
        this.$parent.listas_mostrar_listo(this);
    },
    methods: {
        cargar_listas(obj){
            this.trabajador = obj;
            for(var i in this.lista_campos) this.listas[this.lista_campos[i]] = this.trabajador[this.lista_campos[i]];
            this.listas['a'].push('');
        }
    }
}
</script>