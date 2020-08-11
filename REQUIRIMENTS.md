# Recuperação de Senha
**Requisitos Funcionais**

- O usuário deve poder recuperar a senha utilizando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar a senha;

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**Regras de Negocios**

- O link enviado por email para resetar a senha, deve expirrar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do perfil
**Requisitos Funcionais**

- O usuário deve poder atualizar o seu nome, email, senha;

**Regras de Negocios**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua senha;


# Painel do prestador
**Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Requisitos Não Funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de Negocios**
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços
**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;
-

**Regras de Negocios**

- Cada agendamento deve durar 1h exatamente;
- Os agendamenttos devem estar disponíveis entre 8h às 18 (primeiro às 8h, último às 17);
- O usuário não pode agendar em um horário passado;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar serviços consigo mesmo;
