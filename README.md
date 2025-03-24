# Lista de Tarefas com Acessibilidade

Este é um aplicativo de lista de tarefas desenvolvido com React e TypeScript, com foco em acessibilidade para pessoas com dislexia. As palavras das tarefas são separadas em sílabas para facilitar a leitura.
![image](https://github.com/user-attachments/assets/415b30f4-fea6-4d85-a86f-c200052d4ba1)

## Como executar 

1. Acesse a versão final do projeto compilado (pasta `dist`)
2. Faça o download do `.zip`
3. Extraia os arquivos
4. Dê dois cliques em `index.html`
5. O aplicativo será aberto diretamente no seu navegador

## Funcionalidades já implementadas

- Campo de entrada com foco automático
- Adicionar, editar e excluir tarefas
- Destaque visual da última tarefa adicionada
- Separação silábica básica (via dicionário fixo)
- Mensagens de status acessíveis com `aria-live="polite"`
- Interface limpa e sem bibliotecas externas

## Melhorias futuras (planejadas)

- Separação silábica automática e inteligente (sem dicionário fixo)
- Armazenamento das tarefas no navegador (`localStorage`)
- Suporte a fontes acessíveis como OpenDyslexic
- Opção de separação por hífen, espaço ou cor
- Interface para edição manual da separação silábica

## Para desenvolvedores

### Requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Como executar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# 2. Acesse a pasta do projeto
cd seu-repositorio

# 3. Instale as dependências
npm install
# ou
yarn install

# 4. Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

Abra o navegador e acesse:  
http://localhost:5173 (ou a porta indicada no terminal)
