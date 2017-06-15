import counties from 'constants/countries';

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getSuggestions = (value) => {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return counties;
  }
  const regex = new RegExp(`^${escapedValue}`, 'i');
  return counties.filter(country => regex.test(country.long_name));
};

export const getByCode = code => counties.find(country => country.short_name === code);

export const getSuggestionValue = suggestion => suggestion.long_name;
