import { customTheme } from './theme';

describe('Logo', () => {
  it('should render Logo', () => {
    expect(customTheme).toMatchInlineSnapshot(`
      Object {
        "cards": Object {
          "green": "#049452",
          "orange": "#ED6606",
          "white": "#FFF",
          "yellow": "#EEC907",
        },
        "palette": Object {
          "primary": Object {
            "main": "#455A64",
          },
        },
        "typography": Object {
          "fontFamily": "Roboto",
        },
      }
    `);
  });
});
