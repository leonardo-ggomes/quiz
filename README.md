# Enquete Interativa com Node.js e Socket.IO

Bem-vindo ao **Enquete Interativa**, uma aplicação desenvolvida com **Node.js** e **Socket.IO** que permite a realização de votações em tempo real. Ideal para professores e educadores que desejam interagir com os alunos de forma dinâmica e prática.

---

## **Funcionalidades**

### Para Alunos:
- **Votação única por pergunta:** Cada aluno pode votar apenas uma vez em cada pergunta, garantindo integridade nos resultados.
- **Interface Simples:** Basta acessar o endereço da aplicação para votar.

### Para Professores:
- **Painel Administrativo:**
  - Acesse `/adm` para criar novas perguntas de forma rápida.
  - Monitore e controle as enquetes diretamente pelo painel.
- **Relatório de Resultados:**
  - Veja os resultados em tempo real acessando `/report`.

### Segurança:
- Validação de IP: Garante que cada usuário vote apenas uma vez por pergunta.

---

## **Instalação**

### **Pré-requisitos:**
- [Node.js](https://nodejs.org/) instalado.
- Gerenciador de pacotes **npm** ou **yarn**.

### **Passos para instalação:**
1. Clone este repositório:
   ```bash
   git clone https://github.com/leonardo-ggomes/quiz.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd quiz
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Acesse a aplicação no navegador:
   ```
   http://localhost ou http://seu-ip
   ```

---

## **Rotas Disponíveis**

### 1. **Rota principal:** `/`
   - Página inicial onde os alunos podem votar nas perguntas ativas.

### 2. **Painel Administrativo:** `/adm`
   - Exclusivo para professores:
     - Criar, editar e remover perguntas.

### 3. **Relatório de Resultados:** `/report`
   - Visualize os resultados das enquetes em tempo real.

---

## **Tecnologias Utilizadas**

- **Node.js:** Plataforma JavaScript para construção do servidor.
- **Socket.IO:** Comunicação em tempo real entre clientes e servidor.
- **HTML/CSS:** Interface simples e intuitiva para usuários.

---

## **Como Contribuir**

1. Faça um fork deste repositório.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e adicione os commits:
   ```bash
   git commit -m 'Minha nova feature'
   ```
4. Envie para sua branch remota:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

---

## **Autor**
Desenvolvido por **Leonardo Garcia**.

---

## **Licença**
Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.

---

Aproveite a aplicação e boas votações! 🎉
