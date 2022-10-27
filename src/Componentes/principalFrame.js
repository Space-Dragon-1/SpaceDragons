import React from 'react';

function PrincipalFrame(prop) {
    function BtnRegistrar() {
		let Id = document.getElementById('Id').value;
		let Name = document.getElementById('Name').value;
		let Description = document.getElementById('Description').value;
		let Precio = document.getElementById('Precio').value;
		let Stock = document.getElementById('Stock').value;
		if (Id === "" || Name === "" || Description === "" || Stock === "" || Precio === ""){
			alert('Complete los campos, por favor');
		}
		else {
			alert('Registro exitoso');
		}
	}
	return(
		<div className="Principal">
			<section className="py-5 bg-light">
				<div className="container">
					<div className="row px-4 px-lg-5 py-lg-4 align-items-center">
						<div className="col-lg">
							<h1 className="h1 text-uppercase mb-0">
								AGREGAR PROUCTOS - ADMINISTRADOR
							</h1>
						</div>
					</div>
				</div>
			</section>
			<div>
			<div className="Contenedores bg-light col-lg container">
				<div className="Cont1">
					<div className='Data'>
						<div className='Data1'>
							<input className='Id' placeholder='Código del producto' type="Number" id='Id'></input>
						</div>
						<div className='Data2'>
							<input className='Name' placeholder='Nombre del producto' type="text" id='Name'></input>
						</div>
						<div className='Data3'>
							<input className='Description' placeholder='Descripción del producto' type="text" id='Description'></input>
						</div>
						<div className='Data4'>
							<input className='Precio' placeholder='Precio del producto' type="Number" id='Precio'></input>
						</div>
						<div className='Data5'>
							<input className='Stock' placeholder='Cantidad del producto' type="Number" id='Stock'></input>
						</div>
					</div>
					<div className='Photo'>
						<div className='Image'>
							<img className='Img' alt='Imagen' src='https://play-lh.googleusercontent.com/pFP0zVCWof079KaI91C9-Kdxijg0K0YlTqov7aVb5aQztDKZPHjDamxSNsR5BC_z23Y'></img>
						</div>
						<div className='BtnImage'>
							<input type="file" accept="image/png, image/jpeg" ></input>
						</div>
					</div>
				</div>
				<div className="BtnIngresar">
					<button onClick={BtnRegistrar} type="submit" id="BtnSave">Ingresar</button>
				</div>
			</div>
		</div>
	</div>
  )
}

export {PrincipalFrame}