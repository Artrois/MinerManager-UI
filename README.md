# MinerManager UI

This project is created with vue3 for SinglePage rendering, vite to bundle, bootstrap 5 for some icons and styles and JScript for WebSocket connection to the backend. There is another complementary project for the [backend](https://github.com/Artrois/MinerManager-Backend.git) in Node.js/Express.
The backend is supposed to collect data from Whatsminer 30S (JSON formatted) and send it in regualr intervals via WebSocket to the front-end/UI. The UI in turn will render an overview dashboard showing most significant KPIs and it will also render tables with details for each miner. 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
### Preview

```sh
npm run preview
```

