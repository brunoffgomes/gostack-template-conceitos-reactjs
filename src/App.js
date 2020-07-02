import React, { useState, useEffect } from "react";
import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
    .then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: `http://www.newrepository.com ${Date.now()}`,
      techs:[
        "React",
        "NodeJS"
      ]
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    api.delete(`repositories/${id}`).then(
      setRepositories([...repositories.filter(repo => repo.id !== id)])
    );
  }
  return (
    <div>
    <ul data-testid="repository-list">
      {repositories && repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button style={{marginLeft: 20}} 
                    onClick={() =>handleRemoveRepository(repository.id)} >
                        Remover
            </button>
          </li>
      )}
    </ul>

    <button onClick={handleAddRepository}>Adicionar</button>
  </div>
  );
}

export default App;
