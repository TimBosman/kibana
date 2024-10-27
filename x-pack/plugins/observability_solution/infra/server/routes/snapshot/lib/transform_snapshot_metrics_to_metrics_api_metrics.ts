/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { identity } from 'lodash';
import { networkTraffic, findInventoryModel } from '@kbn/metrics-data-access-plugin/common';
import type { MetricsAPIMetric } from '@kbn/metrics-data-access-plugin/common/http_api/metrics_api';
import { type SnapshotRequest, SnapshotCustomMetricInputRT } from '../../../../common/http_api';

export const transformSnapshotMetricsToMetricsAPIMetrics = (
  snapshotRequest: SnapshotRequest
): MetricsAPIMetric[] => {
  return snapshotRequest.metrics
    .map((metric, index) => {
      const inventoryModel = findInventoryModel(snapshotRequest.nodeType);
      const aggregations = inventoryModel.metrics.snapshot?.[metric.type];
      if (SnapshotCustomMetricInputRT.is(metric)) {
        const isUniqueId = snapshotRequest.metrics.findIndex((m) =>
          SnapshotCustomMetricInputRT.is(m) ? m.id === metric.id : false
        );
        const customId = isUniqueId ? metric.id : `custom_${index}`;
        if (metric.aggregation === 'rate') {
          return { id: customId, aggregations: networkTraffic(customId, metric.field) };
        }
        return {
          id: customId,
          aggregations: {
            [customId]: {
              [metric.aggregation]: {
                field: metric.field,
              },
            },
          },
        };
      }
      return { id: metric.type, aggregations };
    })
    .filter(identity) as MetricsAPIMetric[];
};
