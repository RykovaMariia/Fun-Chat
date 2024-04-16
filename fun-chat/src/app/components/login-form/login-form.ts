import './login-form.scss';
import { BaseComponent, TaggedElementProps } from 'Components/base-component';
import { Button } from 'Components/button/button';
import { Input } from 'Components/input/input';

const INPUTS = ['login', 'password'];
const REG_VALID = ['[a-zA-Z]{2,}', '(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}'];

function getError(input: Input, fieldName: string, numberField: number) {
  input.removeClassName('input_empty');

  if (input.isValueMissing()) {
    input.setClassName('input_empty');
    return `You need enter ${fieldName}`;
  }
  if (input.isPatternMismatch()) {
    return numberField === 0
      ? `${fieldName} must be at least 2 characters long`
      : `${fieldName} must have one digit and a capital letter and at least 6 characters`;
  }
  return ' ';
}

export class LoginForm extends BaseComponent<HTMLFormElement> {
  private inputs: Input[] = [];

  private spanElements: BaseComponent[] = [];

  // eslint-disable-next-line max-lines-per-function
  constructor(submitForm?: (login: string, password: string) => void, props?: TaggedElementProps) {
    super({
      ...props,
      tagName: 'form',
      classNames: 'login-form',
    });

    const inputContainers = INPUTS.map((inputName, i) => {
      const div = new BaseComponent({ tagName: 'div', classNames: 'input' });
      const label = new BaseComponent({
        tagName: 'label',
        classNames: 'input__label',
        textContent: inputName,
        attribute: { name: 'for', value: inputName },
      });
      const input = new Input({
        id: inputName,
        required: true,
        patternValue: REG_VALID[i],
      });

      this.inputs.push(input);

      const spanError = new BaseComponent({
        tagName: 'span',
        classNames: 'error',
      });
      this.spanElements.push(spanError);

      input.addOnInput(() => {
        spanError.setTextContent(getError(input, inputName, i));
      });

      div.insertChildren([spanError, input, label]);
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

    if (submitForm) {
      submitButton.setOnClick((e) => {
        e.preventDefault();
        if (this.inputs.every((input) => input.isValid())) {
          const [login, password] = this.inputs.map((input) => input.getValue());
          submitForm(login, password);
        } else {
          this.inputs.forEach((input, i) => {
            this.spanElements[i].setTextContent(getError(input, INPUTS[i], i));
          });
        }
      });
    }

    this.insertChildren([...inputContainers, submitButton]);
  }
}
