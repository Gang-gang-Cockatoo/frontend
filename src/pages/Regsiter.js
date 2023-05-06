import React from 'react';
import { Page } from '../components';

export default function Regsiter() {
  return (
    <Page>
      <form className="form">
        <div className="form-row">
          <div className="form-item">
            <label className="form-item-label"></label>
            <input className="form-item-input" />
          </div>
          <div className="form-item">
            <label className="form-item-label"></label>
            <input className="form-item-input" />
          </div>
        </div>

        <div className="form-item">
          <label className="form-item-label"></label>
          <input className="form-item-input" />
        </div>

        <button className="form-submit" type="submit">
          Submit
        </button>
      </form>
    </Page>
  );
}
