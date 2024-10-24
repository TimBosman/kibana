/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { i18n } from '@kbn/i18n';
import { buildDocumentation } from './utils';

import type { AutocompleteCommandDefinition } from '../types';

export const pipeDefinition: AutocompleteCommandDefinition = {
  label: '|',
  insertText: '|',
  kind: 1,
  detail: i18n.translate('monaco.esql.autocomplete.pipeDoc', {
    defaultMessage: 'Pipe (|)',
  }),
  sortText: 'B',
};

export const processingCommandsDefinitions: AutocompleteCommandDefinition[] = [
  {
    label: 'stats',
    insertText: 'stats',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.statsDoc', {
      defaultMessage:
        'Calculates aggregate statistics, such as average, count, and sum, over the incoming search results set. Similar to SQL aggregation, if the stats command is used without a BY clause, only one row is returned, which is the aggregation over the entire incoming search results set. When you use a BY clause, one row is returned for each distinct value in the field specified in the BY clause. The stats command returns only the fields in the aggregation, and you can use a wide range of statistical functions with the stats command. When you perform more than one aggregation, separate each aggregation with a comma.',
    }),
    documentation: {
      value: buildDocumentation(
        'stats aggs = fieldSpecification ( `,` fieldSpecification )* ( `by` groups = identifier ( `,` identifier )* )?',
        ['… | stats sum(b) by b)', '… | stats avg = avg(a)']
      ),
    },
    sortText: 'B',
  },
  {
    label: 'limit',
    insertText: 'limit',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.limitDoc', {
      defaultMessage:
        'Returns the first search results, in search order, based on the "limit" specified.',
    }),
    documentation: {
      value: buildDocumentation('limit size = integerLiteral', ['… | limit 100', '… | limit 0']),
    },
    sortText: 'B',
  },
  {
    label: 'eval',
    insertText: 'eval',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.evalDoc', {
      defaultMessage:
        'Calculates an expression and puts the resulting value into a search results field.',
    }),
    documentation: {
      value: buildDocumentation('eval columns = fieldSpecification ( `,` fieldSpecification )*', [
        '… | eval a = b * c',
      ]),
    },
    sortText: 'B',
  },
  {
    label: 'keep',
    insertText: 'keep',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.keepDoc', {
      defaultMessage: 'Rearranges fields in the input table by applying the keep clauses in fields',
    }),
    documentation: {
      value: buildDocumentation('keep fieldSpecification `,` fieldSpecification *', [
        '… | keep a,b',
      ]),
    },
    sortText: 'B',
  },
  {
    label: 'rename',
    insertText: 'rename',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.renameDoc', {
      defaultMessage: 'Renames an old column to a new one',
    }),
    documentation: {
      value: buildDocumentation('rename new as old', ['… | rename a as b']),
    },
    sortText: 'B',
  },
  {
    label: 'drop',
    insertText: 'drop',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.dropDoc', {
      defaultMessage: 'Drops columns',
    }),
    documentation: {
      value: buildDocumentation('drop fieldSpecification `,` fieldSpecification *', [
        '… | drop a,b',
      ]),
    },
    sortText: 'B',
  },
  {
    label: 'sort',
    insertText: 'sort',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.sortDoc', {
      defaultMessage:
        'Sorts all results by the specified fields. When in descending order, the results missing a field are considered the smallest possible value of the field, or the largest possible value of the field when in ascending order.',
    }),
    documentation: {
      value: buildDocumentation('sort orders = orderExpression ( `,` orderExpression )*', [
        '… | sort a  desc, b nulls last, c asc nulls first',
        '… | sort b nulls last`',
        '… | sort c asc nulls first`',
      ]),
    },
    sortText: 'B',
  },
  {
    label: 'where',
    insertText: 'where',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.whereDoc', {
      defaultMessage:
        'Uses "predicate-expressions" to filter search results. A predicate expression, when evaluated, returns TRUE or FALSE. The where command only returns the results that evaluate to TRUE. For example, to filter results for a specific field value',
    }),
    documentation: {
      value: buildDocumentation('where condition = expression', ['… | where status_code == 200']),
    },
    sortText: 'B',
  },
  {
    label: 'dissect',
    insertText: 'dissect',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.dissectDoc', {
      defaultMessage:
        'Extracts multiple string values from a single string input, based on a pattern',
    }),
    documentation: {
      value: buildDocumentation(
        'dissect <inputExpression> <pattern-string> (append_separator=<string>)?',
        ['… | dissect a "%{b} %{c}";']
      ),
    },
    sortText: 'B',
  },
  {
    label: 'grok',
    insertText: 'grok',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.grokDoc', {
      defaultMessage:
        'Extracts multiple string values from a single string input, based on a pattern',
    }),
    documentation: {
      value: buildDocumentation('grok <inputExpression> <pattern-string>', [
        '… | grok a "%{b} %{c}";',
      ]),
    },
    sortText: 'B',
  },
  {
    label: 'mv_expand',
    insertText: 'mv_expand',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.mvExpandDoc', {
      defaultMessage: 'Expands multivalued fields into one row per value, duplicating other fields',
    }),
    documentation: {
      value: buildDocumentation('mv_expand field', [
        'ROW a=[1,2,3], b="b", j=["a","b"] | MV_EXPAND a',
      ]),
    },
    sortText: 'B',
  },
  {
    label: 'enrich',
    insertText: 'enrich',
    kind: 1,
    detail: i18n.translate('monaco.esql.autocomplete.enrichDoc', {
      defaultMessage: 'Enrich table with another table',
    }),
    documentation: {
      value: buildDocumentation('enrich policy', ['... | ENRICH a']),
    },
    sortText: 'B',
  },
];
