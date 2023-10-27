import Button from "../../components/Button";
import { BodyProps } from "./type";

const Share = (props: BodyProps) => {
  return (
    <>
      This is Share Step
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Share;
