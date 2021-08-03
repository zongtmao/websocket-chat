# chatroom 原生js版本  vite构建

# 前端：安装步骤
> cd chatroom
> npm init -y
> npm install vite
> npm run serve

- 修改package.json里的命令行

```
"scripts": {
    "serve": "vite"
},
```


# 后端server: 安装步骤
> cd server
> npm init -y
> npm install ws
> npm install nodemon -g

- 修改package.json里的命令行,监听index.js

```
"scripts": {
    "dev": "nodemon index.js"
},
```