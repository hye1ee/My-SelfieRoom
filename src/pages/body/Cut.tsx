import Button from "../../components/Button";
import { BodyProps } from "./type";

const Cut = (props: BodyProps) => {
  return (
    <>
      This is Cut Step
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Cut;
