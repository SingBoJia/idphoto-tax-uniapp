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

    function t() {
        var e, t, a, r, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            o = Number(n.preTaxIncome) || 0,
            l = n.taxpayerType || "resident",
            i = 0;
        "resident" === l ? (e = o <= 4e3 ? o - 800 : .8 * o, t = .2, i = .3, a = 0) : (e = .8 * o * .7) <= 3e3 ? (t = .03, a = 0) : e <= 12e3 ? (t = .1, a = 210) : e <= 25e3 ? (t = .2, a = 1410) : e <= 35e3 ? (t = .25, a = 2660) : e <= 55e3 ? (t = .3, a = 4410) : e <= 8e4 ? (t = .35, a = 7160) : (t = .45, a = 15160);
        var u = o - (r = "resident" === l ? e > 0 ? e * t * (1 - i) : 0 : e > 0 ? e * t - a : 0);
        return {
            preTaxIncome: o = Number(o.toFixed(2)),
            taxableIncome: e = Number(Math.max(0, e).toFixed(2)),
            taxRate: t,
            taxReductionRate: i,
            quickDeduction: a || 0,
            tax: r = Number(r.toFixed(2)),
            netSalary: u = Number(u.toFixed(2)),
            formula: ["resident" === l ? "".concat(o, o <= 4e3 ? " - 800" : " × (1-20%)") : "non-resident" === l ? "".concat(o, " × (1-20%) × 70%") : o, (100 * t).toFixed(0) + "%", "resident" === l ? "(1-30%)" : a],
            taxpayerType: l
        }
    }
    var a = {
        calculateAfterTax: t,
        calculatePreTax: function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Number(e.netSalary) || 0, r = e.taxpayerType || "resident", n = a, o = 2 * a, l = (n + o) / 2, i = 0; i < 100;) {
                var u = t({
                    preTaxIncome: l,
                    taxpayerType: r
                }).netSalary - a;
                if (Math.abs(u) < 1e-4) break;
                u > 0 ? o = l : n = l, l = (n + o) / 2, i++
            }
            for (var c = Math.round(100 * Number(a.toFixed(2))), x = Math.round(100 * l), d = t({
                    preTaxIncome: x / 100,
                    taxpayerType: r
                }); Math.round(100 * d.netSalary) < c;) d = t({
                preTaxIncome: ++x / 100,
                taxpayerType: r
            });
            for (var m = t({
                    preTaxIncome: (x - 1) / 100,
                    taxpayerType: r
                }); x > 0 && Math.round(100 * m.netSalary) >= c;) d = m, m = t({
                preTaxIncome: (--x - 1) / 100,
                taxpayerType: r
            });
            var p = Number(a.toFixed(2));
            return {
                preTaxIncome: x / 100,
                taxableIncome: Number(d.taxableIncome.toFixed(2)),
                taxRate: d.taxRate,
                taxReductionRate: d.taxReductionRate,
                quickDeduction: d.quickDeduction || 0,
                tax: Number(d.tax.toFixed(2)),
                netSalary: p,
                formula: d.formula,
                taxpayerType: r
            }
        },
        getFormula: function() {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                t = {
                    taxBox: {
                        preTaxIncome: "税前收入",
                        tax: "应纳个税",
                        netSalary: "税后收入"
                    },
                    formulaTitle: "计算详情",
                    formulaResult: "稿酬个税",
                    formula: [{
                        unit: "",
                        content: "应纳税所得额"
                    }, {
                        unit: " × ",
                        content: "税率"
                    }, {
                        unit: " × ",
                        content: "减征30%"
                    }],
                    tipsTitle: "计算说明",
                    tipsList: ["一、纳税人类型：", "1. 居民个人：在中国境内有住所，或者无住所而一个纳税年度内在中国境内居住累计满183天的个人。", "2. 非居民个人：在中国境内无住所又不居住，或者无住所而一个纳税年度内在中国境内居住累计不满183天的个人。", "二、计算方法：", "（一）居民个人：", "1. 应纳税所得额 = 稿酬所得(不超过4000元) - 800元", "2. 应纳税所得额 = 稿酬所得(超过4000元)×(1 - 20%)", "3. 应纳税额 = 应纳税所得额 × 20% × (1 - 30%)", "（二）非居民个人：", "1. 稿酬所得以收入额为应纳税所得额（统一减除20%的费用，再减按70%计算）。", "2. 应纳税额=应纳税所得额×适用税率-速算扣除数"],
                    taxBracketsTitle: "稿酬个人所得税率表"
                };
            return "resident" === e.taxpayerType ? (e.preTaxIncome <= 4e3 ? t.formula[0].content = "(税前(不超过4000元) - 800)" : t.formula[0].content = "(税前(超过4000元)×(1-20%))", t.taxBracketsTitle = "") : "non-resident" === e.taxpayerType && (t.formula[0].content = "税前×(1-20%)×70%", t.taxBracketsTitle = "稿酬非居民所得税率表", t.formula.pop()), t
        },
        getTaxBrackets: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "resident";
            return "resident" === t ? [] : e.monthly
        }
    };
    exports.gcsd = a;