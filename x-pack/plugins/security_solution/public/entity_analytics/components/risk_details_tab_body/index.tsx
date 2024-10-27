/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { useUpsellingComponent } from '../../../common/hooks/use_upselling';
import { RISKY_HOSTS_DASHBOARD_TITLE, RISKY_USERS_DASHBOARD_TITLE } from '../risk_score/constants';
import { EnableRiskScore } from '../enable_risk_score';
import { useDeepEqualSelector } from '../../../common/hooks/use_selector';
import type { State } from '../../../common/store';
import { hostsModel, hostsSelectors } from '../../../explore/hosts/store';
import { usersSelectors } from '../../../explore/users/store';
import { RiskInformationButtonEmpty } from '../risk_information';
import * as i18n from './translations';

import { useQueryInspector } from '../../../common/components/page/manage_query';
import { RiskScoreOverTime } from '../risk_score_over_time';
import { TopRiskScoreContributors } from '../top_risk_score_contributors';
import { TopRiskScoreContributorsAlerts } from '../top_risk_score_contributors_alerts';
import { useQueryToggle } from '../../../common/containers/query_toggle';
import type { HostRiskScore, UserRiskScore } from '../../../../common/search_strategy';
import { buildEntityNameFilter, RiskScoreEntity } from '../../../../common/search_strategy';
import type { UsersComponentsQueryProps } from '../../../explore/users/pages/navigation/types';
import type { HostsComponentsQueryProps } from '../../../explore/hosts/pages/navigation/types';
import { useDashboardHref } from '../../../common/hooks/use_dashboard_href';
import { RiskScoresNoDataDetected } from '../risk_score_onboarding/risk_score_no_data_detected';
import { useRiskEngineStatus } from '../../api/hooks/use_risk_engine_status';
import { RiskScoreUpdatePanel } from '../risk_score_update_panel';
import { HostRiskScoreQueryId, UserRiskScoreQueryId } from '../../common/utils';
import { useRiskScore } from '../../api/hooks/use_risk_score';
import { useMissingRiskEnginePrivileges } from '../../hooks/use_missing_risk_engine_privileges';
import { RiskEnginePrivilegesCallOut } from '../risk_engine_privileges_callout';

const StyledEuiFlexGroup = styled(EuiFlexGroup)`
  margin-top: ${({ theme }) => theme.eui.euiSizeL};
`;

type ComponentsQueryProps = HostsComponentsQueryProps | UsersComponentsQueryProps;

const getDashboardTitle = (riskEntity: RiskScoreEntity) =>
  riskEntity === RiskScoreEntity.host ? RISKY_HOSTS_DASHBOARD_TITLE : RISKY_USERS_DASHBOARD_TITLE;

const RiskDetailsTabBodyComponent: React.FC<
  Pick<ComponentsQueryProps, 'startDate' | 'endDate' | 'setQuery' | 'deleteQuery'> & {
    entityName: string;
    riskEntity: RiskScoreEntity;
  }
