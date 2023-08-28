import StlFormContainer from "components/StlFormContainer";
import StlSelection from "components/StlSelection/StlSelection";
import Disbursements from "./Disbursements";
import { useState } from "react";
import { useIsMobile } from "utilities";
import { createMarginPaddingObject } from "utilities";
import { authRouteStore } from "api/auth/userStore";
import LoadingScreen from "components/LoadingScreen";

function Reimbursement({ title, marginAndPadding }: any) {
  const [date, setDate] = useState();
  const [requester, setRequester] = useState();
  const [departmentOrAuxiliary, setDepartmentOrAuxiliary] = useState("not_set");
  const [expenditureAmount, setExpenditureAmount] = useState();
  const [disbursements, setDisbursements] = useState([{}] as any);
  const [totalReceipt, setTotalReceipt] = useState(0);
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
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
        title={title ? title : "Reimbursement Expense Form"}
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
            <label htmlFor="expenditure_amount">Expenditure Amount</label>
            <input
              type="number"
              name="expenditure_amount"
              id="expenditure_amount"
              onChange={(e: any) => {
                setExpenditureAmount(e.target.value);
              }}
            />
            <h2>Disbursements</h2>
            <Disbursements onChange={onDisbursementChange} />
            <h2>Total Receipt: ${totalReceipt ? totalReceipt : ""}</h2>
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
    const reimbursement = {
      date,
      requester,
      departmentOrAuxiliary,
      expenditureAmount,
      disbursements,
      totalReceipt,
    };

    fetch(`${authRoute}/reimbursement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reimbursement),
    })
      .then(async (res) => {
        if (!res.ok) {
          return Promise.reject(await res.json());
        }
        return res.json();
      })
      .then((res) => {
        console.log("res:", res);
        alert("Successfully submitted reimbursement");
        setLoading(false);
        alert("Successfully submitted reimbursement");
      })
      .catch((err) => {
        console.log("err:", err);
        setLoading(false);
        alert("Failed to submit reimbursement");
      });
  }

  function onDisbursementChange(disbursements: any) {
    console.log(
      "Outer disbursements:",
      disbursements,
      calculateTotalReceipt(disbursements)
    );
    setDisbursements(disbursements);
    setTotalReceipt(calculateTotalReceipt(disbursements));
  }

  function calculateTotalReceipt(disbursementsIn?: any) {
    const disbursementsToUse: any = disbursementsIn
      ? disbursementsIn
      : disbursements;
    let total = 0;
    disbursementsToUse.forEach((disbursement: any) => {
      total += parseFloat(disbursement.amount);
    });
    return total;
  }
}

export default Reimbursement;
