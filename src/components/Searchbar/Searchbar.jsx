import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  Input,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleSearchChange = evt => {
    setSearch(evt.currentTarget.value.toLowerCase());
  };
  const handleSubmit = evt => {
    evt.preventDefault();

    if (search.trim() === '') {
      const notifyInfo = () =>
        toast.info('Please, enter search criteria', {
          icon: false,
          position: 'top-center',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      notifyInfo();
      setSearch('');
      return;
    }

    onSubmit(search);
    setSearch('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit" aria-label="Search">
          <SearchFormLabel>Search</SearchFormLabel>
        </SearchFormButton>

        <Input
          className="SearchForm-input"
          type="text"
          value={search}
          autocomplete="off"
          onChange={handleSearchChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
