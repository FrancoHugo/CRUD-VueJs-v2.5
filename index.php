<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>CRUD con VueJs</title>

	<?php include 'estilos.php'; ?>
</head>
<body>
	<header>
		<h2 class="text-center">
			<span class="badge badge-warning text-secondary">CRUD con VueJs v2.5</span>
		</h2>
	</header><!-- /header -->
	
	<div id="appMoviles">
		<div class="container">
			<div class="row">
				<div class="col">
					<button type="button" @click="btnAgregar" class="btn btn-success" title="Nuevo">
						<i class="fas fa-plus-circle fa-2x"></i>
					</button>
				</div>

				<div class="col text-right">
					<h4 class="text-light">Stock Total: <span class="badge badge-success">{{totalStock}}</span></h4>
				</div>
			</div> <!-- FIN de class="row" -->

			<div class="row justify-content-center mt-3">
				<div class="col-12">
					<table class="table table-striped table-responsive-md">
						<!-- <caption>table title and/or explanatory text</caption> -->
						<thead>
							<tr class="text-center bg-primary text-light">
								<th>#</th>
								<th>Marca</th>
								<th>Modelo</th>
								<th>Stock</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(movil,indice) of moviles" class="text-center text-light">
								<td>{{indice+1}}</td>
								<td>{{movil.marca}}</td>
								<td v-bind:id="'modelo'+movil.id">{{movil.modelo}}</td>
								<td>
									<div class="col-md-4 offset-md-4">
										<input type="text" v-model.number="movil.stock" class="form-control text-right" disabled>
									</div>
								</td>
								<td>
									<div class="btn-group" role="group">
										<button class="btn btn-warning" title="Editar" @click="btnEditar(movil.id, movil.marca, movil.modelo, movil.stock)">
											<i class="fas fa-pencil-alt"></i>
										</button>

										<button class="btn btn-danger" title="Eliminar" @click="btnEliminar(movil.id, movil.modelo)">
											<i class="fas fa-trash-alt"></i>
										</button>
									</div>
								</td>
							</tr>

							<tr>
								<td colspan="5" v-if="!nodata">
									<div class="alert alert-warning text-center" role="alert" style="font-size: 1.2rem;">
										<i class="fas fa-exclamation-triangle fa-2x"></i> <b>No data.</b>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div> <!-- FIN de class="row" -->
		</div> <!-- FIN de class="container" -->
	</div> <!-- FIN de id="appMoviles" -->

	<?php include 'javascripts.php'; ?>
</body>
</html>