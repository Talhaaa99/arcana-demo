import React, { useState } from "react";

const StakeModal = (props) => {
  const { onClose, stakeTokenSymbol, setStakeTokenQuantity, stakeTokens } =
    props;

  return (
    <>
      <div className="absolute ml-[740px]" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="space-y-2">
            <p className="text-xl">Stake</p>

            <div className="flex space-x-2">
              <div className="col-md-9 fieldContainer">
                <input
                  className="input-field w-20 text-slate-700"
                  placeholder="0.0"
                  onChange={(e) => props.setStakeTokenQuantity(e.target.value)}
                />
              </div>

              <div className="col-md-3 inputFieldUnitsContainer">
                <span>{stakeTokenSymbol}</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  stakeTokens();
                  onClose();
                }}
                className="stake px-3 py-2"
              >
                Stake
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakeModal;
