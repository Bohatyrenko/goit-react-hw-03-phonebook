import React from 'react';

const ContactFilter = ({ onSetFilter, filter }) => (
  <>
    <label>
      <p>Search for contacts</p>
      <input onInput={onSetFilter} type="text" name="filter" value={filter} />
    </label>
  </>
);

export default ContactFilter;
