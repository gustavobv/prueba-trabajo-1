<template>
    <div id="Consultar">
        <div>
            <span>buscar trabajador con rut:</span>
            <input type="text" v-model="rut" placeholder="rut aqui ej: 123456789" maxlength="9"/>
            <button v-on:click="consultar()">buscar!</button>
        </div>
        <div>
            <span>{{mensaje}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Consultar',
        data(){
            return{
                rut: '',
                mensaje : '',
                que_consultar: 'listas'
            }
        },
        mounted() {
            this.$parent.consultar_listo(this);
        },
        methods: {
            consultar() {
                if(this.rut.length > 7){
                    fetch('/api/consultar/'+this.que_consultar+'/' + this.rut, {
                        method: 'GET',
                        body: JSON.stringify(this.trabajador),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          }
                        })
                        .then(res => res.json())
                      .then(data => {
                        if(Object.keys(data).length !== 0){
                            this.mensaje = 'Encontrado, con rut:'+this.rut;
                        }else{
                            this.mensaje = 'No se encontro trabajdor con rut:'+this.rut;
                            data = false
                        }//if
                        this.rut = '';
                        this.$parent.resultado_de_consulta(data);
                      });
                }else{
                    this.mensaje = "rut no ingresado o incompleto";
                }//if
            },
        }
    }
</script>