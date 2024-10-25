/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { StartServicesAccessor } from '@kbn/core/server';
import { buildSiemResponse } from '@kbn/lists-plugin/server/routes/utils';
import { transformError } from '@kbn/securitysolution-es-utils';
import { RISK_ENGINE_ENABLE_URL, APP_ID } from '../../../../common/constants';
import type { StartPlugins } from '../../../plugin';
import type { SecuritySolutionPluginRouter } from '../../../types';

export const riskEngineEnableRoute = (
  router: SecuritySolutionPluginRouter,
  getStartServices: StartServicesAccessor<StartPlugins>
) => {
  router.post(
    {
      path: RISK_ENGINE_ENABLE_URL,
      validate: {},
      options: {
        tags: ['access:securitySolution', `access:${APP_ID}-entity-analytics`],
      },
    },
    async (context, request, response) => {
      const siemResponse = buildSiemResponse(response);
      const [_, { taskManager }] = await getStartServices();
      const securitySolution = await context.securitySolution;
      const riskEngineClient = securitySolution.getRiskEngineDataClient();

      if (!taskManager) {
        return siemResponse.error({
          statusCode: 400,
          body: {
            message:
              'Task Manager is unavailable, but is required to enable the risk engine. Please enable the taskManager plugin and try again.',
          },
        });
      }

      try {
        await riskEngineClient.enableRiskEngine({ taskManager });
        return response.ok({ body: { success: true } });
      } catch (e) {
        const error = transformError(e);

        return siemResponse.error({
          statusCode: error.statusCode,
          body: { message: error.message, full_error: JSON.stringify(e) },
        });
      }
    }
  );
};
