import React from 'react';

const AddedAffiliateLink = ({ affiliateLink, removeKitItem, id }) => {

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        id="kitItemsInput"
        value={affiliateLink}
        disabled
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" onClick={removeKitItem} id={id}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default AddedAffiliateLink;
