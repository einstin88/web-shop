import { Group, Label, Input } from "./form-input.styles";

function FormInput({ label, ...otherProps }) {
  return (
    <Group>
      <Input {...otherProps} />
      {label && <Label shrink={otherProps.value.length}>{label}</Label>}
    </Group>
  );
}

export default FormInput;
