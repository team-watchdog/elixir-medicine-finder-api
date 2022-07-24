import { config } from "dotenv";
config();

import * as fs from 'fs';
import { parse } from 'fast-csv';

import { elasticClient } from '../shared/elastic';

const operations: {[key: string]: unknown}[] = [];

const indexSettings = {
    "settings": {
      "analysis": {
        "filter": {
          "autocomplete_filter": {
            "type": "edge_ngram",
            "min_gram": 1,
            "max_gram": 10
          }
        },
        "analyzer": {
          "autocomplete": { 
            "type": "custom",
            "tokenizer": "standard",
            "filter": [
              "lowercase",
              "autocomplete_filter"
            ]
          }
        }
      }
    },
    "mappings": {
      "properties": {
        "generic": {
          "type": "text",
          "analyzer": "autocomplete", 
          "search_analyzer": "standard"
        },
        "variations": {
          "type": "text",
          "analyzer": "autocomplete", 
          "search_analyzer": "standard"
        }
      }
    }
  };

fs.createReadStream('./src/data/medicalitems.csv')
.pipe(parse({ headers: true }))
.on('error', error => console.error(error))
.on('data', async (row) => {
    const tmp = {
        category: row.category,
        form: row.form,
        generic: row.generic,
        unit: row.unit,
        variations: row.variations.split(','),
    }

    operations.push({
        index: "medicalitems",
        id: row._id,
        body: tmp,
    });
    /*
    if (!row) return;

    const res = await elasticClient.index({
        index: "medicalitems",
        id: row._id,
        body: {
            category: row.category,
            form: row.form,
            generic: row.generic,
            unit: row.unit,
            variations: row.variations.split(','),
        }
    });
    console.log(row);
    */
})
.on('end', async (rowCount: number) => {
    console.log(operations);
});