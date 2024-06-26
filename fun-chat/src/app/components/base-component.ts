export interface BaseComponentProps {
  tagName: string;
  classNames?: string | string[];
  textContent?: string;
  parentNode?: HTMLElement | BaseComponent;
  attribute?: AttributeElement;
}

export type TaggedElementProps = Omit<BaseComponentProps, 'tagName'>;

interface AttributeElement {
  name: string;
  value: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected element: T;

  constructor(props: BaseComponentProps) {
    this.element = document.createElement(props.tagName) as T;

    if (props.classNames) this.setClassName(props.classNames);

    this.setTextContent(props.textContent ?? '');

    if (props.parentNode) {
      this.appendChild(props.parentNode);
    }
    if (props.attribute) this.setAttribute(props.attribute);
  }

  getElement() {
    return this.element;
  }

  setClassName(classNames: string[] | string) {
    if (typeof classNames === 'string') {
      this.element.classList.add(classNames);
    } else {
      this.element.classList.add(...classNames);
    }
  }

  removeClassName(className: string) {
    this.element.classList.remove(className);
  }

  getTextContent() {
    return this.element.textContent;
  }

  setTextContent(text: string) {
    this.element.textContent = text;
  }

  appendChild(child: HTMLElement | BaseComponent): void {
    if (child instanceof HTMLElement) {
      this.element.append(child);
    } else this.element.append(child.getElement());
  }

  prependChild(child: HTMLElement | BaseComponent): void {
    if (child instanceof HTMLElement) {
      this.element.prepend(child);
    } else this.element.prepend(child.getElement());
  }

  appendChildren(children: BaseComponent[]): void {
    children.forEach((el) => this.appendChild(el.getElement()));
  }

  prependChildren(children: BaseComponent[]): void {
    children.forEach((el) => this.prependChild(el.getElement()));
  }

  setAttribute(attribute: AttributeElement) {
    if (attribute) {
      this.element.setAttribute(attribute.name, attribute.value);
    }
  }

  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (ev: HTMLElementEventMap[K]) => void,
  ) {
    this.element.addEventListener(type, listener);
  }

  destroy() {
    this.element.remove();
  }

  scrollIntoView() {
    this.element.scrollIntoView({ block: 'start' });
  }

  getScrollHeight() {
    return this.element.scrollHeight;
  }

  getScrollTop() {
    return this.element.scrollTop;
  }

  getClientHeight() {
    return this.element.clientHeight;
  }
}
