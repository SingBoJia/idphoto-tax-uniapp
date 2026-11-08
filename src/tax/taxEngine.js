var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/typeof.js
var require_typeof = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/typeof.js"(exports, module) {
    function _typeof(o) {
      return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    module.exports = _typeof;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/toPrimitive.js
var require_toPrimitive = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/toPrimitive.js"(exports, module) {
    var _typeof = require_typeof();
    function _toPrimitive(r, t) {
      if ("object" !== _typeof(r) || null === r)
        return r;
      var e = r[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(r, t || "default");
        if ("object" !== _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(r);
    }
    module.exports = _toPrimitive;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/toPropertyKey.js
var require_toPropertyKey = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/toPropertyKey.js"(exports, module) {
    var _typeof = require_typeof();
    var toPrimitive = require_toPrimitive();
    function _toPropertyKey(r) {
      var t = toPrimitive(r, "string");
      return "symbol" === _typeof(t) ? t : String(t);
    }
    module.exports = _toPropertyKey;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/defineProperty.js
var require_defineProperty = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/defineProperty.js"(exports, module) {
    var toPropertyKey = require_toPropertyKey();
    function _defineProperty(e, r, t) {
      return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e[r] = t, e;
    }
    module.exports = _defineProperty;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/objectSpread2.js
var require_objectSpread2 = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/@babel/runtime/helpers/objectSpread2.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    module.exports = _objectSpread2;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/utils.js
var require_utils = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/utils.js"(exports) {
    var r = {
      formatNumber: function(r2) {
        var t = Math.max(0, Number(r2));
        if (0 === t)
          return "0";
        var e = t.toFixed(2);
        return e.endsWith(".00") ? e.split(".")[0] : e;
      }
    };
    exports.utils = r;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/geshui.js
var require_geshui = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/geshui.js"(exports) {
    var a = require_utils();
    var e = {
      annual: [{
        level: 1,
        threshold: 36e3,
        range: "\u4E0D\u8D85\u8FC736000\u5143\u7684\u90E8\u5206",
        rate: 0.03,
        quick: 0
      }, {
        level: 2,
        threshold: 144e3,
        range: "\u8D85\u8FC736000\u5143\u81F3144000\u5143\u7684\u90E8\u5206",
        rate: 0.1,
        quick: 2520
      }, {
        level: 3,
        threshold: 3e5,
        range: "\u8D85\u8FC7144000\u5143\u81F3300000\u5143\u7684\u90E8\u5206",
        rate: 0.2,
        quick: 16920
      }, {
        level: 4,
        threshold: 42e4,
        range: "\u8D85\u8FC7300000\u5143\u81F3420000\u5143\u7684\u90E8\u5206",
        rate: 0.25,
        quick: 31920
      }, {
        level: 5,
        threshold: 66e4,
        range: "\u8D85\u8FC7420000\u5143\u81F3660000\u5143\u7684\u90E8\u5206",
        rate: 0.3,
        quick: 52920
      }, {
        level: 6,
        threshold: 96e4,
        range: "\u8D85\u8FC7660000\u5143\u81F3960000\u5143\u7684\u90E8\u5206",
        rate: 0.35,
        quick: 85920
      }, {
        level: 7,
        threshold: 1 / 0,
        range: "\u8D85\u8FC7960000\u5143\u7684\u90E8\u5206",
        rate: 0.45,
        quick: 181920
      }]
    };
    function t(a2) {
      if (a2 <= 0)
        return {
          rate: 0,
          quick: 0
        };
      var t2 = e.annual.find(function(e2) {
        return a2 <= e2.threshold;
      });
      return {
        rate: t2.rate,
        quick: t2.quick
      };
    }
    function u() {
      var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, u2 = Number(e2.preTaxSalary) || 0, r2 = Number(e2.insurance) || 0, n = Number(e2.specialDeduction) || 0, l = Number(e2.month) || 1, i = e2.calculateType || "monthly", c = u2 * l, o = r2 * l, m = n * l, s = 5e3 * l, h = function(e3, u3, r3, n2) {
        for (var l2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 5e3, i2 = 0, c2 = 0, o2 = 0, m2 = 0, s2 = 0, h2 = 0, b2 = [], f2 = 0, x2 = 0, d2 = 1; d2 <= n2; d2++) {
          var T2 = (i2 += e3) - (c2 += l2) - (o2 += u3) - (m2 += r3) - (s2 += 0), p2 = t(T2), y2 = p2.rate, N2 = p2.quick, v2 = 0;
          if (T2 > 0) {
            var S2 = T2 * y2 - N2;
            v2 = S2 - h2, h2 = S2;
          }
          y2 > f2 && (f2 = y2, x2 = N2), b2.push({
            month: d2,
            preTaxSalary: a.utils.formatNumber(e3),
            taxFree: l2,
            insurance: a.utils.formatNumber(u3),
            housingFund: 0,
            specialDeduction: a.utils.formatNumber(r3),
            otherDeduction: 0,
            cumulativeIncome: a.utils.formatNumber(i2),
            cumulativeTaxFree: a.utils.formatNumber(c2),
            cumulativeInsurance: a.utils.formatNumber(o2),
            cumulativeHousingFund: 0,
            cumulativeSpecialDeduction: a.utils.formatNumber(m2),
            cumulativeOtherDeduction: a.utils.formatNumber(s2),
            taxableIncome: a.utils.formatNumber(Math.max(0, T2)),
            cumulativeTax: a.utils.formatNumber(h2),
            taxRate: y2,
            quickDeduction: N2,
            currentMonthTax: a.utils.formatNumber(v2),
            netSalary: a.utils.formatNumber(e3 - u3 - v2)
          });
        }
        return {
          monthlyDetails: b2,
          cumulativeIncome: a.utils.formatNumber(i2),
          cumulativeTaxFree: a.utils.formatNumber(c2),
          cumulativeInsurance: a.utils.formatNumber(o2),
          cumulativeSpecialDeduction: a.utils.formatNumber(m2),
          cumulativeOtherDeduction: a.utils.formatNumber(s2),
          cumulativeTax: a.utils.formatNumber(h2),
          highestTaxRate: f2,
          totalQuickDeduction: x2
        };
      }(u2, r2, n, l, 5e3), b = h.monthlyDetails, f = h.cumulativeIncome, x = h.cumulativeTaxFree, d = h.cumulativeInsurance, T = h.cumulativeSpecialDeduction, p = h.cumulativeOtherDeduction, y = h.cumulativeTax, N = h.highestTaxRate, v = h.totalQuickDeduction, S = b[b.length - 1], D = ["".concat(f, "-").concat(x, "-").concat(d, "-").concat(T, "-").concat(p), (100 * S.taxRate).toFixed(0) + "%", S.quickDeduction, l > 1 ? b[b.length - ("annual" === i ? 1 : 2)].cumulativeTax : 0];
      if ("annual" === i) {
        var k = c - o - y, M = c - o - m - s;
        return {
          preTaxSalary: a.utils.formatNumber(u2),
          insurance: a.utils.formatNumber(r2),
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
        };
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
      };
    }
    var r = {
      calculateAfterTax: u,
      calculatePreTax: function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = Number(e2.netSalary) || 0, r2 = Number(e2.insurance) || 0, n = Number(e2.specialDeduction) || 0, l = Number(e2.month) || 1, i = e2.calculateType || "monthly";
        if ("annual" === i) {
          for (var c = t2, o = 2 * t2, m = (c + o) / 2, s = 0.01, h = 100, b = 0; b < h; ) {
            var f = u({
              preTaxSalary: m,
              insurance: r2,
              specialDeduction: n,
              month: l,
              calculateType: i
            }).netSalary - t2;
            if (Math.abs(f) < s)
              break;
            f > 0 ? o = m : c = m, m = (c + o) / 2, b++;
          }
          for (var x = Math.round(100 * Number(a.utils.formatNumber(t2))), d = Math.round(100 * m), T = u({
            preTaxSalary: d / 100,
            insurance: r2,
            specialDeduction: n,
            month: l,
            calculateType: i
          }); Math.round(100 * Number(T.netSalary)) < x; )
            T = u({
              preTaxSalary: ++d / 100,
              insurance: r2,
              specialDeduction: n,
              month: l,
              calculateType: i
            });
          for (var p = u({
            preTaxSalary: (d - 1) / 100,
            insurance: r2,
            specialDeduction: n,
            month: l,
            calculateType: i
          }); d > 0 && Math.round(100 * Number(p.netSalary)) >= x; )
            T = p, p = u({
              preTaxSalary: (--d - 1) / 100,
              insurance: r2,
              specialDeduction: n,
              month: l,
              calculateType: i
            });
          return d > 0 && Math.abs(Math.round(100 * Number(p.netSalary)) - x) < Math.abs(Math.round(100 * Number(T.netSalary)) - x) && (d--, T = p), T;
        }
        for (var y = t2, N = 2 * t2, v = (y + N) / 2, S = 0.01, D = 100, k = 0; k < D; ) {
          var M = u({
            preTaxSalary: v,
            insurance: r2,
            specialDeduction: n,
            month: l,
            calculateType: i
          }).netSalary - t2;
          if (Math.abs(M) < S)
            break;
          M > 0 ? N = v : y = v, v = (y + N) / 2, k++;
        }
        for (var g = Math.round(100 * Number(a.utils.formatNumber(t2))), q = Math.round(100 * v), I = u({
          preTaxSalary: q / 100,
          insurance: r2,
          specialDeduction: n,
          month: l,
          calculateType: i
        }); Math.round(100 * Number(I.netSalary)) < g; )
          I = u({
            preTaxSalary: ++q / 100,
            insurance: r2,
            specialDeduction: n,
            month: l,
            calculateType: i
          });
        for (var F = u({
          preTaxSalary: (q - 1) / 100,
          insurance: r2,
          specialDeduction: n,
          month: l,
          calculateType: i
        }); q > 0 && Math.round(100 * Number(F.netSalary)) >= g; )
          I = F, F = u({
            preTaxSalary: (--q - 1) / 100,
            insurance: r2,
            specialDeduction: n,
            month: l,
            calculateType: i
          });
        return q > 0 && Math.abs(Math.round(100 * Number(F.netSalary)) - g) < Math.abs(Math.round(100 * Number(I.netSalary)) - g) && (q--, I = F), I;
      },
      getFormula: function() {
        var a2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "annual";
        return {
          annual: {
            taxTitle: {
              key: "annualNetSalary",
              value: "\u5E74\u5EA6\u7A0E\u540E\u6536\u5165(\u5143)"
            },
            taxBox: {
              annualPreTaxSalary: "\u5E74\u5EA6\u6536\u5165",
              annualInsurance: "\u4E94\u9669\u4E00\u91D1",
              annualSpecialDeduction: "\u4E13\u9879\u9644\u52A0",
              annualTax: "\u5E74\u5EA6\u4E2A\u7A0E"
            },
            formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
            formulaResult: "\u5E74\u5EA6\u4E2A\u7A0E",
            formula: [{
              unit: "",
              content: "\uFF08\u7D2F\u8BA1\u6536\u5165 - \u7D2F\u8BA1\u4E94\u9669\u4E00\u91D1 - \u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664 - \u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09"
            }, {
              unit: " x ",
              content: "\u9884\u6263\u7A0E\u7387"
            }, {
              unit: " - ",
              content: "\u901F\u7B97\u6263\u9664\u6570"
            }],
            tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
            tipsList: ["\u5DE5\u8D44\u85AA\u91D1\u6240\u5F97\uFF0C\u662F\u6307\u4E2A\u4EBA\u56E0\u4EFB\u804C\u6216\u53D7\u96C7\u800C\u53D6\u5F97\u7684\u5DE5\u8D44\u3001\u85AA\u91D1\u3001\u5956\u91D1\u3001\u5E74\u7EC8\u52A0\u85AA\u3001\u52B3\u52A8\u5206\u7EA2\u3001\u6D25\u8D34\u3001\u8865\u8D34\u4EE5\u53CA\u4E0E\u4EFB\u804C\u6216\u53D7\u96C7\u6709\u5173\u7684\u5176\u4ED6\u6240\u5F97\u3002", "\u7D2F\u8BA1\u9884\u6263\u9884\u7F34\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u7D2F\u8BA1\u6536\u5165-\u7D2F\u8BA1\u514D\u7A0E\u6536\u5165-\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528-\u7D2F\u8BA1\u4E13\u9879\u6263\u9664-\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664-\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664", "\u5176\u4E2D\uFF1A\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF0C\u6309\u7167\u4E2A\u7A0E\u8D77\u5F81\u70B95000\u5143/\u6708\u4E58\u4EE5\u7EB3\u7A0E\u4EBA\u5F53\u5E74\u622A\u81F3\u672C\u6708\u5728\u672C\u5355\u4F4D\u7684\u4EFB\u804C\u53D7\u96C7\u6708\u4EFD\u6570\u8BA1\u7B97\u3002"],
            taxBracketsTitle: "\u5E74\u5EA6\u4E2A\u4EBA\u6240\u5F97\u7A0E\u7387\u8868",
            caseTitle: "\u6848\u4F8B\u8BF4\u660E",
            caseContent: ["\u516C\u53F8\u5458\u5DE5\u674E\u56DB\uFF1A2026\u5E741-6\u6708\u6BCF\u6708\u56FA\u5B9A\u5DE5\u8D4420000\u5143\u3002\u6709\u4E00\u540D3\u5C81\u4EE5\u4E0A\u5728\u8BFB\u5B50\u5973\uFF0C\u5B50\u5973\u6559\u80B2\u6BCF\u6708\u6263\u96641000\u5143\uFF1B\u4EAB\u53D7\u9996\u5957\u4F4F\u623F\u8D37\u6B3E\u5229\u606F\u6263\u9664\uFF0C\u6BCF\u67081000\u5143\uFF1B\u4E3A\u975E\u72EC\u751F\u5B50\u5973\uFF0C\u7EA6\u5B9A\u8D61\u517B\u8001\u4EBA\u6BCF\u6708\u6263\u96641000\u5143\u3002\u4E94\u9669\u4E00\u91D1\u6BCF\u6708\u4E2A\u4EBA\u7F34\u7EB34000\u5143\uFF0C\u8D2D\u4E70\u7B26\u5408\u6761\u4EF6\u7684\u4E2A\u4EBA\u517B\u8001\u91D1\u6BCF\u6708\u6263\u96641000\u5143\u3002", "2026\u5E741\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=20000-5000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-4000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-3000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-1000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=7000\u5143,\u5E94\u7EB3\u7A0E\u989D=7000*3%=210\u5143", "2026\u5E742\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=40000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-10000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-8000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-6000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-2000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=14000\u5143,\u5E94\u7EB3\u7A0E\u989D=14000*3%-210\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=210\u5143", "2026\u5E743\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=60000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-15000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-12000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-9000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-3000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=21000\u5143,\u5E94\u7EB3\u7A0E\u989D=21000*3%-420\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=210\u5143", "2026\u5E744\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=80000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-20000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-16000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-12000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-4000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=28000\u5143,\u5E94\u7EB3\u7A0E\u989D=28000*3%-630\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=210\u5143", "2026\u5E745\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=100000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-25000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-20000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-15000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-5000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=35000\u5143,\u5E94\u7EB3\u7A0E\u989D=35000*3%-840\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=210\u5143", "2026\u5E746\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=120000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-30000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-24000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-18000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-6000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=42000\u5143,\u5E94\u7EB3\u7A0E\u989D=42000*10%-2520-1050\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=630\u5143"]
          },
          monthly: {
            taxTitle: {
              key: "netSalary",
              value: "\u672C\u6708\u7A0E\u540E\u6536\u5165(\u5143)"
            },
            taxBox: {
              preTaxSalary: "\u672C\u6708\u7A0E\u524D",
              insurance: "\u4E94\u9669\u4E00\u91D1",
              specialDeduction: "\u4E13\u9879\u9644\u52A0",
              tax: "\u4E2A\u7A0E\u7F34\u7EB3"
            },
            formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
            formulaResult: "\u5F53\u6708\u4E2A\u7A0E",
            formula: [{
              unit: "",
              content: "\uFF08\u7D2F\u8BA1\u6536\u5165 - \u7D2F\u8BA1\u4E94\u9669\u4E00\u91D1 - \u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664 - \u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09"
            }, {
              unit: " x ",
              content: "\u9884\u6263\u7A0E\u7387"
            }, {
              unit: " - ",
              content: "\u901F\u7B97\u6263\u9664\u6570"
            }, {
              unit: " - ",
              content: "\u7D2F\u8BA1\u5DF2\u7F34\u7EB3\u7A0E\u989D"
            }],
            tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
            tipsList: ["\u5DE5\u8D44\u85AA\u91D1\u6240\u5F97\uFF0C\u662F\u6307\u4E2A\u4EBA\u56E0\u4EFB\u804C\u6216\u53D7\u96C7\u800C\u53D6\u5F97\u7684\u5DE5\u8D44\u3001\u85AA\u91D1\u3001\u5956\u91D1\u3001\u5E74\u7EC8\u52A0\u85AA\u3001\u52B3\u52A8\u5206\u7EA2\u3001\u6D25\u8D34\u3001\u8865\u8D34\u4EE5\u53CA\u4E0E\u4EFB\u804C\u6216\u53D7\u96C7\u6709\u5173\u7684\u5176\u4ED6\u6240\u5F97\u3002", "\u7D2F\u8BA1\u9884\u6263\u9884\u7F34\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u7D2F\u8BA1\u6536\u5165-\u7D2F\u8BA1\u514D\u7A0E\u6536\u5165-\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528-\u7D2F\u8BA1\u4E13\u9879\u6263\u9664-\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664-\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664", "\u5176\u4E2D\uFF1A\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF0C\u6309\u7167\u4E2A\u7A0E\u8D77\u5F81\u70B95000\u5143/\u6708\u4E58\u4EE5\u7EB3\u7A0E\u4EBA\u5F53\u5E74\u622A\u81F3\u672C\u6708\u5728\u672C\u5355\u4F4D\u7684\u4EFB\u804C\u53D7\u96C7\u6708\u4EFD\u6570\u8BA1\u7B97\u3002"],
            taxBracketsTitle: "\u5E74\u5EA6\u4E2A\u4EBA\u6240\u5F97\u7A0E\u7387\u8868",
            caseTitle: "\u6848\u4F8B\u8BF4\u660E",
            caseContent: ["\u516C\u53F8\u5458\u5DE5\u674E\u56DB\uFF1A2026\u5E741-6\u6708\u6BCF\u6708\u56FA\u5B9A\u5DE5\u8D4420000\u5143\u3002\u6709\u4E00\u540D3\u5C81\u4EE5\u4E0A\u5728\u8BFB\u5B50\u5973\uFF0C\u5B50\u5973\u6559\u80B2\u6BCF\u6708\u6263\u96641000\u5143\uFF1B\u4EAB\u53D7\u9996\u5957\u4F4F\u623F\u8D37\u6B3E\u5229\u606F\u6263\u9664\uFF0C\u6BCF\u67081000\u5143\uFF1B\u4E3A\u975E\u72EC\u751F\u5B50\u5973\uFF0C\u7EA6\u5B9A\u8D61\u517B\u8001\u4EBA\u6BCF\u6708\u6263\u96641000\u5143\u3002\u4E94\u9669\u4E00\u91D1\u6BCF\u6708\u4E2A\u4EBA\u7F34\u7EB34000\u5143\uFF0C\u8D2D\u4E70\u7B26\u5408\u6761\u4EF6\u7684\u4E2A\u4EBA\u517B\u8001\u91D1\u6BCF\u6708\u6263\u96641000\u5143\u3002", "2026\u5E741\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=20000-5000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-4000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-3000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-1000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=7000\u5143,\u5E94\u7EB3\u7A0E\u989D=7000*3%=210\u5143", "2026\u5E742\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=40000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-10000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-8000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-6000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-2000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=14000\u5143,\u5E94\u7EB3\u7A0E\u989D=14000*3%-210\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=210\u5143", "2026\u5E743\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=60000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-15000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-12000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-9000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-3000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=21000\u5143,\u5E94\u7EB3\u7A0E\u989D=21000*3%-420\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=210\u5143", "2026\u5E744\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=80000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-20000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-16000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-12000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-4000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=28000\u5143,\u5E94\u7EB3\u7A0E\u989D=28000*3%-630\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=210\u5143", "2026\u5E745\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=100000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-25000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-20000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-15000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-5000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=35000\u5143,\u5E94\u7EB3\u7A0E\u989D=35000*3%-840\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=210\u5143", "2026\u5E746\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=120000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-30000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-24000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-18000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09-6000\uFF08\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664\uFF09=42000\u5143,\u5E94\u7EB3\u7A0E\u989D=42000*10%-2520-1050\uFF08\u5DF2\u9884\u7F34\u9884\u6263\u7A0E\u989D\uFF09=630\u5143"]
          }
        }[a2];
      },
      getTaxBrackets: function() {
        return e.annual;
      }
    };
    exports.geshui = r;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/nzj.js
var require_nzj = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/nzj.js"(exports) {
    var e = {
      annual: [{
        level: 1,
        threshold: 3e3,
        range: "\u4E0D\u8D85\u8FC73000\u5143\u7684\u90E8\u5206",
        rate: 0.03,
        quick: 0
      }, {
        level: 2,
        threshold: 12e3,
        range: "\u8D85\u8FC73000\u5143\u81F312000\u5143\u7684\u90E8\u5206",
        rate: 0.1,
        quick: 210
      }, {
        level: 3,
        threshold: 25e3,
        range: "\u8D85\u8FC712000\u5143\u81F325000\u5143\u7684\u90E8\u5206",
        rate: 0.2,
        quick: 1410
      }, {
        level: 4,
        threshold: 35e3,
        range: "\u8D85\u8FC725000\u5143\u81F335000\u5143\u7684\u90E8\u5206",
        rate: 0.25,
        quick: 2660
      }, {
        level: 5,
        threshold: 55e3,
        range: "\u8D85\u8FC735000\u5143\u81F355000\u5143\u7684\u90E8\u5206",
        rate: 0.3,
        quick: 4410
      }, {
        level: 6,
        threshold: 8e4,
        range: "\u8D85\u8FC755000\u5143\u81F380000\u5143\u7684\u90E8\u5206",
        rate: 0.35,
        quick: 7160
      }, {
        level: 7,
        threshold: 1 / 0,
        range: "\u8D85\u8FC780000\u5143\u7684\u90E8\u5206",
        rate: 0.45,
        quick: 15160
      }]
    };
    function a() {
      var a2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = Number(a2.preTaxBonus) || 0, r2 = t2 / 12, n = function(a3) {
        if (a3 <= 0)
          return {
            rate: 0,
            quick: 0
          };
        var t3 = e.annual.find(function(e2) {
          return a3 <= e2.threshold;
        });
        return {
          rate: t3.rate,
          quick: t3.quick
        };
      }(r2), u = n.rate, o = n.quick, l = t2 > 0 ? t2 * u - o : 0, i = t2 - l;
      return {
        preTaxBonus: t2 = Number(t2.toFixed(2)),
        taxableBonus: t2,
        taxRate: u,
        quickDeduction: o,
        tax: l = Number(l.toFixed(2)),
        netSalary: i = Number(i.toFixed(2)),
        formula: [t2, (100 * u).toFixed(0) + "%", o]
      };
    }
    var t = {
      annual: {
        taxBox: {
          preTaxBonus: "\u7A0E\u524D\u6536\u5165",
          tax: "\u5E94\u7EB3\u4E2A\u7A0E"
        },
        formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
        formulaResult: "\u5E74\u7EC8\u5956\u4E2A\u7A0E",
        formula: [{
          unit: "",
          content: "\u7A0E\u524D\u6536\u5165"
        }, {
          unit: " x ",
          content: "\u7A0E\u7387"
        }, {
          unit: " - ",
          content: "\u901F\u7B97\u6263\u9664\u6570"
        }],
        tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
        tipsList: ["\u4E00\u3001\u5F81\u6536\u8303\u56F4\uFF1A\u6839\u636E\u56FD\u7A0E\u53D1[2005]9\u53F7\u6587\u4EF6\u89C4\u5B9A\uFF0C\u7EB3\u7A0E\u4EBA\u53D6\u5F97\u5168\u5E74\u4E00\u6B21\u6027\u5956\u91D1\uFF0C\u5355\u72EC\u4F5C\u4E3A\u4E00\u4E2A\u6708\u5DE5\u8D44\u3001\u85AA\u91D1\u6240\u5F97\u8BA1\u7B97\u7EB3\u7A0E\uFF0C\u7531\u6263\u7F34\u4E49\u52A1\u4EBA\u53D1\u653E\u65F6\u4EE3\u6263\u4EE3\u7F34\u3002", "\u4E8C\u3001\u8BA1\u7B97\u65B9\u6CD5\uFF1A", "1. \u5148\u5C06\u5168\u5E74\u4E00\u6B21\u6027\u5956\u91D1\u9664\u4EE512\u4E2A\u6708\uFF0C\u6309\u5176\u5546\u6570\u786E\u5B9A\u9002\u7528\u7A0E\u7387\u548C\u901F\u7B97\u6263\u9664\u6570\u3002", "2. \u5982\u679C\u53D1\u653E\u5F53\u6708\u5DE5\u8D44\u85AA\u91D1\u4F4E\u4E8E\u8D39\u7528\u6263\u9664\u989D\uFF0C\u5E94\u5C06\u5956\u91D1\u51CF\u9664\u5DEE\u989D\u540E\u518D\u786E\u5B9A\u7A0E\u7387\u3002", "3. \u8BA1\u7B97\u516C\u5F0F\uFF1A", "   - \u5F53\u6708\u5DE5\u8D44\u2265\u8D39\u7528\u6263\u9664\u989D\uFF1A\u5E94\u7EB3\u7A0E\u989D=\u5956\u91D1\xD7\u9002\u7528\u7A0E\u7387-\u901F\u7B97\u6263\u9664\u6570", "   - \u5F53\u6708\u5DE5\u8D44<\u8D39\u7528\u6263\u9664\u989D\uFF1A\u5E94\u7EB3\u7A0E\u989D=(\u5956\u91D1-\u5DEE\u989D)\xD7\u9002\u7528\u7A0E\u7387-\u901F\u7B97\u6263\u9664\u6570", "4. \u4E00\u4E2A\u7EB3\u7A0E\u5E74\u5EA6\u5185\uFF0C\u8BE5\u8BA1\u7A0E\u529E\u6CD5\u53EA\u5141\u8BB8\u91C7\u7528\u4E00\u6B21\u3002"],
        taxBracketsTitle: "\u5E74\u7EC8\u5956\u4E2A\u4EBA\u6240\u5F97\u7A0E\u7387\u8868"
      }
    };
    var r = {
      calculateAfterTax: a,
      calculatePreTax: function() {
        for (var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = Number(e2.netSalary || e2.netBonus || e2.preTaxBonus) || 0, r2 = t2, n = 2 * t2, u = (r2 + n) / 2, o = 0; o < 100; ) {
          var l = a({
            preTaxBonus: u
          }).netSalary - t2;
          if (Math.abs(l) < 0.01)
            break;
          l > 0 ? n = u : r2 = u, u = (r2 + n) / 2, o++;
        }
        for (var i = Math.round(100 * Number(t2.toFixed(2))), x = Math.round(100 * u), c = a({
          preTaxBonus: x / 100
        }); Math.round(100 * c.netSalary) < i; )
          c = a({
            preTaxBonus: ++x / 100
          });
        for (var s = a({
          preTaxBonus: (x - 1) / 100
        }); x > 0 && Math.round(100 * s.netSalary) >= i; )
          c = s, s = a({
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
        };
      },
      getFormula: function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "annual";
        return t[e2] || t.annual;
      },
      getTaxBrackets: function() {
        return e.annual;
      }
    };
    exports.nzj = r;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/lwbc.js
var require_lwbc = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/lwbc.js"(exports) {
    var e = {
      annual: [{
        level: 1,
        threshold: 2e4,
        range: "\u4E0D\u8D85\u8FC720000\u5143\u7684\u90E8\u5206",
        rate: 0.2,
        quick: 0
      }, {
        level: 2,
        threshold: 5e4,
        range: "\u8D85\u8FC720000\u5143\u81F350000\u5143\u7684\u90E8\u5206",
        rate: 0.3,
        quick: 2e3
      }, {
        level: 3,
        threshold: 1 / 0,
        range: "\u8D85\u8FC750000\u5143\u7684\u90E8\u5206",
        rate: 0.4,
        quick: 7e3
      }]
    };
    var a = {
      monthly: [{
        level: 1,
        threshold: 3e3,
        range: "\u4E0D\u8D85\u8FC73000\u5143\u7684\u90E8\u5206",
        rate: 0.03,
        quick: 0
      }, {
        level: 2,
        threshold: 12e3,
        range: "\u8D85\u8FC73000\u5143\u81F312000\u5143\u7684\u90E8\u5206",
        rate: 0.1,
        quick: 210
      }, {
        level: 3,
        threshold: 25e3,
        range: "\u8D85\u8FC712000\u5143\u81F325000\u5143\u7684\u90E8\u5206",
        rate: 0.2,
        quick: 1410
      }, {
        level: 4,
        threshold: 35e3,
        range: "\u8D85\u8FC725000\u5143\u81F335000\u5143\u7684\u90E8\u5206",
        rate: 0.25,
        quick: 2660
      }, {
        level: 5,
        threshold: 55e3,
        range: "\u8D85\u8FC735000\u5143\u81F355000\u5143\u7684\u90E8\u5206",
        rate: 0.3,
        quick: 4410
      }, {
        level: 6,
        threshold: 8e4,
        range: "\u8D85\u8FC755000\u5143\u81F380000\u5143\u7684\u90E8\u5206",
        rate: 0.35,
        quick: 7160
      }, {
        level: 7,
        threshold: 1 / 0,
        range: "\u8D85\u8FC780000\u5143\u7684\u90E8\u5206",
        rate: 0.45,
        quick: 15160
      }]
    };
    function t() {
      var e2, a2, t2, r2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = Math.round(100 * (Math.max(0, Number(r2.preTaxIncome) || 0) + 1e-8)) / 100, o = r2.taxpayerType || "resident";
      "resident" === o ? (e2 = n <= 4e3 ? n - 800 : 0.8 * n) <= 2e4 ? (a2 = 0.2, t2 = 0) : e2 <= 5e4 ? (a2 = 0.3, t2 = 2e3) : (a2 = 0.4, t2 = 7e3) : (e2 = 0.8 * n) <= 3e3 ? (a2 = 0.03, t2 = 0) : e2 <= 12e3 ? (a2 = 0.1, t2 = 210) : e2 <= 25e3 ? (a2 = 0.2, t2 = 1410) : e2 <= 35e3 ? (a2 = 0.25, t2 = 2660) : e2 <= 55e3 ? (a2 = 0.3, t2 = 4410) : e2 <= 8e4 ? (a2 = 0.35, t2 = 7160) : (a2 = 0.45, t2 = 15160);
      var l = e2 > 0 ? Math.max(0, Math.round(100 * (e2 * a2 - t2 + 1e-8)) / 100) : 0, u = n - l;
      return {
        preTaxIncome: n,
        taxableIncome: e2 = Math.round(100 * (Math.max(0, e2) + 1e-8)) / 100,
        taxRate: a2,
        quickDeduction: t2,
        tax: l,
        netSalary: u = Number(u.toFixed(2)),
        formula: ["resident" === o ? "".concat(n, n <= 4e3 ? " - 800" : "\xD7(1-20%)") : "non-resident" === o ? "".concat(n, "\xD7(1-20%)") : n, (100 * a2).toFixed(0) + "%", t2],
        taxpayerType: o
      };
    }
    var r = {
      calculateAfterTax: t,
      calculatePreTax: function() {
        for (var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a2 = Number(e2.netSalary || e2.netIncome || e2.preTaxIncome) || 0, r2 = Math.round(100 * (Math.max(0, a2) + 1e-8)) / 100, n = e2.taxpayerType || "resident", o = r2, l = 2 * r2, u = (o + l) / 2, c = 0; c < 100; ) {
          var i = t({
            preTaxIncome: u,
            taxpayerType: n
          }).netSalary - r2;
          if (Math.abs(i) < 1e-4)
            break;
          i > 0 ? l = u : o = u, u = (o + l) / 2, c++;
        }
        for (var x = Number(r2.toFixed(2)), d = Math.round(100 * x), h = Math.round(100 * u), m = t({
          preTaxIncome: h / 100,
          taxpayerType: n
        }); Math.round(100 * m.netSalary) < d; )
          m = t({
            preTaxIncome: ++h / 100,
            taxpayerType: n
          });
        for (var p = t({
          preTaxIncome: (h - 1) / 100,
          taxpayerType: n
        }); h > 0 && Math.round(100 * p.netSalary) >= d; )
          m = p, p = t({
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
        };
      },
      getFormula: function() {
        var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        console.log("getFormula\u53C2\u6570", JSON.stringify(e2, null, 4));
        var a2 = {
          taxBox: {
            preTaxIncome: "\u7A0E\u524D\u6536\u5165",
            tax: "\u5E94\u7EB3\u4E2A\u7A0E",
            netSalary: "\u7A0E\u540E\u6536\u5165"
          },
          formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
          formulaResult: "\u52B3\u52A1\u62A5\u916C\u4E2A\u7A0E",
          formula: [{
            unit: "",
            content: "\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D"
          }, {
            unit: "\xD7",
            content: "\u7A0E\u7387"
          }, {
            unit: " - ",
            content: "\u901F\u7B97\u6263\u9664\u6570"
          }],
          tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
          tipsList: ["\u4E00\u3001\u7EB3\u7A0E\u4EBA\u7C7B\u578B\uFF1A", "1. \u5C45\u6C11\u4E2A\u4EBA\uFF1A\u5728\u4E2D\u56FD\u5883\u5185\u6709\u4F4F\u6240\uFF0C\u6216\u8005\u65E0\u4F4F\u6240\u800C\u4E00\u4E2A\u7EB3\u7A0E\u5E74\u5EA6\u5185\u5728\u4E2D\u56FD\u5883\u5185\u5C45\u4F4F\u7D2F\u8BA1\u6EE1183\u5929\u7684\u4E2A\u4EBA\u3002", "2. \u975E\u5C45\u6C11\u4E2A\u4EBA\uFF1A\u5728\u4E2D\u56FD\u5883\u5185\u65E0\u4F4F\u6240\u53C8\u4E0D\u5C45\u4F4F\uFF0C\u6216\u8005\u65E0\u4F4F\u6240\u800C\u4E00\u4E2A\u7EB3\u7A0E\u5E74\u5EA6\u5185\u5728\u4E2D\u56FD\u5883\u5185\u5C45\u4F4F\u7D2F\u8BA1\u4E0D\u6EE1183\u5929\u7684\u4E2A\u4EBA\u3002", "\u4E8C\u3001\u8BA1\u7B97\u65B9\u6CD5\uFF1A", "\uFF08\u4E00\uFF09\u5C45\u6C11\u4E2A\u4EBA\uFF1A", "1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u52B3\u52A1\u62A5\u916C(\u4E0D\u8D85\u8FC74000\u5143) - 800\u5143", "2. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u52B3\u52A1\u62A5\u916C(\u8D85\u8FC74000\u5143)\xD7(1-20%)", "3. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\xD7\u9002\u7528\u7A0E\u7387-\u901F\u7B97\u6263\u9664\u6570", "\uFF08\u4E8C\uFF09\u975E\u5C45\u6C11\u4E2A\u4EBA\uFF1A", "1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u52B3\u52A1\u62A5\u916C\xD7(1-20%)", "2. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\xD7\u9002\u7528\u7A0E\u7387-\u901F\u7B97\u6263\u9664\u6570"],
          taxBracketsTitle: "\u52B3\u52A1\u62A5\u916C\u4E2A\u4EBA\u6240\u5F97\u7A0E\u7387\u8868"
        };
        return "resident" === e2.taxpayerType && e2.preTaxIncome <= 4e3 ? a2.formula[0].content = "(\u7A0E\u524D(\u4E0D\u8D85\u8FC74000\u5143) - 800)" : "resident" === e2.taxpayerType && e2.preTaxIncome > 4e3 ? a2.formula[0].content = "(\u7A0E\u524D(\u8D85\u8FC74000\u5143)\xD7(1-20%))" : a2.formula[0].content = "\u7A0E\u524D\xD7(1-20%)", "resident" === e2.taxpayerType ? a2.taxBracketsTitle = "\u52B3\u52A1\u62A5\u916C\u5C45\u6C11\u6240\u5F97\u7A0E\u7387\u8868" : a2.taxBracketsTitle = "\u52B3\u52A1\u62A5\u916C\u975E\u5C45\u6C11\u6240\u5F97\u7A0E\u7387\u8868", a2;
      },
      getTaxBrackets: function() {
        var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "resident";
        return "resident" === t2 ? e.annual : a.monthly;
      }
    };
    exports.lwbc = r;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/orsd.js
var require_orsd = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/orsd.js"(exports) {
    var t = require_utils();
    var e = {
      calculateAfterTax: function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Number(e2.preTaxIncome) || 0, r = a, u = r > 0 ? 0.2 * r : 0, o = a - u;
        return {
          preTaxIncome: a = t.utils.formatNumber(a),
          taxableIncome: r = t.utils.formatNumber(r),
          taxRate: 0.2,
          quickDeduction: 0,
          tax: u = t.utils.formatNumber(u),
          netSalary: o = t.utils.formatNumber(o),
          formula: [a, 20 .toFixed(0) + "%", 0],
          calculationType: "afterTax"
        };
      },
      calculatePreTax: function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Number(e2.netSalary) || 0, r = a / 0.8, u = r, o = r > 0 ? 0.2 * r : 0;
        return {
          preTaxIncome: r = t.utils.formatNumber(r),
          taxableIncome: u = t.utils.formatNumber(u),
          taxRate: 0.2,
          quickDeduction: 0,
          tax: o = t.utils.formatNumber(o),
          netSalary: a = t.utils.formatNumber(a),
          formula: [r, 20 .toFixed(0) + "%", 0],
          calculationType: "preTax"
        };
      },
      getFormula: function() {
        return {
          taxBox: {
            preTaxIncome: "\u7A0E\u524D\u6536\u5165",
            tax: "\u5E94\u7EB3\u4E2A\u7A0E",
            netSalary: "\u7A0E\u540E\u6536\u5165"
          },
          formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
          formulaResult: "\u5076\u7136\u6240\u5F97\u4E2A\u7A0E",
          formula: [{
            unit: "",
            content: "\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D"
          }, {
            unit: " \xD7 ",
            content: "\u7A0E\u7387"
          }],
          tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
          tipsList: ["1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u6BCF\u6B21\u6536\u5165\u989D", "2. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D \xD7 \u9002\u7528\u7A0E\u7387\uFF0820%\uFF09"]
        };
      },
      getTaxBrackets: function() {
        return [];
      }
    };
    exports.orsd = e;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/lxhl.js
var require_lxhl = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/lxhl.js"(exports) {
    var t = require_utils();
    var e = {
      calculateAfterTax: function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Number(e2.preTaxIncome) || 0, r = a, u = r > 0 ? 0.2 * r : 0, l = a - u;
        return {
          preTaxIncome: a = t.utils.formatNumber(a),
          taxableIncome: r = t.utils.formatNumber(r),
          taxRate: 0.2,
          quickDeduction: 0,
          tax: u = t.utils.formatNumber(u),
          netSalary: l = t.utils.formatNumber(l),
          formula: [a, 20 .toFixed(0) + "%", 0],
          calculationType: "afterTax"
        };
      },
      calculatePreTax: function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Number(e2.netSalary) || 0, r = a / 0.8, u = r, l = r > 0 ? 0.2 * r : 0;
        return {
          preTaxIncome: r = t.utils.formatNumber(r),
          taxableIncome: u = t.utils.formatNumber(u),
          taxRate: 0.2,
          quickDeduction: 0,
          tax: l = t.utils.formatNumber(l),
          netSalary: a = t.utils.formatNumber(a),
          formula: [r, 20 .toFixed(0) + "%"],
          calculationType: "preTax"
        };
      },
      getFormula: function() {
        return {
          taxBox: {
            preTaxIncome: "\u7A0E\u524D\u6536\u5165",
            tax: "\u5E94\u7EB3\u4E2A\u7A0E",
            netSalary: "\u7A0E\u540E\u6536\u5165"
          },
          formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
          formulaResult: "\u5229\u606F\u3001\u80A1\u606F\u3001\u7EA2\u5229\u6240\u5F97\u4E2A\u7A0E",
          formula: [{
            unit: "",
            content: "\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D"
          }, {
            unit: " \xD7 ",
            content: "\u7A0E\u7387"
          }],
          tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
          tipsList: ["1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u6BCF\u6B21\u6536\u5165\u989D", "2. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D \xD7 \u9002\u7528\u7A0E\u7387\uFF0820%\uFF09"],
          taxBracketsTitle: ""
        };
      },
      getTaxBrackets: function() {
        return [];
      }
    };
    exports.lxhl = e;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/gcsd.js
