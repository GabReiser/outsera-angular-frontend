# Avaliação Técnica - Front-end Angular

Este projeto é uma aplicação web desenvolvida em **Angular** para visualizar indicados e vencedores da categoria "Pior Filme" do *Golden Raspberry Awards*. A aplicação consome uma API REST externa e apresenta os dados em um Dashboard e uma Listagem com filtros.

## Tecnologias Utilizadas

* **Angular v17+** (Standalone Components)
* **TypeScript**
* **SCSS** (Sass)
* **Jasmine & Karma** (Testes Unitários)
* **HttpClient** (Comunicação com API)

## Pré-requisitos

* **Node.js** (Versão **18.13.0** ou superior recomendada)
* **NPM** (Gerenciador de pacotes do Node)
* **Angular CLI** (Globalmente ou via npx)

## Instalação

1. Clone o repositório:
   ```bash
   git clone [https://github.com/GabReiser/outsera-angular-frontend.git](https://github.com/GabReiser/outsera-angular-frontend.git)
   outsera-angular-frontend
   ```

2. Instale as dependências:

```bash 
npm install
```

3. Executar o aplicativo:

```bash 
ng serve
```

## Testes Unitarios

O projeto possui cobertura de testes para serviõs e componentes para validar logica de negócio e integração com a API.

'```bash 
ng test
```