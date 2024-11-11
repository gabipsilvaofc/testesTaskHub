const expect = require('expect');
const { app } = require('../index');
const request = require('supertest');

describe('Usuários', () => {
  it('deve criar um novo usuário', async () => {
    const usuario = {
      nome: 'João',
      email: 'joao@example.com',
      senha: '123456'
    };
    console.log('teste');
    const resposta = await request(app).post('/').send(usuario);
    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id');
  });

  it('deve retornar um erro ao tentar criar um usuário com email duplicado', async () => {
    const usuario = {
      nome: 'João',
      email: 'joao@example.com',
      senha: '123456'
    };
    await request(app).post('/').send(usuario);
    const resposta = await request(app).post('/').send(usuario);
    expect(resposta.status).toBe(400);
    expect(resposta.body).toHaveProperty('erro');
  });

  it('deve retornar um usuário por ID', async () => {
    const usuario = {
      nome: 'João',
      email: 'joao@example.com',
      senha: '123456'
    };
    const respostaCriacao = await request(app).post('/').send(usuario);
    const id = respostaCriacao.body.id;
    const resposta = await request(app).get(`/users/${id}`);
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveProperty('nome', 'João');
  });
});

describe('Projetos', () => {
  it('deve criar um novo projeto', async () => {
    const projeto = {
      nome: 'Projeto 1',
      descricao: 'Este é um projeto de teste'
    };
    const resposta = await request(app).post('/').send(projeto);
    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id');
  });

  it('deve retornar um erro ao tentar criar um projeto com nome duplicado', async () => {
    const projeto = {
      nome: 'Projeto 1',
      descricao: 'Este é um projeto de teste'
    };
    await request(app).post('/projetos').send(projeto);
    const resposta = await request(app).post('/').send(projeto);
    expect(resposta.status).toBe(400);
    expect(resposta.body).toHaveProperty('erro');
  });

  it('deve retornar um projeto por ID', async () => {
    const projeto = {
      nome: 'Projeto 1',
      descricao: 'Este é um projeto de teste'
    };
    const respostaCriacao = await request(app).post('/').send(projeto);
    const id = respostaCriacao.body.id;
    const resposta = await request(app).get(`/projects/${id}`);
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveProperty('nome', 'Projeto 1');
  });
});

describe('Comentários', () => {
  it('deve criar um novo comentário', async () => {
    const comentario = {
      texto: 'Este é um comentário de teste'
    };
    const resposta = await request(app).post('/').send(comentario);
    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id');
  });

  it('deve retornar um erro ao tentar criar um comentário vazio', async () => {
    const comentario = {
      texto: ''
    };
    const resposta = await request(app).post('/').send(comentario);
    expect(resposta.status).toBe(400);
    expect(resposta.body).toHaveProperty('erro');
  });

  it('deve retornar um comentário por ID', async () => {
    const comentario = {
      texto: 'Este é um comentário de teste'
    };
    const respostaCriacao = await request(app).post('/').send(comentario);
    const id = respostaCriacao.body.id;
    const resposta = await request(app).get(`/comments/${id}`);
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveProperty('texto', 'Este é um comentário de teste');
  });
});

