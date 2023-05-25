import React, { useState } from 'react';
import './CancelReasonModal.css';
import Loading from '../../../sharedComponents/Loading';
const cancelReasons = [
  'Have another importantwork ',
  'Doctor is on leave',
  'Hospital closed',
  'Emergency Case',
];
export default function CancelReasonModal({ onCancel, id }) {
  const [selectedReson, setSelectedReson] = useState('');
  const [loading, setLoading] = useState(false);
  const handleCancel = async () => {
    setLoading(true);
    await onCancel(id, selectedReson);
    setLoading(false);
  };
  return (
    <div className='overlay'>
      <div className='popup_card'>
        <div className='content'>
          <p className='que_text'>Select your reason for cancellation</p>
          <div className='cancel_reasons'>
            {cancelReasons.map((reason) => {
              return (
                <div
                  key={reason}
                  className='cancel_reason'
                  style={{
                    backgroundColor:
                      selectedReson === reason
                        ? '#246bfd'
                        : 'rgb(221, 220, 220)',
                    color:
                      selectedReson === reason ? 'white' : 'rgb(100, 101, 103)',
                  }}
                  onClick={() => setSelectedReson(reason)}
                >
                  {reason}
                </div>
              );
            })}
          </div>
          {selectedReson && (
            <button className='cancel_button' onClick={handleCancel}>
              {loading ? <Loading loadingText={'Confirming'} /> : 'Confirm'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
