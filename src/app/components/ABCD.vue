<template>
    <div id="ABCD">
        <component v-bind:is="vista1"/>
        <component v-bind:is="vista2"/>
    </div>
</template>
<script>
    import Consultar from './consultar.vue';
    import ListasMostrar from './listas_mostrar.vue';
//////////////////////////////////////////////////
    export default {
        name: 'ABCD',
        components: {
            Consultar,ListasMostrar
        },
        data(){
            return{
                components: ['Consultar', 'ListasMostrar'],
                estado: 0,
                vista1: 'Consultar',
                vista2: 'ListasMostrar',
                trabajador:'',
                app_consulta:'',
                app_listas_mostrar:''
            }
        },
        methods: {
            cargar(trabajador) {
                this.trabajador = trabajador;
            },
            consultar_listo(obj){
                this.app_consulta = obj;
                this.app_consulta.que_consultar = 'listas';
            },
            listas_mostrar_listo(obj){
                this.app_listas_mostrar = obj;
                this.app_listas_mostrar.lista_campos = ['licencia','capacitacion','curso'];
            },
            resultado_de_consulta(resultado){
                this.trabajador = resultado
                this.app_listas_mostrar.cargar_listas(this.trabajador);
            }
        }
    }
</script>