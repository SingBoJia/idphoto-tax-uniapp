var r = {
        formatNumber: function(r) {
            var t = Math.max(0, Number(r));
            if (0 === t) return "0";
            var e = t.toFixed(2);
            return e.endsWith(".00") ? e.split(".")[0] : e
        }
    };
    exports.utils = r;