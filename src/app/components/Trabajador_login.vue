<template>
    <div id="Login">
        <form @submit.prevent="login">
            <h1>Login</h1>
            <input type="text" name="id" v-model="usuario.id" placeholder="identificacion" autocomplete="off" />
            <input type="password" name="clave" v-model="usuario.clave" placeholder="clave" />
            <button>Aceptar</button>
        </form>
    </div>
</template>
<script>
    class Login {
      constructor(id,clave) {
        this.id = id;
        this.clave = clave;
      }
    }
    export default {
        name: 'Login',
        data() {
            return {
                usuario: new Login('','')
            }
        },
        methods: {
            login() {
                if(this.usuario.id!= "" && this.usuario.clave!= "") {
                    fetch('/api/login', {
                      method: 'POST',
                      body: JSON.stringify(this.usuario),
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                    })  .then(res => res.json())
                        .then(data => {
                            if(Object.keys(data).length !== 0){
                                this.$parent.menu(data);
                            }else{
                                this.usuario = new Login('','');
                                alert('dato/s de ingreso incorrecto/s');
                            }//if
                        }
                    );
                } else {
                    alert("favor de ingresar datos");
                }//if
            }//login
        }
    }
</script>