var require_gcsd = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/gcsd.js"(exports) {
    var e = {
      monthly: [{
        level: 1,
        threshold: 3e3,
        range: "\u4E0D\u8D85\u8FC73000\u5143\u7684\u90E8\u5206",
        rate: 0.03,
        quick: 0
      }, {
        level: 2,
        threshold: 12e3,
        range: "\u8D85\u8FC73000\u5143\u81F312000\u5143\u7684\u90E8\u5206",
        rate: 0.1,
        quick: 210
      }, {
        level: 3,
        threshold: 25e3,
        range: "\u8D85\u8FC712000\u5143\u81F325000\u5143\u7684\u90E8\u5206",
        rate: 0.2,
        quick: 1410
      }, {
        level: 4,
        threshold: 35e3,
        range: "\u8D85\u8FC725000\u5143\u81F335000\u5143\u7684\u90E8\u5206",
        rate: 0.25,
        quick: 2660
      }, {
        level: 5,
        threshold: 55e3,
        range: "\u8D85\u8FC735000\u5143\u81F355000\u5143\u7684\u90E8\u5206",
        rate: 0.3,
        quick: 4410
      }, {
        level: 6,
        threshold: 8e4,
        range: "\u8D85\u8FC755000\u5143\u81F380000\u5143\u7684\u90E8\u5206",
        rate: 0.35,
        quick: 7160
      }, {
        level: 7,
        threshold: 1 / 0,
        range: "\u8D85\u8FC780000\u5143\u7684\u90E8\u5206",
        rate: 0.45,
        quick: 15160
      }]
    };
    function t() {
      var e2, t2, a2, r, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = Number(n.preTaxIncome) || 0, l = n.taxpayerType || "resident", i = 0;
      "resident" === l ? (e2 = o <= 4e3 ? o - 800 : 0.8 * o, t2 = 0.2, i = 0.3, a2 = 0) : (e2 = 0.8 * o * 0.7) <= 3e3 ? (t2 = 0.03, a2 = 0) : e2 <= 12e3 ? (t2 = 0.1, a2 = 210) : e2 <= 25e3 ? (t2 = 0.2, a2 = 1410) : e2 <= 35e3 ? (t2 = 0.25, a2 = 2660) : e2 <= 55e3 ? (t2 = 0.3, a2 = 4410) : e2 <= 8e4 ? (t2 = 0.35, a2 = 7160) : (t2 = 0.45, a2 = 15160);
      var u = o - (r = "resident" === l ? e2 > 0 ? e2 * t2 * (1 - i) : 0 : e2 > 0 ? e2 * t2 - a2 : 0);
      return {
        preTaxIncome: o = Number(o.toFixed(2)),
        taxableIncome: e2 = Number(Math.max(0, e2).toFixed(2)),
        taxRate: t2,
        taxReductionRate: i,
        quickDeduction: a2 || 0,
        tax: r = Number(r.toFixed(2)),
        netSalary: u = Number(u.toFixed(2)),
        formula: ["resident" === l ? "".concat(o, o <= 4e3 ? " - 800" : " \xD7 (1-20%)") : "non-resident" === l ? "".concat(o, " \xD7 (1-20%) \xD7 70%") : o, (100 * t2).toFixed(0) + "%", "resident" === l ? "(1-30%)" : a2],
        taxpayerType: l
      };
    }
    var a = {
      calculateAfterTax: t,
      calculatePreTax: function() {
        for (var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a2 = Number(e2.netSalary) || 0, r = e2.taxpayerType || "resident", n = a2, o = 2 * a2, l = (n + o) / 2, i = 0; i < 100; ) {
          var u = t({
            preTaxIncome: l,
            taxpayerType: r
          }).netSalary - a2;
          if (Math.abs(u) < 1e-4)
            break;
          u > 0 ? o = l : n = l, l = (n + o) / 2, i++;
        }
        for (var c = Math.round(100 * Number(a2.toFixed(2))), x = Math.round(100 * l), d = t({
          preTaxIncome: x / 100,
          taxpayerType: r
        }); Math.round(100 * d.netSalary) < c; )
          d = t({
            preTaxIncome: ++x / 100,
            taxpayerType: r
          });
        for (var m = t({
          preTaxIncome: (x - 1) / 100,
          taxpayerType: r
        }); x > 0 && Math.round(100 * m.netSalary) >= c; )
          d = m, m = t({
            preTaxIncome: (--x - 1) / 100,
            taxpayerType: r
          });
        var p = Number(a2.toFixed(2));
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
        };
      },
      getFormula: function() {
        var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t2 = {
          taxBox: {
            preTaxIncome: "\u7A0E\u524D\u6536\u5165",
            tax: "\u5E94\u7EB3\u4E2A\u7A0E",
            netSalary: "\u7A0E\u540E\u6536\u5165"
          },
          formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
          formulaResult: "\u7A3F\u916C\u4E2A\u7A0E",
          formula: [{
            unit: "",
            content: "\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D"
          }, {
            unit: " \xD7 ",
            content: "\u7A0E\u7387"
          }, {
            unit: " \xD7 ",
            content: "\u51CF\u5F8130%"
          }],
          tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
          tipsList: ["\u4E00\u3001\u7EB3\u7A0E\u4EBA\u7C7B\u578B\uFF1A", "1. \u5C45\u6C11\u4E2A\u4EBA\uFF1A\u5728\u4E2D\u56FD\u5883\u5185\u6709\u4F4F\u6240\uFF0C\u6216\u8005\u65E0\u4F4F\u6240\u800C\u4E00\u4E2A\u7EB3\u7A0E\u5E74\u5EA6\u5185\u5728\u4E2D\u56FD\u5883\u5185\u5C45\u4F4F\u7D2F\u8BA1\u6EE1183\u5929\u7684\u4E2A\u4EBA\u3002", "2. \u975E\u5C45\u6C11\u4E2A\u4EBA\uFF1A\u5728\u4E2D\u56FD\u5883\u5185\u65E0\u4F4F\u6240\u53C8\u4E0D\u5C45\u4F4F\uFF0C\u6216\u8005\u65E0\u4F4F\u6240\u800C\u4E00\u4E2A\u7EB3\u7A0E\u5E74\u5EA6\u5185\u5728\u4E2D\u56FD\u5883\u5185\u5C45\u4F4F\u7D2F\u8BA1\u4E0D\u6EE1183\u5929\u7684\u4E2A\u4EBA\u3002", "\u4E8C\u3001\u8BA1\u7B97\u65B9\u6CD5\uFF1A", "\uFF08\u4E00\uFF09\u5C45\u6C11\u4E2A\u4EBA\uFF1A", "1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D = \u7A3F\u916C\u6240\u5F97(\u4E0D\u8D85\u8FC74000\u5143) - 800\u5143", "2. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D = \u7A3F\u916C\u6240\u5F97(\u8D85\u8FC74000\u5143)\xD7(1 - 20%)", "3. \u5E94\u7EB3\u7A0E\u989D = \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D \xD7 20% \xD7 (1 - 30%)", "\uFF08\u4E8C\uFF09\u975E\u5C45\u6C11\u4E2A\u4EBA\uFF1A", "1. \u7A3F\u916C\u6240\u5F97\u4EE5\u6536\u5165\u989D\u4E3A\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\uFF08\u7EDF\u4E00\u51CF\u966420%\u7684\u8D39\u7528\uFF0C\u518D\u51CF\u630970%\u8BA1\u7B97\uFF09\u3002", "2. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\xD7\u9002\u7528\u7A0E\u7387-\u901F\u7B97\u6263\u9664\u6570"],
          taxBracketsTitle: "\u7A3F\u916C\u4E2A\u4EBA\u6240\u5F97\u7A0E\u7387\u8868"
        };
        return "resident" === e2.taxpayerType ? (e2.preTaxIncome <= 4e3 ? t2.formula[0].content = "(\u7A0E\u524D(\u4E0D\u8D85\u8FC74000\u5143) - 800)" : t2.formula[0].content = "(\u7A0E\u524D(\u8D85\u8FC74000\u5143)\xD7(1-20%))", t2.taxBracketsTitle = "") : "non-resident" === e2.taxpayerType && (t2.formula[0].content = "\u7A0E\u524D\xD7(1-20%)\xD770%", t2.taxBracketsTitle = "\u7A3F\u916C\u975E\u5C45\u6C11\u6240\u5F97\u7A0E\u7387\u8868", t2.formula.pop()), t2;
      },
      getTaxBrackets: function() {
        var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "resident";
        return "resident" === t2 ? [] : e.monthly;
      }
    };
    exports.gcsd = a;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/cczr.js
