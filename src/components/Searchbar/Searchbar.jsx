import React from 'react';
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

class Searchbar extends React.Component {
  static defaultProps = {
    search: '',
  };

  state = {
    search: this.props.search,
  };

  handleSearchChange = evt => {
    this.setState({
      search: evt.currentTarget.value.toLowerCase(),
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.search.trim() === '') {
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
      this.setState({ search: '' });
      return;
    }

    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };
  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" aria-label="Search">
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormButton>

          <Input
            className="SearchForm-input"
            type="text"
            value={this.state.search}
            autocomplete="off"
            onChange={this.handleSearchChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
