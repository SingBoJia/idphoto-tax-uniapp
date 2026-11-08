var t = require("../utils.js"),
        e = {
            calculateAfterTax: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    a = Number(e.preTaxIncome) || 0,
                    r = a,
                    u = r > 0 ? .2 * r : 0,
                    o = a - u;
                return {
                    preTaxIncome: a = t.utils.formatNumber(a),
                    taxableIncome: r = t.utils.formatNumber(r),
                    taxRate: .2,
                    quickDeduction: 0,
                    tax: u = t.utils.formatNumber(u),
                    netSalary: o = t.utils.formatNumber(o),
                    formula: [a, 20..toFixed(0) + "%", 0],
                    calculationType: "afterTax"
                }
            },
            calculatePreTax: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    a = Number(e.netSalary) || 0,
                    r = a / .8,
                    u = r,
                    o = r > 0 ? .2 * r : 0;
                return {
                    preTaxIncome: r = t.utils.formatNumber(r),
                    taxableIncome: u = t.utils.formatNumber(u),
                    taxRate: .2,
                    quickDeduction: 0,
                    tax: o = t.utils.formatNumber(o),
                    netSalary: a = t.utils.formatNumber(a),
                    formula: [r, 20..toFixed(0) + "%", 0],
                    calculationType: "preTax"
                }
            },
            getFormula: function() {
                return {
                    taxBox: {
                        preTaxIncome: "税前收入",
                        tax: "应纳个税",
                        netSalary: "税后收入"
                    },
                    formulaTitle: "计算详情",
                    formulaResult: "偶然所得个税",
                    formula: [{
                        unit: "",
                        content: "应纳税所得额"
                    }, {
                        unit: " × ",
                        content: "税率"
                    }],
                    tipsTitle: "计算说明",
                    tipsList: ["1. 应纳税所得额=每次收入额", "2. 应纳税额=应纳税所得额 × 适用税率（20%）"]
                }
            },
            getTaxBrackets: function() {
                return []
            }
        };
    exports.orsd = e;