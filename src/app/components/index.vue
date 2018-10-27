<template>
    <div id="index">
        <div id="linea_sup">
            <h4>ABCD</h4>
            <div v-if="vista === 'Abcd'">
                <button v-on:click="login()">login</button>
            </div>
            <div v-if="vista === 'Menu'">
                <span>{{usuario.nombre}}</span>
                <button v-on:click="logout()">logout</button>
            </div>
        </div>
        <component id="contendor" v-bind:is="vista"/>
    </div>
</template>
<script>
    import Abcd from './ABCD.vue';
    import Login from './Trabajador_login.vue';
    import Menu from './Trabajador_menu.vue';
//////////////////////////////////////////////////
    export default {
        name: 'Index',
        components: {
            Abcd,Login,Menu
        },
        data(){
            return{
                components: ['Abcd', 'Login', 'Menu'],
                estado: 0,
                vista: 'Abcd',
                usuario:'',
            }
        },
        created() {
            fetch('/api/index')
              .then(res => res.json())
              .then(data => {
                    if(Object.keys(data).length !== 0){
                        this.usuario = data;
                        this.vista = 'Menu';
                    }else{
                        this.vista = 'Abcd';
                    }//if
                    this.estado = 1;
                }
            );
        },
        methods: {
            login() {
                this.vista = 'Login';
            },
            menu(trabajador){
                this.usuario = trabajador;
                this.vista = 'Menu';
            },
            logout(){
                fetch('/api/index/logout', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                }).then(res => res.json())
                  .then(data => {
                        if(Object.keys(data).length === 0){
                            this.usuario = '';
                            this.vista = 'Abcd';
                        }else{
                            console.error('error al desconectar?')
                        }//if
                  });
            }//logout
        }
    }
</script>