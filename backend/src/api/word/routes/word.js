'use strict';

/**
 * word router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::word.word');

// Customize the default router
const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat([
        {
          method: 'GET',
          path: '/words/:word/graph-data',
          handler: 'word.graphData',
          config: {
            policies: [],
            middlewares: [],
          },
        },
      ]);
      return routes;
    },
  };
};

module.exports = customRouter(defaultRouter);
