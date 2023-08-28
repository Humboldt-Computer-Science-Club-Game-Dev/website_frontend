import StlFormContainer from "components/StlFormContainer";
import StlSelection from "components/StlSelection/StlSelection";
import { useState } from "react";
import { useIsMobile } from "utilities";
import { createMarginPaddingObject } from "utilities";
import { authRouteStore } from "api/auth/userStore";
import LoadingScreen from "components/LoadingScreen";

function Requisition({ title, marginAndPadding }: any) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();
  const [requester, setRequester] = useState();
  const [departmentOrAuxiliary, setDepartmentOrAuxiliary] = useState("not set");
  const [amountNeeded, setAmountNeeded] = useState();
  const [dateNeeded, setDateNeeded] = useState();
  const [reason, setReason] = useState();
  const [lineItemChargedTo, setLineItemChargedTo] = useState();
  const [advanceOrBudgedItem, setAdvanceOrBudgedItem] = useState();
  const [departmentOrMinistry, setDepartmentOrMinistry] = useState();
  const [checkPayableTo, setCheckPayableTo] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [telephoneNumber, setTelephoneNumber] = useState();

  const isMobile = useIsMobile();
  let authRoute = authRouteStore.getState();
  return (
    <div
      className={`reimbursement_container standard_elements standard_form_1 ${
        isMobile ? "mobile" : ""
      }`}
      style={{ ...createMarginPaddingObject(marginAndPadding) }}
    >
      {/* @ts-ignore */}
      <StlFormContainer
        title={title ? title : "Requisition Form"}
        innerClassName="fixed_inner_container"
      >
        {loading ? (
          <LoadingScreen
            className="receive_document_loading"
            message={"Sending Reimbursement Form"}
          />
        ) : (
          <div className="reimbursement_inner_container">
            <label htmlFor="date" className="mt-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={(e: any) => {
                setDate(e.target.value);
              }}
            />
            <label htmlFor="requester">Requester</label>
            <input
              type="text"
              name="requester"
              id="requester"
              onChange={(e: any) => {
                setRequester(e.target.value);
              }}
            />
            <label htmlFor="department_or_auxiliary">
              Department or Auxiliary
            </label>
            <StlSelection
              options={[
                { name: "Not Set", value: "not_set", default: true },
                { name: "Department", value: "department" },
                { name: "Auxiliary", value: "auxiliary" },
                { name: "Don't Know", value: "dont_know" },
                { name: "Other", value: "other" },
              ]}
              onChange={(department_or_auxiliary: any) => {
                setDepartmentOrAuxiliary(department_or_auxiliary);
              }}
            />
            <label htmlFor="amount_needed">Amount Needed</label>
            <input
              type="number"
              name="amount_needed"
              id="amount_needed"
              onChange={(e: any) => {
                setAmountNeeded(e.target.value);
              }}
            />
            <label htmlFor="date_needed">Date Needed</label>
            <input
              type="date"
              name="date_needed"
              id="date_needed"
              onChange={(e: any) => {
                setDateNeeded(e.target.value);
              }}
            />
            <label htmlFor="reason">Reason</label>
            <input
              type="text"
              name="reason"
              id="reason"
              onChange={(e: any) => {
                setReason(e.target.value);
              }}
            />
            <label htmlFor="line_item_charged_to">Line Item Charged To</label>
            <input
              type="text"
              name="line_item_charged_to"
              id="line_item_charged_to"
              onChange={(e: any) => {
                setLineItemChargedTo(e.target.value);
              }}
            />
            <label htmlFor="advance_or_budged_item">
              Advance or Budged Item
            </label>
            <StlSelection
              options={[
                { name: "Not Set", value: "not_set", default: true },
                { name: "Advance", value: "advance" },
                { name: " Budged Item", value: "budged_item" },
                { name: "Don't Know", value: "dont_know" },
                { name: "Other", value: "other" },
              ]}
              onChange={(advance_or_budged_item: any) => {
                setAdvanceOrBudgedItem(advance_or_budged_item);
              }}
            />
            <label htmlFor="department_or_ministry">
              Department or Ministry
            </label>
            <StlSelection
              options={[
                { name: "Not Set", value: "not_set", default: true },
                { name: "Department", value: "department" },
                { name: "Ministry", value: "ministry" },
                { name: "Don't Know", value: "dont_know" },
                { name: "Other", value: "other" },
              ]}
              onChange={(department_or_ministry: any) => {
                setDepartmentOrMinistry(department_or_ministry);
              }}
            />
            <label htmlFor="check_payable_to">Check Payable To</label>
            <input
              type="text"
              name="check_payable_to"
              id="check_payable_to"
              onChange={(e: any) => {
                setCheckPayableTo(e.target.value);
              }}
            />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={(e: any) => {
                setAddress(e.target.value);
              }}
            />
            <label htmlFor="telephone_number">Telephone Number</label>
            <input
              type="tel"
              name="telephone_number"
              id="telephone_number"
              onChange={(e: any) => {
                setTelephoneNumber(e.target.value);
              }}
            />
            <button onClick={onSubmit} className="submit">
              Submit
            </button>
          </div>
        )}
      </StlFormContainer>
    </div>
  );

  function onSubmit() {
    setLoading(true);
    const requisition = {
      date,
      requester,
      departmentOrAuxiliary,
      amountNeeded,
      dateNeeded,
      reason,
      lineItemChargedTo,
      advanceOrBudgedItem,
      departmentOrMinistry,
      checkPayableTo,
      name,
      address,
      telephoneNumber,
    };

    console.log("requisition:", requisition);

    fetch(`${authRoute}/requisition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requisition),
    })
      .then(async (res) => {
        if (!res.ok) {
          return Promise.reject(await res.json());
        }
        return res.json();
      })
      .then((res) => {
        console.log("res:", res);
        alert("Successfully submitted requisition");
        setLoading(false);
      })
      .catch((err) => {
        console.log("err:", err);
        setLoading(false);
        alert("Failed to submit requisition");
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
}

export default Requisition;
