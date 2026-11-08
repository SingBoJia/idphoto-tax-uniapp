var e = [{
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

    function t() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = Number(t.preTaxIncome) || 0,
            a = Number(t.costs) || 0,
            c = r - a,
            o = function(t) {
                if (t <= 0) return {
                    rate: 0,
                    quick: 0
                };
                var r = e.find((function(e) {
                    return t <= e.threshold
                }));
                return {
                    rate: r.rate,
                    quick: r.quick
                }
            }(c),
            n = o.rate,
            u = o.quick,
            s = c > 0 ? c * n - u : 0,
            i = r - s;
        return {
            preTaxIncome: r,
            costs: a,
            taxableIncome: Math.max(0, c),
            taxRate: n,
            quickDeduction: u,
            tax: s,
            netIncome: i
        }
    }
    var r = {
        calculateAfterTax: t,
        calculatePreTax: function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = Number(e.netIncome) || 0, a = Number(e.costs) || 0, c = r, o = 2 * r, n = (c + o) / 2, u = 0; u < 100;) {
                var s = t({
                    preTaxIncome: n,
                    costs: a
                }).netIncome - r;
                if (Math.abs(s) < .01) break;
                s > 0 ? o = n : c = n, n = (c + o) / 2, u++
            }
            for (var i = Math.round(100 * r), m = Math.round(100 * n), x = t({
                    preTaxIncome: m / 100,
                    costs: a
                }); Math.round(100 * x.netIncome) < i;) x = t({
                preTaxIncome: ++m / 100,
                costs: a
            });
            for (var h = t({
                    preTaxIncome: (m - 1) / 100,
                    costs: a
                }); m > 0 && Math.round(100 * h.netIncome) >= i;) x = h, h = t({
                preTaxIncome: (--m - 1) / 100,
                costs: a
            });
            return {
                preTaxIncome: m / 100,
                costs: a,
                taxableIncome: x.taxableIncome,
                taxRate: x.taxRate,
                quickDeduction: x.quickDeduction,
                tax: x.tax,
                netIncome: x.netIncome
            }
        }
    };
    exports.cbcz = r;