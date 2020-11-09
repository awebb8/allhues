export default function AddedAffiliateLink({ affiliateLink }) {
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
        <button className="btn btn-outline-secondary" type="button">
          Remove
        </button>
      </div>
    </div>
  );
}
