const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
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

      signUp: async ({
        name_office,
        address,
        name,
        last_name,
        email,
        password,
      }) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                name_office: name_office,
                address: address,
                name: name,
                last_name: last_name,
                email: email,
                password: password,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Unable to create office");
          }

          console.log("Office created successfully");
          return true;
        } catch (error) {
          console.log("Error in signUp:", error);
          return false;
        }
      },

      login: async ({ email, password }) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          if (!response.ok) {
            throw new Error("There was an error while trying to log you in.");
          }

          console.log("Logged in!");
          return true;
        } catch (error) {
          console.log("Error in login", error);
          return false;
        }
      },
    },
  };
};

export default getState;
