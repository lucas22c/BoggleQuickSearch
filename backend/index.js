const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const fs = require('fs');
const searchFuncs = require('./funcs/search');
const getFrequencyMap = searchFuncs.getFrequencyMap;
const canFormWord = searchFuncs.canFormWord;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Boggle Word Search app");
});


const words = fs.readFileSync('./data/filtered_words.txt', 'utf-8').split('\n');
const wordData = words.map((w) => ({
  word: w,
  frequencyMap: getFrequencyMap(w),
}))


app.post("/search", (req, res) => { 
  const letters = req.body.letters; // Expecting { letters: "example" }
  if (!letters || typeof letters !== 'string' || letters.length != 6) {
    return res.status(400).json({ error: "Invalid input. Please provide a string of 6 letters." });
  }

  const availableChars = getFrequencyMap(letters);

  const foundWords = wordData
    .filter(entry => canFormWord(entry.word, availableChars))
    .map(entry => entry.word);

  res.json({ foundWords });

}); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});