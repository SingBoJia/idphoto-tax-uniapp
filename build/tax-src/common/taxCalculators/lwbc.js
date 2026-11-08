var e = {
            annual: [{
                level: 1,
                threshold: 2e4,
                range: "不超过20000元的部分",
                rate: .2,
                quick: 0
            }, {
                level: 2,
                threshold: 5e4,
                range: "超过20000元至50000元的部分",
                rate: .3,
                quick: 2e3
            }, {
                level: 3,
                threshold: 1 / 0,
                range: "超过50000元的部分",
                rate: .4,
                quick: 7e3
            }]
        },
        a = {
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
        var e, a, t, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = Math.round(100 * (Math.max(0, Number(r.preTaxIncome) || 0) + 1e-8)) / 100,
            o = r.taxpayerType || "resident";
        "resident" === o ? (e = n <= 4e3 ? n - 800 : .8 * n) <= 2e4 ? (a = .2, t = 0) : e <= 5e4 ? (a = .3, t = 2e3) : (a = .4, t = 7e3) : (e = .8 * n) <= 3e3 ? (a = .03, t = 0) : e <= 12e3 ? (a = .1, t = 210) : e <= 25e3 ? (a = .2, t = 1410) : e <= 35e3 ? (a = .25, t = 2660) : e <= 55e3 ? (a = .3, t = 4410) : e <= 8e4 ? (a = .35, t = 7160) : (a = .45, t = 15160);
        var l = e > 0 ? Math.max(0, Math.round(100 * (e * a - t + 1e-8)) / 100) : 0,
            u = n - l;
        return {
            preTaxIncome: n,
            taxableIncome: e = Math.round(100 * (Math.max(0, e) + 1e-8)) / 100,
            taxRate: a,
            quickDeduction: t,
            tax: l,
            netSalary: u = Number(u.toFixed(2)),
            formula: ["resident" === o ? "".concat(n, n <= 4e3 ? " - 800" : "×(1-20%)") : "non-resident" === o ? "".concat(n, "×(1-20%)") : n, (100 * a).toFixed(0) + "%", t],
            taxpayerType: o
        }
    }
    var r = {
        calculateAfterTax: t,
        calculatePreTax: function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Number(e.netSalary || e.netIncome || e.preTaxIncome) || 0, r = Math.round(100 * (Math.max(0, a) + 1e-8)) / 100, n = e.taxpayerType || "resident", o = r, l = 2 * r, u = (o + l) / 2, c = 0; c < 100;) {
                var i = t({
                    preTaxIncome: u,
                    taxpayerType: n
                }).netSalary - r;
                if (Math.abs(i) < 1e-4) break;
                i > 0 ? l = u : o = u, u = (o + l) / 2, c++
            }
            for (var x = Number(r.toFixed(2)), d = Math.round(100 * x), h = Math.round(100 * u), m = t({
                    preTaxIncome: h / 100,
                    taxpayerType: n
                }); Math.round(100 * m.netSalary) < d;) m = t({
                preTaxIncome: ++h / 100,
                taxpayerType: n
            });
            for (var p = t({
                    preTaxIncome: (h - 1) / 100,
                    taxpayerType: n
                }); h > 0 && Math.round(100 * p.netSalary) >= d;) m = p, p = t({
                preTaxIncome: (--h - 1) / 100,
                taxpayerType: n
            });
            return {
                preTaxIncome: h / 100,
                taxableIncome: Number(m.taxableIncome.toFixed(2)),
                taxRate: m.taxRate,
                quickDeduction: m.quickDeduction,
                tax: Number(m.tax.toFixed(2)),
                netSalary: x,
                formula: m.formula,
                taxpayerType: n
            }
        },
        getFormula: function() {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            console.log("getFormula参数", JSON.stringify(e, null, 4));
            var a = {
                taxBox: {
                    preTaxIncome: "税前收入",
                    tax: "应纳个税",
                    netSalary: "税后收入"
                },
                formulaTitle: "计算详情",
                formulaResult: "劳务报酬个税",
                formula: [{
                    unit: "",
                    content: "应纳税所得额"
                }, {
                    unit: "×",
                    content: "税率"
                }, {
                    unit: " - ",
                    content: "速算扣除数"
                }],
                tipsTitle: "计算说明",
                tipsList: ["一、纳税人类型：", "1. 居民个人：在中国境内有住所，或者无住所而一个纳税年度内在中国境内居住累计满183天的个人。", "2. 非居民个人：在中国境内无住所又不居住，或者无住所而一个纳税年度内在中国境内居住累计不满183天的个人。", "二、计算方法：", "（一）居民个人：", "1. 应纳税所得额=劳务报酬(不超过4000元) - 800元", "2. 应纳税所得额=劳务报酬(超过4000元)×(1-20%)", "3. 应纳税额=应纳税所得额×适用税率-速算扣除数", "（二）非居民个人：", "1. 应纳税所得额=劳务报酬×(1-20%)", "2. 应纳税额=应纳税所得额×适用税率-速算扣除数"],
                taxBracketsTitle: "劳务报酬个人所得税率表"
            };
            return "resident" === e.taxpayerType && e.preTaxIncome <= 4e3 ? a.formula[0].content = "(税前(不超过4000元) - 800)" : "resident" === e.taxpayerType && e.preTaxIncome > 4e3 ? a.formula[0].content = "(税前(超过4000元)×(1-20%))" : a.formula[0].content = "税前×(1-20%)", "resident" === e.taxpayerType ? a.taxBracketsTitle = "劳务报酬居民所得税率表" : a.taxBracketsTitle = "劳务报酬非居民所得税率表", a
        },
        getTaxBrackets: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "resident";
            return "resident" === t ? e.annual : a.monthly
        }
    };
    exports.lwbc = r;