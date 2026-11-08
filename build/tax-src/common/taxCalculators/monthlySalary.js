var a = require("../../@babel/runtime/helpers/objectSpread2"),
        e = require("../utils.js"),
        t = {
            annual: [{
                level: 1,
                threshold: 36e3,
                range: "不超过36000元的部分",
                rate: .03,
                quick: 0
            }, {
                level: 2,
                threshold: 144e3,
                range: "超过36000元至144000元的部分",
                rate: .1,
                quick: 2520
            }, {
                level: 3,
                threshold: 3e5,
                range: "超过144000元至300000元的部分",
                rate: .2,
                quick: 16920
            }, {
                level: 4,
                threshold: 42e4,
                range: "超过300000元至420000元的部分",
                rate: .25,
                quick: 31920
            }, {
                level: 5,
                threshold: 66e4,
                range: "超过420000元至660000元的部分",
                rate: .3,
                quick: 52920
            }, {
                level: 6,
                threshold: 96e4,
                range: "超过660000元至960000元的部分",
                rate: .35,
                quick: 85920
            }, {
                level: 7,
                threshold: 1 / 0,
                range: "超过960000元的部分",
                rate: .45,
                quick: 181920
            }]
        };

    function r(a) {
        if (a <= 0) return {
            rate: 0,
            quick: 0
        };
        var e = t.annual.find((function(e) {
            return a <= e.threshold
        }));
        return {
            rate: e.rate,
            quick: e.quick
        }
    }

    function u() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = 12,
            u = a.preTaxSalary || [],
            n = a.insurance || [],
            l = a.specialDeduction || [],
            i = new Array(t).fill(0).map((function(a, e) {
                return Math.round(100 * (Math.max(0, Number(u[e]) || 0) + 1e-8)) / 100
            })),
            o = new Array(t).fill(0).map((function(a, e) {
                return Math.round(100 * (Math.max(0, Number(n[e]) || 0) + 1e-8)) / 100
            })),
            m = new Array(t).fill(0).map((function(a, e) {
                return Math.round(100 * (Math.max(0, Number(l[e]) || 0) + 1e-8)) / 100
            })),
            c = a.calculateType || "monthly",
            h = i.reduce((function(a, e) {
                return a + Math.round(100 * e)
            }), 0) / 100,
            s = o.reduce((function(a, e) {
                return a + Math.round(100 * e)
            }), 0) / 100,
            d = m.reduce((function(a, e) {
                return a + Math.round(100 * e)
            }), 0) / 100,
            f = 6e4,
            x = function(a, t, u, n) {
                for (var l = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 5e3, i = 0, o = 0, m = 0, c = 0, h = 0, s = 0, d = [], f = 1; f <= n; f++) {
                    var x = Number(a[f - 1]) || 0,
                        b = Number(t[f - 1]) || 0,
                        N = Number(u[f - 1]) || 0,
                        v = x > 0 || b > 0 || N > 0;
                    v && (i = Number((i + x).toFixed(2)), o += l, m = Number((m + b).toFixed(2)), c = Number((c + N).toFixed(2)), h += 0);
                    var M = i - o - m - c - h,
                        y = r(M),
                        T = y.rate,
                        p = y.quick,
                        S = 0;
                    if (x > 0) {
                        var D = Math.max(0, Math.round(100 * (M * T - p + 1e-8)) / 100);
                        S = Math.max(0, Math.round(100 * (D - s + 1e-8)) / 100), s = Number((s + S).toFixed(2))
                    }
                    d.push({
                        month: f,
                        isEmployed: v,
                        preTaxSalary: e.utils.formatNumber(x),
                        taxFree: v ? l : 0,
                        insurance: b,
                        housingFund: 0,
                        specialDeduction: N,
                        otherDeduction: 0,
                        cumulativeIncome: e.utils.formatNumber(i),
                        cumulativeTaxFree: e.utils.formatNumber(o),
                        cumulativeInsurance: e.utils.formatNumber(m),
                        cumulativeHousingFund: 0,
                        cumulativeSpecialDeduction: e.utils.formatNumber(c),
                        cumulativeOtherDeduction: e.utils.formatNumber(h),
                        taxableIncome: e.utils.formatNumber(Math.max(0, M)),
                        cumulativeTax: e.utils.formatNumber(s),
                        taxRate: T,
                        quickDeduction: p,
                        currentMonthTax: e.utils.formatNumber(S),
                        netSalary: Math.max(0, Number((x - b - S).toFixed(2)))
                    })
                }
                return {
                    monthlyDetails: d,
                    cumulativeIncome: e.utils.formatNumber(i),
                    cumulativeTaxFree: e.utils.formatNumber(o),
                    cumulativeInsurance: e.utils.formatNumber(m),
                    cumulativeSpecialDeduction: e.utils.formatNumber(c),
                    cumulativeOtherDeduction: e.utils.formatNumber(h),
                    cumulativeTax: e.utils.formatNumber(s)
                }
            }(i, o, m, t, 5e3),
            b = x.monthlyDetails,
            N = x.cumulativeTax,
            v = Math.max(0, Math.round(100 * h) - Math.round(100 * s) - Math.round(100 * d) - 6e6) / 100,
            M = r(v),
            y = M.rate,
            T = M.quick,
            p = Math.max(0, Math.round(100 * (v * y - T + 1e-8)) / 100),
            S = Number(N) || 0,
            D = Math.max(0, Math.round(100 * (S - p + 1e-8)) / 100),
            k = Math.max(0, h - s - S),
            q = Math.max(0, h - s - p),
            F = ["".concat(e.utils.formatNumber(h), "-").concat(e.utils.formatNumber(f), "-").concat(e.utils.formatNumber(s), "-").concat(e.utils.formatNumber(d), "-0"), (100 * y).toFixed(0) + "%", T];
        return {
            taxableIncome: e.utils.formatNumber(Math.max(0, v)),
            taxRate: y,
            quickDeduction: T,
            tax: e.utils.formatNumber(p),
            netSalary: Number((q / t).toFixed(2)),
            annualPreTaxSalary: e.utils.formatNumber(h),
            annualInsurance: e.utils.formatNumber(s),
            annualSpecialDeduction: e.utils.formatNumber(d),
            annualTaxFree: e.utils.formatNumber(f),
            annualTax: e.utils.formatNumber(N),
            annualWithheldTax: e.utils.formatNumber(S),
            annualRefund: e.utils.formatNumber(D),
            annualPaidNetSalary: Number(k.toFixed(2)),
            annualNetSalary: Number(q.toFixed(2)),
            month: t,
            calculateType: c,
            monthlyDetails: b,
            formula: F
        }
    }
    var n = {
        calculateAfterTax: u,
        calculatePreTax: function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.netSalary || [], r = e.insurance || [], n = e.specialDeduction || [], l = new Array(12).fill(0), i = 0; i < 12; i++) {
                var o = Math.round(100 * (Number(t[i]) || 0)),
                    m = Math.round(100 * (Math.max(0, Number(r[i]) || 0) + 1e-8)) / 100;
                if (Math.round(100 * (Math.max(0, Number(n[i]) || 0) + 1e-8)), 0 !== o || 0 !== m) {
                    var c = Math.max(0, o + Math.round(100 * m)),
                        h = Math.max(1, c);
                    l[i] = h / 100;
                    for (var s = u(a(a({}, e), {}, {
                            preTaxSalary: l
                        })), d = 0; Math.round(100 * Number(s.monthlyDetails[i].netSalary)) < o && d < 60;) h *= 2, l[i] = h / 100, s = u(a(a({}, e), {}, {
                        preTaxSalary: l
                    })), d++;
                    if (Math.round(100 * Number(s.monthlyDetails[i].netSalary)) < o) throw new Error("第".concat(i + 1, "月税后工资超出可反推范围"));
                    for (; c < h;) {
                        var f = Math.floor((c + h) / 2);
                        l[i] = f / 100;
                        var x = u(a(a({}, e), {}, {
                            preTaxSalary: l
                        }));
                        Math.round(100 * Number(x.monthlyDetails[i].netSalary)) >= o ? h = f : c = f + 1
                    }
                    l[i] = c / 100
                } else l[i] = 0
            }
            return u(a(a({}, e), {}, {
                preTaxSalary: l
            }))
        },
        getFormula: function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "annual";
            return {
                annual: {
                    taxTitle: {
                        key: "annualNetSalary",
                        value: "汇算后年度税后收入(元)"
                    },
                    taxBox: {
                        annualPreTaxSalary: "年度收入",
                        annualInsurance: "五险一金",
                        annualSpecialDeduction: "专项附加",
                        annualWithheldTax: "累计已预扣",
                        tax: "应纳个税",
                        annualRefund: "预计退税"
                    },
                    formulaTitle: "计算详情",
                    formulaResult: "年度个税",
                    formula: [{
                        unit: "",
                        content: "（累计收入 - 累计五险一金 - 累计专项附加扣除 - 累计减除费用）"
                    }, {
                        unit: " x ",
                        content: "预扣税率"
                    }, {
                        unit: " - ",
                        content: "速算扣除数"
                    }],
                    tipsTitle: "计算说明",
                    tipsList: ["工资薪金所得，是指个人因任职或受雇而取得的工资、薪金、奖金、年终加薪、劳动分红、津贴、补贴以及与任职或受雇有关的其他所得。", "累计预扣预缴应纳税所得额=累计收入-累计免税收入-累计减除费用-累计专项扣除-累计专项附加扣除-累计依法确定的其他扣除", "其中：累计减除费用，按照个税起征点5000元/月乘以纳税人当年截至本月在本单位的任职受雇月份数计算。", "高级版中，收入、五险一金或专项附加任一有金额的月份参与累计；当月预扣结果为负数时按0处理，年度汇算时再计算预计退税。"],
                    taxBracketsTitle: "年度个人所得税率表",
                    caseTitle: "案例说明",
                    caseContent: ["公司员工张三：2026年1月工资15000元；2026年2月工资45000元；2026年3月工资15000元。有一个正在上小学的儿子，子女教育每月扣除1000元；首套住房贷款利息支出每月1000元；父母健在，且是独生子女，赡养老人支出每月可以扣除2000元。五险一金每月缴纳3000元。", "2026年1月，应纳税所得额=15000-5000（累计减除费用）-3000（累计专项扣除）-4000（累计专项附加扣除）=3000元，应纳税额=3000×3%=90元", "2026年2月，应纳税所得额=60000（累计收入）-10000（累计减除费用）-6000（累计专项扣除）-8000（累计专项附加扣除）=36000元，应纳税额=36000×3%-90（已预扣税额）=990元", "2026年3月，应纳税所得额=75000（累计收入）-15000（累计减除费用）-9000（累计专项扣除）-12000（累计专项附加扣除）=39000元，应纳税额=39000×10%-2520-1080（已预扣税额）=300元"]
                }
            }[a]
        },
        getTaxBrackets: function() {
            return t.annual
        }
    };
    exports.monthlySalary = n;