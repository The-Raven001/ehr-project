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
      patient: null,
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
          const response = await fetch(process.env.BACKEND_URL + "api/login", {
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
          const data = await response.json();
          console.log("Logged in!");
          setStore({ token: data.access_token });
          localStorage.setItem("token", data.access_token);
          return true;
        } catch (error) {
          console.log("Error in login", error);
          return false;
        }
      },

      search: async (chart) => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${process.env.BACKEND_URL}api/search/${chart}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              "There was an error while trying to search for the chart"
            );
          }

          const data = await response.json();
          console.log("Patient data:", data);

          setStore({ patient: data });
          return data;
        } catch (error) {
          console.log("Error while trying to search chart", error);
          return false;
        }
      },

      createChart: async ({
        chart,
        name,
        middle_name,
        last_name,
        address,
        phone_number,
        email,
        gender,
        dob,
        office_id,

        name_of_insurance,
        subscriber_id,
        subscription_start_date,
        subscription_end_date,
        financial_class_of_insurance,

        name_of_pharmacy,
        address_of_pharmacy,
      }) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/create-chart",
            {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                chart: chart,
                name: name,
                middle_name: middle_name,
                last_name: last_name,
                address: address,
                phone_number: phone_number,
                email: email,
                gender: gender,
                dob: dob,
                office_id: office_id,
                name_of_insurance: name_of_insurance,
                subscriber_id: subscriber_id,
                subscription_start_date: subscription_start_date,
                subscription_end_date: subscription_end_date,
                financial_class_of_insurance: financial_class_of_insurance,
                name_of_pharmacy: name_of_pharmacy,
                address_of_pharmacy: address_of_pharmacy,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Unable to create chart");
          }

          console.log("Chart created succesfully!");
          return true;
        } catch (error) {
          console.log("Error creating chart:", error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        setStore({ token: null, user: null });
      },
      getUser: async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(process.env.BACKEND_URL + "/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log(data);
          setStore({ user: data });
        } catch (error) {
          console.log("Error getting user", error);
        }
      },
    },
  };
};

export default getState;
