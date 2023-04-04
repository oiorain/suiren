'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(/*{ strapi }*/) {
    console.log("------------")

    for (let num = 1; num <= 36; num++){
      console.log(`database/seed/data-${num}.json`)
      let  data = require('fs').readFileSync(`database/seed/data-${num}.json`)
      const json = JSON.parse(data)
      //.slice(0, 100)

      let inserted = 0
      for (let i = 0; json[i]; i++){
        try {
          const entry = await strapi.entityService.findMany('api::word.word', {
            filters: {kanji: json[i].kanji}
          });
          if (entry.length == 0){
            let entry = await strapi.service('api::word.word').create({
              // ref: json[i].id // pour input le meme id.
                data: {
                  kanji: json[i].kanji,
                  hiragana: json[i].hiragana,
                  english: json[i].english,
                  jlpt: json[i].jlpt,
                  wanikani: json[i].wanikani
                }
              })
            inserted++;
          }

        } catch (e) {
          console.log("couldnt create word", json[i], e);
        }
      }
      console.log("inserted entries ", inserted)
    }

    console.log("------------")
  },
};
