import React, { useState, useEffect } from "react";

//Services
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await api.get('/repositories');
      setRepositories(data);
    }
    
    fetchData();
  },[])

  async function handleAddRepository() {
    const repository = {
      title: `Repository ${Date.now()}`,
      url: "https://github.com/PedroHCastro",
      techs: ["NodeJS", "ReactJS"]
    }
    const { data } = await api.post("/repositories", repository);
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const data = repositories.filter(repository => ( repository.id !== id));
    setRepositories(data);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
        <li key={repository.id}>
          <p>{repository.title}</p>
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
