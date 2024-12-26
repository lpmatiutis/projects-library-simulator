import express from "express";
import { Library } from "./Library";
import { Book } from "./models/Book";
import { Magazine } from "./models/Magazine";
import cors from "cors";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./data/library.db",
    synchronize: true,
    logging: false,
    entities: [Book, Magazine],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => console.error("Database connection error:", error));


const app = express();
const library = Library.getInstance();

const filePath = './library.json';
library.loadFromFile(filePath);

app.use(express.json());

app.use(cors());

//TODO: Add short and pagination
app.get("/items", (req, res) => {
    setTimeout(() => {
        const {search, category} = req.query;
        let items = library.getListItems();
        if (search) {
            const searchLower = search.toString().toLowerCase();
            items = items.filter((item) => item.title.toLowerCase().includes(searchLower));
        }
        // if (category) {
        //     items = items.filter((item) => item.category === category);
        // }

        res.json(items);
    }, 2000);
    
});

app.post("/items", (req, res) => {
    const { title, year, type, ...rest } = req.body;
    try {
        if (type === "book") {
            const { author, category } = rest;
            const book = new Book(title, author, year, category, true);
            library.addItem(book);
        } else if (type === "magazine") {
            const { issueNumber, category } = rest;
            const magazine = new Magazine(title, year, issueNumber);
            library.addItem(magazine);
        }
        res.status(201).send("Item added successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
