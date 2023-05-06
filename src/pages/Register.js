import React from 'react';
import { Page } from '../components';

export default function Regsiter() {
  return (
    <Page>
      <form className="form">
        
          <div className="form-item">
            <label className="form-item-label">First Name:</label>
            <input className="form-item-input" />
          </div>
          <div className="form-item">
            <label className="form-item-label">Last Name:</label>
            <input className="form-item-input" />
          </div>
        

        
          <div className="form-item">
            <label className="form-item-label">Something:</label>
            <input className="form-item-input" />
          </div>
       
        <button className="form-submit" type="submit">
          Submit
        </button>
      </form>
    </Page>
  );
}
