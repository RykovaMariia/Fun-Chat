import { BaseComponent } from 'Components/base-component';

interface InputProps {
  type?: string;
  placeholder?: string;
  id?: string;
  required?: boolean;
  patternValue?: string;
  onInput?: (value: string) => void;
}

export class Input extends BaseComponent<HTMLInputElement> {
  constructor(inputProps?: InputProps) {
    super({ tagName: 'input', classNames: ['input__field', 'input_empty'] });

    this.setAttribute({ name: 'placeholder', value: inputProps?.placeholder ?? '' });
    this.setAttribute({ name: 'type', value: inputProps?.type ?? 'text' });
    if (inputProps?.id) this.setAttribute({ name: 'id', value: inputProps.id });
    if (inputProps?.onInput) this.addOnInput(inputProps.onInput);
    if (inputProps?.required) this.setAttribute({ name: 'required', value: 'required' });
    if (inputProps?.patternValue)
      this.setAttribute({ name: 'pattern', value: inputProps.patternValue });
  }

  addOnInput(onInput: (value: string) => void) {
    this.addEventListener('input', () => {
      onInput(this.getValue());
    });
  }

  getValue() {
    return this.element.value;
  }

  setValue(value: string) {
    this.element.value = value;
  }

  isValid() {
    return this.element.validity.valid;
  }

  isValueMissing() {
    return this.element.validity.valueMissing;
  }

  isPatternMismatch() {
    return this.element.validity.patternMismatch;
  }
}
