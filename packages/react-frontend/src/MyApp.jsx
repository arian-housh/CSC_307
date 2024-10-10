// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";





function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const characterToRemove = characters[index]; // Get the character to remove
    const userId = characterToRemove.id; // Get the user's ID

    deleteUser(userId)
      .then((response) => {
        if (response.status === 204) { // If the delete operation was successful
          const updatedCharacters = characters.filter((_, i) => i !== index); 
          setCharacters(updatedCharacters);
        } else if (response.status === 404) {
          console.log("User not found, status code:", response.status);
        } else {
          console.log("Failed to delete user, status code:", response.status);
        }
      })
      .catch((error) => {
        console.log("Error occurred while deleting user:", error);
      });
  }

  function deleteUser(userId) {
    return fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE", // Use DELETE method
    });
  }



  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) { // Ensure the response status is 201 
          return response.json(); 
        } else {
          throw new Error(`Failed to add user, status code: ${response.status}`);
        }
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]); 
      })
      .catch((error) => {
        console.log(error);
      });
}



  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}


export default MyApp;



