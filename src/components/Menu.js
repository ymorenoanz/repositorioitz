import React from 'react';
import { withRouter } from 'react-router-dom';
import ListObjects from '../pages/ListImage';
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react'


class Menu extends React.Component 
{

	getNavLinkClass = (path) => 
	{
		return this.props.location.pathname === path ? 'active' : '';
	}

		render()
		{
			return (
					<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

						<a className="navbar-brand" href="Home">Repositorio ITZ</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarCollapse">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<a className="nav-link" href="Home">Inicio <span className="sr-only"></span></a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="LoadFile">Subir archivos</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="ListImage">Buscar imágenes</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="ListPdf">Buscar documentos</a>
								</li>
								<li>
								<AmplifySignOut/>
								</li>
							</ul>

							<form className="form-inline mt-2 mt-md-0">

								<div className="form-group">
									<input type="text" id="example3" className="form-control form-control-sm" />
								</div>
								<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
							</form>
						</div>

					</nav>
			);
		}

		Menu = withRouter(Menu);
	};

	export default (Menu);