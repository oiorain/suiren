'use strict';

/**
 * word controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// push all kanji to filters
function filterOnlyKanji(kanji){
    let filters = []
    for (let i = 0; kanji[i]; i++) {
    // if character is a kanji
        if (/[\u4e00-\u9faf\u3400-\u4dbf]/.test(kanji[i]))
            filters.push({ kanji: { $contains: kanji[i]}})
    }
    return filters
}

function pushData(data, i, il, item){
    data.nodes.push({
        "id":il.toString(),
        "dbid": item.id.toString(),
        "kanji": item.kanji
    })
    data.links.push({
        "source": i.toString(),
        "target": il.toString(),
    })
}

module.exports = createCoreController('api::word.word', ({ strapi }) => ({
    async graphData(ctx) {
      try {
        // Fetch a single word by its ID from the request params
        const word = await strapi.documents('api::word.word').findFirst({
          fields: ['id', 'english', 'kanji'],
          filters: {
            kanji: ctx.params.word
          }
        });

        if (!word) {
          return ctx.send({ message: 'Word not found' }, 404);
        }

        let data = {
            "nodes": [
                {
                    "id":"0",
                    "dbid": word.id.toString(),
                    "kanji": word.kanji
                }
            ],
            "links": []
        }

        console.log(data)

        // // Fetch related definitions based on the word ID
        const words = await strapi.documents('api::word.word').findMany({
            fields: ["id", "kanji"],
            limit: 5,
            filters: { $or: filterOnlyKanji(word.kanji), },
        });

        for (let o = 0, i = 1; words[o]; o++){
            pushData(data, 0, i, words[o])

            let filters = filterOnlyKanji(words[o].kanji)
            if (filters.length > 0){
                const morewords = await strapi.documents('api::word.word').findMany({
                    fields: ["id", "kanji"],
                    limit: 5,
                    filters: { $or: filterOnlyKanji(words[o].kanji), },
                });

                let il = i;
                for (let d = 0; morewords[d]; d++){
                    il++;
                    pushData(data, i, il, morewords[d])
                }
                i = il+1;
            }
        }

        // Aggregate data
        const aggregatedData = {
          word: word,
          data: data,
        };

        // Send the aggregated data as response
        ctx.send(aggregatedData);
      } catch (err) {
        ctx.send({ error: 'An error occurred', details: err });
      }
    },
}));
