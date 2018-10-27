<template>
    <div id="Trabajador_menu">
        <ul class="menu_2">
            <li v-for="comp of components" v-on:click="cargar_componente(comp)">
                {{comp}}
            </li>
        </ul>
        <component v-bind:is="vista"/>
    </div>
</template>

<script>
    import Consultar from './Trabajador_consultar.vue';
    import Modificar_listas from './Trabajador_modificar_listas.vue';
    import Agregar from './Trabajador_agregar.vue';
//////////////////////////////////////////////////////////
    export default {
        name: 'Trabajador_menu',
        components: {
            Consultar,Modificar_listas,Agregar
        },
        data() {
            return {
                components: ['Consultar', 'Modificar_listas', 'Agregar',],
                vista : 'Consultar',
                authenticated: false,
                trabajador: {
                    username: "",
                    password: ""
                }
            }
        },
        mounted() {
 
        },
        methods: {
            cargar_componente(comp) {
                this.vista = comp;
            }
        }
    }
</script>