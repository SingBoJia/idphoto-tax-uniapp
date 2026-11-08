var t = [{
        threshold: 3e4,
        rate: .05,
        quick: 0
    }, {
        threshold: 9e4,
        rate: .1,
        quick: 1500
    }, {
        threshold: 3e5,
        rate: .2,
        quick: 10500
    }, {
        threshold: 5e5,
        rate: .3,
        quick: 40500
    }, {
        threshold: 1 / 0,
        rate: .35,
        quick: 65500
    }];

    function e() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            a = Number(e.preTaxIncome) || 0,
            r = Number(e.costs) || 0,
            o = a - r,
            c = function(e) {
                if (e <= 0) return {
                    rate: 0,
                    quick: 0
                };
                var a = t.find((function(t) {
                    return e <= t.threshold
                }));
                return {
                    rate: a.rate,
                    quick: a.quick
                }
            }(o),
            n = c.rate,
            u = c.quick,
            i = o > 0 ? o * n - u : 0,
            l = a - i;
        return {
            preTaxIncome: a = Number(a.toFixed(2)),
            costs: r = Number(r.toFixed(2)),
            taxableIncome: o = Number(Math.max(0, o).toFixed(2)),
            taxRate: n,
            quickDeduction: u,
            tax: i = Number(i.toFixed(2)),
            netSalary: l = Number(l.toFixed(2)),
            formula: ["".concat(a, " - ").concat(r), (100 * n).toFixed(0) + "%", u],
            calculationType: "afterTax"
        }
    }
    var a = {
        calculateAfterTax: e,
        calculatePreTax: function() {
            for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Number(t.netSalary) || 0, r = Number(t.costs) || 0, o = a, c = 2 * a, n = (o + c) / 2, u = 0; u < 100;) {
                var i = e({
                    preTaxIncome: n,
                    costs: r
                }).netSalary - a;
                if (Math.abs(i) < 1e-4) break;
                i > 0 ? c = n : o = n, n = (o + c) / 2, u++
            }
            for (var l = Math.round(100 * Number(a.toFixed(2))), s = Math.round(100 * n), x = e({
                    preTaxIncome: s / 100,
                    costs: r
                }); Math.round(100 * x.netSalary) < l;) x = e({
                preTaxIncome: ++s / 100,
                costs: r
            });
            for (var h = e({
                    preTaxIncome: (s - 1) / 100,
                    costs: r
                }); s > 0 && Math.round(100 * h.netSalary) >= l;) x = h, h = e({
                preTaxIncome: (--s - 1) / 100,
                costs: r
            });
            var m = Number(a.toFixed(2));
            return {
                preTaxIncome: s / 100,
                costs: Number(x.costs.toFixed(2)),
                taxableIncome: x.taxableIncome,
                taxRate: x.taxRate,
                quickDeduction: x.quickDeduction,
                tax: x.tax,
                netSalary: m,
                formula: x.formula,
                calculationType: "preTax"
            }
        },
        getFormula: function() {
            return {
                taxBox: {
                    preTaxIncome: "税前收入",
                    costs: "成本费用",
                    tax: "应纳个税",
                    netSalary: "税后收入"
                },
                formulaTitle: "计算详情",
                formulaResult: "经营所得个税",
                formula: [{
                    unit: "",
                    content: "(税前 - 成本、费用及损失)"
                }, {
                    unit: " × ",
                    content: "税率"
                }, {
                    unit: " - ",
                    content: "速算扣除数"
                }],
                tipsTitle: "计算说明",
                tipsList: ["1. 应纳税所得额=经营收入-成本、费用及损失", "2. 应纳税额=应纳税所得额×适用税率-速算扣除数"],
                taxBracketsTitle: "经营所得个人所得税率表"
            }
        },
        getTaxBrackets: function() {
            return t.map((function(e, a) {
                var r;
                return r = 0 === a ? "不超过".concat(e.threshold, "元的部分") : a === t.length - 1 ? "超过".concat(t[a - 1].threshold, "元的部分") : "超过".concat(t[a - 1].threshold, "元至").concat(e.threshold, "元的部分"), {
                    level: a + 1,
                    threshold: e.threshold,
                    range: r,
                    rate: e.rate,
                    quick: e.quick
                }
            }))
        }
    };
    exports.gtgsh = a;