async function addUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
        query: `
        mutation {
          createUser(email: "${email}", password: "${password}") {
            id
            email
          }
        }
      `
    }),
  })
    .then((response) => response.json())
    .then(alert('Usuario creado satisfactoriamente'))
    .catch((error) => console.error(error));
}
