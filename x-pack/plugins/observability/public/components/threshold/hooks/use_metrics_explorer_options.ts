/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import DateMath from '@kbn/datemath';
import * as t from 'io-ts';
import { values } from 'lodash';
import createContainer from 'constate';
import type { TimeRange } from '@kbn/es-query';
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';

import { metricsExplorerMetricRT } from '../../../../common/threshold_rule/metrics_explorer';
import { Color } from '../../../../common/threshold_rule/color_palette';

import { useAlertPrefillContext } from '../helpers/use_alert_prefill';
import { useKibanaTimefilterTime, useSyncKibanaTimeFilterTime } from './use_kibana_timefilter_time';

const metricsExplorerOptionsMetricRT = t.intersection([
  metricsExplorerMetricRT,
  t.partial({
    rate: t.boolean,
    color: t.keyof(Object.fromEntries(values(Color).map((c) => [c, null])) as Record<Color, null>),
    label: t.string,
  }),
]);

export type MetricsExplorerOptionsMetric = t.TypeOf<typeof metricsExplorerOptionsMetricRT>;

export enum MetricsExplorerChartType {
  line = 'line',
  area = 'area',
  bar = 'bar',
}

export enum MetricsExplorerYAxisMode {
  fromZero = 'fromZero',
  auto = 'auto',
}

export const metricsExplorerChartOptionsRT = t.type({
  yAxisMode: t.keyof(
    Object.fromEntries(values(MetricsExplorerYAxisMode).map((v) => [v, null])) as Record<
      MetricsExplorerYAxisMode,
      null
    >
  ),
  type: t.keyof(
    Object.fromEntries(values(MetricsExplorerChartType).map((v) => [v, null])) as Record<
      MetricsExplorerChartType,
      null
    >
  ),
  stack: t.boolean,
});

export type MetricsExplorerChartOptions = t.TypeOf<typeof metricsExplorerChartOptionsRT>;

const metricExplorerOptionsRequiredRT = t.type({
  aggregation: t.string,
  metrics: t.array(metricsExplorerOptionsMetricRT),
});

const metricExplorerOptionsOptionalRT = t.partial({
  limit: t.number,
  groupBy: t.union([t.string, t.array(t.string)]),
  filterQuery: t.string,
  source: t.string,
  forceInterval: t.boolean,
  dropLastBucket: t.boolean,
});
export const metricExplorerOptionsRT = t.intersection([
  metricExplorerOptionsRequiredRT,
  metricExplorerOptionsOptionalRT,
]);

export type MetricsExplorerOptions = t.TypeOf<typeof metricExplorerOptionsRT>;

export const metricsExplorerTimestampsRT = t.type({
  fromTimestamp: t.number,
  toTimestamp: t.number,
  interval: t.string,
  timeFieldName: t.string,
});
export type MetricsExplorerTimestampsRT = t.TypeOf<typeof metricsExplorerTimestampsRT>;

export const metricsExplorerTimeOptionsRT = t.type({
  from: t.string,
  to: t.string,
  interval: t.string,
});
export type MetricsExplorerTimeOptions = t.TypeOf<typeof metricsExplorerTimeOptionsRT>;

export const DEFAULT_TIMERANGE: MetricsExplorerTimeOptions = {
  from: 'now-1h',
  to: 'now',
  interval: '>=10s',
};

export const DEFAULT_CHART_OPTIONS: MetricsExplorerChartOptions = {
  type: MetricsExplorerChartType.line,
  yAxisMode: MetricsExplorerYAxisMode.fromZero,
  stack: false,
};

export const DEFAULT_METRICS: MetricsExplorerOptionsMetric[] = [
  {
    aggregation: 'avg',
    field: 'system.cpu.total.norm.pct',
    color: Color.color0,
  },
  {
    aggregation: 'avg',
    field: 'kubernetes.pod.cpu.usage.node.pct',
    color: Color.color1,
  },
  {
    aggregation: 'avg',
    field: 'docker.cpu.total.pct',
    color: Color.color2,
  },
];