var require_cczr = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/cczr.js"(exports) {
    var e = require_utils();
    function r() {
      var r2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a2 = Number(r2.transferPrice) || 0, t = Number(r2.originalPrice) || 0, i = Number(r2.reasonableFee) || 0, n = a2 - t - i, o = n > 0 ? 0.2 * n : 0, l = a2 - o;
      return {
        transferPrice: a2 = e.utils.formatNumber(a2),
        originalPrice: t = e.utils.formatNumber(t),
        reasonableFee: i = e.utils.formatNumber(i),
        taxableIncome: n = e.utils.formatNumber(Math.max(0, n)),
        taxRate: 0.2,
        quickDeduction: 0,
        tax: o = e.utils.formatNumber(o),
        netSalary: l = e.utils.formatNumber(l),
        formula: ["".concat(a2, "-").concat(t, "-").concat(i), 20 .toFixed(0) + "%", 0],
        calculationType: "afterTax"
      };
    }
    var a = {
      calculateAfterTax: r,
      calculatePreTax: function() {
        for (var a2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Number(a2.netSalary) || 0, i = Number(a2.originalPrice) || 0, n = Number(a2.reasonableFee) || 0, o = t, l = 2 * t, u = (o + l) / 2, c = 0; c < 100; ) {
          var s = r({
            transferPrice: u,
            originalPrice: i,
            reasonableFee: n
          }).netSalary - t;
          if (Math.abs(s) < 1e-4)
            break;
          s > 0 ? l = u : o = u, u = (o + l) / 2, c++;
        }
        for (var m = Math.round(100 * Number(e.utils.formatNumber(t))), f = Math.round(100 * u), b = r({
          transferPrice: f / 100,
          originalPrice: i,
          reasonableFee: n
        }); Math.round(100 * Number(b.netSalary)) < m; )
          b = r({
            transferPrice: ++f / 100,
            originalPrice: i,
            reasonableFee: n
          });
        for (var P = r({
          transferPrice: (f - 1) / 100,
          originalPrice: i,
          reasonableFee: n
        }); f > 0 && Math.round(100 * Number(P.netSalary)) >= m; )
          b = P, P = r({
            transferPrice: (--f - 1) / 100,
            originalPrice: i,
            reasonableFee: n
          });
        var x = e.utils.formatNumber(t);
        return {
          transferPrice: e.utils.formatNumber(f / 100),
          originalPrice: i,
          reasonableFee: n,
          taxableIncome: b.taxableIncome,
          taxRate: 0.2,
          quickDeduction: 0,
          tax: b.tax,
          netSalary: x,
          formula: b.formula,
          calculationType: "preTax"
        };
      },
      getFormula: function() {
        return {
          taxBox: {
            transferPrice: "\u8F6C\u8BA9\u4EF7\u683C",
            originalPrice: "\u8D22\u4EA7\u539F\u503C",
            reasonableFee: "\u5408\u7406\u8D39\u7528",
            tax: "\u5E94\u7EB3\u4E2A\u7A0E",
            netSalary: "\u7A0E\u540E\u6536\u5165"
          },
          formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
          formulaResult: "\u8D22\u4EA7\u8F6C\u8BA9\u6240\u5F97\u4E2A\u7A0E",
          formula: [{
            unit: "",
            content: "\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D"
          }, {
            unit: " \xD7 ",
            content: "\u7A0E\u7387"
          }],
          tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
          tipsList: ["1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u8F6C\u8BA9\u6536\u5165-\u8D22\u4EA7\u539F\u503C-\u5408\u7406\u8D39\u7528", "2. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\xD720%"]
        };
      },
      getTaxBrackets: function() {
        return [];
      }
    };
    exports.cczr = a;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/cbcz.js
