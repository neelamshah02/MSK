import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextLink } from '@sdir/sds';

interface FormNavigationProps {
  backButtonText: string;
  backButtonLink?: string;
  nextButtonText: string;
  nextButtonLink?: string;
  backButtonOnClick?: ((e?: any) => void) | null;
  nextButtonOnClick?: ((e?: any) => void) | null;
  nextDisabled?: boolean;
  backDisabled?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = props => {
  const {
    backButtonText,
    backButtonLink,
    nextButtonText,
    nextButtonLink,
    backButtonOnClick,
    nextButtonOnClick,
    nextDisabled,
    backDisabled
  } = props;

  const NextButton = () => (
    <Button
      size="large"
      onClick={() => nextButtonOnClick?.()}
      type="primary"
      text={nextButtonText}
      htmlType="submit"
      disabled={nextDisabled}
    />
  );

  const BackButton = () => (
    <TextLink
      disabled={backDisabled}
      size="2rem"
      text={backButtonText}
      click={() => backButtonOnClick}
    />
  );

  return (
    <ButtonsSection>
      {backButtonLink ? (
        <Link to={backButtonLink}>
          <BackButton />
        </Link>
      ) : (
        <BackButton />
      )}

      {nextButtonLink ? (
        <Link to={nextButtonLink}>
          <NextButton />
        </Link>
      ) : (
        <NextButton />
      )}
    </ButtonsSection>
  );
};
const ButtonsSection = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5rem;
`;

export default FormNavigation;
