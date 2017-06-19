import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Title from 'components/Title';
import Tooltip from 'components/Tooltip';
import { primaryLight, primaryDark, secondaryText, text, mutted, shadow } from 'constants/colors';

export const Row = styled.div`
  ${breakpoint('tablet')`
    display: flex;
    align-items: center;
    margin-top: -8px;
  `};
`;

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
  margin-bottom: 24px;
`;

export const Legend = Title.extend`
  font-size: 19px;
  margin: 0;
  display: block;
`;

export const Button = styled.button`
  background: none;
  background-color: ${primaryLight};
  border: 1px solid ${primaryDark};
  border-radius: 6px;
  min-width: 200px;
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  padding: 12px;

  &:active {
    background-color: ${primaryDark};
  }
`;

const InternalInput = styled.input`
  margin: 8px 0;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  font-size: 17px;
  color: ${text};
  background-color: #ffffff;
  background-image: none;
  border: 1px solid ${mutted};
  border-radius: 6px;
  outline: none;
  padding-right: ${props => (props.nested ? '48px' : 'inherit')};

  &::placeholder {
    font-weight: 300;
    color: ${secondaryText};
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputRightIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 48px;
  width: 48px;
  line-height: 48px;
  text-align: center;
`;

const Input = (props) => {
  const rightIcon = props.rightIcon;

  if (React.isValidElement(rightIcon)) {
    const incomingProps = { ...props };
    delete incomingProps.rightIcon;
    incomingProps.nested = true;
    return (
      <InputWrapper>
        {(() => {
          if (incomingProps.error) {
            return (
              <Tooltip label={incomingProps.error}>
                <InternalInput {...incomingProps} />
              </Tooltip>
            );
          }
          return (
            <InternalInput {...incomingProps} />
          );
        })()}
        <InputRightIconWrapper>
          {rightIcon}
        </InputRightIconWrapper>
      </InputWrapper>
    );
  }

  if (props.error) {
    return (
      <Tooltip label={props.error}>
        <InternalInput {...props} />
      </Tooltip>
    );
  }

  return <InternalInput {...props} />;
};

Input.propTypes = {
  error: PropTypes.string,
  rightIcon: PropTypes.element,
};

Input.defaultProps = {
  rightIcon: undefined,
  error: undefined,
};

export { Input };

const SelectWithAutosuggestWrapper = styled.div`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    margin: 8px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 48px;
    padding: 8px 16px;
    font-size: 17px;
    color: ${text};
    background-color: #ffffff;
    background-image: none;
    border: 1px solid ${mutted};
    border-radius: 6px;

    &::placeholder {
      font-weight: 300;
      color: ${secondaryText};
    }
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    z-index: 4;
    box-shadow: 0 0 16px -3px ${shadow};
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    bottom: 47px;
    width: 100%;
    border: 1px solid ${mutted};
    background-color: #fff;
    font-size: 17px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    z-index: 2;
    box-sizing: border-box;
    box-shadow: 0 0 16px -3px ${shadow};
    max-height: 390px;
    overflow-y: auto;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 8px 16px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: ${mutted};
  }
`;

const SelectWithAutosuggest = props => (
  <SelectWithAutosuggestWrapper>
    {(() => {
      if (props.error) {
        return (
          <Tooltip label={props.error}>
            <Autosuggest {...props} />
          </Tooltip>
        );
      }
      return <Autosuggest {...props} />;
    })()}
  </SelectWithAutosuggestWrapper>
);

SelectWithAutosuggest.propTypes = {
  error: PropTypes.string,
};

SelectWithAutosuggest.defaultProps = {
  error: undefined,
};

export { SelectWithAutosuggest };

export const Help = styled.div`
  color: ${secondaryText};
  font-size: 15px;
  margin: 8px 0;
`;
