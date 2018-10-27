<template>
  <div>
    <nav>
    <button @click="insertarTrabajadores()">ins trab</button>
      <a href="/">---</a>
    </nav>
    <div v-model="insertarTrabajadores">
      <div>
        <div>
          <div>
            <div>
              <form @submit.prevent="sendTrabajador">
                <div>
                  <input type="text" v-model="trabajador.rut" placeholder="rut aqui">
                </div>
                <div>
                  <input type="text" v-model="trabajador.dv" placeholder="dv aqui">
                </div>
                <div>
                  <input type="text" v-model="trabajador.nombre" placeholder="nombre aqui">
                </div>
                <div>
                  <input type="text" v-model="trabajador.edad" placeholder="edad aqui">
                </div>
                <div>
                  <input type="text" v-model="trabajador.lv" placeholder="lv aqui">
                </div>

                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Edit</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>rut</th>
                <th>dv</th>
                <th>nombre</th>
                <th>edad</th>
                <th>lv</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trabajador of trabajadores">
                <td>{{trabajador.rut}}</td>
                <td>{{trabajador.dv}}</td>
                <td>{{trabajador.nombre}}</td>
                <td>{{trabajador.edad}}</td>
                <td>{{trabajador.lv}}</td>
                <td>
                  <button @click="deleteTrabajador(trabajador._id)">Delete</button>
                  <button @click="editTrabajador(trabajador._id)">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


class Trabajador {
  constructor(rut = '', dv = '', nombre = '', edad = '', lv = '') {
    this.rut = rut;
    this.dv = dv;
    this.nombre = nombre;
    this.edad= edad;
    this.lv = lv;
  }
}

export default {
  data() {
    return {
      trabajador: new Trabajador(),
      trabajadores: [],
      edit: false,
      trabajadorToEdit: ''
    }
  },
  created() {
    this.getTrabajadores();
  },
  methods: {
    sendTrabajador() {
      if(this.edit === false) {
        fetch('/api/agr_tra', {
          method: 'POST',
          body: JSON.stringify(this.trabajador),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTrabajadores();
            this.trabajador = new Trabajador();
          });
      }
      else {
        fetch('/api/agr_tra/' + this.trabajadorToEdit, {
          method: 'PUT',
          body: JSON.stringify(this.trabajador),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTrabajadores();
            this.trabajador = new Trabajador();
            this.edit = !this.edit;
          });
      }
    },
    getTrabajadores() {
      fetch('/api/agr_tra')
        .then(res => res.json())
        .then(data => {
          this.trabajadores = data;
        });
    },
    deleteTrabajador(trabajadorId) {
      fetch('/api/agr_tra/' + trabajadorId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTrabajadores();
        });
    },
    editTrabajador(trabajadorId) {
      fetch('/api/agr_tra/' + trabajadorId)
        .then(res => res.json())
        .then(data => {
          const { _id, rut, dv, nombre, edad, lv} = data;
          this.trabajador = new Trabajador(rut, dv, nombre, edad, lv);
          this.trabajadorToEdit = _id;
          this.edit = true;
        });
    },
    insertarTrabajadores(){
        alert(insertarTrabajadores)
    }
  }
}
</script>
