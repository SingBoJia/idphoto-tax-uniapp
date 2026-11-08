var a = require("../utils.js");

    function t() {
        var t, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = Number(e.preTaxIncome) || 0,
            o = 0;
        r <= 4e3 ? t = r - (o = 800) : t = r - (o = .2 * r);
        var u = t > 0 ? .2 * t : 0,
            n = r - u;
        return {
            preTaxIncome: r = a.utils.formatNumber(r),
            deduction: o = a.utils.formatNumber(o),
            taxableIncome: t = a.utils.formatNumber(Math.max(0, t)),
            taxRate: .2,
            quickDeduction: 0,
            tax: u = a.utils.formatNumber(u),
            netSalary: n = a.utils.formatNumber(n),
            formula: ["".concat(r, r <= 4e3 ? " - 800" : " × (1-20%)"), 20..toFixed(0) + "%", 0],
            calculationType: "afterTax"
        }
    }
    var e = {
        calculateAfterTax: t,
        calculatePreTax: function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = Number(e.netSalary) || 0, o = r, u = 2 * r, n = (o + u) / 2, c = 0; c < 100;) {
                var l = t({
                    preTaxIncome: n
                }).netSalary - r;
                if (Math.abs(l) < 1e-4) break;
                l > 0 ? u = n : o = n, n = (o + u) / 2, c++
            }
            for (var m = Math.round(100 * Number(a.utils.formatNumber(r))), i = Math.round(100 * n), x = t({
                    preTaxIncome: i / 100
                }); Math.round(100 * Number(x.netSalary)) < m;) x = t({
                preTaxIncome: ++i / 100
            });
            for (var f = t({
                    preTaxIncome: (i - 1) / 100
                }); i > 0 && Math.round(100 * Number(f.netSalary)) >= m;) x = f, f = t({
                preTaxIncome: (--i - 1) / 100
            });
            var s = a.utils.formatNumber(r);
            return {
                preTaxIncome: a.utils.formatNumber(i / 100),
                deduction: x.deduction,
                taxableIncome: x.taxableIncome,
                taxRate: .2,
                quickDeduction: 0,
                tax: x.tax,
                netSalary: s,
                formula: x.formula,
                calculationType: "preTax"
            }
        },
        getFormula: function() {
            var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                t = {
                    taxBox: {
                        preTaxIncome: "税前收入",
                        deduction: "减除费用",
                        tax: "应纳个税",
                        netSalary: "税后收入"
                    },
                    formulaTitle: "计算详情",
                    formulaResult: "财产租赁所得个税",
                    formula: [{
                        unit: "",
                        content: "应纳税所得额"
                    }, {
                        unit: " × ",
                        content: "税率"
                    }],
                    tipsTitle: "计算说明",
                    tipsList: ["1. 应纳税所得额 = 财产租赁所得(不超过4000元) - 800元", "2. 应纳税所得额 = 财产租赁所得(超过4000元)×(1 - 20%)", "3. 应纳税额 = 应纳税所得额 × 20%"]
                };
            return a.preTaxIncome <= 4e3 ? t.formula[0].content = "(税前(不超过4000元) - 800)" : t.formula[0].content = "(税前(超过4000元)×(1-20%))", t.taxBracketsTitle = "", t
        },
        getTaxBrackets: function() {
            return []
        }
    };
    exports.cczl = e;