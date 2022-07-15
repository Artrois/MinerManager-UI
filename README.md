# MinerManager UI

This project is created with vue3 for SinglePage rendering, vite to bundle, bootstrap 5 for some icons and styles and JScript for WebSocket connection to the backend. There is another complementary project for the [backend](https://github.com/Artrois/MinerManager-Backend.git) in Node.js/Express.
The backend is supposed to collect data from Whatsminer 30S (JSON formatted) and send it in regualr intervals via WebSocket to the front-end/UI. The UI in turn will render an overview dashboard showing most significant KPIs and it will also render tables with details for each miner. 
The UI is modular and can be extended with custom vue components to accomodate support for other Miners. More tricky modifications will need to be applied to the backend to support other miners than Whatsminer 30S.
To test the UI build and run preview. Run 
```sh
node backend_websocket.js 
node fake_miner.js.
```
The view is responsive and can be viewed on mobiles as well. Tables with miner data will translate/transform from horizontal to vertical representation including thead.

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
### Screens
![image](https://user-images.githubusercontent.com/76772066/179247238-83a92501-d4fb-466d-9b85-1254e618cbbb.png)
![image](https://user-images.githubusercontent.com/76772066/179247309-ece57d22-555e-4095-aa19-02e99a152b44.png)
![image](https://user-images.githubusercontent.com/76772066/179247555-17f98d36-d90f-4371-9ee6-9d58c4e78191.png)
![image](https://user-images.githubusercontent.com/76772066/179247631-bc5f315b-7407-49d4-a8c1-33b5860ac569.png)

