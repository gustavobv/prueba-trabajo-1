<template>
    <div id="Trabajador_modificar_lista">
        <h1>Modificar listas</h1>
        <component v-bind:is="vista1"/>
        <component v-bind:is="vista2"/>
        <component v-bind:is="vista3"/>
    </div>
</template>

<script>ListasModificar
    import Consultar from './consultar.vue';
    import StrMostrar from './strs_mostrar.vue';
    import ListasModificar from './listas_modificar.vue';
/////////////////////////////////////////////////////////////////
    export default {
        name: 'Trabajador_modificar_lista',
        components: {
            Consultar,ListasModificar,StrMostrar
        },
        data() {
            return {
                components: ['Consultar', 'ListasModificar',StrMostrar],
                estado: 0,
                vista1: 'Consultar',
                vista2: 'StrMostrar',
                vista3: 'ListasModificar',
                trabajador:'',
                app_consulta:'',
                app_listas_modificar:'',
                app_strs_mostrar:''
            }
        },
        methods: {
            consultar_listo(obj){
                this.app_consulta = obj;
                this.app_consulta.que_consultar = 'todo';
            },
            listas_modificar_listo(obj){
                this.app_listas_modificar = obj;
this.app_listas_modificar.agregar_campos(['licencia','capacitacion','curso']);
            },
            strs_mostrar_listo(obj){
                this.app_strs_mostrar = obj;
                this.app_strs_mostrar.lista_campos = ['nombre','edad'];
            },
            resultado_de_consulta(resultado){
                this.trabajador = resultado
                this.app_strs_mostrar.cargar_strs(this.trabajador);
                this.app_listas_modificar.set_trabajador(this.trabajador)
            }
        }
    }
</script>