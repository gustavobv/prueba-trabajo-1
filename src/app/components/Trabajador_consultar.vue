<template>
    <div id="Trabajador_consultar">
        <h1>{{titulo}}</h1>
        <component v-bind:is="vista1"/>
        <component v-bind:is="vista2"/>
        <component v-bind:is="vista3"/>
    </div>
</template>
<script>
    import Consultar from './consultar.vue';
    import ListasMostrar from './listas_mostrar.vue';
    import StrMostrar from './strs_mostrar.vue';
/////////////////////////////////////////////////////////////////
    export default {
        name: 'Trabajador_consultar',
        components: {
            Consultar,ListasMostrar,StrMostrar
        },
        data() {
            return {
                titulo:'Consultar trabajador',
                components: ['Consultar', 'ListasMostrar',StrMostrar],
                estado: 0,
                vista1: 'Consultar',
                vista2: 'StrMostrar',
                vista3: 'ListasMostrar',
                trabajador:'',
                app_consulta:'',
                app_listas_mostrar:'',
                app_strs_mostrar:''
            }
        },
        methods: {
            consultar_listo(obj){
                this.app_consulta = obj;
                this.app_consulta.que_consultar = 'todo';
            },
            listas_mostrar_listo(obj){
                this.app_listas_mostrar = obj;
                this.app_listas_mostrar.lista_campos = ['licencia','capacitacion','curso'];
                return;
            },
            strs_mostrar_listo(obj){
                this.app_strs_mostrar = obj;
                this.app_strs_mostrar.lista_campos = ['nombre','edad'];
            },
            resultado_de_consulta(resultado){
                this.trabajador = resultado
                this.app_listas_mostrar.cargar_listas(this.trabajador);
                this.app_strs_mostrar.cargar_strs(this.trabajador);
            }
        }
    }
</script>