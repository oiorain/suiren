'use strict';

/**
 * word router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::word.word');

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/words/:word/graph-data',
        handler: 'word.graphData',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
