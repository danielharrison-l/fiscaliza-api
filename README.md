# API de Timeline de Imagens

API REST simples para gerenciar uma linha do tempo de imagens, construída com Node.js, Fastify e TypeScript.

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Executando o projeto

Para desenvolvimento:
```bash
npm run dev
```

Para produção:
```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Endpoints

### GET /timeline
Retorna todos os pontos da timeline.

Exemplo de resposta:
```json
{
  "timeline": [
    {
      "id": 1,
      "data": "28/03/2025",
      "rotulo": "Válvula Geral da ETE\nLinha A",
      "imagemUrl": "https://exemplo.com/imagens/valvula-geral.jpg"
    }
  ]
}
```

### GET /imagem/:id
Retorna um ponto específico da timeline pelo ID.

Exemplo de resposta:
```json
{
  "id": 1,
  "data": "28/03/2025",
  "rotulo": "Válvula Geral da ETE\nLinha A",
  "imagemUrl": "https://exemplo.com/imagens/valvula-geral.jpg"
}
```

### POST /timeline
Adiciona um novo ponto à timeline.

Exemplo de requisição:
```json
{
  "data": "31/03/2025",
  "rotulo": "Novo Ponto\nDescrição",
  "imagemUrl": "https://exemplo.com/imagens/nova-imagem.jpg"
}
```

Exemplo de resposta (201 Created):
```json
{
  "id": 4,
  "data": "31/03/2025",
  "rotulo": "Novo Ponto\nDescrição",
  "imagemUrl": "https://exemplo.com/imagens/nova-imagem.jpg"
}
``` 