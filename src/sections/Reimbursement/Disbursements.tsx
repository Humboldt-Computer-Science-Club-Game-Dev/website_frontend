import { useState, useEffect } from "react";
function Disbursements({ onChange }: any) {
  useEffect(() => {
    const oldWarn = console.warn;

    console = {
      ...console,
      warn: function (message) {
        if (
          typeof message === "string" &&
          message.includes("A component is changing an uncontrolled input")
        ) {
          return;
        }
        oldWarn(message);
      },
    };
  }, []);
  const [disbursements, setDisbursements] = useState([
    { vendor: null, description: null, amount: null },
  ]);
  onChange = onChange ? onChange : defaultOnChange;
  return (
    <div className="disbursement_container">
      {disbursements.map((disbursement: any, i: number) => {
        return (
          <div key={i}>
            <label htmlFor="vendor" className={`${i === 0 ? "mt-0-i" : "0"}`}>
              Vendor
            </label>
            <input
              type="text"
              name="vendor"
              id="vendor"
              value={disbursement.vendor || ""}
              onChange={(e: any) => {
                updateDisbursements(i, "vendor", e.target.value);
              }}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={disbursement.description || ""}
              onChange={(e: any) => {
                updateDisbursements(i, "description", e.target.value);
              }}
            />
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={disbursement.amount || ""}
              onChange={(e: any) => {
                updateDisbursements(i, "amount", e.target.value);
              }}
            />
            <button
              className="add_disbursement"
              onClick={() => {
                setDisbursements([
                  ...disbursements,
                  { vendor: null, description: null, amount: null },
                ]);
              }}
            >
              Add
            </button>

            {disbursements?.length > 1 ? (
              <button
                className="remove_disbursement"
                onClick={() => {
                  console.log("i:", i);
                  const disbursementsBuffer = JSON.parse(
                    JSON.stringify(disbursements)
                  );
                  const newDisbursements = removeArrayElement(
                    disbursementsBuffer,
                    i
                  );
                  console.log(
                    "before:",
                    JSON.parse(JSON.stringify(disbursementsBuffer)),
                    "\nnew:",
                    newDisbursements
                  );
                  setDisbursements(newDisbursements);
                }}
              >
                Remove
              </button>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );

  function updateDisbursements(index: number, property: string, newValue: any) {
    console.log("index:", index, "property:", property, "newValue:", newValue);
    const disbursementsBuffer = JSON.parse(JSON.stringify(disbursements));
    disbursementsBuffer[index][property] = newValue;
    setDisbursements(disbursementsBuffer);
    onChange(disbursementsBuffer);
  }

  function removeArrayElement(array: any[], index: number) {
    const arrayBuffer = JSON.parse(JSON.stringify(array));
    let newArray: any = [];
    for (let i = 0; i < arrayBuffer.length; i++) {
      if (i !== index) {
        newArray.push(arrayBuffer[i]);
      }
    }
    return newArray;
  }
}

export default Disbursements;

function defaultOnChange() {
  console.log("On change not implemented");
}
