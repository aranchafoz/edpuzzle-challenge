import { parseStyles } from "./box_styles";

/* ====================================================== */
/*                         Tests                          */
/* ====================================================== */

describe("parseStyles", () => {
  it("should parse style", () => {
    const value = "primary7";
    const prefix = "color-";
    const inlineStyleKey = "color";
    const breakpoint = "lg";
    const { className, style } = parseStyles(
      value,
      prefix,
      inlineStyleKey,
      breakpoint
    );

    expect(style).toBeUndefined();
    expect(className).toEqual("color-primary7");
  });

  it("should parse custom style", () => {
    const value = "[#ccc]";
    const prefix = "color-";
    const inlineStyleKey = "color";
    const breakpoint = "lg";
    const { className, style } = parseStyles(
      value,
      prefix,
      inlineStyleKey,
      breakpoint
    );

    expect(style).toEqual({ color: "#ccc" });
    expect(className).toBeUndefined();
  });

  it("should parse custom style", () => {
    const value = "[calc(100%-57px)]";
    const prefix = "h-";
    const inlineStyleKey = "height";
    const breakpoint = "lg";
    const { className, style } = parseStyles(
      value,
      prefix,
      inlineStyleKey,
      breakpoint
    );

    expect(style).toEqual({ height: "calc(100% - 57px)" });
    expect(className).toBeUndefined();
  });

  it("should parse responsive style", () => {
    const value = "primary7 lg:primary5 2xl:primary1";
    const prefix = "color-";
    const inlineStyleKey = "color";
    const breakpoint = "lg";
    const { className, style } = parseStyles(
      value,
      prefix,
      inlineStyleKey,
      breakpoint
    );

    expect(style).toBeUndefined();
    expect(className).toEqual("color-primary5");
  });

  it("should parse responsive style", () => {
    const value = "primary7 lg:primary5 2xl:primary1";
    const prefix = "color-";
    const inlineStyleKey = "color";
    const breakpoint = "sm";
    const { className, style } = parseStyles(
      value,
      prefix,
      inlineStyleKey,
      breakpoint
    );

    expect(style).toBeUndefined();
    expect(className).toEqual("color-primary7");
  });

  it("should parse responsive style", () => {
    const value = "primary7 lg:primary5 hover:primary1";
    const prefix = "color-";
    const inlineStyleKey = "color";
    const breakpoint = "lg";
    const { className, style } = parseStyles(
      value,
      prefix,
      inlineStyleKey,
      breakpoint
    );

    expect(style).toBeUndefined();
    expect(className).toEqual("color-primary5 color-hover:primary1");
  });

  it("should parse responsive style", () => {
    const value = "[calc(100%-57px)] lg:[calc(100%-65px)]";
    const prefix = "color-";
    const inlineStyleKey = "color";
    const breakpoint = "lg";
    const { className, style } = parseStyles(
      value,
      prefix,
      inlineStyleKey,
      breakpoint
    );

    expect(style).toEqual({ color: "calc(100% - 65px)" });
    expect(className).toBeUndefined();
  });

  it("should parse css variable inside calc correctly", () => {
    const value = "[calc(var(--this-is-a-css-variable)-50px)]";
    const prefix = "color-";
    const inlineStyleKey = "color";
    const breakpoint = "lg";
    const { className, style } = parseStyles(
      value,
      prefix,
      inlineStyleKey,
      breakpoint
    );

    expect(style).toEqual({
      color: "calc(var(--this-is-a-css-variable) - 50px)",
    });
    expect(className).toBeUndefined();
  });

  it("should parse css variable inside calc correctly inside breakpoint", () => {
    const value =
      "[calc(var(--this-is-a-css-variable))] md:[calc(var(--this-is-a-css-variable)-50px)]";
    const prefix = "color-";
    const inlineStyleKey = "color";

    const smTry = parseStyles(value, prefix, inlineStyleKey, "sm");
    const lgTry = parseStyles(value, prefix, inlineStyleKey, "lg");

    expect(smTry.style).toEqual({
      color: "calc(var(--this-is-a-css-variable))",
    });
    expect(smTry.className).toBeUndefined();

    expect(lgTry.style).toEqual({
      color: "calc(var(--this-is-a-css-variable) - 50px)",
    });
    expect(lgTry.className).toBeUndefined();
  });
});
