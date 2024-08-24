const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createProfile: async (userData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/hello", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(userData),
					});
			
					if (response.ok) {
						const data = await response.json();
						// Manejar respuesta exitosa
						console.log("User created successfully", data);
						return true; 
					} else {
						const errorData = await response.json();
						console.error("Error creating user:", errorData);
						return false;
					}
				} catch (error) {
					console.error("Error in signUp function:", error);
					return false;
				}
			},
			updateProfile: async (id, userData) => {
				try {
					const response = await fetch(`process.env.BACKEND_URL + "/api/hello"${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(userData),
					});
			
					if (response.ok) {
						const data = await response.json();
						console.log("Profile updated successfully", data);
						return true;
					} else {
						const errorData = await response.json();
						console.error("Error updating profile:", errorData);
						return false;
					}
				} catch (error) {
					console.error("Error in updateProfile function:", error);
					return false;
				}
			},
			
			getProfile: async (id) => {
				try {
					const response = await fetch(`https:/profiles/${id}`);
					if (response.ok) {
						const data = await response.json();
						return data;
					} else {
						console.error("Error fetching profile");
						return null;
					}
				} catch (error) {
					console.error("Error in getProfile function:", error);
					return null;
				}
			},
			createPrescription: async (prescriptionData) => {
				try {
					const response = await fetch("/prescriptions", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(prescriptionData),
					});
			
					if (response.ok) {
						const data = await response.json();
						console.log("Prescription created successfully", data);
						return true;
					} else {
						const errorData = await response.json();
						console.error("Error creating prescription:", errorData);
						return false;
					}
				} catch (error) {
					console.error("Error in createPrescription function:", error);
					return false;
				}
			}
			
			
			
		}
	};
};

export default getState;
