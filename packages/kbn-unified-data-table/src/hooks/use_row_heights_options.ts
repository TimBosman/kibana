/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { EuiDataGridRowHeightOption, EuiDataGridRowHeightsOptions } from '@elastic/eui';
import type { Storage } from '@kbn/kibana-utils-plugin/public';
import { useMemo } from 'react';
import { isValidRowHeight } from '../utils/validate_row_height';
import {
  DataGridOptionsRecord,
  getStoredRowHeight,
  updateStoredRowHeight,
} from '../utils/row_heights';

interface UseRowHeightProps {
  rowHeightState?: number;
  onUpdateRowHeight?: (rowHeight: number) => void;
  storage: Storage;
  configRowHeight?: number;
  consumer: string;
}

/**
 * Row height might be a value from -1 to 20
 * A value of -1 automatically adjusts the row height to fit the contents.
 * A value of 0 displays the content in a single line.
 * A value from 1 to 20 represents number of lines of Document explorer row to display.
 */
const SINGLE_ROW_HEIGHT_OPTION = 0;
const AUTO_ROW_HEIGHT_OPTION = -1;
const DEFAULT_ROW_HEIGHT_OPTION = 3;

/**
 * Converts rowHeight of EuiDataGrid to rowHeight number (-1 to 20)
 */
const serializeRowHeight = (rowHeight?: EuiDataGridRowHeightOption): number => {
  if (rowHeight === 'auto') {
    return AUTO_ROW_HEIGHT_OPTION;
  } else if (typeof rowHeight === 'object' && rowHeight.lineCount) {
    return rowHeight.lineCount; // custom
  }

  return SINGLE_ROW_HEIGHT_OPTION;
};

/**
 * Converts rowHeight number (-1 to 20) of EuiDataGrid rowHeight
 */
const deserializeRowHeight = (number: number): EuiDataGridRowHeightOption | undefined => {
  if (number === AUTO_ROW_HEIGHT_OPTION) {
    return 'auto';
  } else if (number === SINGLE_ROW_HEIGHT_OPTION) {
    return undefined;
  }

  return { lineCount: number }; // custom
};

export const useRowHeightsOptions = ({
  rowHeightState,
  onUpdateRowHeight,
  storage,
  configRowHeight = DEFAULT_ROW_HEIGHT_OPTION,
  consumer,
}: UseRowHeightProps) => {
  return useMemo((): EuiDataGridRowHeightsOptions => {
    const rowHeightFromLS = getStoredRowHeight(storage, consumer);

    const configHasNotChanged = (
      localStorageRecord: DataGridOptionsRecord | null
    ): localStorageRecord is DataGridOptionsRecord =>
      localStorageRecord !== null && configRowHeight === localStorageRecord.previousConfigRowHeight;

    let rowHeight;
    if (isValidRowHeight(rowHeightState)) {
      rowHeight = rowHeightState;
    } else if (configHasNotChanged(rowHeightFromLS)) {
      rowHeight = rowHeightFromLS.previousRowHeight;
    } else {
      rowHeight = configRowHeight;
    }

    return {
      defaultHeight: deserializeRowHeight(rowHeight),
      lineHeight: '1.6em',
      onChange: ({ defaultHeight: newRowHeight }: EuiDataGridRowHeightsOptions) => {
        const newSerializedRowHeight = serializeRowHeight(newRowHeight);
        updateStoredRowHeight(newSerializedRowHeight, configRowHeight, storage, consumer);
        onUpdateRowHeight?.(newSerializedRowHeight);
      },
    };
  }, [storage, consumer, rowHeightState, configRowHeight, onUpdateRowHeight]);
};
