import React, { useCallback } from 'react';
import styled from 'styled-components';
import { SearchBar } from '@sdir/sds';
import { useIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { setAdditionalCompetence } from '../../../store/actions/action';
import { SystemState, AdditionalCompetence } from '../../../types';
import { Navigation, FormInput } from '../../Molecules';
import FormSelect from '../../Molecules/FormSelect';
import { PageTitle } from '../../Atoms';

interface GetAdditionalCompetenceFormValues {
  vessel: string;
  periodStartDate: string;
  periodStopDate: string;
  competenceCode: string;
}

const AdditionalCompetenceCompetence: React.FC<RouteComponentProps> = ({ history }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    appState: { additionalCompetence }
  } = useSelector((state: SystemState) => state);

  const selectOptions = [
    {
      value: 'BS0',
      name: 'Båtmann'
    },
    {
      value: 'BUNK3',
      name:
        '3 bunkringsoperasjoner ombord på skip som bruker eller fører drivstoff med flammepunkt under 60 grader - BUNK3'
    },
    {
      value: 'BUNK3',
      name: 'Brovakt, STCW regel II/4'
    },
    {
      value: 'BVSJEKK',
      name: 'Brovakt sjekkliste'
    },
    {
      value: 'GOLALO',
      name: 'Grunnleggende opplæring i kirke laste- og losseoperasjoner olje- og kjemikalietankskip'
    },
    {
      value: 'GOIGF',
      name: '3 gjennomførte lasteoperasjoner om bord på gasstankskip'
    }
  ];
  const initialValues = {
    vessel: 'Båten Elias',
    periodStartDate: additionalCompetence.periodStartDate || '',
    periodStopDate: additionalCompetence.periodStopDate || '',
    competenceCode: additionalCompetence.competenceCode || ''
  };

  const handleNextClicked = useCallback(
    (values: GetAdditionalCompetenceFormValues) => {
      dispatch(
        setAdditionalCompetence({
          ...additionalCompetence,
          ...values
        } as AdditionalCompetence)
      );
      history.push('/registeradditionalcompetence/summary');
    },
    [dispatch, additionalCompetence, history]
  );

  const validateAdditionalCompetence = useCallback((values: GetAdditionalCompetenceFormValues) => {
    const errors: any = {};
    const requiredText = 'Requied Field';
    const overlappingErrorText = 'Overlapping error';
    if (!values.periodStartDate) errors.periodStartDate = requiredText;
    if (!values.periodStopDate) errors.periodStopDate = requiredText;
    if (!values.competenceCode) errors.competenceCode = requiredText;

    if (
      values.periodStartDate &&
      values.periodStopDate &&
      new Date(values.periodStartDate) > new Date(values.periodStopDate)
    ) {
      errors.periodStartDate = overlappingErrorText;
      errors.periodStopDate = overlappingErrorText;
    }
    return errors;
  }, []);

  return (
    <Container>
      <PageTitle title={intl.formatMessage({ id: 'registeradditionalcompetence.page.title' })} />

      <H1>{intl.formatMessage({ id: 'registeradditionalcompetence.header.title' })}</H1>
      <Card>
        <Header>
          {intl.formatMessage({ id: 'registeradditionalcompetence.card.person.name' })}
        </Header>
        <Info>{`${additionalCompetence.person?.firstName}  ${additionalCompetence.person?.lastName}`}</Info>
        <Header>
          {intl.formatMessage({ id: 'registeradditionalcompetence.card.person.personnumber' })}
        </Header>
        <Info>{additionalCompetence.person?.personNumber}</Info>
      </Card>
      <Formik
        initialValues={initialValues}
        onSubmit={handleNextClicked}
        validate={validateAdditionalCompetence}
      >
        <Form>
          <CompetenceInput>
            <Label>
              {intl.formatMessage({ id: 'registeradditionalcompetence.input.vesselsearch' })}
            </Label>
            <SearchBarDiv>
              <SearchBar
                searchCallback={() => {}}
                placeholder={intl.formatMessage({
                  id: 'registeradditionalcompetence.input.vesselsearch'
                })}
              />
            </SearchBarDiv>
            <Label>
              {intl.formatMessage({ id: 'registeradditionalcompetence.input.competence' })}
            </Label>
            <InputField
              name="competenceCode"
              component={FormSelect}
              options={selectOptions}
              defaultVal=" "
            />
            <Label>
              {intl.formatMessage({ id: 'registeradditionalcompetence.input.fromdate' })}
            </Label>
            <InputField name="periodStartDate" type="date" component={FormInput} />
            <Label>{intl.formatMessage({ id: 'registeradditionalcompetence.input.todate' })}</Label>
            <InputField name="periodStopDate" type="date" component={FormInput} />
          </CompetenceInput>
          <NavigationBlock>
            <Navigation
              backButtonText={intl.formatMessage({ id: 'link.back.title' })}
              nextButtonText={intl.formatMessage({ id: 'button.next.title' })}
              backButtonLink="/registeradditionalcompetence/person"
            />
          </NavigationBlock>
        </Form>
      </Formik>
    </Container>
  );
};

export default AdditionalCompetenceCompetence;

const Container = styled.div`
  margin: 3rem 4rem;
`;

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3.5rem;
  margin-bottom: 3rem;
`;

const Card = styled.section`
  padding: 3rem;
  width: fit-content;
  min-width: 40rem;
  box-shadow: ${({ theme }) => theme.card.boxShadow};
  border-radius: ${({ theme }) => theme.card.borderRadius};
  margin-bottom: ${({ theme }) => theme.card.marginBottom};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Header = styled.div`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.font.textlight};
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.font.text};
  margin-bottom: 1rem;
`;

const CompetenceInput = styled.div`
  display: grid;
  margin: 3em 0;
  width: 60%;
`;

const SearchBarDiv = styled.div`
  width: 60%;
  height: 2remm;
`;

const InputField = styled(Field)`
  width: 60%;
`;

const Label = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.font.primary.blue};
  margin-top: 2rem;
`;

const NavigationBlock = styled.div`
  width: 80%;
`;
