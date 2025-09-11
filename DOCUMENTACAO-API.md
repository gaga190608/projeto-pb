Documentação de Endpoints da API
Este documento detalha os pontos de acesso (endpoints) da API e serviços utilizados no aplicativo, com descrições e funcionalidades de cada um. O aplicativo utiliza o Firebase para autenticação e a RapidAPI para buscar dados em tempo real.

1. Firebase
Descrição
O Firebase é um conjunto de serviços do Google que fornece um backend como serviço (BaaS) para o aplicativo. Ele é utilizado para gerenciar a autenticação de usuários e o armazenamento de dados em tempo real.

Funcionalidades
Autenticação: Gerencia o cadastro e o login de usuários através de e-mail e senha.

Firestore: Utilizado como banco de dados NoSQL para armazenar perfis de usuário, garantindo que os dados sejam persistentes e possam ser acessados de forma segura.

2. RapidAPI
Endpoint
https://free-api-live-football-data.p.rapidapi.com/football-current-live

Método
GET

Descrição
Este endpoint é usado para buscar partidas de futebol que estão ocorrendo em tempo real. A chamada é feita em intervalos regulares para manter os dados sempre atualizados, garantindo que o placar e o status dos jogos sejam exibidos em tempo real na página de "Partidas ao Vivo".

Parâmetros
A autenticação é feita através de cabeçalhos da requisição.

x-rapidapi-host: string - O host da API.

x-rapidapi-key: string - Chave de autenticação da API.

Resposta
A resposta da API retorna um objeto com uma lista de jogos ao vivo, incluindo o nome dos times e seus respectivos placares.