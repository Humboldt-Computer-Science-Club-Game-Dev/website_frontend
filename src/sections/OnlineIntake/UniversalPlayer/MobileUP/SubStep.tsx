import Error from "sections/OnlineIntake/Error";
import mobileQR from "./mobileQR";

export default function SubStep(props: any) {
  if (!props?.subStep) {
    return <Error reason="No substep passed to SubStep component" />;
  }
  if (props.subStep.type === "input")
    return <mobileQR.Input {...props} key={props?.subStep?.ID} />;
  if (props.subStep.type === "infinite_input")
    return <mobileQR.InfiniteInput {...props} key={props?.subStep?.ID} />;
  else if (props.subStep.type === "selection")
    return <mobileQR.Selection {...props} key={props?.subStep?.ID} />;
  else
    return (
      <Error reason="Un supported subStep type passed into SubStep component" />
    );
}
