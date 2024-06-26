import './login-form.scss';
import { BaseComponent } from 'Components/base-component';
import { Button } from 'Components/button/button';
import { Input } from 'Components/input/input';

const INPUTS = ['login', 'password'];
const REG_VALID = ['[a-zA-Z]{2,10}', '(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}'];

function getError(input: Input, fieldName: string, numberField: number) {
  input.removeClassName('input_empty');

  if (input.isValueMissing()) {
    input.setClassName('input_empty');
    return `You need enter ${fieldName}`;
  }
  if (input.isPatternMismatch()) {
    return numberField === 0
      ? `${fieldName} must be between 2 and 10 characters long in the English alphabet`
      : `${fieldName} must have one digit and a capital letter and at least 6 characters`;
  }
  return ' ';
}

export class LoginForm extends BaseComponent<HTMLFormElement> {
  private inputs: Input[] = [];

  private spanElements: BaseComponent[] = [];

  constructor(private onSubmit: (login: string, password: string) => void) {
    super({ tagName: 'form', classNames: 'login-form' });

    const inputContainers = INPUTS.map((inputName, i) => {
      const div = new BaseComponent({ tagName: 'div', classNames: 'input' });
      const label = new BaseComponent({
        tagName: 'label',
        classNames: 'input__label',
        textContent: inputName,
        attribute: { name: 'for', value: inputName },
      });
      const input = new Input({
        type: i === 0 ? 'text' : 'password',
        id: inputName,
        required: true,
        patternValue: REG_VALID[i],
      });

      this.inputs.push(input);

      const spanError = new BaseComponent({ tagName: 'span', classNames: 'error' });
      this.spanElements.push(spanError);

      input.addOnInput(() => {
        spanError.setTextContent(getError(input, inputName, i));
      });

      div.appendChildren([spanError, input, label]);
      return div;
    });

    const submitButton = new Button(
      {
        attribute: { name: 'type', value: 'submit' },
        textContent: 'Login',
        classNames: 'button_login',
      },
      {
        type: 'submit',
      },
    );

    submitButton.setOnClick(this.clickSubmitButton);

    this.appendChildren([...inputContainers, submitButton]);
  }

  clickSubmitButton = (e: Event) => {
    e.preventDefault();
    if (this.inputs.every((input) => input.isValid())) {
      const [login, password] = this.inputs.map((input) => input.getValue());

      this.onSubmit(login, password);
    } else {
      this.inputs.forEach((input, i) => {
        this.spanElements[i].setTextContent(getError(input, INPUTS[i], i));
      });
    }
  };
}
