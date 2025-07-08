import xlsx from "xlsx";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  Names = new Map();
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    if (typeof word !== "string") {
      throw new Error(`Invalid word type: ${typeof word}`);
    }

    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }

    let words = [];
    this.findWords(node, prefix, words);
    return words;
  }

  findWords(node, prefix, words) {
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    for (let char in node.children) {
      this.findWords(node.children[char], prefix + char, words);
    }
  }
}

let API = new Trie();
const workbook = xlsx.readFile("./Utils/stockNames.xlsx");
const sheetNames = workbook.SheetNames;
const worksheet = workbook.Sheets[sheetNames[0]]; 

const jsonData = xlsx.utils.sheet_to_json(worksheet);

const columnName = "Symbol";
const ColumnName1 = "Company Name";
const columnValues = jsonData
  .map((row) => row[columnName])
  .filter((value) => typeof value === "string");

const columnValues1 = jsonData
  .map((row) => row[ColumnName1])
  .filter((value) => typeof value === "string"); 

for (let i = 0; i < columnValues.length; i++) {
  API.Names.set(columnValues[i], columnValues1[i]);
}
for (let i = 0; i < columnValues.length; i++) {
  try {
    API.insert(columnValues[i]);
  } catch (error) {
    console.error(`Error inserting value at index ${i}:`, error.message);
  }
}
const stockname = (req, res) => {
  res.status(201).json({columnValues});
};
export default API;

export {stockname}
