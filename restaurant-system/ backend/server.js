// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Banco de dados em memória
let pratos = [
  { id: 1, nome: 'Pizza Margherita', preco: 35.90, categoria: 'Pizza', ingredientes: 'Molho de tomate, mussarela, manjericão' },
  { id: 2, nome: 'Hambúrguer Artesanal', preco: 28.50, categoria: 'Hambúrguer', ingredientes: 'Pão, carne 180g, queijo, alface, tomate' },
  { id: 3, nome: 'Lasanha Bolonhesa', preco: 32.00, categoria: 'Massas', ingredientes: 'Massa, carne moída, molho bolonhesa, queijo' }
];

let clientes = [
  { id: 1, nome: 'João Silva', telefone: '(61) 99999-1234', endereco: 'SQN 123, Bloco A, Apt 101' },
  { id: 2, nome: 'Maria Santos', telefone: '(61) 98888-5678', endereco: 'SQSW 304, Bloco B, Casa 15' }
];

let pedidos = [];

let nextPratoId = 4;
let nextClienteId = 3;
let nextPedidoId = 1;

// ==================== ROTAS PRATOS ====================

app.get('/api/pratos', (req, res) => {
  res.json(pratos);
});

app.get('/api/pratos/:id', (req, res) => {
  const prato = pratos.find(p => p.id === parseInt(req.params.id));
  if (!prato) {
    return res.status(404).json({ error: 'Prato não encontrado' });
  }
  res.json(prato);
});

app.post('/api/pratos', (req, res) => {
  const { nome, preco, categoria, ingredientes } = req.body;
  
  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  const novoPrato = {
    id: nextPratoId++,
    nome,
    preco: parseFloat(preco),
    categoria: categoria || '',
    ingredientes: ingredientes || ''
  };

  pratos.push(novoPrato);
  res.status(201).json(novoPrato);
});

app.put('/api/pratos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pratos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Prato não encontrado' });
  }

  const { nome, preco, categoria, ingredientes } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  pratos[index] = {
    id,
    nome,
    preco: parseFloat(preco),
    categoria: categoria || '',
    ingredientes: ingredientes || ''
  };

  res.json(pratos[index]);
});

app.delete('/api/pratos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pratos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Prato não encontrado' });
  }

  pratos.splice(index, 1);
  res.status(204).send();
});

// ==================== ROTAS CLIENTES ====================

app.get('/api/clientes', (req, res) => {
  res.json(clientes);
});

app.get('/api/clientes/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  res.json(cliente);
});

app.post('/api/clientes', (req, res) => {
  const { nome, telefone, endereco } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }

  const novoCliente = {
    id: nextClienteId++,
    nome,
    telefone,
    endereco: endereco || ''
  };

  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

app.put('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  const { nome, telefone, endereco } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }

  clientes[index] = {
    id,
    nome,
    telefone,
    endereco: endereco || ''
  };

  res.json(clientes[index]);
});

app.delete('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  clientes.splice(index, 1);
  res.status(204).send();
});

// ==================== ROTAS PEDIDOS ====================

app.get('/api/pedidos', (req, res) => {
  res.json(pedidos);
});

app.get('/api/pedidos/:id', (req, res) => {
  const pedido = pedidos.find(p => p.id === parseInt(req.params.id));
  if (!pedido) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  res.json(pedido);
});

app.post('/api/pedidos', (req, res) => {
  const { clienteId, itens } = req.body;

  if (!clienteId || !itens || itens.length === 0) {
    return res.status(400).json({ error: 'ClienteId e itens são obrigatórios' });
  }

  const cliente = clientes.find(c => c.id === parseInt(clienteId));
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  let valorTotal = 0;
  const itensCompletos = [];

  for (const item of itens) {
    const prato = pratos.find(p => p.id === item.pratoId);
    if (!prato) {
      return res.status(404).json({ error: `Prato com ID ${item.pratoId} não encontrado` });
    }
    valorTotal += prato.preco * item.quantidade;
    itensCompletos.push({
      pratoId: prato.id,
      prato: prato,
      quantidade: item.quantidade
    });
  }

  const novoPedido = {
    id: nextPedidoId++,
    clienteId: parseInt(clienteId),
    itens: itensCompletos,
    valorTotal: parseFloat(valorTotal.toFixed(2)),
    data: new Date().toISOString()
  };

  pedidos.push(novoPedido);
  res.status(201).json(novoPedido);
});

app.delete('/api/pedidos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pedidos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  pedidos.splice(index, 1);
  res.status(204).send();
});

// ==================== RELATÓRIOS ====================

app.get('/api/relatorios/pedidos-por-cliente', (req, res) => {
  const relatorio = {};

  pedidos.forEach(pedido => {
    const cliente = clientes.find(c => c.id === pedido.clienteId);
    
    if (cliente) {
      if (!relatorio[cliente.id]) {
        relatorio[cliente.id] = {
          cliente: cliente,
          pedidos: [],
          totalGasto: 0,
          quantidadePedidos: 0
        };
      }
      
      relatorio[cliente.id].pedidos.push(pedido);
      relatorio[cliente.id].totalGasto += pedido.valorTotal;
      relatorio[cliente.id].quantidadePedidos++;
    }
  });

  res.json(Object.values(relatorio));
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'API do Sistema de Restaurante',
    endpoints: {
      pratos: '/api/pratos',
      clientes: '/api/clientes',
      pedidos: '/api/pedidos',
      relatorio: '/api/relatorios/pedidos-por-cliente'
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🍽️  Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em http://localhost:${PORT}`);
});
