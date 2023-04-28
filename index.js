import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import fs, { promises } from 'fs';


// Task 1
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, ()=> {
 console.log(`Server started on http://localhost:${PORT}`);
})


// Task 2
if(process.env.NODE_ENV == 'development') {
    console.log('development mode');
} else {
    console.log('production mode');
}

// Task 3

fs.readFile(path.join(__dirname, './package.json'), (err, content) => {
    const jsonText = content.toString();
    if (err) {
    console.error(err);
    }
    app.get('/', (req, res)=>{
        res.send(`<h1>Wellcome</h1> <h2>JSON text:</h2> <pre>${jsonText}</pre>`);
       })
});

// Task 4

async function getData() {
    const jsonData = await promises.readFile(path.join(__dirname, 'package.json'))
    app.get('/', (req, res)=> {
        res.send(`<h1>Wellcome</h1> <h2>JSON text:</h2> <pre>${jsonData.toString()}</pre>`)
    })
};

getData();