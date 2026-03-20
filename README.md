# Primeiro trabalho referente à matéria de Sistemas Distribuídos.
# Sistema de reserva de assentos - Cinema
## Tecnologias utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** FastAPI (Python)
- **Banco de Dados:** Supabase (PostgreSQL)
- **Autenticação:** Supabase Auth

## Instruções de instalação
### Pré-requisitos

- Python 3.11.X
- Conta no Supabase (Para poder utilizar as credenciais URL e KEY)
- Utilizar o esquema presente nos arquivos (banco.sql) para o Supabase

### Bibliotecas python para funcionamento

- fastapi
- uvicorn
- supabase

Instalação das bibliotecas através do comando: pip install fastapi uvicorn supabase

## Execução

### No diretório server/
- Prosseguir o comando: python main.py
- Assim o servidor irá ser iniciado.

### No diretório client/ 
- Prosseguir o comando: python -m http.server 5500
- Acessar o sistema através de: http://localhost:5500

## Estrutura

├── client/ # Frontend da aplicação
│ ├── index.html # Interface (login + assentos)
│ ├── style.css # Estilização
│ └── script.js # Lógica e comunicação com a API
│
├── server/ # Backend (API)
│ └── main.py # FastAPI (rotas, autenticação, regras)
│
└── README.md # Documentação do projeto

## Interfaces
### Tela de login
<img src="https://github.com/Yuri-Marques/Sistemas-Distribuidos/blob/main/images/Tela%20login.png" alt="Descrição" width="500">

### Tela de reservas (Com todos os assentos livres)
<img src="https://github.com/Yuri-Marques/Sistemas-Distribuidos/blob/main/images/Tela%20sem%20reserva.png" alt="Descrição" width="500">

### Tela de reservas (Com assento ocupado)
<img src="https://github.com/Yuri-Marques/Sistemas-Distribuidos/blob/main/images/Tela%20com%20reserva.png" alt="Descrição" width="500">

