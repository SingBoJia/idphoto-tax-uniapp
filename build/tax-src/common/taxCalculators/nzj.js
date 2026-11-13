var e = {
        annual: [{
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
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = Number(a.preTaxBonus) || 0,
            r = t / 12,
            n = function(a) {
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
            }(r),
            u = n.rate,
            o = n.quick,
            l = t > 0 ? t * u - o : 0,
            i = t - l;
        return {
            preTaxBonus: t = Number(t.toFixed(2)),
            taxableBonus: t,
            taxRate: u,
            quickDeduction: o,
            tax: l = Number(l.toFixed(2)),
            netSalary: i = Number(i.toFixed(2)),
            formula: [t, (100 * u).toFixed(0) + "%", o]
        }
    }
    var t = {
            annual: {
                taxBox: {
                    preTaxBonus: "税前收入",
                    tax: "应纳个税"
                },
                formulaTitle: "计算详情",
                formulaResult: "年终奖个税",
                formula: [{
                    unit: "",
                    content: "税前收入"
                }, {
                    unit: " x ",
                    content: "税率"
                }, {
                    unit: " - ",
                    content: "速算扣除数"
                }],
                tipsTitle: "计算说明",
                tipsList: ["一、政策依据：根据《财政部 税务总局关于延续实施全年一次性奖金个人所得税政策的公告》（2023年第30号），居民个人取得全年一次性奖金，在2027年12月31日前可以选择不并入当年综合所得，单独计算纳税；也可以选择并入当年综合所得计算纳税。", "二、单独计税方法：", "1. 以全年一次性奖金收入除以12个月得到的数额，按照按月换算后的综合所得税率表，确定适用税率和速算扣除数。", "2. 应纳税额 = 全年一次性奖金收入 × 适用税率 - 速算扣除数。", "3. 发放当月工资低于5000元时，不再从奖金中减除差额（该规定已随2019年新个税法实施停止执行）。", "三、注意事项：", "1. 一个纳税年度内，对每一个纳税人，该计税办法只允许采用一次。", "2. 单独计税与并入综合所得的税负可能不同，可在年度汇算时选择更优方式。"],
                taxBracketsTitle: "年终奖个人所得税率表"
            }
        },
        r = {
            calculateAfterTax: a,
            calculatePreTax: function() {
                var args = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Number(args.netSalary || args.netBonus || args.preTaxBonus) || 0, u = t;
                // 年终奖税后收入关于税前不单调（存在“雷区”），二分法可能落在错误区间。
                // 按税率档逐档求解 税前 = (税后 - 速算扣除数) / (1 - 税率)，取落在本档区间内的最小解。
                for (var k = 0, lo = 0, best = null; k < e.annual.length; lo = e.annual[k].threshold, k++) {
                    var br = e.annual[k], cand = (t - br.quick) / (1 - br.rate);
                    if (cand > 12 * lo && cand <= 12 * br.threshold && (best === null || cand < best)) best = cand;
                }
                if (best !== null) u = best;
                for (var i = Math.round(100 * Number(t.toFixed(2))), x = Math.round(100 * u), c = a({
                        preTaxBonus: x / 100
                    }); Math.round(100 * c.netSalary) < i;) c = a({
                    preTaxBonus: ++x / 100
                });
                for (var s = a({
                        preTaxBonus: (x - 1) / 100
                    }); x > 0 && Math.round(100 * s.netSalary) >= i;) c = s, s = a({
                    preTaxBonus: (--x - 1) / 100
                });
                return {
                    preTaxBonus: x / 100,
                    taxableBonus: Number(c.taxableBonus.toFixed(2)),
                    taxRate: c.taxRate,
                    quickDeduction: c.quickDeduction,
                    tax: Number(c.tax.toFixed(2)),
                    netSalary: Number(c.netSalary.toFixed(2)),
                    formula: c.formula
                }
            },
            getFormula: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "annual";
                return t[e] || t.annual
            },
            getTaxBrackets: function() {
                return e.annual
            }
        };
    exports.nzj = r;