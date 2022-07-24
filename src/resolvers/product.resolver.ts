import { Arg, Query, Resolver } from "type-graphql";

// types
import { Product } from "../types/product.types";

// clients
import { elasticClient } from "../shared/elastic";
import { SearchHit } from "@elastic/elasticsearch/lib/api/types";

@Resolver()
export class ProductResolver {
    private async searchSuggestions(searchTerm: string): Promise<Product[]> {
        const resp = await elasticClient.search({
            index: 'medicalitems',
            size: 50,
            query: {
                bool: {
                    should: [
                        {
                            prefix: {
                                generic: searchTerm
                            }
                        },
                        {
                            prefix: {
                                variations: searchTerm
                            }
                        },
                        {
                        multi_match: {
                            query: searchTerm,
                            minimum_should_match: 2,
                            fields: ["generic", "variations"],
                            operator: "or",
                            fuzziness: "AUTO",
                            fuzzy_transpositions: true
                        }
                        }
                    ]
                }
            }
        });

        const parsedResults: Product[] = [];

        for (const hit of resp.hits.hits) {
            const product = hit as SearchHit<Product>;

            if (product._source) {
                parsedResults.push({
                    id: product._id,
                    category: product._source.category,
                    form: product._source.form,
                    unit: product._source.unit,
                    generic: product._source.generic,
                    variations: product._source.variations,
                })
            }
        }
        
        return parsedResults;
    }


    @Query(_ => [Product])
    async productAutocomplete(@Arg("searchTerm") searchTerm: string): Promise<Product[]> {
        const results = await this.searchSuggestions(searchTerm);
        return results;
    }
}