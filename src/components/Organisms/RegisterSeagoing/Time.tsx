/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import { SearchBar, SdiAdd, styles, Loader } from '@sdir/sds';
import { useIntl } from 'react-intl';
import { Formik, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Navigation, SeagoingTable, FormInput, ButtonWithLink } from '../../Molecules';
import { SeagoingTableHeader } from '../../../helpers/dummyData';
import { errorHandler } from '../../../helpers/FormHelper';
import { SystemState, SeagoingDetails, Occupation, SelectOption, Vessel } from '../../../types';
import { setSeagoingDetails } from '../../../store/actions/action';
import FormSelect from '../../Molecules/FormSelect';
import useGet from '../../../services/hooks/useGet';
import { apiUrls } from '../../../services/ApiService';
import Page from '../../Templates/Page';
import ApiServiceContext from '../../../services/contexts/ApiServiceContext';
import { ErrorMessageDiv, PageTitle } from '../../Atoms';

interface GetSeagoingDetailsValues {
  jobTitle: string;
  startDate: string;
  endDate: string;
  hours: number | null;
  occupation?: Occupation;
  vesselName: string;
  vessel?: Vessel;
}

const SeagoingTime: React.FC<RouteComponentProps> = ({ history }) => {
  const { apiService } = useContext(ApiServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const intl = useIntl();
  const { error, loading, results } = useGet({
    apiUrl: apiUrls.getOccupationCodes
  });

  const selectOptions: SelectOption = results.map(i => ({ name: i.title, value: i.title }));
  const { oidc } = useSelector((state: SystemState) => state);

  const dispatch = useDispatch();
  const {
    appState: { seagoingPerson, seagoingDetails }
  } = useSelector((state: SystemState) => state);

  const addMoreClicked = useCallback(
    (values: GetSeagoingDetailsValues, { resetForm }) => {
      const occupation: Occupation = results.find(i => i.title === values.jobTitle);
      const vessel = {
        imoNumber: 'asd',
        callsign: 'jjj',
        name: values.vesselName,
        id: '456'
      };
      values.occupation = occupation;
      values.vessel = vessel;
      dispatch(setSeagoingDetails([...seagoingDetails, values] as SeagoingDetails[]));
      resetForm();
    },
    [dispatch, seagoingDetails, results]
  );

  const deleteSeagoingDetail = useCallback(
    (vessel: string) => {
      const remvedItem = seagoingDetails.filter(item => item.vessel.name !== vessel);
      dispatch(setSeagoingDetails(remvedItem as SeagoingDetails[]));
    },
    [dispatch, seagoingDetails]
  );

  const updateRowData = useCallback(
    (i, newData) => {
      const { vesselName } = newData;
      const EditableTable = seagoingDetails.filter(item => item.vessel.name === vesselName);

      const tobeReplaced = EditableTable[i];
      const replaceIndex = seagoingDetails.findIndex(item => {
        return JSON.stringify(item) === JSON.stringify(tobeReplaced);
      });

      const seagoingDetailsAfterEdit = seagoingDetails.map(
        (item: SeagoingDetails, index: number) => {
          if (index === replaceIndex) return newData;
          return item;
        }
      );

      dispatch(setSeagoingDetails(seagoingDetailsAfterEdit as SeagoingDetails[]));
    },
    [dispatch, seagoingDetails]
  );

  const initialValues = {
    vesselName: '',
    hours: null,
    jobTitle: '',
    startDate: '',
    endDate: ''
  };

  const validateSeagoingDetails = useCallback((values: GetSeagoingDetailsValues) => {
    const errors: any = {};
    const requiredText = 'Requied Field';
    const overlappingErrorText = 'Overlapping error';
    if (!values.hours) errors.hours = requiredText;
    if (values.hours && values.hours < 1) errors.hours = 'Time should greater than 0';
    if (!values.jobTitle) errors.jobTitle = requiredText;
    if (!values.startDate) errors.startDate = requiredText;
    if (!values.endDate) errors.endDate = requiredText;

    if (
      values.startDate &&
      values.endDate &&
      new Date(values.startDate) > new Date(values.endDate)
    ) {
      errors.startDate = overlappingErrorText;
      errors.endDate = overlappingErrorText;
    }
    return errors;
  }, []);

  const getSeagoingTable = useCallback(() => {
    let table;
    if (seagoingDetails.length > 0) {
      const seagoingTableDetails = seagoingDetails.reduce((r, a) => {
        r[a.vessel.name] = r[a.vessel.name] || [];
        r[a.vessel.name].push(a);
        return r;
      }, Object.create(null));

      table = Object.keys(seagoingTableDetails).map((t, k) => {
        return (
          <SeagoingTable
            deleteSeagoingDetail={deleteSeagoingDetail}
            key={k}
            rowDataChange={(i, newData) => updateRowData(i, newData)}
            columns={SeagoingTableHeader}
            data={seagoingTableDetails[t]}
            optionsForSelect={selectOptions}
          />
        );
      });
    }
    return table;
  }, [seagoingDetails, deleteSeagoingDetail, updateRowData, selectOptions]);

  const sendSegoingDetails = useCallback(() => {
    let org = '';
    if (typeof oidc.user?.profile?.organizationNumbers === 'string') {
      org = oidc.user?.profile?.organizationNumbers;
    }
    const payload = seagoingDetails.map(item => {
      return {
        person: {
          id: seagoingPerson.personNumber,
          firstName: seagoingPerson.firstName,
          middleName: null,
          lastName: seagoingPerson.lastName
        },
        organization: {
          organizationNumber: org || oidc.user?.profile?.organizationNumbers[0]
        },
        vessel: {
          imoNumber: '8811209',
          callSign: 'LAUI',
          name: 'TJØTTA',
          id: '11638'
        },
        activity: {
          occupationCode: {
            code: item.occupation.code,
            description: item.occupation.description
          },
          hours: +item.hours,
          signOnDate: new Date(item.startDate),
          signOffDate: new Date(item.endDate)
        },
        optional: null
      };
    });
    setIsLoading(true);

    apiService
      .post(apiUrls.validateSeagoing, payload)
      .then((response: AxiosResponse) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error(response.statusText);
        } else {
          history.push('/registerseagoing/summary');
        }
      })
      .catch((e: any) => {
        errorHandler(e, setErrorMsg, intl.formatMessage({ id: 'error.general' }));
      })
      .finally(() => setIsLoading(false));
  }, [history, apiService, seagoingDetails, seagoingPerson, oidc, intl]);

  // eslint-disable-next-line max-len
  const SeagoingPersonDetails = `${seagoingPerson.firstName} ${seagoingPerson.lastName} - ${seagoingPerson.personNumber}`;
  return isLoading ? (
    <Loader />
  ) : (
    <Page error={error} loading={loading}>
      <Container>
        <PageTitle title={intl.formatMessage({ id: 'datacard.seagoing.title' })} />

        <H1>{intl.formatMessage({ id: 'reportseagoing.header.title' })}</H1>
        <Formik
          initialValues={initialValues}
          onSubmit={addMoreClicked}
          validate={validateSeagoingDetails}
        >
          {() => (
            <Form>
              <MainDetails>
                <div>
                  <SearchBarDiv>
                    <SearchBar searchCallback={() => {}} placeholder="Fartøysøk" />
                  </SearchBarDiv>
                  <InputGroup>
                    <InputField
                      name="vesselName"
                      label="vessel name"
                      type="text"
                      component={FormInput}
                    />
                    <InputField
                      name="jobTitle"
                      component={FormSelect}
                      options={selectOptions}
                      defaultVal="Select"
                    />
                    <InputField
                      name="startDate"
                      label={intl.formatMessage({ id: 'reportseagoing.input.enlistment.title' })}
                      type="date"
                      component={FormInput}
                    />
                    <InputField
                      name="endDate"
                      label={intl.formatMessage({ id: 'reportseagoing.input.disembarkment.title' })}
                      type="date"
                      component={FormInput}
                    />
                    <InputField
                      name="hours"
                      label={intl.formatMessage({ id: 'reportseagoing.input.hours.title' })}
                      type="number"
                      component={FormInput}
                    />
                    <ButtonWithLink
                      icon={
                        <SdiAdd
                          color={styles.colors.primary}
                          size="l"
                          style={{ width: '2rem', height: '2rem' }}
                        />
                      }
                      linkType="submit"
                      linkText={
                        seagoingDetails.length !== 0
                          ? intl.formatMessage({ id: 'reportseagoing.button.addmore.title' })
                          : intl.formatMessage({ id: 'reportseagoing.button.add.title' })
                      }
                    />
                  </InputGroup>
                </div>

                <TableView>
                  {seagoingPerson.firstName && <h3>{SeagoingPersonDetails}</h3>}
                  {getSeagoingTable()}
                </TableView>
              </MainDetails>
              {errorMsg && <ErrorMessageDiv errorMsg={errorMsg} />}

              <NavigationBlock>
                <Navigation
                  backButtonText={intl.formatMessage({ id: 'link.back.title' })}
                  nextButtonText={intl.formatMessage({ id: 'button.next.title' })}
                  backButtonLink="/registerseagoing/person"
                  nextDisabled={seagoingDetails.length === 0}
                  nextButtonOnClick={() => sendSegoingDetails()}
                />
              </NavigationBlock>
            </Form>
          )}
        </Formik>
      </Container>
    </Page>
  );
};
export default SeagoingTime;

const Container = styled.div`
  margin: 3rem 4rem;
`;
const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

const NavigationBlock = styled.div`
  width: 100%;
`;

const MainDetails = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`;
const SearchBarDiv = styled.div`
  width: 60%;
`;

const InputGroup = styled.div`
  display: grid;
  margin: 3em 0;
  width: 60%;
`;

const TableView = styled.div`
  width: 100%;
  td {
    padding: 0.8rem 2rem 0.8rem 0 !important;
  }
`;

const InputField = styled(Field)`
  margin-top: 2rem;
`;