var require_cbcz = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/cbcz.js"(exports) {
    var e = [{
      threshold: 3e4,
      rate: 0.05,
      quick: 0
    }, {
      threshold: 9e4,
      rate: 0.1,
      quick: 1500
    }, {
      threshold: 3e5,
      rate: 0.2,
      quick: 10500
    }, {
      threshold: 5e5,
      rate: 0.3,
      quick: 40500
    }, {
      threshold: 1 / 0,
      rate: 0.35,
      quick: 65500
    }];
    function t() {
      var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = Number(t2.preTaxIncome) || 0, a = Number(t2.costs) || 0, c = r2 - a, o = function(t3) {
        if (t3 <= 0)
          return {
            rate: 0,
            quick: 0
          };
        var r3 = e.find(function(e2) {
          return t3 <= e2.threshold;
        });
        return {
          rate: r3.rate,
          quick: r3.quick
        };
      }(c), n = o.rate, u = o.quick, s = c > 0 ? c * n - u : 0, i = r2 - s;
      return {
        preTaxIncome: r2,
        costs: a,
        taxableIncome: Math.max(0, c),
        taxRate: n,
        quickDeduction: u,
        tax: s,
        netIncome: i
      };
    }
    var r = {
      calculateAfterTax: t,
      calculatePreTax: function() {
        for (var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = Number(e2.netIncome) || 0, a = Number(e2.costs) || 0, c = r2, o = 2 * r2, n = (c + o) / 2, u = 0; u < 100; ) {
          var s = t({
            preTaxIncome: n,
            costs: a
          }).netIncome - r2;
          if (Math.abs(s) < 0.01)
            break;
          s > 0 ? o = n : c = n, n = (c + o) / 2, u++;
        }
        for (var i = Math.round(100 * r2), m = Math.round(100 * n), x = t({
          preTaxIncome: m / 100,
          costs: a
        }); Math.round(100 * x.netIncome) < i; )
          x = t({
            preTaxIncome: ++m / 100,
            costs: a
          });
        for (var h = t({
          preTaxIncome: (m - 1) / 100,
          costs: a
        }); m > 0 && Math.round(100 * h.netIncome) >= i; )
          x = h, h = t({
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
        };
      }
    };
    exports.cbcz = r;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/cczl.js
var require_cczl = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/cczl.js"(exports) {
    var a = require_utils();
    function t() {
      var t2, e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = Number(e2.preTaxIncome) || 0, o = 0;
      r <= 4e3 ? t2 = r - (o = 800) : t2 = r - (o = 0.2 * r);
      var u = t2 > 0 ? 0.2 * t2 : 0, n = r - u;
      return {
        preTaxIncome: r = a.utils.formatNumber(r),
        deduction: o = a.utils.formatNumber(o),
        taxableIncome: t2 = a.utils.formatNumber(Math.max(0, t2)),
        taxRate: 0.2,
        quickDeduction: 0,
        tax: u = a.utils.formatNumber(u),
        netSalary: n = a.utils.formatNumber(n),
        formula: ["".concat(r, r <= 4e3 ? " - 800" : " \xD7 (1-20%)"), 20 .toFixed(0) + "%", 0],
        calculationType: "afterTax"
      };
    }
    var e = {
      calculateAfterTax: t,
      calculatePreTax: function() {
        for (var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = Number(e2.netSalary) || 0, o = r, u = 2 * r, n = (o + u) / 2, c = 0; c < 100; ) {
          var l = t({
            preTaxIncome: n
          }).netSalary - r;
          if (Math.abs(l) < 1e-4)
            break;
          l > 0 ? u = n : o = n, n = (o + u) / 2, c++;
        }
        for (var m = Math.round(100 * Number(a.utils.formatNumber(r))), i = Math.round(100 * n), x = t({
          preTaxIncome: i / 100
        }); Math.round(100 * Number(x.netSalary)) < m; )
          x = t({
            preTaxIncome: ++i / 100
          });
        for (var f = t({
          preTaxIncome: (i - 1) / 100
        }); i > 0 && Math.round(100 * Number(f.netSalary)) >= m; )
          x = f, f = t({
            preTaxIncome: (--i - 1) / 100
          });
        var s = a.utils.formatNumber(r);
        return {
          preTaxIncome: a.utils.formatNumber(i / 100),
          deduction: x.deduction,
          taxableIncome: x.taxableIncome,
          taxRate: 0.2,
          quickDeduction: 0,
          tax: x.tax,
          netSalary: s,
          formula: x.formula,
          calculationType: "preTax"
        };
      },
      getFormula: function() {
        var a2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t2 = {
          taxBox: {
            preTaxIncome: "\u7A0E\u524D\u6536\u5165",
            deduction: "\u51CF\u9664\u8D39\u7528",
            tax: "\u5E94\u7EB3\u4E2A\u7A0E",
            netSalary: "\u7A0E\u540E\u6536\u5165"
          },
          formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
          formulaResult: "\u8D22\u4EA7\u79DF\u8D41\u6240\u5F97\u4E2A\u7A0E",
          formula: [{
            unit: "",
            content: "\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D"
          }, {
            unit: " \xD7 ",
            content: "\u7A0E\u7387"
          }],
          tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
          tipsList: ["1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D = \u8D22\u4EA7\u79DF\u8D41\u6240\u5F97(\u4E0D\u8D85\u8FC74000\u5143) - 800\u5143", "2. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D = \u8D22\u4EA7\u79DF\u8D41\u6240\u5F97(\u8D85\u8FC74000\u5143)\xD7(1 - 20%)", "3. \u5E94\u7EB3\u7A0E\u989D = \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D \xD7 20%"]
        };
        return a2.preTaxIncome <= 4e3 ? t2.formula[0].content = "(\u7A0E\u524D(\u4E0D\u8D85\u8FC74000\u5143) - 800)" : t2.formula[0].content = "(\u7A0E\u524D(\u8D85\u8FC74000\u5143)\xD7(1-20%))", t2.taxBracketsTitle = "", t2;
      },
      getTaxBrackets: function() {
        return [];
      }
    };
    exports.cczl = e;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/gtgsh.js
var require_gtgsh = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/gtgsh.js"(exports) {
    var t = [{
      threshold: 3e4,
      rate: 0.05,
      quick: 0
    }, {
      threshold: 9e4,
      rate: 0.1,
      quick: 1500
    }, {
      threshold: 3e5,
      rate: 0.2,
      quick: 10500
    }, {
      threshold: 5e5,
      rate: 0.3,
      quick: 40500
    }, {
      threshold: 1 / 0,
      rate: 0.35,
      quick: 65500
    }];
    function e() {
      var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a2 = Number(e2.preTaxIncome) || 0, r = Number(e2.costs) || 0, o = a2 - r, c = function(e3) {
        if (e3 <= 0)
          return {
            rate: 0,
            quick: 0
          };
        var a3 = t.find(function(t2) {
          return e3 <= t2.threshold;
        });
        return {
          rate: a3.rate,
          quick: a3.quick
        };
      }(o), n = c.rate, u = c.quick, i = o > 0 ? o * n - u : 0, l = a2 - i;
      return {
        preTaxIncome: a2 = Number(a2.toFixed(2)),
        costs: r = Number(r.toFixed(2)),
        taxableIncome: o = Number(Math.max(0, o).toFixed(2)),
        taxRate: n,
        quickDeduction: u,
        tax: i = Number(i.toFixed(2)),
        netSalary: l = Number(l.toFixed(2)),
        formula: ["".concat(a2, " - ").concat(r), (100 * n).toFixed(0) + "%", u],
        calculationType: "afterTax"
      };
    }
    var a = {
      calculateAfterTax: e,
      calculatePreTax: function() {
        for (var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a2 = Number(t2.netSalary) || 0, r = Number(t2.costs) || 0, o = a2, c = 2 * a2, n = (o + c) / 2, u = 0; u < 100; ) {
          var i = e({
            preTaxIncome: n,
            costs: r
          }).netSalary - a2;
          if (Math.abs(i) < 1e-4)
            break;
          i > 0 ? c = n : o = n, n = (o + c) / 2, u++;
        }
        for (var l = Math.round(100 * Number(a2.toFixed(2))), s = Math.round(100 * n), x = e({
          preTaxIncome: s / 100,
          costs: r
        }); Math.round(100 * x.netSalary) < l; )
          x = e({
            preTaxIncome: ++s / 100,
            costs: r
          });
        for (var h = e({
          preTaxIncome: (s - 1) / 100,
          costs: r
        }); s > 0 && Math.round(100 * h.netSalary) >= l; )
          x = h, h = e({
            preTaxIncome: (--s - 1) / 100,
            costs: r
          });
        var m = Number(a2.toFixed(2));
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
        };
      },
      getFormula: function() {
        return {
          taxBox: {
            preTaxIncome: "\u7A0E\u524D\u6536\u5165",
            costs: "\u6210\u672C\u8D39\u7528",
            tax: "\u5E94\u7EB3\u4E2A\u7A0E",
            netSalary: "\u7A0E\u540E\u6536\u5165"
          },
          formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
          formulaResult: "\u7ECF\u8425\u6240\u5F97\u4E2A\u7A0E",
          formula: [{
            unit: "",
            content: "(\u7A0E\u524D - \u6210\u672C\u3001\u8D39\u7528\u53CA\u635F\u5931)"
          }, {
            unit: " \xD7 ",
            content: "\u7A0E\u7387"
          }, {
            unit: " - ",
            content: "\u901F\u7B97\u6263\u9664\u6570"
          }],
          tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
          tipsList: ["1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u7ECF\u8425\u6536\u5165-\u6210\u672C\u3001\u8D39\u7528\u53CA\u635F\u5931", "2. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\xD7\u9002\u7528\u7A0E\u7387-\u901F\u7B97\u6263\u9664\u6570"],
          taxBracketsTitle: "\u7ECF\u8425\u6240\u5F97\u4E2A\u4EBA\u6240\u5F97\u7A0E\u7387\u8868"
        };
      },
      getTaxBrackets: function() {
        return t.map(function(e2, a2) {
          var r;
          return r = 0 === a2 ? "\u4E0D\u8D85\u8FC7".concat(e2.threshold, "\u5143\u7684\u90E8\u5206") : a2 === t.length - 1 ? "\u8D85\u8FC7".concat(t[a2 - 1].threshold, "\u5143\u7684\u90E8\u5206") : "\u8D85\u8FC7".concat(t[a2 - 1].threshold, "\u5143\u81F3").concat(e2.threshold, "\u5143\u7684\u90E8\u5206"), {
            level: a2 + 1,
            threshold: e2.threshold,
            range: r,
            rate: e2.rate,
            quick: e2.quick
          };
        });
      }
    };
    exports.gtgsh = a;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/txq.js
