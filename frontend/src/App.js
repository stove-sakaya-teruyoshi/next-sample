import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    getMessage();
  }, []);

  const getMessage = () => {
    fetch('http://localhost:5000/api/message')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => response.json())
      .then(data => setResponseMessage(data.message));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message.split('\n').map((str) => 
          <>{str}<br/></>
        )}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={getMessage}>更新</button>
        </form>
        {responseMessage && <h2>{responseMessage.split('\n').map((str) => 
          <>{str}<br/></>
        )}</h2>}
      </header>
    </div>
  );
}

export default App;
