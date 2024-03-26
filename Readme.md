# Dall-E Clone

## Overview

Welcome to the DALL-E Clone project! This project is a recreation inspired by the groundbreaking DALL-E model developed by OpenAI, which generates images from textual descriptions. Our clone aims to replicate this functionality to a certain extent, allowing users to input prompts and generate corresponding images.

## Features

- **Text-to-Image Generation**: Input textual prompts and generate corresponding images.
- **Easy Download**: You can can share the generated image with others and also can download it.
- **User-Friendly Interface**: Simple user interface for ease of use.

### Fronted

 <p align="left">
 <a href="https://react.dev" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" height="50"/> &nbsp;&nbsp;&nbsp;&nbsp;
 </a>
<a href="https://tailwindcss.com/">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" height="50"/>
</a>
</p>
 
### Backend

<p align="left">
<a href="https://nodejs.org/en" target="_blank">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" height="50"/>
</a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://expressjs.com/" target="_blank">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" height="50" />
</a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://www.mongodb.com/" target="_blank">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg" height="50"/>
</a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="" target="_blank">
<img src="https://www.logo.wine/a/logo/Cloudinary/Cloudinary-Logo.wine.svg" width="120">
</a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://openai.com/product">
<img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" width="100">
</a>
</p>

## Project Setup

```bash
git clone https://github.com/ItsAnkitPatel/DALL-E.git
```

Now install all packages inside client

```bash
cd DALL-E/

npm i
```

Then switch to backend and install packages.

```bash
cd DALL_E/server/

npm i
```

Inside `DALL-E/constants/index.js`
Update the `DallE_API_URL` & `POST_API_URL` to use it locally.

E.g.

```
http://localhost:8080/api/v1/dalle
```

<br>
<br>

Now inside `DALL-E/server` create `.env` file and add these environment variables

```js
MONGODB_URL = "";
OPENAI_API_KEY = "";
OPENAI_API_KEY = "";

CLOUDINARY_CLOUD_NAME = "";
CLOUDINARY_API_KEY = "";
CLOUDINARY_API_SECRET = "";
```

Create account in Cloudinary and OpenAI to get the API keys and then add them in the environment variable.

Either you can use local mongodb or Online(MongoDb Atlas) just provide the link and you are done.

<br>
<br>

In terminal start backend first because fronted is fetching images from backend.

```bash
cd DALL-E/server/
nodemon
```

```bash
cd DALL-E/client/
npm run dev
```