var require_txq = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/txq.js"(exports) {
    var e = {
      monthly: [{
        level: 1,
        threshold: 3e3,
        range: "\u4E0D\u8D85\u8FC73000\u5143\u7684\u90E8\u5206",
        rate: 0.03,
        quick: 0
      }, {
        level: 2,
        threshold: 12e3,
        range: "\u8D85\u8FC73000\u5143\u81F312000\u5143\u7684\u90E8\u5206",
        rate: 0.1,
        quick: 210
      }, {
        level: 3,
        threshold: 25e3,
        range: "\u8D85\u8FC712000\u5143\u81F325000\u5143\u7684\u90E8\u5206",
        rate: 0.2,
        quick: 1410
      }, {
        level: 4,
        threshold: 35e3,
        range: "\u8D85\u8FC725000\u5143\u81F335000\u5143\u7684\u90E8\u5206",
        rate: 0.25,
        quick: 2660
      }, {
        level: 5,
        threshold: 55e3,
        range: "\u8D85\u8FC735000\u5143\u81F355000\u5143\u7684\u90E8\u5206",
        rate: 0.3,
        quick: 4410
      }, {
        level: 6,
        threshold: 8e4,
        range: "\u8D85\u8FC755000\u5143\u81F380000\u5143\u7684\u90E8\u5206",
        rate: 0.35,
        quick: 7160
      }, {
        level: 7,
        threshold: 1 / 0,
        range: "\u8D85\u8FC780000\u5143\u7684\u90E8\u5206",
        rate: 0.45,
        quick: 15160
      }]
    };
    function a() {
      var e2, a2, t2, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = Number(r.preTaxIncome) || 0, o = r.taxpayerType || "resident";
      "resident" === o ? (e2 = n <= 4e3 ? Math.max(0, n - 800) : 0.8 * n, a2 = 0.2, t2 = 0) : (e2 = 0.8 * n) <= 3e3 ? (a2 = 0.03, t2 = 0) : e2 <= 12e3 ? (a2 = 0.1, t2 = 210) : e2 <= 25e3 ? (a2 = 0.2, t2 = 1410) : e2 <= 35e3 ? (a2 = 0.25, t2 = 2660) : e2 <= 55e3 ? (a2 = 0.3, t2 = 4410) : e2 <= 8e4 ? (a2 = 0.35, t2 = 7160) : (a2 = 0.45, t2 = 15160);
      var x = e2 > 0 ? e2 * a2 - t2 : 0, l = n - x;
      return {
        preTaxIncome: n = Number(n.toFixed(2)),
        taxableIncome: e2 = Number(Math.max(0, e2).toFixed(2)),
        taxRate: a2,
        quickDeduction: t2 || 0,
        tax: x = Number(x.toFixed(2)),
        netSalary: l = Number(l.toFixed(2)),
        formula: ["resident" === o ? "".concat(n, n <= 4e3 ? " - 800" : " \xD7 (1-20%)") : "non-resident" === o ? "".concat(n, " \xD7 (1-20%)") : n, (100 * a2).toFixed(0) + "%", t2],
        calculationType: "afterTax",
        taxpayerType: o
      };
    }
    var t = {
      calculateAfterTax: a,
      calculatePreTax: function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = Number(e2.netSalary) || 0, r = e2.taxpayerType || "resident";
        if ("resident" === r) {
          var n;
          n = t2 <= 800 ? t2 : t2 <= 3360 ? (t2 - 160) / 0.8 : t2 / 0.84;
          for (var o = Math.round(100 * Number(t2.toFixed(2))), x = Math.round(100 * n), l = a({
            preTaxIncome: x / 100,
            taxpayerType: r
          }); Math.round(100 * l.netSalary) < o; )
            l = a({
              preTaxIncome: ++x / 100,
              taxpayerType: r
            });
          for (var u = a({
            preTaxIncome: (x - 1) / 100,
            taxpayerType: r
          }); x > 0 && Math.round(100 * u.netSalary) >= o; )
            l = u, u = a({
              preTaxIncome: (--x - 1) / 100,
              taxpayerType: r
            });
          var c = Number(t2.toFixed(2));
          return {
            preTaxIncome: x / 100,
            taxableIncome: Number(l.taxableIncome.toFixed(2)),
            taxRate: l.taxRate,
            quickDeduction: l.quickDeduction,
            tax: Number(l.tax.toFixed(2)),
            netSalary: c,
            formula: l.formula,
            calculationType: "preTax",
            taxpayerType: r
          };
        }
        for (var i = t2, p = 2 * t2, m = (i + p) / 2, d = 1e-4, y = 100, T = 0; T < y; ) {
          var h = a({
            preTaxIncome: m,
            taxpayerType: r
          }).netSalary - t2;
          if (Math.abs(h) < d)
            break;
          h > 0 ? p = m : i = m, m = (i + p) / 2, T++;
        }
        for (var s = Math.round(100 * Number(t2.toFixed(2))), v = Math.round(100 * m), f = a({
          preTaxIncome: v / 100,
          taxpayerType: r
        }); Math.round(100 * f.netSalary) < s; )
          f = a({
            preTaxIncome: ++v / 100,
            taxpayerType: r
          });
        for (var b = a({
          preTaxIncome: (v - 1) / 100,
          taxpayerType: r
        }); v > 0 && Math.round(100 * b.netSalary) >= s; )
          f = b, b = a({
            preTaxIncome: (--v - 1) / 100,
            taxpayerType: r
          });
        var I = Number(t2.toFixed(2));
        return {
          preTaxIncome: v / 100,
          taxableIncome: Number(f.taxableIncome.toFixed(2)),
          taxRate: f.taxRate,
          quickDeduction: f.quickDeduction,
          tax: Number(f.tax.toFixed(2)),
          netSalary: I,
          formula: f.formula,
          calculationType: "preTax",
          taxpayerType: r
        };
      },
      getFormula: function() {
        var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a2 = {
          taxBox: {
            preTaxIncome: "\u7A0E\u524D\u6536\u5165",
            tax: "\u5E94\u7EB3\u4E2A\u7A0E",
            netSalary: "\u7A0E\u540E\u6536\u5165"
          },
          formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
          formulaResult: "\u7279\u8BB8\u6743\u4F7F\u7528\u8D39\u4E2A\u7A0E",
          formula: [{
            unit: "",
            content: "\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D"
          }, {
            unit: " \xD7 ",
            content: "\u7A0E\u7387"
          }, {
            unit: " - ",
            content: "\u901F\u7B97\u6263\u9664\u6570"
          }],
          tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
          tipsList: ["\u4E00\u3001\u7EB3\u7A0E\u4EBA\u7C7B\u578B\uFF1A", "1. \u5C45\u6C11\u4E2A\u4EBA\uFF1A\u5728\u4E2D\u56FD\u5883\u5185\u6709\u4F4F\u6240\uFF0C\u6216\u8005\u65E0\u4F4F\u6240\u800C\u4E00\u4E2A\u7EB3\u7A0E\u5E74\u5EA6\u5185\u5728\u4E2D\u56FD\u5883\u5185\u5C45\u4F4F\u7D2F\u8BA1\u6EE1183\u5929\u7684\u4E2A\u4EBA\u3002", "2. \u975E\u5C45\u6C11\u4E2A\u4EBA\uFF1A\u5728\u4E2D\u56FD\u5883\u5185\u65E0\u4F4F\u6240\u53C8\u4E0D\u5C45\u4F4F\uFF0C\u6216\u8005\u65E0\u4F4F\u6240\u800C\u4E00\u4E2A\u7EB3\u7A0E\u5E74\u5EA6\u5185\u5728\u4E2D\u56FD\u5883\u5185\u5C45\u4F4F\u7D2F\u8BA1\u4E0D\u6EE1183\u5929\u7684\u4E2A\u4EBA\u3002", "\u4E8C\u3001\u8BA1\u7B97\u65B9\u6CD5\uFF1A", "\uFF08\u4E00\uFF09\u5C45\u6C11\u4E2A\u4EBA\uFF1A", "1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u52B3\u52A1\u62A5\u916C(\u4E0D\u8D85\u8FC74000\u5143) - 800\u5143", "2. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u52B3\u52A1\u62A5\u916C(\u8D85\u8FC74000\u5143)\xD7(1-20%)", "3. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\xD7\u9002\u7528\u7A0E\u7387-\u901F\u7B97\u6263\u9664\u6570", "\uFF08\u4E8C\uFF09\u975E\u5C45\u6C11\u4E2A\u4EBA\uFF1A", "1. \u7279\u8BB8\u6743\u4F7F\u7528\u8D39\u6240\u5F97\u4EE5\u6536\u5165\u989D\u4E3A\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\uFF08\u7EDF\u4E00\u51CF\u966420%\u7684\u8D39\u7528\uFF09\u3002", "2. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\xD7\u9002\u7528\u7A0E\u7387-\u901F\u7B97\u6263\u9664\u6570"],
          taxBracketsTitle: "\u7279\u8BB8\u6743\u4F7F\u7528\u8D39\u4E2A\u4EBA\u6240\u5F97\u7A0E\u7387\u8868"
        };
        return "resident" === e2.taxpayerType ? (e2.preTaxIncome <= 4e3 ? a2.formula[0].content = "(\u7A0E\u524D(\u4E0D\u8D85\u8FC74000\u5143) - 800)" : a2.formula[0].content = "(\u7A0E\u524D(\u8D85\u8FC74000\u5143)\xD7(1-20%))", a2.taxBracketsTitle = "", a2.formula.pop()) : "non-resident" === e2.taxpayerType && (a2.formula[0].content = "\u7A0E\u524D\xD7(1-20%)", a2.taxBracketsTitle = "\u7279\u8BB8\u6743\u4F7F\u7528\u8D39\u975E\u5C45\u6C11\u6240\u5F97\u7A0E\u7387\u8868"), a2;
      },
      getTaxBrackets: function() {
        var a2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "resident";
        return "resident" === a2 ? [] : e.monthly;
      }
    };
    exports.txq = t;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/jcchtax.js
