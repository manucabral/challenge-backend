## ⚙️ Alkemy Backend Challenge

Disney REST API Backend Challenge by [Alkemy](https://www.alkemy.org/)

🚀 The API is public deployed [here](https://disney-challenge.up.railway.app/)
> Deployed with Railway

📚 See the full documentation [here](https://documenter.getpostman.com/view/11661322/2s7YfU8YVy)
> Documented with Postman

### 📦 Installation
For local usage
```bash
git clone https://github.com/manucabral/challenge-backend.git
cd challenge-backend
npm install
```
Just start the server with
```bash
npm start
```


### 🛠 Development
Starts livereloading server with
```bash
npm run dev
```
Run all tests with
```bash
npm run test
```
#### 📝 Environment variables
Create a `.env` file using the next [example](https://github.com/manucabral/challenge-backend/blob/main/.env.example)
If you not define these variables you may have an **error**

For lazy people, you can fill the genre, movie and user tables enabling **DATABASE_FILL**

#### 🔐 Authorization
If you enabled **DATABASE_FILL** you can use the next account for authenticate
```json
{
    "email": "test@gmail.com",
    "password": "wowsuperpass"
}
```