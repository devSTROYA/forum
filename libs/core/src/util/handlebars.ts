import * as hbs from 'handlebars';

type HandlebarsRenderConfig = {
  template: string;
  data: Record<string, any>;
};

export class Handlebars {
  static render(payload: HandlebarsRenderConfig): string {
    hbs.registerHelper('notEquals', (a: any, b: any, options: any) =>
      a !== b ? options.fn(this) : options.inverse(this)
    );
    hbs.registerHelper('equals', (a: any, b: any, options: any) =>
      a === b ? options.fn(this) : options.inverse(this)
    );

    const { template, data } = payload;
    const compiledHandlebars = hbs.compile(template);

    return compiledHandlebars(data);
  }
}
