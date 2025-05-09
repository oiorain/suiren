const { createStrapi } = require("@strapi/strapi");

async function seed() {
  for (let num = 1; num <= 36; num++){
    console.log(`database/seed/data-${num}.json`)
    let  data = require('fs').readFileSync(`database/seed/data-${num}.json`)
    const json = JSON.parse(data)

    let created = 0
    for(const item of json){
      try {
        const entry = await strapi.entityService.findMany('api::word.word', {
          filters: { kanji: item.kanji },
          limit: 1
        });

        if (entry.length == 0){
          const {id, ...data } = item;
          let entry = await strapi.entityService.create('api::word.word', {
              data: data
            })
            created++;
        }

      } catch (e) {
        console.log("couldnt create word", item, e);
        process.exit()
      }
    }
    console.log("inserted entries ", created)
  }
  process.exit(0)
}

(async () => {
  const strapi = await createStrapi();
  await strapi.start();
  await seed();
  process.exit(0);
})();
