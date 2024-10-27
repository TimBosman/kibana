/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { monaco } from '../../monaco_imports';

const brackets = [
  { open: '[', close: ']', token: 'delimiter.square' },
  { open: '(', close: ')', token: 'delimiter.parenthesis' },
];

export const keywords = [
  'describe',
  'between',
  'in',
  'like',
  'not',
  'and',
  'or',
  'desc',
  'select',
  'from',
  'where',
  'having',
  'group',
  'by',
  'order',
  'asc',
  'desc',
  'pivot',
  'for',
  'in',
  'as',
  'show',
  'columns',
  'include',
  'frozen',
  'tables',
  'escape',
  'limit',
  'rlike',
  'all',
  'distinct',
  'is',
];
export const builtinFunctions = [
  'avg',
  'count',
  'first',
  'first_value',
  'last',
  'last_value',
  'max',
  'min',
  'sum',
  'kurtosis',
  'mad',
  'percentile',
  'percentile_rank',
  'skewness',
  'stddev_pop',
  'sum_of_squares',
  'var_pop',
  'histogram',
  'case',
  'coalesce',
  'greatest',
  'ifnull',
  'iif',
  'isnull',
  'least',
  'nullif',
  'nvl',
  'curdate',
  'current_date',
  'current_time',
  'current_timestamp',
  'curtime',
  'dateadd',
  'datediff',
  'datepart',
  'datetrunc',
  'date_add',
  'date_diff',
  'date_part',
  'date_trunc',
  'day',
  'dayname',
  'dayofmonth',
  'dayofweek',
  'dayofyear',
  'day_name',
  'day_of_month',
  'day_of_week',
  'day_of_year',
  'dom',
  'dow',
  'doy',
  'hour',
  'hour_of_day',
  'idow',
  'isodayofweek',
  'isodow',
  'isoweek',
  'isoweekofyear',
  'iso_day_of_week',
  'iso_week_of_year',
  'iw',
  'iwoy',
  'minute',
  'minute_of_day',
  'minute_of_hour',
  'month',
  'monthname',
  'month_name',
  'month_of_year',
  'now',
  'quarter',
  'second',
  'second_of_minute',
  'timestampadd',
  'timestampdiff',
  'timestamp_add',
  'timestamp_diff',
  'today',
  'week',
  'week_of_year',
  'year',
  'abs',
  'acos',
  'asin',
  'atan',
  'atan2',
  'cbrt',
  'ceil',
  'ceiling',
  'cos',
  'cosh',
  'cot',
  'degrees',
  'e',
  'exp',
  'expm1',
  'floor',
  'log',
  'log10',
  'mod',
  'pi',
  'power',
  'radians',
  'rand',
  'random',
  'round',
  'sign',
  'signum|sin',
  'sinh',
  'sqrt',
  'tan',
  'truncate',
  'ascii',
  'bit_length',
  'char',
  'character_length',
  'char_length',
  'concat',
  'insert',
  'lcase',
  'left',
  'length',
  'locate',
  'ltrim',
  'octet_length',
  'position',
  'repeat',
  'replace',
  'right',
  'rtrim',
  'space',
  'substring',
  'ucase',
  'cast',
  'convert',
  'database',
  'user',
  'st_astext',
  'st_aswkt',
  'st_distance',
  'st_geometrytype',
  'st_geomfromtext',
  'st_wkttosql',
  'st_x',
  'st_y',
  'st_z',
  'score',
];

export const lexerRules = {
  defaultToken: 'invalid',
  ignoreCase: true,
  tokenPostfix: '',
  keywords,
  builtinFunctions,
  brackets,
  tokenizer: {
    root: [
      [
        /[a-zA-Z_$][a-zA-Z0-9_$]*\b/,
        {
          cases: {
            '@keywords': 'keyword',
            '@builtinFunctions': 'keyword',
            '@default': 'identifier',
          },
        },
      ],
      [/[()]/, '@brackets'],
      [/--.*$/, 'comment'],
      [/\/\*/, 'comment', '@comment'],
      [/\/.*$/, 'comment'],

      [/".*?"/, 'string'],

      [/'.*?'/, 'constant'],
      [/`.*?`/, 'string'],
      // whitespace
      [/[ \t\r\n]+/, { token: '@whitespace' }],
      [/[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b/, 'entity.name.function'],
      [/⇐|<⇒|\*|\.|\:\:|\+|\-|\/|\/\/|%|&|\^|~|<|>|<=|=>|==|!=|<>|=/, 'keyword.operator'],
      [/[\(]/, 'paren.lparen'],
      [/[\)]/, 'paren.rparen'],
      [/\s+/, 'text'],
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*/, 'number'],
      [/[$][+-]*\d*(\.\d*)?/, 'number'],
      [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number'],
    ],
    strings: [
      [/N'/, { token: 'string', next: '@string' }],
      [/'/, { token: 'string', next: '@string' }],
    ],
    string: [
      [/[^']+/, 'string'],
      [/''/, 'string'],
      [/'/, { token: 'string', next: '@pop' }],
    ],
    comment: [
      [/[^\/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[\/*]/, 'comment'],
    ],
  },
} as monaco.languages.IMonarchLanguage;
