const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			
			
		},
		actions: {
			getContacts: async () => {
				const actions=getActions();
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/jonathan1")
					if(response.status==404){ 
						actions.createAgenda()
					}
					if (!response.ok) {
						throw new Error("Salio mal el contacto");
					}
					const data = await response.json();
					const store = getStore();
					setStore({ ...store, contacts: data.contacts })
					console.log(data)

				} catch (error) {
					console.log("Algo Salio Mal!!", (error))
				}
			},
			createAgenda: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/jonathan1", {
						method: "POST",
					})
					const responseData = await response.json();
					console.log("Respuesta al servidor", responseData)

				} catch (error) {
					console.log("Aqui esta el Error!!!", error)
				}
			},
			addContact: async (data) => {
				const actions = getActions();
				try {


					const response = await fetch("https://playground.4geeks.com/contact/agendas/jonathan1/contacts", {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json"
						}


					})
					const responseData = await response.json();
					console.log("Respuesta al servidor", responseData)
					// console.log("Respuesta", response)
					if (response.ok) {
						console.log("contacto agregado")
						actions.getContacts(); 
						return true
					}
					else {
						console.error("❌ Error en la respuesta del servidor:", responseData);
						alert("Error al agregar contacto: " + JSON.stringify(responseData)); // Muestra el error en pantalla
					}
				} catch (error) {
					console.log("Aqui esta el Error!!!", error)

				}
			},
			editContact: async (body, id) => {
				try { 
					const actions = getActions();
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/jonathan1/contacts/${id}`, {
						method: "PUT",
						body: JSON.stringify(body),
						headers: {
							"Content-Type": "application/json"
						}
					})
					console.log(response);
					if (response.ok) {
						console.log("El contacto se edit correctamente (sin contenido de respuesta).") 
						actions.getContacts();

						return true
					}
					

					



				} catch (error) {
					console.error(error)
				}
			},
			

			deleteContact: async (idContact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/jonathan1/contacts/${idContact}`, {
						method: "DELETE",
					})
					if (!response.ok) {
						throw new Error("No se puede eliminar");
					}
					if (response.status !== 204) {
						const data = await response.json();
						console.log("El contacto se Elimino", data);
					} else {
						console.log("El contacto se elimino correctamente (sin contenido de respuesta).")
					}

					const actions = getActions();
					await actions.getContacts();


				} catch (error) {
					console.log(error)
				}


			}


		}
	};
};

export default getState;
