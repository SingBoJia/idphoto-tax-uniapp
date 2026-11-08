var a = require("../@babel/runtime/helpers/objectSpread2"),
        e = require("./taxCalculators/geshui.js"),
        l = require("./taxCalculators/nzj.js"),
        c = require("./taxCalculators/lwbc.js"),
        t = require("./taxCalculators/orsd.js"),
        r = require("./taxCalculators/lxhl.js"),
        u = require("./taxCalculators/gcsd.js"),
        x = require("./taxCalculators/cczr.js"),
        T = require("./taxCalculators/cbcz.js"),
        s = require("./taxCalculators/cczl.js"),
        o = require("./taxCalculators/gtgsh.js"),
        n = require("./taxCalculators/txq.js"),
        i = require("./taxCalculators/jcchtax.js"),
        f = require("./taxCalculators/monthlySalary.js"),
        d = {
            "/geshui/": {
                module: e.geshui,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/nxch/": {
                module: e.geshui,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/nzj/": {
                module: l.nzj,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/lwbc/": {
                module: c.lwbc,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/gtgsh/": {
                module: o.gtgsh,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/shgz/": {
                module: e.geshui,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/cbcz/": {
                module: T.cbcz,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/gcsd/": {
                module: u.gcsd,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/txq/": {
                module: n.txq,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/jcchtax/": {
                module: i.jcchtax,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/cczl/": {
                module: s.cczl,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/cczr/": {
                module: x.cczr,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/lxhl/": {
                module: r.lxhl,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/orsd/": {
                module: t.orsd,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            },
            "/monthlySalary/": {
                module: f.monthlySalary,
                calculateAfterTax: "calculateAfterTax",
                calculatePreTax: "calculatePreTax"
            }
        };

    function m() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            l = e.taxType || "",
            c = e.params || {};
        if (!d[l]) return {
            error: !0,
            message: "不支持的税种类型：".concat(l)
        };
        var t, r = d[l].module;
        t = c.isBackward ? d[l].calculatePreTax : d[l].calculateAfterTax;
        var u = a({}, c);
        void 0 !== u.inputSalary && ("/geshui/" === l || "/shgz/" === l || "/monthlySalary/" === l ? c.isBackward ? u.netSalary = u.inputSalary : u.preTaxSalary = u.inputSalary : "/nzj/" === l ? c.isBackward ? u.netBonus = u.inputSalary : u.preTaxBonus = u.inputSalary : "/cczr/" === l ? c.isBackward ? u.netSalary = u.inputSalary : u.transferPrice = u.inputSalary : c.isBackward ? u.netSalary = u.inputSalary : u.preTaxIncome = u.inputSalary, delete u.inputSalary);
        try {
            return r[t](u)
        } catch (a) {
            return {
                error: !0,
                message: "计算错误：".concat(a.message)
            }
        }
    }
    var P = {
        calculate: m,
        calculateAfterTax: function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return m(a)
        },
        calculatePreTax: function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return a.params = a.params || {}, a.params.isBackward = !0, m(a)
        },
        isTaxTypeSupported: function(a) {
            return !!d[a]
        },
        getSupportedTaxTypes: function() {
            return Object.keys(d)
        },
        getFormula: function(a) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "monthly",
                l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (!d[a]) return null;
            var c = d[a].module;
            return "function" == typeof c.getFormula ? c.getFormula(e, l) : null
        },
        getTaxBrackets: function(a, e) {
            if (!d[a]) return [];
            var l = d[a].module;
            return "function" == typeof l.getTaxBrackets ? l.getTaxBrackets(e) : []
        }
    };
    exports.taxService = P;