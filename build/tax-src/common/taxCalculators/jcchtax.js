var a = require("../utils.js"),
        t = {
            annual: [{
                threshold: 36e3,
                rate: .03,
                quick: 0
            }, {
                threshold: 144e3,
                rate: .1,
                quick: 2520
            }, {
                threshold: 3e5,
                rate: .2,
                quick: 16920
            }, {
                threshold: 42e4,
                rate: .25,
                quick: 31920
            }, {
                threshold: 66e4,
                rate: .3,
                quick: 52920
            }, {
                threshold: 96e4,
                rate: .35,
                quick: 85920
            }, {
                threshold: 1 / 0,
                rate: .45,
                quick: 181920
            }]
        };

    function e() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = Number(e.preTaxIncome) || 0,
            u = Number(e.avgSalary) || 0,
            n = 3 * u,
            o = Math.max(0, r - n),
            l = function(a) {
                if (a <= 0) return {
                    rate: 0,
                    quick: 0
                };
                var e = t.annual.find((function(t) {
                    return a <= t.threshold
                }));
                return {
                    rate: e.rate,
                    quick: e.quick
                }
            }(o),
            c = l.rate,
            i = l.quick,
            m = o > 0 ? o * c - i : 0,
            h = r - m;
        r = a.utils.formatNumber(r), u = a.utils.formatNumber(u);
        var s = a.utils.formatNumber(n),
            x = a.utils.formatNumber(o);
        return {
            preTaxIncome: r,
            avgSalary: u,
            taxFreeAmount: s,
            taxableIncome: x,
            taxRate: c,
            quickDeduction: i,
            tax: m = a.utils.formatNumber(m),
            netSalary: h = a.utils.formatNumber(h),
            formula: ["".concat(r, "-").concat(u, " * 3"), (100 * c).toFixed(0) + "%", i],
            calculationType: "afterTax"
        }
    }
    var r = {
        calculateAfterTax: e,
        calculatePreTax: function() {
            for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = Number(t.netSalary) || 0, u = Number(t.avgSalary) || 0, n = r, o = 2 * r, l = (n + o) / 2, c = 0; c < 100;) {
                var i = e({
                    preTaxIncome: l,
                    avgSalary: u
                }).netSalary - r;
                if (Math.abs(i) < 1e-4) break;
                i > 0 ? o = l : n = l, l = (n + o) / 2, c++
            }
            for (var m = Math.round(100 * Number(a.utils.formatNumber(r))), h = Math.round(100 * l), s = e({
                    preTaxIncome: h / 100,
                    avgSalary: u
                }); Math.round(100 * Number(s.netSalary)) < m;) s = e({
                preTaxIncome: ++h / 100,
                avgSalary: u
            });
            for (var x = e({
                    preTaxIncome: (h - 1) / 100,
                    avgSalary: u
                }); h > 0 && Math.round(100 * Number(x.netSalary)) >= m;) s = x, x = e({
                preTaxIncome: (--h - 1) / 100,
                avgSalary: u
            });
            var f = a.utils.formatNumber(r);
            return {
                preTaxIncome: a.utils.formatNumber(h / 100),
                avgSalary: s.avgSalary,
                taxFreeAmount: s.taxFreeAmount,
                taxableIncome: s.taxableIncome,
                taxRate: s.taxRate,
                quickDeduction: s.quickDeduction,
                tax: s.tax,
                netSalary: f,
                formula: s.formula,
                calculationType: "preTax"
            }
        },
        getFormula: function() {
            return {
                taxBox: {
                    preTaxIncome: "税前收入",
                    avgSalary: "社平工资",
                    tax: "应纳个税",
                    netSalary: "税后收入"
                },
                formulaTitle: "计算详情",
                formulaResult: "解除合同离职补偿所得个税",
                formula: [{
                    unit: "",
                    content: "(补偿收入-当地上年社平工资×3)"
                }, {
                    unit: " × ",
                    content: "税率"
                }, {
                    unit: " - ",
                    content: "速算扣除数"
                }],
                tipsTitle: "计算说明",
                tipsList: ["1. 应纳税所得额=一次性经济补偿收入-当地上年社平工资×3", "2. 应纳税额=应纳税所得额×适用税率-速算扣除数"],
                taxBracketsTitle: "综合所得个人所得税率表",
                caseTitle: "案例说明",
                caseContent: ["A于2024年12月提前跟老王解除劳动关系，假设2023年当地职工的年平均工资为55000元。", "情形1：老王取得的一次性补偿收入为10万元", "上年职工平均工资3倍数额：55000×3=165000元，老王取得10万元一次性补偿金收入，在免征范围内，不需要缴纳个人所得税。", "情形2：老王取得的一次性补偿金收入为22万元，当月还按规定缴纳了五险一金2000元，那么老王需要缴纳个人所得税：", "上年职工平均工资3倍数额：55000×3=165000元，老王应纳税所得额=220000－165000－2000=53000元，通过查找综合所得税率表，适用税率10%，速算扣除数2520元", "老王的个人所得税应纳税额=53000×10%－2520=2780元。"]
            }
        },
        getTaxBrackets: function() {
            return t.annual.map((function(a, e) {
                var r;
                return r = 0 === e ? "不超过".concat(a.threshold, "元的部分") : e === t.annual.length - 1 ? "超过".concat(t.annual[e - 1].threshold, "元的部分") : "超过".concat(t.annual[e - 1].threshold, "元至").concat(a.threshold, "元的部分"), {
                    level: e + 1,
                    threshold: a.threshold,
                    range: r,
                    rate: a.rate,
                    quick: a.quick
                }
            }))
        }
    };
    exports.jcchtax = r;