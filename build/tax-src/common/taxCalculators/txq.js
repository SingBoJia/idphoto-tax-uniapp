var e = {
        monthly: [{
            level: 1,
            threshold: 3e3,
            range: "不超过3000元的部分",
            rate: .03,
            quick: 0
        }, {
            level: 2,
            threshold: 12e3,
            range: "超过3000元至12000元的部分",
            rate: .1,
            quick: 210
        }, {
            level: 3,
            threshold: 25e3,
            range: "超过12000元至25000元的部分",
            rate: .2,
            quick: 1410
        }, {
            level: 4,
            threshold: 35e3,
            range: "超过25000元至35000元的部分",
            rate: .25,
            quick: 2660
        }, {
            level: 5,
            threshold: 55e3,
            range: "超过35000元至55000元的部分",
            rate: .3,
            quick: 4410
        }, {
            level: 6,
            threshold: 8e4,
            range: "超过55000元至80000元的部分",
            rate: .35,
            quick: 7160
        }, {
            level: 7,
            threshold: 1 / 0,
            range: "超过80000元的部分",
            rate: .45,
            quick: 15160
        }]
    };

    function a() {
        var e, a, t, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = Number(r.preTaxIncome) || 0,
            o = r.taxpayerType || "resident";
        "resident" === o ? (e = n <= 4e3 ? Math.max(0, n - 800) : .8 * n, a = .2, t = 0) : (e = .8 * n) <= 3e3 ? (a = .03, t = 0) : e <= 12e3 ? (a = .1, t = 210) : e <= 25e3 ? (a = .2, t = 1410) : e <= 35e3 ? (a = .25, t = 2660) : e <= 55e3 ? (a = .3, t = 4410) : e <= 8e4 ? (a = .35, t = 7160) : (a = .45, t = 15160);
        var x = e > 0 ? e * a - t : 0,
            l = n - x;
        return {
            preTaxIncome: n = Number(n.toFixed(2)),
            taxableIncome: e = Number(Math.max(0, e).toFixed(2)),
            taxRate: a,
            quickDeduction: t || 0,
            tax: x = Number(x.toFixed(2)),
            netSalary: l = Number(l.toFixed(2)),
            formula: ["resident" === o ? "".concat(n, n <= 4e3 ? " - 800" : " × (1-20%)") : "non-resident" === o ? "".concat(n, " × (1-20%)") : n, (100 * a).toFixed(0) + "%", t],
            calculationType: "afterTax",
            taxpayerType: o
        }
    }
    var t = {
        calculateAfterTax: a,
        calculatePreTax: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = Number(e.netSalary) || 0,
                r = e.taxpayerType || "resident";
            if ("resident" === r) {
                var n;
                n = t <= 800 ? t : t <= 3360 ? (t - 160) / .8 : t / .84;
                for (var o = Math.round(100 * Number(t.toFixed(2))), x = Math.round(100 * n), l = a({
                        preTaxIncome: x / 100,
                        taxpayerType: r
                    }); Math.round(100 * l.netSalary) < o;) l = a({
                    preTaxIncome: ++x / 100,
                    taxpayerType: r
                });
                for (var u = a({
                        preTaxIncome: (x - 1) / 100,
                        taxpayerType: r
                    }); x > 0 && Math.round(100 * u.netSalary) >= o;) l = u, u = a({
                    preTaxIncome: (--x - 1) / 100,
                    taxpayerType: r
                });
                var c = Number(t.toFixed(2));
                return {
                    preTaxIncome: x / 100,
                    taxableIncome: Number(l.taxableIncome.toFixed(2)),
                    taxRate: l.taxRate,
                    quickDeduction: l.quickDeduction,
                    tax: Number(l.tax.toFixed(2)),
                    netSalary: c,
                    formula: l.formula,
                    calculationType: "preTax",
                    taxpayerType: r
                }
            }
            for (var i = t, p = 2 * t, m = (i + p) / 2, d = 1e-4, y = 100, T = 0; T < y;) {
                var h = a({
                    preTaxIncome: m,
                    taxpayerType: r
                }).netSalary - t;
                if (Math.abs(h) < d) break;
                h > 0 ? p = m : i = m, m = (i + p) / 2, T++
            }
            for (var s = Math.round(100 * Number(t.toFixed(2))), v = Math.round(100 * m), f = a({
                    preTaxIncome: v / 100,
                    taxpayerType: r
                }); Math.round(100 * f.netSalary) < s;) f = a({
                preTaxIncome: ++v / 100,
                taxpayerType: r
            });
            for (var b = a({
                    preTaxIncome: (v - 1) / 100,
                    taxpayerType: r
                }); v > 0 && Math.round(100 * b.netSalary) >= s;) f = b, b = a({
                preTaxIncome: (--v - 1) / 100,
                taxpayerType: r
            });
            var I = Number(t.toFixed(2));
            return {
                preTaxIncome: v / 100,
                taxableIncome: Number(f.taxableIncome.toFixed(2)),
                taxRate: f.taxRate,
                quickDeduction: f.quickDeduction,
                tax: Number(f.tax.toFixed(2)),
                netSalary: I,
                formula: f.formula,
                calculationType: "preTax",
                taxpayerType: r
            }
        },
        getFormula: function() {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                a = {
                    taxBox: {
                        preTaxIncome: "税前收入",
                        tax: "应纳个税",
                        netSalary: "税后收入"
                    },
                    formulaTitle: "计算详情",
                    formulaResult: "特许权使用费个税",
                    formula: [{
                        unit: "",
                        content: "应纳税所得额"
                    }, {
                        unit: " × ",
                        content: "税率"
                    }, {
                        unit: " - ",
                        content: "速算扣除数"
                    }],
                    tipsTitle: "计算说明",
                    tipsList: ["一、纳税人类型：", "1. 居民个人：在中国境内有住所，或者无住所而一个纳税年度内在中国境内居住累计满183天的个人。", "2. 非居民个人：在中国境内无住所又不居住，或者无住所而一个纳税年度内在中国境内居住累计不满183天的个人。", "二、计算方法：", "（一）居民个人：", "1. 应纳税所得额=劳务报酬(不超过4000元) - 800元", "2. 应纳税所得额=劳务报酬(超过4000元)×(1-20%)", "3. 应纳税额=应纳税所得额×适用税率-速算扣除数", "（二）非居民个人：", "1. 特许权使用费所得以收入额为应纳税所得额（统一减除20%的费用）。", "2. 应纳税额=应纳税所得额×适用税率-速算扣除数"],
                    taxBracketsTitle: "特许权使用费个人所得税率表"
                };
            return "resident" === e.taxpayerType ? (e.preTaxIncome <= 4e3 ? a.formula[0].content = "(税前(不超过4000元) - 800)" : a.formula[0].content = "(税前(超过4000元)×(1-20%))", a.taxBracketsTitle = "", a.formula.pop()) : "non-resident" === e.taxpayerType && (a.formula[0].content = "税前×(1-20%)", a.taxBracketsTitle = "特许权使用费非居民所得税率表"), a
        },
        getTaxBrackets: function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "resident";
            return "resident" === a ? [] : e.monthly
        }
    };
    exports.txq = t;