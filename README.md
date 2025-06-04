# 🌎 Global Solution - GAIA - App de Apoio em Situações de Alagamento

![Logo do App](./Gaia/assets/G.png)

Este aplicativo foi desenvolvido como parte da disciplina de Global Solution com o objetivo de apoiar comunidades afetadas por fortes chuvas e alagamentos, permitindo a visualização de áreas de risco e a doação de itens essenciais.

## 👨‍💻 Integrantes do Grupo

- **Murillo Sant'Anna** – RM557183 – 2TDSPM  
- **Eduardo Augusto Pelegrino Einsfeldt** – RM556460 – 2TSDPM 
- **Luiz Eduardo** – RM555213 – 2TSDPM

## 📹 Link para o Vídeo de Apresentação

👉 [Assista no YouTube](https://www.youtube.com/SEU-LINK-AQUI)  
_(Substitua pelo link verdadeiro do vídeo)_

## 💡 Descrição da Solução

O app foi criado com foco em **conscientização e auxílio às vítimas de enchentes**, oferecendo duas funcionalidades principais:

### 🌀 Locais em Risco
Permite que o usuário busque cidades e veja se há **risco de alagamento**, com base em dados da API OpenWeather. O risco é calculado conforme a previsão de chuva nas próximas horas.

### 👐 Doações
Usuários podem **cadastrar doações** de alimentos, roupas ou remédios para ajudar comunidades afetadas. As doações são salvas localmente e também enviadas para uma **API Java** integrada.

---

## 🧱 Tecnologias Utilizadas

- **React Native** com Expo
- **JavaScript (ES6+)**
- **AsyncStorage** para armazenamento local
- **Axios** para comunicação com a API em Java
- **React Navigation** para navegação entre telas
- **API OpenWeather** para dados meteorológicos
- **Backend em Java (Spring Boot)** – para persistência de doações e login

---

## ✅ Funcionalidades

- 🔐 Login e cadastro de usuários
- 🔍 Verificação de risco em cidades com base em previsão de chuva
- ➕ Cadastro de doações com nome, categoria e descrição
- 🗂 Visualização de doações separadas por categorias
- 📝 Edição de doações
- ❌ Exclusão de doações
- 👤 Tela de perfil do usuário logado

---

## 📁 Organização do Projeto

- `/components` – componentes reutilizáveis como Header, Footer
- `/screens` – telas principais do app (Login, Cadastro, Locais, Doações, Perfil)
- `/services` – integração com API externa e backend Java
- `/assets` – imagens e ícones personalizados

---

## 📌 Observações

- O projeto cumpre os requisitos mínimos da avaliação:
  - 5 telas com navegação
  - CRUD completo com API Java
  - Estilização com identidade visual
  - Arquitetura organizada

---

