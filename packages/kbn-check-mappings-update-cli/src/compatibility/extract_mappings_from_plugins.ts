/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import * as Rx from 'rxjs';
import { SomeDevLog } from '@kbn/some-dev-log';
import type { SavedObjectsTypeMappingDefinitions } from '@kbn/core-saved-objects-base-server-internal';
import { startTSWorker } from '@kbn/dev-utils';
import type { Result } from './extract_mappings_from_plugins_worker';

/**
 * Run a worker process that starts the core with all plugins enabled and sends back the
 * saved object mappings for all plugins.
 *
 * We run this in a child process to make it easier to kill the kibana instance once done
 * (dodges issues with open handles), and so that we can harvest logs and feed them into
 * the logger when debugging.
 */
export async function extractMappingsFromPlugins(
  log: SomeDevLog
): Promise<SavedObjectsTypeMappingDefinitions> {
  log.info('Loading core with all plugins enabled so that we can get all savedObject mappings...');

  const { msg$, proc } = startTSWorker<Result>({
    log,
    src: require.resolve('./extract_mappings_from_plugins_worker.ts'),
  });

  const mappings = await Rx.firstValueFrom(
    msg$.pipe(
      Rx.map((result) => {
        log.debug('message received from worker', result);
        proc.kill('SIGILL');
        return result.mappings;
      }),
      Rx.defaultIfEmpty(undefined)
    )
  );

  if (!mappings) {
    throw new Error('worker exitted without sending mappings');
  }

  log.info(`Got mappings for ${Object.keys(mappings).length} types from plugins.`);

  return mappings;
}