var require_jcchtax = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/jcchtax.js"(exports) {
    var a = require_utils();
    var t = {
      annual: [{
        threshold: 36e3,
        rate: 0.03,
        quick: 0
      }, {
        threshold: 144e3,
        rate: 0.1,
        quick: 2520
      }, {
        threshold: 3e5,
        rate: 0.2,
        quick: 16920
      }, {
        threshold: 42e4,
        rate: 0.25,
        quick: 31920
      }, {
        threshold: 66e4,
        rate: 0.3,
        quick: 52920
      }, {
        threshold: 96e4,
        rate: 0.35,
        quick: 85920
      }, {
        threshold: 1 / 0,
        rate: 0.45,
        quick: 181920
      }]
    };
    function e() {
      var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = Number(e2.preTaxIncome) || 0, u = Number(e2.avgSalary) || 0, n = 3 * u, o = Math.max(0, r2 - n), l = function(a2) {
        if (a2 <= 0)
          return {
            rate: 0,
            quick: 0
          };
        var e3 = t.annual.find(function(t2) {
          return a2 <= t2.threshold;
        });
        return {
          rate: e3.rate,
          quick: e3.quick
        };
      }(o), c = l.rate, i = l.quick, m = o > 0 ? o * c - i : 0, h = r2 - m;
      r2 = a.utils.formatNumber(r2), u = a.utils.formatNumber(u);
      var s = a.utils.formatNumber(n), x = a.utils.formatNumber(o);
      return {
        preTaxIncome: r2,
        avgSalary: u,
        taxFreeAmount: s,
        taxableIncome: x,
        taxRate: c,
        quickDeduction: i,
        tax: m = a.utils.formatNumber(m),
        netSalary: h = a.utils.formatNumber(h),
        formula: ["".concat(r2, "-").concat(u, " * 3"), (100 * c).toFixed(0) + "%", i],
        calculationType: "afterTax"
      };
    }
    var r = {
      calculateAfterTax: e,
      calculatePreTax: function() {
        for (var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = Number(t2.netSalary) || 0, u = Number(t2.avgSalary) || 0, n = r2, o = 2 * r2, l = (n + o) / 2, c = 0; c < 100; ) {
          var i = e({
            preTaxIncome: l,
            avgSalary: u
          }).netSalary - r2;
          if (Math.abs(i) < 1e-4)
            break;
          i > 0 ? o = l : n = l, l = (n + o) / 2, c++;
        }
        for (var m = Math.round(100 * Number(a.utils.formatNumber(r2))), h = Math.round(100 * l), s = e({
          preTaxIncome: h / 100,
          avgSalary: u
        }); Math.round(100 * Number(s.netSalary)) < m; )
          s = e({
            preTaxIncome: ++h / 100,
            avgSalary: u
          });
        for (var x = e({
          preTaxIncome: (h - 1) / 100,
          avgSalary: u
        }); h > 0 && Math.round(100 * Number(x.netSalary)) >= m; )
          s = x, x = e({
            preTaxIncome: (--h - 1) / 100,
            avgSalary: u
          });
        var f = a.utils.formatNumber(r2);
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
        };
      },
      getFormula: function() {
        return {
          taxBox: {
            preTaxIncome: "\u7A0E\u524D\u6536\u5165",
            avgSalary: "\u793E\u5E73\u5DE5\u8D44",
            tax: "\u5E94\u7EB3\u4E2A\u7A0E",
            netSalary: "\u7A0E\u540E\u6536\u5165"
          },
          formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
          formulaResult: "\u89E3\u9664\u5408\u540C\u79BB\u804C\u8865\u507F\u6240\u5F97\u4E2A\u7A0E",
          formula: [{
            unit: "",
            content: "(\u8865\u507F\u6536\u5165-\u5F53\u5730\u4E0A\u5E74\u793E\u5E73\u5DE5\u8D44\xD73)"
          }, {
            unit: " \xD7 ",
            content: "\u7A0E\u7387"
          }, {
            unit: " - ",
            content: "\u901F\u7B97\u6263\u9664\u6570"
          }],
          tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
          tipsList: ["1. \u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u4E00\u6B21\u6027\u7ECF\u6D4E\u8865\u507F\u6536\u5165-\u5F53\u5730\u4E0A\u5E74\u793E\u5E73\u5DE5\u8D44\xD73", "2. \u5E94\u7EB3\u7A0E\u989D=\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\xD7\u9002\u7528\u7A0E\u7387-\u901F\u7B97\u6263\u9664\u6570"],
          taxBracketsTitle: "\u7EFC\u5408\u6240\u5F97\u4E2A\u4EBA\u6240\u5F97\u7A0E\u7387\u8868",
          caseTitle: "\u6848\u4F8B\u8BF4\u660E",
          caseContent: ["A\u4E8E2024\u5E7412\u6708\u63D0\u524D\u8DDF\u8001\u738B\u89E3\u9664\u52B3\u52A8\u5173\u7CFB\uFF0C\u5047\u8BBE2023\u5E74\u5F53\u5730\u804C\u5DE5\u7684\u5E74\u5E73\u5747\u5DE5\u8D44\u4E3A55000\u5143\u3002", "\u60C5\u5F621\uFF1A\u8001\u738B\u53D6\u5F97\u7684\u4E00\u6B21\u6027\u8865\u507F\u6536\u5165\u4E3A10\u4E07\u5143", "\u4E0A\u5E74\u804C\u5DE5\u5E73\u5747\u5DE5\u8D443\u500D\u6570\u989D\uFF1A55000\xD73=165000\u5143\uFF0C\u8001\u738B\u53D6\u5F9710\u4E07\u5143\u4E00\u6B21\u6027\u8865\u507F\u91D1\u6536\u5165\uFF0C\u5728\u514D\u5F81\u8303\u56F4\u5185\uFF0C\u4E0D\u9700\u8981\u7F34\u7EB3\u4E2A\u4EBA\u6240\u5F97\u7A0E\u3002", "\u60C5\u5F622\uFF1A\u8001\u738B\u53D6\u5F97\u7684\u4E00\u6B21\u6027\u8865\u507F\u91D1\u6536\u5165\u4E3A22\u4E07\u5143\uFF0C\u5F53\u6708\u8FD8\u6309\u89C4\u5B9A\u7F34\u7EB3\u4E86\u4E94\u9669\u4E00\u91D12000\u5143\uFF0C\u90A3\u4E48\u8001\u738B\u9700\u8981\u7F34\u7EB3\u4E2A\u4EBA\u6240\u5F97\u7A0E\uFF1A", "\u4E0A\u5E74\u804C\u5DE5\u5E73\u5747\u5DE5\u8D443\u500D\u6570\u989D\uFF1A55000\xD73=165000\u5143\uFF0C\u8001\u738B\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=220000\uFF0D165000\uFF0D2000=53000\u5143\uFF0C\u901A\u8FC7\u67E5\u627E\u7EFC\u5408\u6240\u5F97\u7A0E\u7387\u8868\uFF0C\u9002\u7528\u7A0E\u738710%\uFF0C\u901F\u7B97\u6263\u9664\u65702520\u5143", "\u8001\u738B\u7684\u4E2A\u4EBA\u6240\u5F97\u7A0E\u5E94\u7EB3\u7A0E\u989D=53000\xD710%\uFF0D2520=2780\u5143\u3002"]
        };
      },
      getTaxBrackets: function() {
        return t.annual.map(function(a2, e2) {
          var r2;
          return r2 = 0 === e2 ? "\u4E0D\u8D85\u8FC7".concat(a2.threshold, "\u5143\u7684\u90E8\u5206") : e2 === t.annual.length - 1 ? "\u8D85\u8FC7".concat(t.annual[e2 - 1].threshold, "\u5143\u7684\u90E8\u5206") : "\u8D85\u8FC7".concat(t.annual[e2 - 1].threshold, "\u5143\u81F3").concat(a2.threshold, "\u5143\u7684\u90E8\u5206"), {
            level: e2 + 1,
            threshold: a2.threshold,
            range: r2,
            rate: a2.rate,
            quick: a2.quick
          };
        });
      }
    };
    exports.jcchtax = r;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/monthlySalary.js
