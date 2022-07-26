const MedicineRequestIndexSettings = {
    "mappings": {
        "properties": {
            "location": {
                "type": "geo_point"
            }
        }
    }
}

const PharmacyIndexSettings = {
    "mappings": {
        "properties": {
            "location": {
                "type": "geo_point"
            }
        }
    }
}

const MedicalItemsIndexSettings = {
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
}