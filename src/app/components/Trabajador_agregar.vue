<template>
  <div id="Trabajador_agregar">
        <h1>{{titulo}}</h1>
        <form @submit.prevent="agregar">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <span>rut</span>
                        </td>
                        <td>
                            <span>:</span>
                            <input type="text" v-model="trabajador.rut" placeholder="aqui">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>nombre</span>
                        </td>
                        <td>
                            <span>:</span>
                            <input type="text" v-model="trabajador.nombre" placeholder="aqui">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>edad</span>
                        </td>
                        <td>
                            <span>:</span>
                            <input type="text" v-model="trabajador.edad" placeholder="aqui">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <button>Agregar</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            {{mensaje}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
  </div>
</template>
<script>
class Trabajador {
  constructor(rut = '', nombre = '', edad = '') {
    this.rut = rut;
    this.nombre = nombre;
    this.edad= edad;
  }
}
export default {
  data() {
    return {
        titulo:'Agregar trabajador',
        trabajador: new Trabajador(),
        mensaje:''
    }
  },
  methods: {
    agregar() {
        fetch('/api/agregar', {
          method: 'POST',
          body: JSON.stringify(this.trabajador),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            if(data.estado != false){
                this.trabajador = new Trabajador();
                this.mensaje = data.estado;
            }else{
                this.mensaje = 'rut incorrecto';
            }//if
          });
    }//agregar
  }
}
</script>