export const DEFAULT_OPTIONS: MetricsExplorerOptions = {
  aggregation: 'avg',
  metrics: DEFAULT_METRICS,
  source: 'default',
};

export const DEFAULT_METRICS_EXPLORER_VIEW_STATE = {
  options: DEFAULT_OPTIONS,
  chartOptions: DEFAULT_CHART_OPTIONS,
  currentTimerange: DEFAULT_TIMERANGE,
};

function parseJsonOrDefault<Obj>(value: string | null, defaultValue: Obj): Obj {
  if (!value) {
    return defaultValue;
  }
  try {
    return JSON.parse(value) as Obj;
  } catch (e) {
    return defaultValue;
  }
}

function useStateWithLocalStorage<State>(
  key: string,
  defaultState: State
): [State, Dispatch<SetStateAction<State>>] {
  const storageState = localStorage.getItem(key);
  const [state, setState] = useState<State>(parseJsonOrDefault<State>(storageState, defaultState));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

const getDefaultTimeRange = ({ from, to }: TimeRange) => {
  const fromTimestamp = DateMath.parse(from)!.valueOf();
  const toTimestamp = DateMath.parse(to, { roundUp: true })!.valueOf();
  return {
    fromTimestamp,
    toTimestamp,
    interval: DEFAULT_TIMERANGE.interval,
  };
};

export const useMetricsExplorerOptions = () => {
  const TIME_DEFAULTS = { from: 'now-1h', to: 'now' };
  const [getTime] = useKibanaTimefilterTime(TIME_DEFAULTS);
  const { from, to } = getTime();

  const [options, setOptions] = useStateWithLocalStorage<MetricsExplorerOptions>(
    'MetricsExplorerOptions',
    DEFAULT_OPTIONS
  );
  const [timeRange, setTimeRange] = useState<MetricsExplorerTimeOptions>({
    from,
    to,
    interval: DEFAULT_TIMERANGE.interval,
  });
  const [timestamps, setTimestamps] = useState<MetricsExplorerTimestampsRT>({
    ...getDefaultTimeRange({ from, to }),
    timeFieldName: '@timestamp',
  });

  useSyncKibanaTimeFilterTime(TIME_DEFAULTS, {
    from: timeRange.from,
    to: timeRange.to,
  });

  const [chartOptions, setChartOptions] = useStateWithLocalStorage<MetricsExplorerChartOptions>(
    'MetricsExplorerChartOptions',
    DEFAULT_CHART_OPTIONS
  );
  const [isAutoReloading, setAutoReloading] = useState<boolean>(false);

  const { metricThresholdPrefill } = useAlertPrefillContext();
  // For Jest compatibility; including metricThresholdPrefill as a dep in useEffect causes an
  // infinite loop in test environment
  const prefillContext = useMemo(() => metricThresholdPrefill, [metricThresholdPrefill]);

  useEffect(() => {
    if (prefillContext) {
      const { setPrefillOptions } = prefillContext;
      const { metrics, groupBy, filterQuery } = options;

      setPrefillOptions({ metrics, groupBy, filterQuery });
    }
  }, [options, prefillContext]);

  return {
    defaultViewState: {
      options: DEFAULT_OPTIONS,
      chartOptions: DEFAULT_CHART_OPTIONS,
      currentTimerange: timeRange,
    },
    options,
    chartOptions,
    setChartOptions,
    timeRange,
    isAutoReloading,
    setOptions,
    setTimeRange,
    startAutoReload: () => setAutoReloading(true),
    stopAutoReload: () => setAutoReloading(false),
    timestamps,
    setTimestamps,
  };
};

export const [MetricsExplorerOptionsContainer, useMetricsExplorerOptionsContainerContext] =
  createContainer(useMetricsExplorerOptions);
