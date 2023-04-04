const {
    engine: {createTransferEngine}, strapi: {providers: {createLocalStrapiDestinationProvider}}
} = require('@strapi/data-transfer');
const strapi = require('@strapi/strapi');
const {Readable} = require('stream')
const fs = require('fs');

const createSourceProvider = (directory) => {
    return {
        type: 'source', name: 'source::json',

        getMetadata() {
            return null;
        },

        createEntitiesReadStream() {
            function* gen() {
                // Read all files in the given directory and only keep those ending with .json
                const files = fs.readdirSync(directory).filter(file => file.endsWith('.json'));

                // For each file
                for (const file of files) {
                    // Read the file content (sync)
                    // Since the files only contains 500 entities, we can keep their content in memory
                    // Trying to stream JSON files is possible but necessitate the use of an external library.
                    const content = fs.readFileSync(file).toString();
                    const parsed = JSON.parse(content);

                    // For each entity in the parsed JSON
                    for (const entity of parsed) {
                        const {id: ref, ...data} = entity;

                        // Yield an entity that matches the expected strapi-transfer format
                        // { type: string; ref: number; data: Record<string, unknown> }
                        yield {type: 'api::word.word', ref, data}
                    }
                }
            }

            // Return a readable stream based on a generator instance
            return Readable.from(gen())
        }
    }
}

// Create the source provider (using the custom json provider)
const source = createSourceProvider('./db/seeds');
// Create a strapi destination provider
const destination = createLocalStrapiDestinationProvider(/*...*/)

const engine = createTransferEngine(source, destination);

engine.transfer().finally(() => process.exit(0))
