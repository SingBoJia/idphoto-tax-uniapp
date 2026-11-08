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
                tipsList: ["一、征收范围：根据国税发[2005]9号文件规定，纳税人取得全年一次性奖金，单独作为一个月工资、薪金所得计算纳税，由扣缴义务人发放时代扣代缴。", "二、计算方法：", "1. 先将全年一次性奖金除以12个月，按其商数确定适用税率和速算扣除数。", "2. 如果发放当月工资薪金低于费用扣除额，应将奖金减除差额后再确定税率。", "3. 计算公式：", "   - 当月工资≥费用扣除额：应纳税额=奖金×适用税率-速算扣除数", "   - 当月工资<费用扣除额：应纳税额=(奖金-差额)×适用税率-速算扣除数", "4. 一个纳税年度内，该计税办法只允许采用一次。"],
                taxBracketsTitle: "年终奖个人所得税率表"
            }
        },
        r = {
            calculateAfterTax: a,
            calculatePreTax: function() {
                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Number(e.netSalary || e.netBonus || e.preTaxBonus) || 0, r = t, n = 2 * t, u = (r + n) / 2, o = 0; o < 100;) {
                    var l = a({
                        preTaxBonus: u
                    }).netSalary - t;
                    if (Math.abs(l) < .01) break;
                    l > 0 ? n = u : r = u, u = (r + n) / 2, o++
                }
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