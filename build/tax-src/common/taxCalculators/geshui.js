var a = require("../utils.js"),
        e = {
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

    function t(a) {
        if (a <= 0) return {
            rate: 0,
            quick: 0
        };
        var t = e.annual.find((function(e) {
            return a <= e.threshold
        }));
        return {
            rate: t.rate,
            quick: t.quick
        }
    }

    function u() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            u = Number(e.preTaxSalary) || 0,
            r = Number(e.insurance) || 0,
            n = Number(e.specialDeduction) || 0,
            l = Number(e.month) || 1,
            i = e.calculateType || "monthly",
            c = u * l,
            o = r * l,
            m = n * l,
            s = 5e3 * l,
            h = function(e, u, r, n) {
                for (var l = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 5e3, i = 0, c = 0, o = 0, m = 0, s = 0, h = 0, b = [], f = 0, x = 0, d = 1; d <= n; d++) {
                    var T = (i += e) - (c += l) - (o += u) - (m += r) - (s += 0),
                        p = t(T),
                        y = p.rate,
                        N = p.quick,
                        v = 0;
                    if (T > 0) {
                        var S = T * y - N;
                        v = S - h, h = S
                    }
                    y > f && (f = y, x = N), b.push({
                        month: d,
                        preTaxSalary: a.utils.formatNumber(e),
                        taxFree: l,
                        insurance: a.utils.formatNumber(u),
                        housingFund: 0,
                        specialDeduction: a.utils.formatNumber(r),
                        otherDeduction: 0,
                        cumulativeIncome: a.utils.formatNumber(i),
                        cumulativeTaxFree: a.utils.formatNumber(c),
                        cumulativeInsurance: a.utils.formatNumber(o),
                        cumulativeHousingFund: 0,
                        cumulativeSpecialDeduction: a.utils.formatNumber(m),
                        cumulativeOtherDeduction: a.utils.formatNumber(s),
                        taxableIncome: a.utils.formatNumber(Math.max(0, T)),
                        cumulativeTax: a.utils.formatNumber(h),
                        taxRate: y,
                        quickDeduction: N,
                        currentMonthTax: a.utils.formatNumber(v),
                        netSalary: a.utils.formatNumber(e - u - v)
                    })
                }
                return {
                    monthlyDetails: b,
                    cumulativeIncome: a.utils.formatNumber(i),
                    cumulativeTaxFree: a.utils.formatNumber(c),
                    cumulativeInsurance: a.utils.formatNumber(o),
                    cumulativeSpecialDeduction: a.utils.formatNumber(m),
                    cumulativeOtherDeduction: a.utils.formatNumber(s),
                    cumulativeTax: a.utils.formatNumber(h),
                    highestTaxRate: f,
                    totalQuickDeduction: x
                }
            }(u, r, n, l, 5e3),
            b = h.monthlyDetails,
            f = h.cumulativeIncome,
            x = h.cumulativeTaxFree,
            d = h.cumulativeInsurance,
            T = h.cumulativeSpecialDeduction,
            p = h.cumulativeOtherDeduction,
            y = h.cumulativeTax,
            N = h.highestTaxRate,
            v = h.totalQuickDeduction,
            S = b[b.length - 1],
            D = ["".concat(f, "-").concat(x, "-").concat(d, "-").concat(T, "-").concat(p), (100 * S.taxRate).toFixed(0) + "%", S.quickDeduction, l > 1 ? b[b.length - ("annual" === i ? 1 : 2)].cumulativeTax : 0];
        if ("annual" === i) {
            var k = c - o - y,
                M = c - o - m - s;
            return {
                preTaxSalary: a.utils.formatNumber(u),
                insurance: a.utils.formatNumber(r),
                specialDeduction: a.utils.formatNumber(n),
                taxableIncome: a.utils.formatNumber(Math.max(0, M)),
                taxRate: N,
                quickDeduction: v,
                tax: a.utils.formatNumber(y),
                netSalary: a.utils.formatNumber(k / l),
                annualPreTaxSalary: a.utils.formatNumber(c),
                annualInsurance: a.utils.formatNumber(o),
                annualSpecialDeduction: a.utils.formatNumber(m),
                annualTaxFree: a.utils.formatNumber(s),
                annualTax: a.utils.formatNumber(y),
                annualNetSalary: a.utils.formatNumber(k),
                month: l,
                calculateType: i,
                monthlyDetails: b,
                formula: D
            }
        }
        return {
            preTaxSalary: S.preTaxSalary,
            insurance: S.insurance,
            specialDeduction: S.specialDeduction,
            taxableIncome: a.utils.formatNumber(S.taxableIncome),
            taxRate: S.taxRate,
            quickDeduction: S.quickDeduction,
            tax: a.utils.formatNumber(S.currentMonthTax),
            netSalary: a.utils.formatNumber(S.netSalary),
            month: l,
            calculateType: i,
            formula: D
        }
    }
    var r = {
        calculateAfterTax: u,
        calculatePreTax: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = Number(e.netSalary) || 0,
                r = Number(e.insurance) || 0,
                n = Number(e.specialDeduction) || 0,
                l = Number(e.month) || 1,
                i = e.calculateType || "monthly";
            if ("annual" === i) {
                for (var c = t, o = 2 * t, m = (c + o) / 2, s = .01, h = 100, b = 0; b < h;) {
                    var f = u({
                        preTaxSalary: m,
                        insurance: r,
                        specialDeduction: n,
                        month: l,
                        calculateType: i
                    }).netSalary - t;
                    if (Math.abs(f) < s) break;
                    f > 0 ? o = m : c = m, m = (c + o) / 2, b++
                }
                for (var x = Math.round(100 * Number(a.utils.formatNumber(t))), d = Math.round(100 * m), T = u({
                        preTaxSalary: d / 100,
                        insurance: r,
                        specialDeduction: n,
                        month: l,
                        calculateType: i
                    }); Math.round(100 * Number(T.netSalary)) < x;) T = u({
                    preTaxSalary: ++d / 100,
                    insurance: r,
                    specialDeduction: n,
                    month: l,
                    calculateType: i
                });
                for (var p = u({
                        preTaxSalary: (d - 1) / 100,
                        insurance: r,
                        specialDeduction: n,
                        month: l,
                        calculateType: i
                    }); d > 0 && Math.round(100 * Number(p.netSalary)) >= x;) T = p, p = u({
                    preTaxSalary: (--d - 1) / 100,
                    insurance: r,
                    specialDeduction: n,
                    month: l,
                    calculateType: i
                });
                return d > 0 && Math.abs(Math.round(100 * Number(p.netSalary)) - x) < Math.abs(Math.round(100 * Number(T.netSalary)) - x) && (d--, T = p), T
            }
            for (var y = t, N = 2 * t, v = (y + N) / 2, S = .01, D = 100, k = 0; k < D;) {
                var M = u({
                    preTaxSalary: v,
                    insurance: r,
                    specialDeduction: n,
                    month: l,
                    calculateType: i
                }).netSalary - t;
                if (Math.abs(M) < S) break;
                M > 0 ? N = v : y = v, v = (y + N) / 2, k++
            }
            for (var g = Math.round(100 * Number(a.utils.formatNumber(t))), q = Math.round(100 * v), I = u({
                    preTaxSalary: q / 100,
                    insurance: r,
                    specialDeduction: n,
                    month: l,
                    calculateType: i
                }); Math.round(100 * Number(I.netSalary)) < g;) I = u({
                preTaxSalary: ++q / 100,
                insurance: r,
                specialDeduction: n,
                month: l,
                calculateType: i
            });
            for (var F = u({
                    preTaxSalary: (q - 1) / 100,
                    insurance: r,
                    specialDeduction: n,
                    month: l,
                    calculateType: i
                }); q > 0 && Math.round(100 * Number(F.netSalary)) >= g;) I = F, F = u({
                preTaxSalary: (--q - 1) / 100,
                insurance: r,
                specialDeduction: n,
                month: l,
                calculateType: i
            });
            return q > 0 && Math.abs(Math.round(100 * Number(F.netSalary)) - g) < Math.abs(Math.round(100 * Number(I.netSalary)) - g) && (q--, I = F), I
        },
        getFormula: function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "annual";
            return {
                annual: {
                    taxTitle: {
                        key: "annualNetSalary",
                        value: "年度税后收入(元)"
                    },
                    taxBox: {
                        annualPreTaxSalary: "年度收入",
                        annualInsurance: "五险一金",
                        annualSpecialDeduction: "专项附加",
                        annualTax: "年度个税"
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
                    tipsList: ["工资薪金所得，是指个人因任职或受雇而取得的工资、薪金、奖金、年终加薪、劳动分红、津贴、补贴以及与任职或受雇有关的其他所得。", "累计预扣预缴应纳税所得额=累计收入-累计免税收入-累计减除费用-累计专项扣除-累计专项附加扣除-累计依法确定的其他扣除", "其中：累计减除费用，按照个税起征点5000元/月乘以纳税人当年截至本月在本单位的任职受雇月份数计算。"],
                    taxBracketsTitle: "年度个人所得税率表",
                    caseTitle: "案例说明",
                    caseContent: ["公司员工李四：2026年1-6月每月固定工资20000元。有一名3岁以上在读子女，子女教育每月扣除1000元；享受首套住房贷款利息扣除，每月1000元；为非独生子女，约定赡养老人每月扣除1000元。五险一金每月个人缴纳4000元，购买符合条件的个人养老金每月扣除1000元。", "2026年1月，应纳税所得额=20000-5000（累计减除费用）-4000（累计专项扣除）-3000（累计专项附加扣除）-1000（累计依法确定的其他扣除）=7000元,应纳税额=7000*3%=210元", "2026年2月，应纳税所得额=40000（累计收入）-10000（累计减除费用）-8000（累计专项扣除）-6000（累计专项附加扣除）-2000（累计依法确定的其他扣除）=14000元,应纳税额=14000*3%-210（已预缴预扣税额）=210元", "2026年3月，应纳税所得额=60000（累计收入）-15000（累计减除费用）-12000（累计专项扣除）-9000（累计专项附加扣除）-3000（累计依法确定的其他扣除）=21000元,应纳税额=21000*3%-420（已预缴预扣税额）=210元", "2026年4月，应纳税所得额=80000（累计收入）-20000（累计减除费用）-16000（累计专项扣除）-12000（累计专项附加扣除）-4000（累计依法确定的其他扣除）=28000元,应纳税额=28000*3%-630（已预缴预扣税额）=210元", "2026年5月，应纳税所得额=100000（累计收入）-25000（累计减除费用）-20000（累计专项扣除）-15000（累计专项附加扣除）-5000（累计依法确定的其他扣除）=35000元,应纳税额=35000*3%-840（已预缴预扣税额）=210元", "2026年6月，应纳税所得额=120000（累计收入）-30000（累计减除费用）-24000（累计专项扣除）-18000（累计专项附加扣除）-6000（累计依法确定的其他扣除）=42000元,应纳税额=42000*10%-2520-1050（已预缴预扣税额）=630元"]
                },
                monthly: {
                    taxTitle: {
                        key: "netSalary",
                        value: "本月税后收入(元)"
                    },
                    taxBox: {
                        preTaxSalary: "本月税前",
                        insurance: "五险一金",
                        specialDeduction: "专项附加",
                        tax: "个税缴纳"
                    },
                    formulaTitle: "计算详情",
                    formulaResult: "当月个税",
                    formula: [{
                        unit: "",
                        content: "（累计收入 - 累计五险一金 - 累计专项附加扣除 - 累计减除费用）"
                    }, {
                        unit: " x ",
                        content: "预扣税率"
                    }, {
                        unit: " - ",
                        content: "速算扣除数"
                    }, {
                        unit: " - ",
                        content: "累计已缴纳税额"
                    }],
                    tipsTitle: "计算说明",
                    tipsList: ["工资薪金所得，是指个人因任职或受雇而取得的工资、薪金、奖金、年终加薪、劳动分红、津贴、补贴以及与任职或受雇有关的其他所得。", "累计预扣预缴应纳税所得额=累计收入-累计免税收入-累计减除费用-累计专项扣除-累计专项附加扣除-累计依法确定的其他扣除", "其中：累计减除费用，按照个税起征点5000元/月乘以纳税人当年截至本月在本单位的任职受雇月份数计算。"],
                    taxBracketsTitle: "年度个人所得税率表",
                    caseTitle: "案例说明",
                    caseContent: ["公司员工李四：2026年1-6月每月固定工资20000元。有一名3岁以上在读子女，子女教育每月扣除1000元；享受首套住房贷款利息扣除，每月1000元；为非独生子女，约定赡养老人每月扣除1000元。五险一金每月个人缴纳4000元，购买符合条件的个人养老金每月扣除1000元。", "2026年1月，应纳税所得额=20000-5000（累计减除费用）-4000（累计专项扣除）-3000（累计专项附加扣除）-1000（累计依法确定的其他扣除）=7000元,应纳税额=7000*3%=210元", "2026年2月，应纳税所得额=40000（累计收入）-10000（累计减除费用）-8000（累计专项扣除）-6000（累计专项附加扣除）-2000（累计依法确定的其他扣除）=14000元,应纳税额=14000*3%-210（已预缴预扣税额）=210元", "2026年3月，应纳税所得额=60000（累计收入）-15000（累计减除费用）-12000（累计专项扣除）-9000（累计专项附加扣除）-3000（累计依法确定的其他扣除）=21000元,应纳税额=21000*3%-420（已预缴预扣税额）=210元", "2026年4月，应纳税所得额=80000（累计收入）-20000（累计减除费用）-16000（累计专项扣除）-12000（累计专项附加扣除）-4000（累计依法确定的其他扣除）=28000元,应纳税额=28000*3%-630（已预缴预扣税额）=210元", "2026年5月，应纳税所得额=100000（累计收入）-25000（累计减除费用）-20000（累计专项扣除）-15000（累计专项附加扣除）-5000（累计依法确定的其他扣除）=35000元,应纳税额=35000*3%-840（已预缴预扣税额）=210元", "2026年6月，应纳税所得额=120000（累计收入）-30000（累计减除费用）-24000（累计专项扣除）-18000（累计专项附加扣除）-6000（累计依法确定的其他扣除）=42000元,应纳税额=42000*10%-2520-1050（已预缴预扣税额）=630元"]
                }
            }[a]
        },
        getTaxBrackets: function() {
            return e.annual
        }
    };
    exports.geshui = r;