var require_monthlySalary = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxCalculators/monthlySalary.js"(exports) {
    var a = require_objectSpread2();
    var e = require_utils();
    var t = {
      annual: [{
        level: 1,
        threshold: 36e3,
        range: "\u4E0D\u8D85\u8FC736000\u5143\u7684\u90E8\u5206",
        rate: 0.03,
        quick: 0
      }, {
        level: 2,
        threshold: 144e3,
        range: "\u8D85\u8FC736000\u5143\u81F3144000\u5143\u7684\u90E8\u5206",
        rate: 0.1,
        quick: 2520
      }, {
        level: 3,
        threshold: 3e5,
        range: "\u8D85\u8FC7144000\u5143\u81F3300000\u5143\u7684\u90E8\u5206",
        rate: 0.2,
        quick: 16920
      }, {
        level: 4,
        threshold: 42e4,
        range: "\u8D85\u8FC7300000\u5143\u81F3420000\u5143\u7684\u90E8\u5206",
        rate: 0.25,
        quick: 31920
      }, {
        level: 5,
        threshold: 66e4,
        range: "\u8D85\u8FC7420000\u5143\u81F3660000\u5143\u7684\u90E8\u5206",
        rate: 0.3,
        quick: 52920
      }, {
        level: 6,
        threshold: 96e4,
        range: "\u8D85\u8FC7660000\u5143\u81F3960000\u5143\u7684\u90E8\u5206",
        rate: 0.35,
        quick: 85920
      }, {
        level: 7,
        threshold: 1 / 0,
        range: "\u8D85\u8FC7960000\u5143\u7684\u90E8\u5206",
        rate: 0.45,
        quick: 181920
      }]
    };
    function r(a2) {
      if (a2 <= 0)
        return {
          rate: 0,
          quick: 0
        };
      var e2 = t.annual.find(function(e3) {
        return a2 <= e3.threshold;
      });
      return {
        rate: e2.rate,
        quick: e2.quick
      };
    }
    function u() {
      var a2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = 12, u2 = a2.preTaxSalary || [], n2 = a2.insurance || [], l = a2.specialDeduction || [], i = new Array(t2).fill(0).map(function(a3, e2) {
        return Math.round(100 * (Math.max(0, Number(u2[e2]) || 0) + 1e-8)) / 100;
      }), o = new Array(t2).fill(0).map(function(a3, e2) {
        return Math.round(100 * (Math.max(0, Number(n2[e2]) || 0) + 1e-8)) / 100;
      }), m = new Array(t2).fill(0).map(function(a3, e2) {
        return Math.round(100 * (Math.max(0, Number(l[e2]) || 0) + 1e-8)) / 100;
      }), c = a2.calculateType || "monthly", h = i.reduce(function(a3, e2) {
        return a3 + Math.round(100 * e2);
      }, 0) / 100, s = o.reduce(function(a3, e2) {
        return a3 + Math.round(100 * e2);
      }, 0) / 100, d = m.reduce(function(a3, e2) {
        return a3 + Math.round(100 * e2);
      }, 0) / 100, f = 6e4, x = function(a3, t3, u3, n3) {
        for (var l2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 5e3, i2 = 0, o2 = 0, m2 = 0, c2 = 0, h2 = 0, s2 = 0, d2 = [], f2 = 1; f2 <= n3; f2++) {
          var x2 = Number(a3[f2 - 1]) || 0, b2 = Number(t3[f2 - 1]) || 0, N2 = Number(u3[f2 - 1]) || 0, v2 = x2 > 0 || b2 > 0 || N2 > 0;
          v2 && (i2 = Number((i2 + x2).toFixed(2)), o2 += l2, m2 = Number((m2 + b2).toFixed(2)), c2 = Number((c2 + N2).toFixed(2)), h2 += 0);
          var M2 = i2 - o2 - m2 - c2 - h2, y2 = r(M2), T2 = y2.rate, p2 = y2.quick, S2 = 0;
          if (x2 > 0) {
            var D2 = Math.max(0, Math.round(100 * (M2 * T2 - p2 + 1e-8)) / 100);
            S2 = Math.max(0, Math.round(100 * (D2 - s2 + 1e-8)) / 100), s2 = Number((s2 + S2).toFixed(2));
          }
          d2.push({
            month: f2,
            isEmployed: v2,
            preTaxSalary: e.utils.formatNumber(x2),
            taxFree: v2 ? l2 : 0,
            insurance: b2,
            housingFund: 0,
            specialDeduction: N2,
            otherDeduction: 0,
            cumulativeIncome: e.utils.formatNumber(i2),
            cumulativeTaxFree: e.utils.formatNumber(o2),
            cumulativeInsurance: e.utils.formatNumber(m2),
            cumulativeHousingFund: 0,
            cumulativeSpecialDeduction: e.utils.formatNumber(c2),
            cumulativeOtherDeduction: e.utils.formatNumber(h2),
            taxableIncome: e.utils.formatNumber(Math.max(0, M2)),
            cumulativeTax: e.utils.formatNumber(s2),
            taxRate: T2,
            quickDeduction: p2,
            currentMonthTax: e.utils.formatNumber(S2),
            netSalary: Math.max(0, Number((x2 - b2 - S2).toFixed(2)))
          });
        }
        return {
          monthlyDetails: d2,
          cumulativeIncome: e.utils.formatNumber(i2),
          cumulativeTaxFree: e.utils.formatNumber(o2),
          cumulativeInsurance: e.utils.formatNumber(m2),
          cumulativeSpecialDeduction: e.utils.formatNumber(c2),
          cumulativeOtherDeduction: e.utils.formatNumber(h2),
          cumulativeTax: e.utils.formatNumber(s2)
        };
      }(i, o, m, t2, 5e3), b = x.monthlyDetails, N = x.cumulativeTax, v = Math.max(0, Math.round(100 * h) - Math.round(100 * s) - Math.round(100 * d) - 6e6) / 100, M = r(v), y = M.rate, T = M.quick, p = Math.max(0, Math.round(100 * (v * y - T + 1e-8)) / 100), S = Number(N) || 0, D = Math.max(0, Math.round(100 * (S - p + 1e-8)) / 100), k = Math.max(0, h - s - S), q = Math.max(0, h - s - p), F = ["".concat(e.utils.formatNumber(h), "-").concat(e.utils.formatNumber(f), "-").concat(e.utils.formatNumber(s), "-").concat(e.utils.formatNumber(d), "-0"), (100 * y).toFixed(0) + "%", T];
      return {
        taxableIncome: e.utils.formatNumber(Math.max(0, v)),
        taxRate: y,
        quickDeduction: T,
        tax: e.utils.formatNumber(p),
        netSalary: Number((q / t2).toFixed(2)),
        annualPreTaxSalary: e.utils.formatNumber(h),
        annualInsurance: e.utils.formatNumber(s),
        annualSpecialDeduction: e.utils.formatNumber(d),
        annualTaxFree: e.utils.formatNumber(f),
        annualTax: e.utils.formatNumber(N),
        annualWithheldTax: e.utils.formatNumber(S),
        annualRefund: e.utils.formatNumber(D),
        annualPaidNetSalary: Number(k.toFixed(2)),
        annualNetSalary: Number(q.toFixed(2)),
        month: t2,
        calculateType: c,
        monthlyDetails: b,
        formula: F
      };
    }
    var n = {
      calculateAfterTax: u,
      calculatePreTax: function() {
        for (var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = e2.netSalary || [], r2 = e2.insurance || [], n2 = e2.specialDeduction || [], l = new Array(12).fill(0), i = 0; i < 12; i++) {
          var o = Math.round(100 * (Number(t2[i]) || 0)), m = Math.round(100 * (Math.max(0, Number(r2[i]) || 0) + 1e-8)) / 100;
          if (Math.round(100 * (Math.max(0, Number(n2[i]) || 0) + 1e-8)), 0 !== o || 0 !== m) {
            var c = Math.max(0, o + Math.round(100 * m)), h = Math.max(1, c);
            l[i] = h / 100;
            for (var s = u(a(a({}, e2), {}, {
              preTaxSalary: l
            })), d = 0; Math.round(100 * Number(s.monthlyDetails[i].netSalary)) < o && d < 60; )
              h *= 2, l[i] = h / 100, s = u(a(a({}, e2), {}, {
                preTaxSalary: l
              })), d++;
            if (Math.round(100 * Number(s.monthlyDetails[i].netSalary)) < o)
              throw new Error("\u7B2C".concat(i + 1, "\u6708\u7A0E\u540E\u5DE5\u8D44\u8D85\u51FA\u53EF\u53CD\u63A8\u8303\u56F4"));
            for (; c < h; ) {
              var f = Math.floor((c + h) / 2);
              l[i] = f / 100;
              var x = u(a(a({}, e2), {}, {
                preTaxSalary: l
              }));
              Math.round(100 * Number(x.monthlyDetails[i].netSalary)) >= o ? h = f : c = f + 1;
            }
            l[i] = c / 100;
          } else
            l[i] = 0;
        }
        return u(a(a({}, e2), {}, {
          preTaxSalary: l
        }));
      },
      getFormula: function() {
        var a2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "annual";
        return {
          annual: {
            taxTitle: {
              key: "annualNetSalary",
              value: "\u6C47\u7B97\u540E\u5E74\u5EA6\u7A0E\u540E\u6536\u5165(\u5143)"
            },
            taxBox: {
              annualPreTaxSalary: "\u5E74\u5EA6\u6536\u5165",
              annualInsurance: "\u4E94\u9669\u4E00\u91D1",
              annualSpecialDeduction: "\u4E13\u9879\u9644\u52A0",
              annualWithheldTax: "\u7D2F\u8BA1\u5DF2\u9884\u6263",
              tax: "\u5E94\u7EB3\u4E2A\u7A0E",
              annualRefund: "\u9884\u8BA1\u9000\u7A0E"
            },
            formulaTitle: "\u8BA1\u7B97\u8BE6\u60C5",
            formulaResult: "\u5E74\u5EA6\u4E2A\u7A0E",
            formula: [{
              unit: "",
              content: "\uFF08\u7D2F\u8BA1\u6536\u5165 - \u7D2F\u8BA1\u4E94\u9669\u4E00\u91D1 - \u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664 - \u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09"
            }, {
              unit: " x ",
              content: "\u9884\u6263\u7A0E\u7387"
            }, {
              unit: " - ",
              content: "\u901F\u7B97\u6263\u9664\u6570"
            }],
            tipsTitle: "\u8BA1\u7B97\u8BF4\u660E",
            tipsList: ["\u5DE5\u8D44\u85AA\u91D1\u6240\u5F97\uFF0C\u662F\u6307\u4E2A\u4EBA\u56E0\u4EFB\u804C\u6216\u53D7\u96C7\u800C\u53D6\u5F97\u7684\u5DE5\u8D44\u3001\u85AA\u91D1\u3001\u5956\u91D1\u3001\u5E74\u7EC8\u52A0\u85AA\u3001\u52B3\u52A8\u5206\u7EA2\u3001\u6D25\u8D34\u3001\u8865\u8D34\u4EE5\u53CA\u4E0E\u4EFB\u804C\u6216\u53D7\u96C7\u6709\u5173\u7684\u5176\u4ED6\u6240\u5F97\u3002", "\u7D2F\u8BA1\u9884\u6263\u9884\u7F34\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=\u7D2F\u8BA1\u6536\u5165-\u7D2F\u8BA1\u514D\u7A0E\u6536\u5165-\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528-\u7D2F\u8BA1\u4E13\u9879\u6263\u9664-\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664-\u7D2F\u8BA1\u4F9D\u6CD5\u786E\u5B9A\u7684\u5176\u4ED6\u6263\u9664", "\u5176\u4E2D\uFF1A\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF0C\u6309\u7167\u4E2A\u7A0E\u8D77\u5F81\u70B95000\u5143/\u6708\u4E58\u4EE5\u7EB3\u7A0E\u4EBA\u5F53\u5E74\u622A\u81F3\u672C\u6708\u5728\u672C\u5355\u4F4D\u7684\u4EFB\u804C\u53D7\u96C7\u6708\u4EFD\u6570\u8BA1\u7B97\u3002", "\u9AD8\u7EA7\u7248\u4E2D\uFF0C\u6536\u5165\u3001\u4E94\u9669\u4E00\u91D1\u6216\u4E13\u9879\u9644\u52A0\u4EFB\u4E00\u6709\u91D1\u989D\u7684\u6708\u4EFD\u53C2\u4E0E\u7D2F\u8BA1\uFF1B\u5F53\u6708\u9884\u6263\u7ED3\u679C\u4E3A\u8D1F\u6570\u65F6\u63090\u5904\u7406\uFF0C\u5E74\u5EA6\u6C47\u7B97\u65F6\u518D\u8BA1\u7B97\u9884\u8BA1\u9000\u7A0E\u3002"],
            taxBracketsTitle: "\u5E74\u5EA6\u4E2A\u4EBA\u6240\u5F97\u7A0E\u7387\u8868",
            caseTitle: "\u6848\u4F8B\u8BF4\u660E",
            caseContent: ["\u516C\u53F8\u5458\u5DE5\u5F20\u4E09\uFF1A2026\u5E741\u6708\u5DE5\u8D4415000\u5143\uFF1B2026\u5E742\u6708\u5DE5\u8D4445000\u5143\uFF1B2026\u5E743\u6708\u5DE5\u8D4415000\u5143\u3002\u6709\u4E00\u4E2A\u6B63\u5728\u4E0A\u5C0F\u5B66\u7684\u513F\u5B50\uFF0C\u5B50\u5973\u6559\u80B2\u6BCF\u6708\u6263\u96641000\u5143\uFF1B\u9996\u5957\u4F4F\u623F\u8D37\u6B3E\u5229\u606F\u652F\u51FA\u6BCF\u67081000\u5143\uFF1B\u7236\u6BCD\u5065\u5728\uFF0C\u4E14\u662F\u72EC\u751F\u5B50\u5973\uFF0C\u8D61\u517B\u8001\u4EBA\u652F\u51FA\u6BCF\u6708\u53EF\u4EE5\u6263\u96642000\u5143\u3002\u4E94\u9669\u4E00\u91D1\u6BCF\u6708\u7F34\u7EB33000\u5143\u3002", "2026\u5E741\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=15000-5000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-3000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-4000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09=3000\u5143\uFF0C\u5E94\u7EB3\u7A0E\u989D=3000\xD73%=90\u5143", "2026\u5E742\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=60000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-10000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-6000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-8000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09=36000\u5143\uFF0C\u5E94\u7EB3\u7A0E\u989D=36000\xD73%-90\uFF08\u5DF2\u9884\u6263\u7A0E\u989D\uFF09=990\u5143", "2026\u5E743\u6708\uFF0C\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D=75000\uFF08\u7D2F\u8BA1\u6536\u5165\uFF09-15000\uFF08\u7D2F\u8BA1\u51CF\u9664\u8D39\u7528\uFF09-9000\uFF08\u7D2F\u8BA1\u4E13\u9879\u6263\u9664\uFF09-12000\uFF08\u7D2F\u8BA1\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF09=39000\u5143\uFF0C\u5E94\u7EB3\u7A0E\u989D=39000\xD710%-2520-1080\uFF08\u5DF2\u9884\u6263\u7A0E\u989D\uFF09=300\u5143"]
          }
        }[a2];
      },
      getTaxBrackets: function() {
        return t.annual;
      }
    };
    exports.monthlySalary = n;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxService.js
