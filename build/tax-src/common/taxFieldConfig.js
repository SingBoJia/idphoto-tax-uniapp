exports.taxFieldConfig = {
        "/geshui/": {
            calculateTypes: [{
                name: "月度工资"
            }, {
                name: "年度工资"
            }],
            fields: [{
                textTitle: "缴纳期数",
                textType: "select",
                inputName: "month",
                inputValue: 1,
                placeholder: "",
                border: !1,
                tips: [{
                    textType: "tips",
                    textTitle: "若一年中途换工作，那么在新企业的每月工资个税计算会以在职月数进行计算，这里请选择在职月数"
                }],
                optionsValue: [{
                    key: 1,
                    value: "1月"
                }, {
                    key: 2,
                    value: "2月"
                }, {
                    key: 3,
                    value: "3月"
                }, {
                    key: 4,
                    value: "4月"
                }, {
                    key: 5,
                    value: "5月"
                }, {
                    key: 6,
                    value: "6月"
                }, {
                    key: 7,
                    value: "7月"
                }, {
                    key: 8,
                    value: "8月"
                }, {
                    key: 9,
                    value: "9月"
                }, {
                    key: 10,
                    value: "10月"
                }, {
                    key: 11,
                    value: "11月"
                }, {
                    key: 12,
                    value: "12月"
                }]
            }, {
                textTitle: {
                    monthly: "本月工资收入(元)",
                    annual: "税前月平均工资(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    monthly: "请输入应发工资",
                    annual: "请输入税前月平均工资"
                },
                border: !0
            }, {
                textTitle: "五险一金(元)",
                textType: "input",
                inputName: "insurance",
                inputValue: "",
                placeholder: "请输入五险一金",
                border: !0,
                tips: "每月保险和公积金合计金额"
            }, {
                textTitle: "专项附加扣除(元)",
                textType: "input",
                inputName: "specialDeduction",
                inputValue: "",
                placeholder: "请计算扣除金额",
                border: !1,
                tips: "子女教育、赡养老人等支出"
            }]
        },
        "/nzj/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "应发年终奖(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入应发年终奖",
                    backward: "请输入税后所得"
                },
                border: !1
            }]
        },
        "/lwbc/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "劳务报酬(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入劳务报酬",
                    backward: "请输入税后所得"
                },
                border: !1
            }, {
                textTitle: "纳税人类型",
                textType: "subsection",
                inputName: "taxpayerType",
                inputValue: "resident",
                placeholder: "请选择纳税人类型",
                border: !1,
                optionsValue: [{
                    key: "resident",
                    value: "居民预扣预缴"
                }, {
                    key: "non-resident",
                    value: "非居民扣缴"
                }]
            }]
        },
        "/orsd/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "偶然收入所得(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入偶然收入所得",
                    backward: "请输入税后所得"
                },
                border: !1
            }]
        },
        "/lxhl/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "利息、股息红利所得(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入利息、股息红利所得",
                    backward: "请输入税后所得"
                },
                border: !1
            }]
        },
        "/gcsd/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "稿酬所得(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入稿酬所得",
                    backward: "请输入税后所得"
                },
                border: !1
            }, {
                textTitle: "纳税人类型",
                textType: "subsection",
                inputName: "taxpayerType",
                inputValue: "resident",
                placeholder: "请选择纳税人类型",
                border: !1,
                optionsValue: [{
                    key: "resident",
                    value: "居民预扣预缴"
                }, {
                    key: "non-resident",
                    value: "非居民扣缴"
                }]
            }]
        },
        "/cczr/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "转让收入金额(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入转让收入金额",
                    backward: "请输入税后所得"
                },
                border: !0
            }, {
                textTitle: "财产原值(元)",
                textType: "input",
                inputName: "originalPrice",
                inputValue: "",
                placeholder: "请输入财产原值",
                border: !0
            }, {
                textTitle: "合理费用(元)",
                textType: "input",
                inputName: "reasonableFee",
                inputValue: "",
                placeholder: "请输入合理费用",
                border: !1,
                tips: [{
                    textType: "tips",
                    textTitle: "*例如税费、装修费等"
                }]
            }]
        },
        "/cbcz/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "经营收入(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入经营收入",
                    backward: "请输入税后所得"
                },
                border: !1
            }, {
                textTitle: "成本、费用及损失",
                textType: "input",
                inputName: "costs",
                inputValue: "",
                placeholder: "请输入成本、费用及损失",
                border: !1
            }]
        },
        "/cczl/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "财产租赁所得(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入财产租赁所得",
                    backward: "请输入税后所得"
                },
                border: !1
            }]
        },
        "/gtgsh/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "经营所得(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入经营所得",
                    backward: "请输入税后所得"
                },
                border: !1
            }, {
                textTitle: "成本、费用及损失",
                textType: "input",
                inputName: "costs",
                inputValue: "",
                placeholder: "请输入成本、费用及损失",
                border: !1
            }]
        },
        "/txq/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "特许权使用费所得(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入特许权使用费所得",
                    backward: "请输入税后所得"
                },
                border: !1
            }, {
                textTitle: "纳税人类型",
                textType: "subsection",
                inputName: "taxpayerType",
                inputValue: "resident",
                placeholder: "请选择纳税人类型",
                border: !1,
                optionsValue: [{
                    key: "resident",
                    value: "居民预扣预缴"
                }, {
                    key: "non-resident",
                    value: "非居民扣缴"
                }]
            }]
        },
        "/jcchtax/": {
            calculateTypes: [{
                name: "正推税后"
            }, {
                name: "反推税前"
            }],
            fields: [{
                textTitle: {
                    forward: "离职补偿金额(元)",
                    backward: "税后所得(元)"
                },
                textType: "input",
                inputName: "inputSalary",
                inputValue: "",
                placeholder: {
                    forward: "请输入离职补偿金额",
                    backward: "请输入税后所得"
                },
                border: !1
            }, {
                textTitle: "当地上年社平工资(元)",
                textType: "input",
                inputName: "avgSalary",
                inputValue: "",
                placeholder: "请输入当地上年社平工资",
                border: !1
            }]
        },
        "/nxch/": {
            calculateTypes: [{
                name: "年薪筹划"
            }],
            fields: [{
                textTitle: "工资(元)",
                textType: "input",
                inputName: "income",
                inputValue: "",
                placeholder: "请输入工资",
                border: !0
            }, {
                textTitle: "年终奖(元)",
                textType: "input",
                inputName: "yearAward",
                inputValue: "",
                placeholder: "请输入年终奖",
                border: !0
            }, {
                textTitle: "五险一金(元)",
                textType: "input",
                inputName: "monthInsure",
                inputValue: "",
                placeholder: "请输入五险一金",
                border: !0
            }]
        }
    };