var url = "bd/crud_moviles.php";

var appMoviles = new Vue({
	el: "#appMoviles",
	data: {
		moviles:[],
		marca:"",
		modelo:"",
		stock:"",
		total:0,
		nodata:0,
	},
	methods: {
		// BOTONES
		btnAgregar: async function(){
			const { value: formValues } = await Swal.fire({
			  	title: 'Nuevo',
			  	html:
			    	`<div class="form-row">
					    <div class="form-group col-12">
					      	<label for="marca">Marca</label>
					      	<input type="text" class="form-control" name="marca" id="marca">
					    </div>
					    <div class="form-group col-12">
					      	<label for="modelo">Modelo</label>
					      	<input type="text" class="form-control" name="modelo" id="modelo">
					    </div>
					    <div class="form-group col-12 col-md-6 offset-md-3">
					      	<label for="stock">Stock</label>
					      	<input type="number" class="form-control" name="stock" id="stock" min="1" value="1">
					    </div>
					</div>`,
			  	focusConfirm: false,
			  	showCancelButton: true,
			  	confirmButtonText: 'Guardar',
			  	confirmButtonColor: '#66CC00',
			  	cancelButtonColor: '#C12525',
			  	preConfirm: () => {
			    return [
			      			this.marca = document.getElementById('marca').value,
			      			this.modelo = document.getElementById('modelo').value,
			      			this.stock = document.getElementById('stock').value
			    		]
			  	}
			})

			if(this.marca == '' || this.modelo == '' || this.stock <= 0){
				Swal.fire({
			  		confirmButtonColor: '#66CC00',
					type: 'info',
					title: 'Datos incompletos',
				})
			}
			else{
				this.guardarMovil(); //Llamamos a la función para dar de alta a los datos
				//Mensaje para mostrar que fue registrado exitosamente
				const Toast = Swal.mixin({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000
				});
				Toast.fire({
					type: 'success',
					title: 'Producto agregado'
				})
			}
		},
		btnEditar: async function(id, marca, modelo, stock){
			await Swal.fire({
			  	title: 'Editar',
			  	html:
			    	`<div class="form-row">
					    <div class="form-group col-12">
					      	<label for="marca">Marca</label>
					      	<input type="text" class="form-control" name="marca" id="marca" value="${marca}">
					    </div>
					    <div class="form-group col-12">
					      	<label for="modelo">Modelo</label>
					      	<input type="text" class="form-control" name="modelo" id="modelo" value="${modelo}">
					    </div>
					    <div class="form-group col-12 col-md-6 offset-md-3">
					      	<label for="stock">Stock</label>
					      	<input type="number" class="form-control" name="stock" id="stock" min="1" value="${stock}">
					    </div>
					</div>`,
			  	focusConfirm: false,
			  	showCancelButton: true,
			  	// confirmButtonText: 'Guardar',
			  	confirmButtonColor: '#66CC00',
			  	cancelButtonColor: '#C12525',
			}).then((result) => {
				if(result.value){
					//Captura los nuevos datos si es que se modificaron
	      			marca = document.getElementById('marca').value,
	      			modelo = document.getElementById('modelo').value,
	      			stock = document.getElementById('stock').value,

	      			this.editarMovil(id, marca, modelo, stock); //Llama al procedimiento
	      			Swal.fire(
	      				'Actualizado',
	      				'El registro ha sido actualizado satisfactoriamente.',
	      				'success'
	      			)
				}
			});
		},
		btnEliminar: function(id, modelo){
			Swal.fire({
				title: '¿Estás seguro que desea borrar el modelo: <br> '+modelo+'?',
				type: 'warning',
				showCancelButton: true,
			  	confirmButtonColor: '#66CC00',
			  	cancelButtonColor: '#C12525',
			  	confirmButtonText: 'Eliminar',
			}).then((result) => {
				if(result.value) {
					this.borrarMovil(id); //Llama al procedimiento
				//Mostramos el mensaje de que se ha efectuado la eliminación
					Swal.fire(
						'Eliminado',
						'El registro ha sido eliminado',
						'success'
					)
				}
			})
		},

		// PROCEDIMIENTOS
		// Procedimiento Listar
		listarMoviles: function(){
			axios.post(url, {opcion:4}).then(response => {
				this.moviles = response.data;
				if(this.moviles.length == 0)
					this.nodata = this.moviles.length;
					// console.log('NO DATA');
				else{
					this.nodata = this.moviles.length;
					this.moviles;
				}
			});
		}, // FIN de listarMoviles

		// Procedimiento Guardar
		guardarMovil: function(){
			axios.post(url, {opcion:1, marca:this.marca, modelo:this.modelo, stock:this.stock}).then(response => {
				this.listarMoviles();
			});
			this.marca = '';
			this.modelo = '';
			this.stock = 1;
		}, // FIN de guardarMovil

		// Procedimiento Editar
		editarMovil: function(id, marca, modelo, stock){
			axios.post(url, {opcion:2, id:id, marca:marca, modelo:modelo, stock:stock}).then(response => {
				this.listarMoviles();
			});
		}, // FIN de editarMovil

		// Procedimiento Eliminar
		borrarMovil: function(id, marca, modelo, stock){
			axios.post(url, {opcion:3, id:id}).then(response => {
				this.listarMoviles();
			});
		} // FIN de borrarMovil



	},
	created: function(){
		this.listarMoviles();
	},
	computed: {
		totalStock(){
			if(this.moviles.length > 0){
				this.total = 0;
				for(movil of this.moviles){
					this.total += parseInt(movil.stock);
				}
				return this.total;

			}
			else
				return this.total = 0;

		}
	}

});