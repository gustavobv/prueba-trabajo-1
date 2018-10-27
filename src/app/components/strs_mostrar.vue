<template>
    <div id="Str_mostrar">
        <table v-if="Object.keys(contenedor_de_str).length !== 0">
            <tbody>
                <tr v-for="campo of lista_campos">
                    <td>
                        <span>{{campo}}</span>
                    </td>
                    <td>
                        <span>:</span>
                        <span>{{contenedor_de_str[campo]}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'Str_mostrar',
    data() {
      return {
        contenedor_de_str:{},
        lista_campos:[]
      }
    },
    mounted() {
        this.$parent.strs_mostrar_listo(this);
    },
    created() {
      
    },
    methods: {
        cargar_strs(obj){
            obj ? this.contenedor_de_str = obj: this.contenedor_de_str = {};
        }
    }
}
</script>