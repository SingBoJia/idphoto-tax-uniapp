var e = require("../utils.js");

    function r() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            a = Number(r.transferPrice) || 0,
            t = Number(r.originalPrice) || 0,
            i = Number(r.reasonableFee) || 0,
            n = a - t - i,
            o = n > 0 ? .2 * n : 0,
            l = a - o;
        return {
            transferPrice: a = e.utils.formatNumber(a),
            originalPrice: t = e.utils.formatNumber(t),
            reasonableFee: i = e.utils.formatNumber(i),
            taxableIncome: n = e.utils.formatNumber(Math.max(0, n)),
            taxRate: .2,
            quickDeduction: 0,
            tax: o = e.utils.formatNumber(o),
            netSalary: l = e.utils.formatNumber(l),
            formula: ["".concat(a, "-").concat(t, "-").concat(i), 20..toFixed(0) + "%", 0],
            calculationType: "afterTax"
        }
    }
    var a = {
        calculateAfterTax: r,
        calculatePreTax: function() {
            for (var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Number(a.netSalary) || 0, i = Number(a.originalPrice) || 0, n = Number(a.reasonableFee) || 0, o = t, l = 2 * t, u = (o + l) / 2, c = 0; c < 100;) {
                var s = r({
                    transferPrice: u,
                    originalPrice: i,
                    reasonableFee: n
                }).netSalary - t;
                if (Math.abs(s) < 1e-4) break;
                s > 0 ? l = u : o = u, u = (o + l) / 2, c++
            }
            for (var m = Math.round(100 * Number(e.utils.formatNumber(t))), f = Math.round(100 * u), b = r({
                    transferPrice: f / 100,
                    originalPrice: i,
                    reasonableFee: n
                }); Math.round(100 * Number(b.netSalary)) < m;) b = r({
                transferPrice: ++f / 100,
                originalPrice: i,
                reasonableFee: n
            });
            for (var P = r({
                    transferPrice: (f - 1) / 100,
                    originalPrice: i,
                    reasonableFee: n
                }); f > 0 && Math.round(100 * Number(P.netSalary)) >= m;) b = P, P = r({
                transferPrice: (--f - 1) / 100,
                originalPrice: i,
                reasonableFee: n
            });
            var x = e.utils.formatNumber(t);
            return {
                transferPrice: e.utils.formatNumber(f / 100),
                originalPrice: i,
                reasonableFee: n,
                taxableIncome: b.taxableIncome,
                taxRate: .2,
                quickDeduction: 0,
                tax: b.tax,
                netSalary: x,
                formula: b.formula,
                calculationType: "preTax"
            }
        },
        getFormula: function() {
            return {
                taxBox: {
                    transferPrice: "转让价格",
                    originalPrice: "财产原值",
                    reasonableFee: "合理费用",
                    tax: "应纳个税",
                    netSalary: "税后收入"
                },
                formulaTitle: "计算详情",
                formulaResult: "财产转让所得个税",
                formula: [{
                    unit: "",
                    content: "应纳税所得额"
                }, {
                    unit: " × ",
                    content: "税率"
                }],
                tipsTitle: "计算说明",
                tipsList: ["1. 应纳税所得额=转让收入-财产原值-合理费用", "2. 应纳税额=应纳税所得额×20%"]
            }
        },
        getTaxBrackets: function() {
            return []
        }
    };
    exports.cczr = a;