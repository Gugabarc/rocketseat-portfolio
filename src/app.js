const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;

    const repository = { 
        id: uuid(), 
        title, 
        url, 
        techs, 
        likes: 0 
    };

    repositories.push(repository);

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { title, url, techs } = request.body;
    const index = repositories.findIndex(r => r.id == id);
    
    if(index < 0){
        return response.status(400).json({ error: 'Not found'});
    }

    const repository = { 
        id, 
        title, 
        url, 
        techs, 
        likes: repositories[index].likes
    };

    repositories[index] = repository;

    return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const index = repositories.findIndex(r => r.id == id);

    if(index < 0){
        return response.status(400).json({ error: 'Not found'});
    }

    repositories.splice(index,1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;
    const index = repositories.findIndex(r => r.id == id);
    
    if(index < 0){
        return response.status(400).json({ error: 'Not found'});
    }

    repositories[index].likes++;

    return response.json(repositories[index]);
});

module.exports = app;