> = ({ entityName, startDate, endDate, setQuery, deleteQuery, riskEntity }) => {
  const queryId = useMemo(
    () =>
      riskEntity === RiskScoreEntity.host
        ? HostRiskScoreQueryId.HOST_DETAILS_RISK_SCORE
        : UserRiskScoreQueryId.USER_DETAILS_RISK_SCORE,
    [riskEntity]
  );

  const severitySelectionRedux = useDeepEqualSelector((state: State) =>
    riskEntity === RiskScoreEntity.host
      ? hostsSelectors.hostRiskScoreSeverityFilterSelector()(state, hostsModel.HostsType.details)
      : usersSelectors.userRiskScoreSeverityFilterSelector()(state)
  );

  const buttonHref = useDashboardHref({ title: getDashboardTitle(riskEntity) });

  const timerange = useMemo(
    () => ({
      from: startDate,
      to: endDate,
    }),
    [startDate, endDate]
  );

  const { toggleStatus: overTimeToggleStatus, setToggleStatus: setOverTimeToggleStatus } =
    useQueryToggle(`${queryId} overTime`);
  const { toggleStatus: contributorsToggleStatus, setToggleStatus: setContributorsToggleStatus } =
    useQueryToggle(`${queryId} contributors`);

  const filterQuery = useMemo(
    () => (entityName ? buildEntityNameFilter([entityName], riskEntity) : {}),
    [entityName, riskEntity]
  );

  const { data, loading, refetch, inspect, isDeprecated, isModuleEnabled } = useRiskScore({
    filterQuery,
    onlyLatest: false,
    riskEntity,
    skip: !overTimeToggleStatus && !contributorsToggleStatus,
    timerange,
  });

  const { data: riskScoreEngineStatus } = useRiskEngineStatus();

  const rules = useMemo(() => {
    const lastRiskItem = data && data.length > 0 ? data[data.length - 1] : null;
    if (lastRiskItem) {
      return riskEntity === RiskScoreEntity.host
        ? (lastRiskItem as HostRiskScore).host.risk.rule_risks
        : (lastRiskItem as UserRiskScore).user.risk.rule_risks;
    }
    return [];
  }, [data, riskEntity]);

  useQueryInspector({
    queryId,
    loading,
    refetch,
    setQuery,
    deleteQuery,
    inspect,
  });

  const toggleContributorsQuery = useCallback(
    (status: boolean) => {
      setContributorsToggleStatus(status);
    },
    [setContributorsToggleStatus]
  );

  const toggleOverTimeQuery = useCallback(
    (status: boolean) => {
      setOverTimeToggleStatus(status);
    },
    [setOverTimeToggleStatus]
  );

  const privileges = useMissingRiskEnginePrivileges();

  const RiskScoreUpsell = useUpsellingComponent('entity_analytics_panel');
  if (RiskScoreUpsell) {
    return <RiskScoreUpsell />;
  }

  if (!privileges.isLoading && !privileges.hasAllRequiredPrivileges) {
    return (
      <EuiPanel hasBorder>
        <RiskEnginePrivilegesCallOut privileges={privileges} />
      </EuiPanel>
    );
  }

  const status = {
    isDisabled: !isModuleEnabled && !loading,
    isDeprecated: isDeprecated && !loading,
  };

  if (status.isDisabled || status.isDeprecated) {
    return (
      <EnableRiskScore
        {...status}
        entityType={riskEntity}
        refetch={refetch}
        timerange={timerange}
      />
    );
  }

  if (isModuleEnabled && severitySelectionRedux.length === 0 && data && data.length === 0) {
    return <RiskScoresNoDataDetected entityType={riskEntity} refetch={refetch} />;
  }

  return (
    <>
      {riskScoreEngineStatus?.isUpdateAvailable && <RiskScoreUpdatePanel />}
      {riskScoreEngineStatus?.isNewRiskScoreModuleInstalled ? (
        <StyledEuiFlexGroup gutterSize="s">
          <EuiFlexItem>
            {data?.[0] && (
              <TopRiskScoreContributorsAlerts
                toggleStatus={contributorsToggleStatus}
                toggleQuery={toggleContributorsQuery}
                riskScore={data[0]}
                riskEntity={riskEntity}
                loading={loading}
              />
            )}
          </EuiFlexItem>
        </StyledEuiFlexGroup>
      ) : (
        <>
          <EuiFlexGroup direction="row">
            <EuiFlexItem grow={2}>
              <RiskScoreOverTime
                from={startDate}
                loading={loading}
                queryId={queryId}
                riskEntity={riskEntity}
                riskScore={data}
                title={i18n.RISK_SCORE_OVER_TIME(riskEntity)}
                to={endDate}
                toggleQuery={toggleOverTimeQuery}
                toggleStatus={overTimeToggleStatus}
              />
            </EuiFlexItem>

            <EuiFlexItem grow={1}>
              <TopRiskScoreContributors
                loading={loading}
                queryId={queryId}
                toggleStatus={contributorsToggleStatus}
                toggleQuery={toggleContributorsQuery}
                rules={rules}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <StyledEuiFlexGroup gutterSize="s">
            <EuiFlexItem grow={false}>
              <EuiButton
                href={buttonHref}
                isDisabled={!buttonHref}
                data-test-subj={`risky-${riskEntity}s-view-dashboard-button`}
                target="_blank"
                iconType="popout"
                iconSide="right"
              >
                {i18n.VIEW_DASHBOARD_BUTTON}
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <RiskInformationButtonEmpty riskEntity={riskEntity} />
            </EuiFlexItem>
          </StyledEuiFlexGroup>
        </>
      )}
    </>
  );
};

RiskDetailsTabBodyComponent.displayName = 'RiskDetailsTabBodyComponent';

export const RiskDetailsTabBody = React.memo(RiskDetailsTabBodyComponent);

RiskDetailsTabBody.displayName = 'RiskDetailsTabBody';
