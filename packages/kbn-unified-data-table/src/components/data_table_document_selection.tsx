/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import {
  EuiButtonEmpty,
  EuiCheckbox,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiCopy,
  EuiDataGridCellValueElementProps,
  EuiPopover,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n-react';
import { euiDarkVars as themeDark, euiLightVars as themeLight } from '@kbn/ui-theme';
import { i18n } from '@kbn/i18n';
import type { DataTableRecord } from '@kbn/discover-utils/types';
import { UnifiedDataTableContext } from '../table_context';

export const SelectButton = ({ rowIndex, setCellProps }: EuiDataGridCellValueElementProps) => {
  const { selectedDocs, expanded, rows, isDarkMode, setSelectedDocs } =
    useContext(UnifiedDataTableContext);
  const doc = useMemo(() => rows[rowIndex], [rows, rowIndex]);
  const checked = useMemo(() => selectedDocs.includes(doc.id), [selectedDocs, doc.id]);

  const toggleDocumentSelectionLabel = i18n.translate('unifiedDataTable.grid.selectDoc', {
    defaultMessage: `Select document '{rowNumber}'`,
    values: { rowNumber: rowIndex + 1 },
  });

  useEffect(() => {
    if (expanded && doc && expanded.id === doc.id) {
      setCellProps({
        style: {
          backgroundColor: isDarkMode ? themeDark.euiColorHighlight : themeLight.euiColorHighlight,
        },
      });
    } else {
      setCellProps({ style: undefined });
    }
  }, [expanded, doc, setCellProps, isDarkMode]);

  return (
    <EuiCheckbox
      id={doc.id}
      aria-label={toggleDocumentSelectionLabel}
      checked={checked}
      data-test-subj={`dscGridSelectDoc-${doc.id}`}
      onChange={() => {
        if (checked) {
          const newSelection = selectedDocs.filter((docId) => docId !== doc.id);
          setSelectedDocs(newSelection);
        } else {
          setSelectedDocs([...selectedDocs, doc.id]);
        }
      }}
    />
  );
};

export function DataTableDocumentToolbarBtn({
  isFilterActive,
  rows,
  selectedDocs,
  setIsFilterActive,
  setSelectedDocs,
}: {
  isFilterActive: boolean;
  rows: DataTableRecord[];
  selectedDocs: string[];
  setIsFilterActive: (value: boolean) => void;
  setSelectedDocs: (value: string[]) => void;
}) {
  const [isSelectionPopoverOpen, setIsSelectionPopoverOpen] = useState(false);

  const getMenuItems = useCallback(() => {
    return [
      isFilterActive ? (
        <EuiContextMenuItem
          data-test-subj="dscGridShowAllDocuments"
          key="showAllDocuments"
          icon="eye"
          onClick={() => {
            setIsSelectionPopoverOpen(false);
            setIsFilterActive(false);
          }}
        >
          <FormattedMessage
            id="unifiedDataTable.showAllDocuments"
            defaultMessage="Show all documents"
          />
        </EuiContextMenuItem>
      ) : (
        <EuiContextMenuItem
          data-test-subj="dscGridShowSelectedDocuments"
          key="showSelectedDocuments"
          icon="eye"
          onClick={() => {
            setIsSelectionPopoverOpen(false);
            setIsFilterActive(true);
          }}
        >
          <FormattedMessage
            id="unifiedDataTable.showSelectedDocumentsOnly"
            defaultMessage="Show selected documents only"
          />
        </EuiContextMenuItem>
      ),
      <EuiCopy
        key="copyJsonWrapper"
        data-test-subj="dscGridCopySelectedDocumentsJSON"
        textToCopy={
          rows
            ? JSON.stringify(
                rows.filter((row) => selectedDocs.includes(row.id)).map((row) => row.raw)
              )
            : ''
        }
      >
        {(copy) => (
          <EuiContextMenuItem key="copyJSON" icon="copyClipboard" onClick={copy}>
            <FormattedMessage
              id="unifiedDataTable.copyToClipboardJSON"
              defaultMessage="Copy documents to clipboard (JSON)"
            />
          </EuiContextMenuItem>
        )}
      </EuiCopy>,
      <EuiContextMenuItem
        data-test-subj="dscGridClearSelectedDocuments"
        key="clearSelection"
        icon="cross"
        onClick={() => {
          setIsSelectionPopoverOpen(false);
          setSelectedDocs([]);
          setIsFilterActive(false);
        }}
      >
        <FormattedMessage id="unifiedDataTable.clearSelection" defaultMessage="Clear selection" />
      </EuiContextMenuItem>,
    ];
  }, [
    isFilterActive,
    rows,
    selectedDocs,
    setIsFilterActive,
    setIsSelectionPopoverOpen,
    setSelectedDocs,
  ]);

  const toggleSelectionToolbar = useCallback(
    () => setIsSelectionPopoverOpen((prevIsOpen) => !prevIsOpen),
    []
  );

  return (
    <EuiPopover
      closePopover={() => setIsSelectionPopoverOpen(false)}
      isOpen={isSelectionPopoverOpen}
      panelPaddingSize="none"
      button={
        <EuiButtonEmpty
          size="xs"
          color="text"
          iconType="documents"
          onClick={toggleSelectionToolbar}
          data-selected-documents={selectedDocs.length}
          data-test-subj="dscGridSelectionBtn"
          isSelected={isFilterActive}
          className={classNames({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            euiDataGrid__controlBtn: true,
            'euiDataGrid__controlBtn--active': isFilterActive,
          })}
        >
          <FormattedMessage
            id="unifiedDataTable.selectedDocumentsNumber"
            defaultMessage="{nr} documents selected"
            values={{ nr: selectedDocs.length }}
          />
        </EuiButtonEmpty>
      }
    >
      {isSelectionPopoverOpen && <EuiContextMenuPanel items={getMenuItems()} />}
    </EuiPopover>
  );
}
