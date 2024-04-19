import { BaseComponent, TaggedElementProps } from 'Components/base-component';

export type SvgId = 'logo' | 'logo-rsschool' | 'logout';

const URL_SPRITE = './assets/sprite.svg';

export class SvgContainer extends BaseComponent {
  private svg: SVGSVGElement;

  constructor(svgId: SvgId, props?: TaggedElementProps) {
    super({ tagName: 'div', ...props });

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttributeNS(null, 'class', 'icon');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${URL_SPRITE}#${svgId}`);

    this.svg.append(use);
    this.element.append(this.svg);
  }

  setSvgColor(color: string) {
    this.svg.style.fill = color;
  }
}
