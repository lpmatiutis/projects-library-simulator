import express from "express";
import { Library } from "./Library";
import { Book } from "./Book";
import { Magazine } from "./Magazine";
import cors from "cors";


const app = express();
const library = Library.getInstance();

const filePath = './library.json';
library.loadFromFile(filePath);

app.use(express.json());

app.use(cors());


app.get("/items", (req, res) => {
    res.json(library.getListItems());
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
