const createStrapi = require("@strapi/strapi")
const strapi = createStrapi()

async function seed() {
  for (let num = 1; num <= 36; num++){
    console.log(`database/seed/data-${num}.json`)
    let  data = require('fs').readFileSync(`database/seed/data-${num}.json`)
    const json = JSON.parse(data)

    let inserted = 0
    for(const item of json){
      try {
        const entry = await strapi.entityService.findMany('api::word.word', {
          filters: {kanji: item.kanji}
        });
        if (entry.length == 0){
          const {id, ...data } = item;
          // maybe use https://docs.strapi.io/dev-docs/api/query-engine/bulk-operations createMany
          let entry = await strapi.service('api::word.word').create({
              data: data
            })
          inserted++;
        }

      } catch (e) {
        console.log("couldnt create word", item, e);
        // throw error and stop process?
      }
    }
    console.log("inserted entries ", inserted)
  }
  process.exit(0) // to stop the script
}
strapi.load().then(seed)

// run by `node scripts/seed.js`
