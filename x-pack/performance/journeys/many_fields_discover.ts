/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Journey } from '@kbn/journeys';
import { subj } from '@kbn/test-subj-selector';

export const journey = new Journey({
  kbnArchives: ['test/functional/fixtures/kbn_archiver/many_fields_data_view'],
  esArchives: ['test/functional/fixtures/es_archiver/many_fields'],
})
  .step('Go to Discover Page', async ({ page, kbnUrl, kibanaPage }) => {
    await page.goto(kbnUrl.get(`/app/discover`));
    await kibanaPage.waitForHeader();
    await page.waitForSelector('[data-test-subj="discoverDocTable"][data-render-complete="true"]');
    await page.waitForSelector(subj('globalLoadingIndicator-hidden'));
  })
  .step('Expand the first document', async ({ page }) => {
    const expandButtons = page.locator(subj('docTableExpandToggleColumn'));
    await expandButtons.first().click();
    await page.waitForSelector(subj('docTableRowAction'));
    await page.click(subj('docTableRowAction'));
    await page.waitForSelector(subj('globalLoadingIndicator-hidden'));
  });
