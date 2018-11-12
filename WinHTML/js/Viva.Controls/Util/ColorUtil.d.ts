/// <reference path="../../Definitions/jquery.d.ts" />
export = Main;
declare module Main {
    enum AllRawColorCode {
        "Hex_fcd116" = 0,
        "Hex_eb3c00" = 1,
        "Hex_ba141a" = 2,
        "Hex_b4009e" = 3,
        "Hex_442359" = 4,
        "Hex_002050" = 5,
        "Hex_0072c6" = 6,
        "Hex_008272" = 7,
        "Hex_007233" = 8,
        "Hex_7fba00" = 9,
        "Hex_a0a5a8" = 10,
        "Hex_fff100" = 11,
        "Hex_ff8c00" = 12,
        "Hex_e81123" = 13,
        "Hex_ec008c" = 14,
        "Hex_68217a" = 15,
        "Hex_00188f" = 16,
        "Hex_00bcf2" = 17,
        "Hex_00b294" = 18,
        "Hex_009e49" = 19,
        "Hex_bad80a" = 20,
        "Hex_bbc2ca" = 21,
        "Hex_fffc9e" = 22,
        "Hex_ffb900" = 23,
        "Hex_dd5900" = 24,
        "Hex_f472d0" = 25,
        "Hex_9b4f96" = 26,
        "Hex_4668c5" = 27,
        "Hex_6dc2e9" = 28,
        "Hex_00d8cc" = 29,
        "Hex_55d455" = 30,
        "Hex_e2e584" = 31,
        "Hex_d6d7d8" = 32,
        "Hex_807900" = 33,
        "Hex_804600" = 34,
        "Hex_740912" = 35,
        "Hex_760046" = 36,
        "Hex_34113d" = 37,
        "Hex_000c48" = 38,
        "Hex_005e79" = 39,
        "Hex_084c41" = 40,
        "Hex_063d20" = 41,
        "Hex_3d460a" = 42,
        "Hex_32383f" = 43,
        "Hex_bfb500" = 44,
        "Hex_bf6900" = 45,
        "Hex_ae0d1a" = 46,
        "Hex_b10069" = 47,
        "Hex_4e195c" = 48,
        "Hex_00126b" = 49,
        "Hex_008db5" = 50,
        "Hex_00856f" = 51,
        "Hex_0f5b2f" = 52,
        "Hex_8ba208" = 53,
        "Hex_464f59" = 54,
        "Hex_fcf37e" = 55,
        "Hex_ffba66" = 56,
        "Hex_f1707b" = 57,
        "Hex_f466ba" = 58,
        "Hex_a47aaf" = 59,
        "Hex_6674bc" = 60,
        "Hex_66d7f7" = 61,
        "Hex_66d1bf" = 62,
        "Hex_66c592" = 63,
        "Hex_d6e86c" = 64,
        "Hex_8f9ca8" = 65,
        "Hex_fffccc" = 66,
        "Hex_ffe8cc" = 67,
        "Hex_facfd3" = 68,
        "Hex_fbcce8" = 69,
        "Hex_e1d3e4" = 70,
        "Hex_ccd1e9" = 71,
        "Hex_ccf2fc" = 72,
        "Hex_ccf0ea" = 73,
        "Hex_ccecdb" = 74,
        "Hex_f0f7b2" = 75,
        "Hex_63707e" = 76,
        max = 77,
    }
    enum ColorCode {
        "a1" = 0,
        "b1" = 1,
        "c1" = 2,
        "d1" = 3,
        "e1" = 4,
        "f1" = 5,
        "g1" = 6,
        "h1" = 7,
        "i1" = 8,
        "j1" = 9,
        "k1" = 10,
        "a0" = 11,
        "b0" = 12,
        "c0" = 13,
        "d0" = 14,
        "e0" = 15,
        "f0" = 16,
        "g0" = 17,
        "h0" = 18,
        "i0" = 19,
        "j0" = 20,
        "k0" = 21,
        "a2" = 22,
        "b2" = 23,
        "c2" = 24,
        "d2" = 25,
        "e2" = 26,
        "f2" = 27,
        "g2" = 28,
        "h2" = 29,
        "i2" = 30,
        "j2" = 31,
        "k2" = 32,
        "a0s2" = 33,
        "b0s2" = 34,
        "c0s2" = 35,
        "d0s2" = 36,
        "e0s2" = 37,
        "f0s2" = 38,
        "g0s2" = 39,
        "h0s2" = 40,
        "i0s2" = 41,
        "j0s2" = 42,
        "k0s2" = 43,
        "a0s1" = 44,
        "b0s1" = 45,
        "c0s1" = 46,
        "d0s1" = 47,
        "e0s1" = 48,
        "f0s1" = 49,
        "g0s1" = 50,
        "h0s1" = 51,
        "i0s1" = 52,
        "j0s1" = 53,
        "k0s1" = 54,
        "a0t1" = 55,
        "b0t1" = 56,
        "c0t1" = 57,
        "d0t1" = 58,
        "e0t1" = 59,
        "f0t1" = 60,
        "g0t1" = 61,
        "h0t1" = 62,
        "i0t1" = 63,
        "j0t1" = 64,
        "k0t1" = 65,
        "a0t2" = 66,
        "b0t2" = 67,
        "c0t2" = 68,
        "d0t2" = 69,
        "e0t2" = 70,
        "f0t2" = 71,
        "g0t2" = 72,
        "h0t2" = 73,
        "i0t2" = 74,
        "j0t2" = 75,
        "k0t2" = 76,
        max = 77,
    }
    /**
     * Returns the RawColorString (#0072c6) that can be used in the css or less from the index of the color code.
     * Note: AllRowColorCode["Hex_fcd116"] === 0 and AllRowColorCode[0] === "Hex_fcd116"
     * For example:
     *   getRawColorString(ColorCode.a1) will return "#fcd116".
     * This is same as
     *   getRowColorString(AllRawColorCode.Hex_fcd116) will return "#fcd116".
     * This is because both ColorCode.a1 and AllRawColorCode.Hex_fcd116 both are 0.
     *
     * @param colorIndex Index of the color. Can be either ColorCode Enum or AllRowColorCode number.
     * @return Css style of color hex code string. For example: "#fcd116".
     */
    function getRawColorString(colorIndex: number): string;
    /**
     * Returns the ColorCode string ("a1") base on the index number.
     * Note: ColorCode["a1"] === 0 and ColorCode[0] === "a1"
     * For example:
     *   getColorCodeString(ColorCode.a1) will return "a1".
     * This is same as
     *   getColorCodeString(AllRawColorCode.Hex_fcd116) will return "a1".
     * This is because both ColorCode.a1 and AllRawColorCode.Hex_fcd116 both are 0.
     *
     * @param colorIndex Index of the color. Can be either ColorCode Enum or AllRowColorCode number or numeric number.
     * @return Ux string code. For example: "a1".
     */
    function getColorCodeString(colorIndex: number): string;
    /**
     * Returns the RawColorString (0072c6) that can be use in the data coding.
     * Handles all different possible form of hex color code and format of string.
     * For example:
     *   getRawColorCode("fcd116") will return "fcd116".
     *   getRowColorString("#fcd116") will return "fcd116".
     *   getRowColorString("Hex_fcd116") will return "fcd116".
     *   If not in the above format, it will return null.
     *
     * @param rawColorData String data of any hex string code.
     * @return Css color hex code string. For example: "fcd116".
     */
    function getRawColorCode(rawColorData: string): string;
    /**
     * Returns the RawColorIndex (0 base index) that can be used in for indexing ColorCode or RawColorCode.
     * For example:
     *   getRawColorIndex("fcd116") will return 0.
     *   getRowColorString("#fcd116") will return 0.
     *   getRowColorString("Hex_fcd116") will return 0.
     *   If not in the above format, it will return null.
     *
     * @param rawColorData String data of any hex string code.
     * @return Index for either Enum ColorCode or RawColorCode. For example: 0. This number will be less than 77 (max) if not, returns null.
     */
    function getRawColorIndex(rawColorData: string): number;
    /**
     * Returns the colorIndex (0 base index) that can be used in for indexing ColorCode or RawColorCode.
     * For example:
     *   getColorIndex("fcd116") will return 0.
     *   getColorIndex("#fcd116") will return 0.
     *   getColorIndex("Hex_fcd116") will return 0.
     *   getColorIndex("a1") will return 0.
     *
     *   If invalid data is given, it will return null.
     *
     * @param colorData String data of any hex string code.
     * @return Index for either Enum ColorCode or RawColorCode. For example: 0. This number will be less than 77 (max) if not, returns null.
     */
    function getColorIndex(colorData: string): number;
    /**
     * Returns the Array of the Tint set corresponding to this color code.
     * For example:
     *   getColorCodeTintSet("fcd116") will return ["a0s2","a0s1","a0", "a0t1", "a0t2"].
     *   getColorCodeTintSet("#fcd116") will return ["a0s2","a0s1","a0", "a0t1", "a0t2"].
     *   getColorCodeTintSet("Hex_fcd116") will return ["a0s2","a0s1","a0", "a0t1", "a0t2"].
     *   getColorCodeTintSet("a1") will return ["a0s2","a0s1","a0", "a0t1", "a0t2"].
     *
     *   If invalid data is given, it will return null.
     *
     * @param colorData String data of any hex string code. The can be "fcd116", "#fcd116", "Hex_fcd116", or "a1".
     * @param rawColorData Optional boolean indicates that if you want to get the rowColorData. If set, this function returns ["#807900","#bfb500","fff100", "#fcf37e", "#fffccc"] instead of ["a0s2","a0s1","a0", "a0t1", "a0t2"].
     * @return Array of the color code. Typicically. ["a0s2","a0s1","a0", "a0t1", "a0t2"].
     */
    function getColorCodeTintSet(colorData: string, rawColorData?: boolean): string[];
    /**
     * Returns the Array of the Tint set corresponding to this color code.
     * For example:
     *   getColorCodeTintSetIndex(0) will return [33,44, 11, 55, 66] which corresponds to ["a0s2","a0s1","a0", "a0t1", "a0t2"].
     *   getColorCodeTintSetIndex(11) will return [33,44, 11, 55, 66] which corresponds to ["a0s2","a0s1","a0", "a0t1", "a0t2"].
     *   getColorCodeTintSetIndex(22) will return [33,44, 11, 55, 66] which corresponds to ["a0s2","a0s1","a0", "a0t1", "a0t2"].
     *      ....   (0, 11, 22, 33, 44, 55, 66) all return the same set because they are same color system in MsColorWheel.
     *   If invalid data is given, it will return null.
     *
     * @param colorIndex Index of the color. Can be either ColorCode Enum or AllRowColorCode number.
     * @return Array of the color code index. Typicically. [33, 44, 11, 55, 66]
     */
    function getColorCodeTintSetIndex(colorIndex: number): number[];
    /**
     * Returns the main color wheel color (33) colors. This exclude the set of Tint/Shade.
     *
     * @return Array of the color code index. Typicically. [0, 1, 2, ..., 32]
     */
    function getAllColorCodeIndexes(): number[];
    /**
     * Returns the Array of ms color wheel color set with a start point. This is very useful for color wheel.
     * For example:
     *   getRotatedArray<number>([33,44, 11, 55, 66], 2) will return [11, 55, 66, 33, 44].
     *
     * @param data Array of color number, code, represents a color wheel.
     * @param start Index of start point.
     * @return Array of the color code index. Typicically. [33, 44, 11, 55, 66]
     */
    function getRotatedArray<T>(data: T[], start?: number): T[];
    /**
     * Returns the gradient color wheel color (27) colors index. This excludes the set of Tint/Shade.
     * Ux specifies this to be used as default for the Donut and BarChart where the colors don't overlap with each other.
     *
     * @param start Index of start point of this 27 color.
     * @return Array of the color code index.
     */
    function getGradientColorCodeIndexes(start?: number): number[];
    /**
     * Returns the rainbow color wheel color (27) colors index. This excludes the set of Tint/Shade.
     * Ux specifies this to be used as default for the Line Chart where the colors DO overlap with each other.
     *
     * @param start Index of start point of this 27 color.
     * @return Array of the color code index.
     */
    function getRainbowColorCodeIndexes(start?: number): number[];
    /**
     * Returns the gradient color wheel color (27) colors string. This excludes the set of Tint/Shade.
     * Ux specifies this to be used as default for the Donut and BarChart where the colors don't overlap with each other.
     *
     * @param start Index of start point of this 27 color.
     * @return Array of the color code string array [a0,a1,b2,b0,c2,b1,c0,c1,d0,d1,e2,e0,e1,f1,f0,g1,g0,g2,h2,h0,h1,i1,i0,i2,j1,j0,j2,]
     */
    function getGradientColorCode(start?: number): string[];
    /**
     * Returns the gradient color wheel color (27) raw colors string. This excludes the set of Tint/Shade.
     * Ux specifies this to be used as default for the Donut and BarChart where the colors don't overlap with each other.
     *
     * @param start Index of start point of this 27 color.
     * @return Array of the color code string array ["#fcd116", .....]
     */
    function getRawGradientColorCode(start?: number): string[];
    /**
     * Returns the gradient color wheel color (27) raw colors string. This excludes the set of Tint/Shade.
     * Ux specifies this to be used as default for the Donut and BarChart where the colors don't overlap with each other.
     *
     * @param start Index of start point of this 27 color.
     * @return Array of the color code string array [a0,a1,b2,b0,c2,b1,c0,c1,d0,d1,e2,e0,e1,f1,f0,g1,g0,g2,h2,h0,h1,i1,i0,i2,j1,j0,j2,]
     */
    function getRainbowColorCode(start?: number): string[];
    /**
     * Returns the rainbow color wheel color (27) colors string.  This exclude the set of Tint/Shade.
     * Ux specifies this to used as default for the Donut and barChart where the color doesn't overlap with each other.
     *
     * @param start Index of start point of this 27 color.
     * @return Array of the color code string array ["#fcd116", .....]
     */
    function getRawRainbowColorCode(start?: number): string[];
}
