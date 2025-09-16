Testes Unitários
1. Testes de Autenticação e Login (Firebase)
Estes testes garantem que os fluxos de entrada e cadastro de usuários funcionem de forma segura e confiável.

Cenário: Login bem-sucedido

O que testar: A função de login deve retornar uma resposta de sucesso quando um usuário insere e-mail e senha corretos.

O que esperar: O estado do aplicativo deve mudar para indicar que o usuário está autenticado, e a página deve ser redirecionada para a tela inicial.

Cenário: Login com credenciais inválidas

O que testar: A função de login deve tratar erros quando um usuário insere um e-mail ou senha incorretos.

O que esperar: O aplicativo deve exibir uma mensagem de erro clara para o usuário, e a página de login deve permanecer na tela.

Cenário: Cadastro bem-sucedido

O que testar: A função de cadastro deve criar um novo usuário no Firebase Auth com as credenciais fornecidas.

O que esperar: Um novo usuário deve ser registrado com sucesso, e o aplicativo deve direcionar o usuário para a página de login ou para a tela inicial.

2. Testes de Interação com o Firestore
Estes testes verificam se o aplicativo consegue salvar e recuperar dados do banco de dados de forma correta.

Cenário: Perfil do usuário salvo após o cadastro

O que testar: Verificar se um novo documento é criado no Firestore para o perfil do usuário imediatamente após um cadastro bem-sucedido.

O que esperar: O documento deve conter as informações básicas do usuário, como o ID e o e-mail, e ser armazenado no local correto do banco de dados.

Cenário: Carregamento do perfil do usuário

O que testar: Assegurar que o aplicativo consegue buscar e carregar os dados do perfil do usuário do Firestore assim que o login é concluído.

O que esperar: Os dados do perfil devem ser exibidos corretamente na interface do usuário (UI), como por exemplo, na página "Sobre".

3. Testes de Requisições da API (APIFootball)
Estes testes garantem que o aplicativo se comunique de forma eficaz com a API externa para obter dados sobre os jogos.

Cenário: Busca de partidas ao vivo bem-sucedida

O que testar: A chamada para a APIFootball deve retornar os dados de jogos sem erros.

O que esperar: O aplicativo deve processar a resposta da API e atualizar a página "Partidas ao Vivo" com as informações dos jogos. O estado de carregamento deve ser desativado.

Cenário: Erro na busca de partidas ao vivo

O que testar: O aplicativo deve lidar com falhas de requisição da API (por exemplo, erro de rede ou chave inválida).

O que esperar: Uma mensagem de erro apropriada deve ser exibida ao usuário, e o aplicativo não deve travar.