var require_taxService = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxService.js"(exports) {
    var a = require_objectSpread2();
    var e = require_geshui();
    var l = require_nzj();
    var c = require_lwbc();
    var t = require_orsd();
    var r = require_lxhl();
    var u = require_gcsd();
    var x = require_cczr();
    var T = require_cbcz();
    var s = require_cczl();
    var o = require_gtgsh();
    var n = require_txq();
    var i = require_jcchtax();
    var f = require_monthlySalary();
    var d = {
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
      var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, l2 = e2.taxType || "", c2 = e2.params || {};
      if (!d[l2])
        return {
          error: true,
          message: "\u4E0D\u652F\u6301\u7684\u7A0E\u79CD\u7C7B\u578B\uFF1A".concat(l2)
        };
      var t2, r2 = d[l2].module;
      t2 = c2.isBackward ? d[l2].calculatePreTax : d[l2].calculateAfterTax;
      var u2 = a({}, c2);
      void 0 !== u2.inputSalary && ("/geshui/" === l2 || "/shgz/" === l2 || "/monthlySalary/" === l2 ? c2.isBackward ? u2.netSalary = u2.inputSalary : u2.preTaxSalary = u2.inputSalary : "/nzj/" === l2 ? c2.isBackward ? u2.netBonus = u2.inputSalary : u2.preTaxBonus = u2.inputSalary : "/cczr/" === l2 ? c2.isBackward ? u2.netSalary = u2.inputSalary : u2.transferPrice = u2.inputSalary : c2.isBackward ? u2.netSalary = u2.inputSalary : u2.preTaxIncome = u2.inputSalary, delete u2.inputSalary);
      try {
        return r2[t2](u2);
      } catch (a2) {
        return {
          error: true,
          message: "\u8BA1\u7B97\u9519\u8BEF\uFF1A".concat(a2.message)
        };
      }
    }
    var P = {
      calculate: m,
      calculateAfterTax: function() {
        var a2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return m(a2);
      },
      calculatePreTax: function() {
        var a2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return a2.params = a2.params || {}, a2.params.isBackward = true, m(a2);
      },
      isTaxTypeSupported: function(a2) {
        return !!d[a2];
      },
      getSupportedTaxTypes: function() {
        return Object.keys(d);
      },
      getFormula: function(a2) {
        var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "monthly", l2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (!d[a2])
          return null;
        var c2 = d[a2].module;
        return "function" == typeof c2.getFormula ? c2.getFormula(e2, l2) : null;
      },
      getTaxBrackets: function(a2, e2) {
        if (!d[a2])
          return [];
        var l2 = d[a2].module;
        return "function" == typeof l2.getTaxBrackets ? l2.getTaxBrackets(e2) : [];
      }
    };
    exports.taxService = P;
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/common/taxFieldConfig.js
var require_taxFieldConfig = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/common/taxFieldConfig.js"(exports) {
    exports.taxFieldConfig = {
      "/geshui/": {
        calculateTypes: [{
          name: "\u6708\u5EA6\u5DE5\u8D44"
        }, {
          name: "\u5E74\u5EA6\u5DE5\u8D44"
        }],
        fields: [{
          textTitle: "\u7F34\u7EB3\u671F\u6570",
          textType: "select",
          inputName: "month",
          inputValue: 1,
          placeholder: "",
          border: false,
          tips: [{
            textType: "tips",
            textTitle: "\u82E5\u4E00\u5E74\u4E2D\u9014\u6362\u5DE5\u4F5C\uFF0C\u90A3\u4E48\u5728\u65B0\u4F01\u4E1A\u7684\u6BCF\u6708\u5DE5\u8D44\u4E2A\u7A0E\u8BA1\u7B97\u4F1A\u4EE5\u5728\u804C\u6708\u6570\u8FDB\u884C\u8BA1\u7B97\uFF0C\u8FD9\u91CC\u8BF7\u9009\u62E9\u5728\u804C\u6708\u6570"
          }],
          optionsValue: [{
            key: 1,
            value: "1\u6708"
          }, {
            key: 2,
            value: "2\u6708"
          }, {
            key: 3,
            value: "3\u6708"
          }, {
            key: 4,
            value: "4\u6708"
          }, {
            key: 5,
            value: "5\u6708"
          }, {
            key: 6,
            value: "6\u6708"
          }, {
            key: 7,
            value: "7\u6708"
          }, {
            key: 8,
            value: "8\u6708"
          }, {
            key: 9,
            value: "9\u6708"
          }, {
            key: 10,
            value: "10\u6708"
          }, {
            key: 11,
            value: "11\u6708"
          }, {
            key: 12,
            value: "12\u6708"
          }]
        }, {
          textTitle: {
            monthly: "\u672C\u6708\u5DE5\u8D44\u6536\u5165(\u5143)",
            annual: "\u7A0E\u524D\u6708\u5E73\u5747\u5DE5\u8D44(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            monthly: "\u8BF7\u8F93\u5165\u5E94\u53D1\u5DE5\u8D44",
            annual: "\u8BF7\u8F93\u5165\u7A0E\u524D\u6708\u5E73\u5747\u5DE5\u8D44"
          },
          border: true
        }, {
          textTitle: "\u4E94\u9669\u4E00\u91D1(\u5143)",
          textType: "input",
          inputName: "insurance",
          inputValue: "",
          placeholder: "\u8BF7\u8F93\u5165\u4E94\u9669\u4E00\u91D1",
          border: true,
          tips: "\u6BCF\u6708\u4FDD\u9669\u548C\u516C\u79EF\u91D1\u5408\u8BA1\u91D1\u989D"
        }, {
          textTitle: "\u4E13\u9879\u9644\u52A0\u6263\u9664(\u5143)",
          textType: "input",
          inputName: "specialDeduction",
          inputValue: "",
          placeholder: "\u8BF7\u8BA1\u7B97\u6263\u9664\u91D1\u989D",
          border: false,
          tips: "\u5B50\u5973\u6559\u80B2\u3001\u8D61\u517B\u8001\u4EBA\u7B49\u652F\u51FA"
        }]
      },
      "/nzj/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u5E94\u53D1\u5E74\u7EC8\u5956(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u5E94\u53D1\u5E74\u7EC8\u5956",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }]
      },
      "/lwbc/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u52B3\u52A1\u62A5\u916C(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u52B3\u52A1\u62A5\u916C",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }, {
          textTitle: "\u7EB3\u7A0E\u4EBA\u7C7B\u578B",
          textType: "subsection",
          inputName: "taxpayerType",
          inputValue: "resident",
          placeholder: "\u8BF7\u9009\u62E9\u7EB3\u7A0E\u4EBA\u7C7B\u578B",
          border: false,
          optionsValue: [{
            key: "resident",
            value: "\u5C45\u6C11\u9884\u6263\u9884\u7F34"
          }, {
            key: "non-resident",
            value: "\u975E\u5C45\u6C11\u6263\u7F34"
          }]
        }]
      },
      "/orsd/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u5076\u7136\u6536\u5165\u6240\u5F97(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u5076\u7136\u6536\u5165\u6240\u5F97",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }]
      },
      "/lxhl/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u5229\u606F\u3001\u80A1\u606F\u7EA2\u5229\u6240\u5F97(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u5229\u606F\u3001\u80A1\u606F\u7EA2\u5229\u6240\u5F97",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }]
      },
      "/gcsd/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u7A3F\u916C\u6240\u5F97(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u7A3F\u916C\u6240\u5F97",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }, {
          textTitle: "\u7EB3\u7A0E\u4EBA\u7C7B\u578B",
          textType: "subsection",
          inputName: "taxpayerType",
          inputValue: "resident",
          placeholder: "\u8BF7\u9009\u62E9\u7EB3\u7A0E\u4EBA\u7C7B\u578B",
          border: false,
          optionsValue: [{
            key: "resident",
            value: "\u5C45\u6C11\u9884\u6263\u9884\u7F34"
          }, {
            key: "non-resident",
            value: "\u975E\u5C45\u6C11\u6263\u7F34"
          }]
        }]
      },
      "/cczr/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u8F6C\u8BA9\u6536\u5165\u91D1\u989D(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u8F6C\u8BA9\u6536\u5165\u91D1\u989D",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: true
        }, {
          textTitle: "\u8D22\u4EA7\u539F\u503C(\u5143)",
          textType: "input",
          inputName: "originalPrice",
          inputValue: "",
          placeholder: "\u8BF7\u8F93\u5165\u8D22\u4EA7\u539F\u503C",
          border: true
        }, {
          textTitle: "\u5408\u7406\u8D39\u7528(\u5143)",
          textType: "input",
          inputName: "reasonableFee",
          inputValue: "",
          placeholder: "\u8BF7\u8F93\u5165\u5408\u7406\u8D39\u7528",
          border: false,
          tips: [{
            textType: "tips",
            textTitle: "*\u4F8B\u5982\u7A0E\u8D39\u3001\u88C5\u4FEE\u8D39\u7B49"
          }]
        }]
      },
      "/cbcz/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u7ECF\u8425\u6536\u5165(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u7ECF\u8425\u6536\u5165",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }, {
          textTitle: "\u6210\u672C\u3001\u8D39\u7528\u53CA\u635F\u5931",
          textType: "input",
          inputName: "costs",
          inputValue: "",
          placeholder: "\u8BF7\u8F93\u5165\u6210\u672C\u3001\u8D39\u7528\u53CA\u635F\u5931",
          border: false
        }]
      },
      "/cczl/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u8D22\u4EA7\u79DF\u8D41\u6240\u5F97(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u8D22\u4EA7\u79DF\u8D41\u6240\u5F97",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }]
      },
      "/gtgsh/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u7ECF\u8425\u6240\u5F97(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u7ECF\u8425\u6240\u5F97",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }, {
          textTitle: "\u6210\u672C\u3001\u8D39\u7528\u53CA\u635F\u5931",
          textType: "input",
          inputName: "costs",
          inputValue: "",
          placeholder: "\u8BF7\u8F93\u5165\u6210\u672C\u3001\u8D39\u7528\u53CA\u635F\u5931",
          border: false
        }]
      },
      "/txq/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u7279\u8BB8\u6743\u4F7F\u7528\u8D39\u6240\u5F97(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u7279\u8BB8\u6743\u4F7F\u7528\u8D39\u6240\u5F97",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }, {
          textTitle: "\u7EB3\u7A0E\u4EBA\u7C7B\u578B",
          textType: "subsection",
          inputName: "taxpayerType",
          inputValue: "resident",
          placeholder: "\u8BF7\u9009\u62E9\u7EB3\u7A0E\u4EBA\u7C7B\u578B",
          border: false,
          optionsValue: [{
            key: "resident",
            value: "\u5C45\u6C11\u9884\u6263\u9884\u7F34"
          }, {
            key: "non-resident",
            value: "\u975E\u5C45\u6C11\u6263\u7F34"
          }]
        }]
      },
      "/jcchtax/": {
        calculateTypes: [{
          name: "\u6B63\u63A8\u7A0E\u540E"
        }, {
          name: "\u53CD\u63A8\u7A0E\u524D"
        }],
        fields: [{
          textTitle: {
            forward: "\u79BB\u804C\u8865\u507F\u91D1\u989D(\u5143)",
            backward: "\u7A0E\u540E\u6240\u5F97(\u5143)"
          },
          textType: "input",
          inputName: "inputSalary",
          inputValue: "",
          placeholder: {
            forward: "\u8BF7\u8F93\u5165\u79BB\u804C\u8865\u507F\u91D1\u989D",
            backward: "\u8BF7\u8F93\u5165\u7A0E\u540E\u6240\u5F97"
          },
          border: false
        }, {
          textTitle: "\u5F53\u5730\u4E0A\u5E74\u793E\u5E73\u5DE5\u8D44(\u5143)",
          textType: "input",
          inputName: "avgSalary",
          inputValue: "",
          placeholder: "\u8BF7\u8F93\u5165\u5F53\u5730\u4E0A\u5E74\u793E\u5E73\u5DE5\u8D44",
          border: false
        }]
      },
      "/nxch/": {
        calculateTypes: [{
          name: "\u5E74\u85AA\u7B79\u5212"
        }],
        fields: [{
          textTitle: "\u5DE5\u8D44(\u5143)",
          textType: "input",
          inputName: "income",
          inputValue: "",
          placeholder: "\u8BF7\u8F93\u5165\u5DE5\u8D44",
          border: true
        }, {
          textTitle: "\u5E74\u7EC8\u5956(\u5143)",
          textType: "input",
          inputName: "yearAward",
          inputValue: "",
          placeholder: "\u8BF7\u8F93\u5165\u5E74\u7EC8\u5956",
          border: true
        }, {
          textTitle: "\u4E94\u9669\u4E00\u91D1(\u5143)",
          textType: "input",
          inputName: "monthInsure",
          inputValue: "",
          placeholder: "\u8BF7\u8F93\u5165\u4E94\u9669\u4E00\u91D1",
          border: true
        }]
      }
    };
  }
});

// projects/idphoto-tax-uniapp/build/tax-src/entry.cjs
var require_entry = __commonJS({
  "projects/idphoto-tax-uniapp/build/tax-src/entry.cjs"(exports, module) {
    var { taxService } = require_taxService();
    var { taxFieldConfig } = require_taxFieldConfig();
    var { utils } = require_utils();
    module.exports = { taxService, taxFieldConfig, utils };
  }
});
export default require_entry();
