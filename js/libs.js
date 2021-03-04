function ftg_getURLParameter(t) {
    return decodeURIComponent((new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
}
if (function(t) {
        t.fn.autoComplete = function(e) {
            var o = t.extend({}, t.fn.autoComplete.defaults, e);
            return "string" == typeof e ? (this.each(function() {
                var o = t(this);
                "destroy" == e && (t(window).off("resize.autocomplete", o.updateSC), o.off("blur.autocomplete focus.autocomplete keydown.autocomplete keyup.autocomplete"), o.data("autocomplete") ? o.attr("autocomplete", o.data("autocomplete")) : o.removeAttr("autocomplete"), t(o.data("sc")).remove(), o.removeData("sc").removeData("autocomplete"))
            }), this) : this.each(function() {
                function e(t) {
                    var e = i.val();
                    if (i.cache[e] = t, t.length && e.length >= o.minChars) {
                        for (var n = "", s = 0; s < t.length; s++) n += o.renderItem(t[s], e);
                        i.sc.html(n), i.updateSC(0)
                    } else i.sc.hide()
                }
                var i = t(this);
                i.sc = t(".mega-search__suggestions"), i.data("sc", i.sc).data("autocomplete", i.attr("autocomplete")), i.attr("autocomplete", "off"), i.cache = {}, i.last_val = "", i.updateSC = function(e, o) {
                    if (!e && (i.sc.show(), i.sc.maxHeight || (i.sc.maxHeight = parseInt(i.sc.css("max-height"))), i.sc.suggestionHeight || (i.sc.suggestionHeight = t(".autocomplete-suggestion", i.sc).first().outerHeight()), i.sc.suggestionHeight))
                        if (o) {
                            var n = i.sc.scrollTop(),
                                s = o.offset().top - i.sc.offset().top;
                            s + i.sc.suggestionHeight - i.sc.maxHeight > 0 ? i.sc.scrollTop(s + i.sc.suggestionHeight + n - i.sc.maxHeight) : 0 > s && i.sc.scrollTop(s + n)
                        } else i.sc.scrollTop(0)
                }, t(window).on("resize.autocomplete", i.updateSC), i.sc.on("mouseleave", ".autocomplete-suggestion", function() {
                    t(".autocomplete-suggestion.selected").removeClass("selected")
                }), i.sc.on("mouseenter", ".autocomplete-suggestion", function() {
                    t(".autocomplete-suggestion.selected").removeClass("selected"), t(this).addClass("selected")
                }), i.sc.on("mousedown", ".autocomplete-suggestion", function(e) {
                    var n = t(this),
                        s = n.data("val");
                    return (s || n.hasClass("autocomplete-suggestion")) && (i.val(s), o.onSelect(e, s, n), i.sc.hide()), !1
                }), i.on("blur.autocomplete", function() {
                    try {
                        over_sb = t(".autocomplete-suggestions:hover").length
                    } catch (e) {
                        over_sb = 0
                    }
                    over_sb ? i.is(":focus") || setTimeout(function() {
                        i.focus()
                    }, 20) : (i.last_val = i.val(), i.sc.hide(), setTimeout(function() {
                        i.sc.hide()
                    }, 350))
                }), o.minChars || i.on("focus.autocomplete", function() {
                    i.last_val = "\n", i.trigger("keyup.autocomplete")
                }), i.on("keydown.autocomplete", function(e) {
                    if ((40 == e.which || 38 == e.which) && i.sc.html()) {
                        var n, s = t(".autocomplete-suggestion.selected", i.sc);
                        return s.length ? (n = 40 == e.which ? s.next(".autocomplete-suggestion") : s.prev(".autocomplete-suggestion"), n.length ? (s.removeClass("selected"), n.addClass("selected")) : (s.removeClass("selected"), n = 0)) : (n = 40 == e.which ? t(".autocomplete-suggestion", i.sc).first() : t(".autocomplete-suggestion", i.sc).last(), n.addClass("selected")), i.updateSC(0, n), !1
                    }
                    if (27 == e.which) i.val(i.last_val).sc.hide();
                    else if (13 == e.which || 9 == e.which) {
                        var s = t(".autocomplete-suggestion.selected", i.sc);
                        s.length && i.sc.is(":visible") && (o.onSelect(e, s.data("val"), s), setTimeout(function() {
                            i.sc.hide()
                        }, 20))
                    }
                }), i.on("keyup.autocomplete", function(n) {
                    if (!~t.inArray(n.which, [13, 27, 35, 36, 37, 38, 39, 40])) {
                        var s = i.val();
                        if (s.length >= o.minChars) {
                            if (s != i.last_val) {
                                if (i.last_val = s, clearTimeout(i.timer), o.cache) {
                                    if (s in i.cache) return void e(i.cache[s]);
                                    for (var r = 1; r < s.length - o.minChars; r++) {
                                        var a = s.slice(0, s.length - r);
                                        if (a in i.cache && !i.cache[a].length) return void e([])
                                    }
                                }
                                i.timer = setTimeout(function() {
                                    o.source(s, e)
                                }, o.delay)
                            }
                        } else i.last_val = s, i.sc.hide()
                    }
                })
            })
        }, t.fn.autoComplete.defaults = {
            source: 0,
            minChars: 3,
            delay: 150,
            cache: 1,
            menuClass: "",
            appendTo: "body",
            renderItem: function(t, e) {
                e = e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                var o = new RegExp("(" + e.split(" ").join("|") + ")", "gi");
                return '<div class="autocomplete-suggestion" data-val="' + t + '">' + t.replace(o, "<b>$1</b>") + "</div>"
            },
            onSelect: function(t, e, o) {}
        }
    }(jQuery), function(t) {
        var e = 0,
            o = "scrollIntoView" in document.createElement("li");
        t.fn.awesomecomplete = function(i) {
            var i = t.extend({}, t.fn.awesomecomplete.defaults, i);
            return this.each(function() {
                var s = t(this),
                    r = t.meta ? t.extend({}, i, s.data()) : i;
                s.data("awesomecomplete-config", r);
                var a = t(r.attachTo || s),
                    l = t("<ul/>");
                r.wrapSuggestions ? l.appendTo(a) : l.insertAfter(a), l.hide().addClass(r.suggestionListClass).css("width", a.innerWidth()), s.data("awesomecomplete-list", l);
                var c, d = !1;
                s.keyup(function(t) {
                    return d ? void(d = !1) : void(t.which > 36 && t.which < 41 || 16 == t.which || (r.typingDelay > 0 ? (clearTimeout(c), c = setTimeout(function() {
                        n(s)
                    }, r.typingDelay)) : n(s)))
                }), s.keydown(function(t) {
                    var e = l.children("li." + r.activeItemClass);
                    switch (t.which) {
                        case 13:
                            0 !== e.length && l.is(":visible") && (t.preventDefault(), s.val(e.data("awesomecomplete-value")), r.onComplete(e.data("awesomecomplete-dataItem")), l.hide()), l.hide(), d = !0;
                            break;
                        case 38:
                            t.preventDefault(), 0 === e.length ? l.children("li:last-child").addClass(r.activeItemClass) : (e.prev().addClass(r.activeItemClass), e.removeClass(r.activeItemClass));
                            break;
                        case 40:
                            t.preventDefault(), 0 === e.length ? l.children("li:first-child").addClass(r.activeItemClass) : e.is(":not(:last-child)") && (e.next().addClass(r.activeItemClass), e.removeClass(r.activeItemClass));
                            break;
                        case 27:
                            l.hide(), d = !0
                    }
                    if (o && l.is(":visible")) {
                        var e = l.children("li." + r.activeItemClass);
                        e.length > 0 && e.get(0).scrollIntoView(!1)
                    }
                }), s.keypress(function(t) {
                    l.children("li." + r.activeItemClass);
                    13 == t.which && l.children("li." + r.activeItemClass).length > 0 && t.preventDefault()
                });
                var u = !1,
                    p = !1;
                t(document).bind("mousedown.awesomecomplete" + ++e, function() {
                    u = !0
                }), t(document).bind("mouseup.awesomecomplete" + e, function() {
                    u = !1, p && (p = !1, l.hide())
                }), s.blur(function() {
                    if (u) p = !0;
                    else {
                        var t = l.children("li." + r.activeItemClass);
                        l.is(":visible") && 0 !== t.length && s.val(t.data("awesomecomplete-value")), l.hide()
                    }
                }), s.focus(function() {
                    l.children(":not(." + r.noResultsClass + ")").length > 0 && l.show()
                })
            })
        };
        var i = function(e, o) {
                return function(i) {
                    t(".autocomplete__spinner").hide(), s(e, i, o)
                }
            },
            n = function(e) {
                var o = e.val();
                t(".autocomplete__spinner").show(), e.data("awesomecomplete-list").hide(), "function" == typeof e.data("awesomecomplete-config").dataMethod ? e.data("awesomecomplete-config").dataMethod(o, e, i(e, o)) : s(e, e.data("awesomecomplete-config").staticData, o)
            },
            s = function(e, o, i) {
                var n = e.data("awesomecomplete-list");
                if (n.empty().hide(), "" !== i) {
                    for (var s = e.data("awesomecomplete-config"), r = [], a = 0; a < o.length; a++) {
                        var l = jQuery.extend({}, o[a]);
                        r.push({
                            dataItem: l,
                            originalDataItem: o[a]
                        })
                    }
                    r.sort(function(t, e) {
                        return s.sortFunction(t, e, i)
                    }), r = r.slice(0, s.resultLimit);
                    for (var c in r) r.hasOwnProperty(c) && t('<li class="' + s.itemClass + '">' + s.renderFunction(r[c].dataItem, i, r[c].topMatch, r[c].originalDataItem, s) + "</li>").data("awesomecomplete-dataItem", r[c].originalDataItem).data("awesomecomplete-value", s.valueFunction(r[c].originalDataItem, s)).appendTo(n).click(function() {
                        var o = t(this);
                        e.val(o.data("awesomecomplete-value")), s.onComplete(o.data("awesomecomplete-dataItem"))
                    }).mouseover(function() {
                        t(this).addClass(s.activeItemClass).siblings().removeClass(s.activeItemClass)
                    });
                    void 0 !== s.noResultsMessage && 0 == r.length && n.append(t('<li class="' + s.noResultsClass + '">' + s.noResultsMessage + "</li>")), (r.length > 0 || void 0 !== s.noResultsMessage) && n.show()
                }
            },
            r = function(t, e, o, i) {
                return e === i.nameField || null === e ? '<p class="title">' + t[i.nameField] + "</p>" : '<p class="title">' + t[i.nameField] + '</p><p class="matchRow"><span class="matchedField">' + e + "</span>: " + t[e] + "</p>"
            },
            a = function(t, e) {
                return t[e.nameField]
            },
            l = function(t, e, o) {
                return t.matchedTermCount == e.matchedTermCount ? e.matchCount - t.matchCount : e.matchedTermCount - t.matchedTermCount
            };
        t.fn.awesomecomplete.defaults = {
            activeItemClass: "active",
            itemClass: "item",
            attachTo: void 0,
            wrapSuggestions: !1,
            dataMethod: void 0,
            dontMatch: [],
            highlightMatches: !0,
            highlightClass: "match",
            ignoreCase: !0,
            nameField: "name",
            noResultsClass: "noResults",
            noResultsMessage: void 0,
            onComplete: function(t) {},
            sortFunction: l,
            splitTerm: !0,
            staticData: [],
            suggestionListClass: "autocomplete",
            renderFunction: r,
            resultLimit: 10,
            typingDelay: 0,
            valueFunction: a,
            wordDelimiter: /[^\da-z]+/gi
        }
    }(jQuery), function(t, e) {
        "function" == typeof define && define.amd ? define([], function() {
            return t.returnExportsGlobal = e()
        }) : "object" == typeof exports ? module.exports = e() : t.bouncefix = e()
    }(this, function() {
        var t;
        t = function() {
            function t(t, e, o, i) {
                this.el = t, this.eventName = e, this.handler = o, this.context = i, this.add()
            }
            return t.prototype._handler = function(t, e) {
                var o = {};
                for (var i in t) o[i] = t[i];
                o.stopPropagation = function() {
                    t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
                }, o.preventDefault = function() {
                    t.preventDefault ? t.preventDefault() : t.returnValue = !1
                }, this.handler.call(this.context || e, o)
            }, t.prototype.add = function() {
                var t = this;
                t.cachedHandler = function(e) {
                    t._handler.call(t, e, this)
                }, t.el.addEventListener(t.eventName, t.cachedHandler, !1)
            }, t.prototype.remove = function() {
                this.el.removeEventListener(this.eventName, this.cachedHandler)
            }, t
        }();
        var e;
        e = function() {
            var t = {};
            return t.getTargetedEl = function(t, e) {
                for (;;) {
                    if (t.classList.contains(e)) break;
                    if (!(t = t.parentElement)) break
                }
                return t
            }, t.isScrollable = function(t) {
                return t.scrollHeight > t.offsetHeight
            }, t.scrollToEnd = function(t) {
                var e = t.scrollTop,
                    o = t.offsetHeight,
                    i = t.scrollHeight;
                0 >= e && (t.scrollTop = 1), e + o >= i && (t.scrollTop = i - o - 1)
            }, t
        }();
        var o;
        o = function(t, e) {
            var o = function(e) {
                if (!(this instanceof o)) return new o(e);
                if (!e) throw new Error('"className" argument is required');
                this.className = e, this.startListener = new t(document, "touchstart", this.touchStart, this), this.endListener = new t(document, "touchend", this.touchEnd, this)
            };
            return o.prototype.touchStart = function(o) {
                var i = e.getTargetedEl(o.target, this.className);
                return i && e.isScrollable(i) ? e.scrollToEnd(i) : void(i && !this.moveListener && (this.moveListener = new t(i, "touchmove", this.touchMove, this)))
            }, o.prototype.touchMove = function(t) {
                t.preventDefault()
            }, o.prototype.touchEnd = function(t) {
                this.moveListener && (this.moveListener.remove(), delete this.moveListener)
            }, o.prototype.remove = function() {
                this.startListener.remove(), this.endListener.remove()
            }, o
        }(t, e);
        var i;
        return i = function(t) {
            var e = {
                cache: {}
            };
            return e.add = function(e) {
                this.cache[e] || (this.cache[e] = new t(e))
            }, e.remove = function(t) {
                this.cache[t] && (this.cache[t].remove(), delete this.cache[t])
            }, e
        }(o)
    }), function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
    }(function(t) {
        function e(t) {
            return a.raw ? t : encodeURIComponent(t)
        }

        function o(t) {
            return a.raw ? t : decodeURIComponent(t)
        }

        function i(t) {
            return e(a.json ? JSON.stringify(t) : String(t))
        }

        function n(t) {
            0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return t = decodeURIComponent(t.replace(r, " ")), a.json ? JSON.parse(t) : t
            } catch (e) {}
        }

        function s(e, o) {
            var i = a.raw ? e : n(e);
            return t.isFunction(o) ? o(i) : i
        }
        var r = /\+/g,
            a = t.cookie = function(n, r, l) {
                if (arguments.length > 1 && !t.isFunction(r)) {
                    if (l = t.extend({}, a.defaults, l), "number" == typeof l.expires) {
                        var c = l.expires,
                            d = l.expires = new Date;
                        d.setTime(+d + 864e5 * c)
                    }
                    return document.cookie = [e(n), "=", i(r), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                }
                for (var u = n ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], m = 0, h = p.length; h > m; m++) {
                    var f = p[m].split("="),
                        g = o(f.shift()),
                        y = f.join("=");
                    if (n && n === g) {
                        u = s(y, r);
                        break
                    }
                    n || void 0 === (y = s(y)) || (u[g] = y)
                }
                return u
            };
        a.defaults = {}, t.removeCookie = function(e, o) {
            return void 0 === t.cookie(e) ? !1 : (t.cookie(e, "", t.extend({}, o, {
                expires: -1
            })), !t.cookie(e))
        }
    }), "undefined" == typeof Currency) var Currency = {};
Currency.cookie = {
    configuration: {
        expires: 365,
        path: "/",
        domain: window.location.hostname
    },
    name: "currency",
    write: function(t) {
        jQuery.cookie(this.name, t, this.configuration)
    },
    read: function() {
        return jQuery.cookie(this.name)
    },
    destroy: function() {
        jQuery.cookie(this.name, null, this.configuration)
    }
}, Currency.moneyFormats = {
    USD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} USD"
    },
    EUR: {
        money_format: "&euro;{{amount}}",
        money_with_currency_format: "&euro;{{amount}} EUR"
    },
    GBP: {
        money_format: "&pound;{{amount}}",
        money_with_currency_format: "&pound;{{amount}} GBP"
    },
    CAD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} CAD"
    },
    ALL: {
        money_format: "Lek {{amount}}",
        money_with_currency_format: "Lek {{amount}} ALL"
    },
    DZD: {
        money_format: "DA {{amount}}",
        money_with_currency_format: "DA {{amount}} DZD"
    },
    AOA: {
        money_format: "Kz{{amount}}",
        money_with_currency_format: "Kz{{amount}} AOA"
    },
    ARS: {
        money_format: "${{amount_with_comma_separator}}",
        money_with_currency_format: "${{amount_with_comma_separator}} ARS"
    },
    AMD: {
        money_format: "{{amount}} AMD",
        money_with_currency_format: "{{amount}} AMD"
    },
    AWG: {
        money_format: "Afl{{amount}}",
        money_with_currency_format: "Afl{{amount}} AWG"
    },
    AUD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} AUD"
    },
    BBD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} Bds"
    },
    AZN: {
        money_format: "m.{{amount}}",
        money_with_currency_format: "m.{{amount}} AZN"
    },
    BDT: {
        money_format: "Tk {{amount}}",
        money_with_currency_format: "Tk {{amount}} BDT"
    },
    BSD: {
        money_format: "BS${{amount}}",
        money_with_currency_format: "BS${{amount}} BSD"
    },
    BHD: {
        money_format: "{{amount}}0 BD",
        money_with_currency_format: "{{amount}}0 BHD"
    },
    BYR: {
        money_format: "Br {{amount}}",
        money_with_currency_format: "Br {{amount}} BYR"
    },
    BZD: {
        money_format: "BZ${{amount}}",
        money_with_currency_format: "BZ${{amount}} BZD"
    },
    BTN: {
        money_format: "Nu {{amount}}",
        money_with_currency_format: "Nu {{amount}} BTN"
    },
    BAM: {
        money_format: "KM {{amount_with_comma_separator}}",
        money_with_currency_format: "KM {{amount_with_comma_separator}} BAM"
    },
    BRL: {
        money_format: "R$ {{amount_with_comma_separator}}",
        money_with_currency_format: "R$ {{amount_with_comma_separator}} BRL"
    },
    BOB: {
        money_format: "Bs{{amount_with_comma_separator}}",
        money_with_currency_format: "Bs{{amount_with_comma_separator}} BOB"
    },
    BWP: {
        money_format: "P{{amount}}",
        money_with_currency_format: "P{{amount}} BWP"
    },
    BND: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} BND"
    },
    BGN: {
        money_format: "{{amount}} Ð»Ð²",
        money_with_currency_format: "{{amount}} Ð»Ð² BGN"
    },
    MMK: {
        money_format: "K{{amount}}",
        money_with_currency_format: "K{{amount}} MMK"
    },
    KHR: {
        money_format: "KHR{{amount}}",
        money_with_currency_format: "KHR{{amount}}"
    },
    KYD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} KYD"
    },
    XAF: {
        money_format: "FCFA{{amount}}",
        money_with_currency_format: "FCFA{{amount}} XAF"
    },
    CLP: {
        money_format: "${{amount_no_decimals}}",
        money_with_currency_format: "${{amount_no_decimals}} CLP"
    },
    CNY: {
        money_format: "&#165;{{amount}}",
        money_with_currency_format: "&#165;{{amount}} CNY"
    },
    COP: {
        money_format: "${{amount_with_comma_separator}}",
        money_with_currency_format: "${{amount_with_comma_separator}} COP"
    },
    CRC: {
        money_format: "&#8353; {{amount_with_comma_separator}}",
        money_with_currency_format: "&#8353; {{amount_with_comma_separator}} CRC"
    },
    HRK: {
        money_format: "{{amount_with_comma_separator}} kn",
        money_with_currency_format: "{{amount_with_comma_separator}} kn HRK"
    },
    CZK: {
        money_format: "{{amount_with_comma_separator}} K&#269;",
        money_with_currency_format: "{{amount_with_comma_separator}} K&#269;"
    },
    DKK: {
        money_format: "{{amount_with_comma_separator}}",
        money_with_currency_format: "kr.{{amount_with_comma_separator}}"
    },
    DOP: {
        money_format: "RD$ {{amount}}",
        money_with_currency_format: "RD$ {{amount}}"
    },
    XCD: {
        money_format: "${{amount}}",
        money_with_currency_format: "EC${{amount}}"
    },
    EGP: {
        money_format: "LE {{amount}}",
        money_with_currency_format: "LE {{amount}} EGP"
    },
    ETB: {
        money_format: "Br{{amount}}",
        money_with_currency_format: "Br{{amount}} ETB"
    },
    XPF: {
        money_format: "{{amount_no_decimals_with_comma_separator}} XPF",
        money_with_currency_format: "{{amount_no_decimals_with_comma_separator}} XPF"
    },
    FJD: {
        money_format: "${{amount}}",
        money_with_currency_format: "FJ${{amount}}"
    },
    GMD: {
        money_format: "D {{amount}}",
        money_with_currency_format: "D {{amount}} GMD"
    },
    GHS: {
        money_format: "GH&#8373;{{amount}}",
        money_with_currency_format: "GH&#8373;{{amount}}"
    },
    GTQ: {
        money_format: "Q{{amount}}",
        money_with_currency_format: "{{amount}} GTQ"
    },
    GYD: {
        money_format: "G${{amount}}",
        money_with_currency_format: "${{amount}} GYD"
    },
    GEL: {
        money_format: "{{amount}} GEL",
        money_with_currency_format: "{{amount}} GEL"
    },
    HNL: {
        money_format: "L {{amount}}",
        money_with_currency_format: "L {{amount}} HNL"
    },
    HKD: {
        money_format: "${{amount}}",
        money_with_currency_format: "HK${{amount}}"
    },
    HUF: {
        money_format: "{{amount_no_decimals_with_comma_separator}}",
        money_with_currency_format: "{{amount_no_decimals_with_comma_separator}} Ft"
    },
    ISK: {
        money_format: "{{amount_no_decimals}} kr",
        money_with_currency_format: "{{amount_no_decimals}} kr ISK"
    },
    INR: {
        money_format: "Rs. {{amount}}",
        money_with_currency_format: "Rs. {{amount}}"
    },
    IDR: {
        money_format: "{{amount_with_comma_separator}}",
        money_with_currency_format: "Rp {{amount_with_comma_separator}}"
    },
    ILS: {
        money_format: "{{amount}} NIS",
        money_with_currency_format: "{{amount}} NIS"
    },
    JMD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} JMD"
    },
    JPY: {
        money_format: "&#165;{{amount_no_decimals}}",
        money_with_currency_format: "&#165;{{amount_no_decimals}} JPY"
    },
    JEP: {
        money_format: "&pound;{{amount}}",
        money_with_currency_format: "&pound;{{amount}} JEP"
    },
    JOD: {
        money_format: "{{amount}}0 JD",
        money_with_currency_format: "{{amount}}0 JOD"
    },
    KZT: {
        money_format: "{{amount}} KZT",
        money_with_currency_format: "{{amount}} KZT"
    },
    KES: {
        money_format: "KSh{{amount}}",
        money_with_currency_format: "KSh{{amount}}"
    },
    KWD: {
        money_format: "{{amount}}0 KD",
        money_with_currency_format: "{{amount}}0 KWD"
    },
    KGS: {
        money_format: "Ð»Ð²{{amount}}",
        money_with_currency_format: "Ð»Ð²{{amount}}"
    },
    LVL: {
        money_format: "Ls {{amount}}",
        money_with_currency_format: "Ls {{amount}} LVL"
    },
    LBP: {
        money_format: "L&pound;{{amount}}",
        money_with_currency_format: "L&pound;{{amount}} LBP"
    },
    LTL: {
        money_format: "{{amount}} Lt",
        money_with_currency_format: "{{amount}} Lt"
    },
    MGA: {
        money_format: "Ar {{amount}}",
        money_with_currency_format: "Ar {{amount}} MGA"
    },
    MKD: {
        money_format: "Ð´ÐµÐ½ {{amount}}",
        money_with_currency_format: "Ð´ÐµÐ½ {{amount}} MKD"
    },
    MOP: {
        money_format: "MOP${{amount}}",
        money_with_currency_format: "MOP${{amount}}"
    },
    MVR: {
        money_format: "Rf{{amount}}",
        money_with_currency_format: "Rf{{amount}} MRf"
    },
    MXN: {
        money_format: "$ {{amount}}",
        money_with_currency_format: "$ {{amount}} MXN"
    },
    MYR: {
        money_format: "RM{{amount}} MYR",
        money_with_currency_format: "RM{{amount}} MYR"
    },
    MUR: {
        money_format: "Rs {{amount}}",
        money_with_currency_format: "Rs {{amount}} MUR"
    },
    MDL: {
        money_format: "{{amount}} MDL",
        money_with_currency_format: "{{amount}} MDL"
    },
    MAD: {
        money_format: "{{amount}} dh",
        money_with_currency_format: "Dh {{amount}} MAD"
    },
    MNT: {
        money_format: "{{amount_no_decimals}} &#8366",
        money_with_currency_format: "{{amount_no_decimals}} MNT"
    },
    MZN: {
        money_format: "{{amount}} Mt",
        money_with_currency_format: "Mt {{amount}} MZN"
    },
    NAD: {
        money_format: "N${{amount}}",
        money_with_currency_format: "N${{amount}} NAD"
    },
    NPR: {
        money_format: "Rs{{amount}}",
        money_with_currency_format: "Rs{{amount}} NPR"
    },
    ANG: {
        money_format: "&fnof;{{amount}}",
        money_with_currency_format: "{{amount}} NA&fnof;"
    },
    NZD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} NZD"
    },
    NIO: {
        money_format: "C${{amount}}",
        money_with_currency_format: "C${{amount}} NIO"
    },
    NGN: {
        money_format: "&#8358;{{amount}}",
        money_with_currency_format: "&#8358;{{amount}} NGN"
    },
    NOK: {
        money_format: "kr {{amount_with_comma_separator}}",
        money_with_currency_format: "kr {{amount_with_comma_separator}} NOK"
    },
    OMR: {
        money_format: "{{amount_with_comma_separator}} OMR",
        money_with_currency_format: "{{amount_with_comma_separator}} OMR"
    },
    PKR: {
        money_format: "Rs.{{amount}}",
        money_with_currency_format: "Rs.{{amount}} PKR"
    },
    PGK: {
        money_format: "K {{amount}}",
        money_with_currency_format: "K {{amount}} PGK"
    },
    PYG: {
        money_format: "Gs. {{amount_no_decimals_with_comma_separator}}",
        money_with_currency_format: "Gs. {{amount_no_decimals_with_comma_separator}} PYG"
    },
    PEN: {
        money_format: "S/. {{amount}}",
        money_with_currency_format: "S/. {{amount}} PEN"
    },
    PHP: {
        money_format: "&#8369;{{amount}}",
        money_with_currency_format: "&#8369;{{amount}} PHP"
    },
    PLN: {
        money_format: "{{amount_with_comma_separator}} zl",
        money_with_currency_format: "{{amount_with_comma_separator}} zl PLN"
    },
    QAR: {
        money_format: "QAR {{amount_with_comma_separator}}",
        money_with_currency_format: "QAR {{amount_with_comma_separator}}"
    },
    RON: {
        money_format: "{{amount_with_comma_separator}} lei",
        money_with_currency_format: "{{amount_with_comma_separator}} lei RON"
    },
    RUB: {
        money_format: "&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",
        money_with_currency_format: "&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB"
    },
    RWF: {
        money_format: "{{amount_no_decimals}} RF",
        money_with_currency_format: "{{amount_no_decimals}} RWF"
    },
    WST: {
        money_format: "WS$ {{amount}}",
        money_with_currency_format: "WS$ {{amount}} WST"
    },
    SAR: {
        money_format: "{{amount}} SR",
        money_with_currency_format: "{{amount}} SAR"
    },
    STD: {
        money_format: "Db {{amount}}",
        money_with_currency_format: "Db {{amount}} STD"
    },
    RSD: {
        money_format: "{{amount}} RSD",
        money_with_currency_format: "{{amount}} RSD"
    },
    SCR: {
        money_format: "Rs {{amount}}",
        money_with_currency_format: "Rs {{amount}} SCR"
    },
    SGD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} SGD"
    },
    SYP: {
        money_format: "S&pound;{{amount}}",
        money_with_currency_format: "S&pound;{{amount}} SYP"
    },
    ZAR: {
        money_format: "R {{amount}}",
        money_with_currency_format: "R {{amount}} ZAR"
    },
    KRW: {
        money_format: "&#8361;{{amount_no_decimals}}",
        money_with_currency_format: "&#8361;{{amount_no_decimals}} KRW"
    },
    LKR: {
        money_format: "Rs {{amount}}",
        money_with_currency_format: "Rs {{amount}} LKR"
    },
    SEK: {
        money_format: "{{amount_no_decimals}} kr",
        money_with_currency_format: "{{amount_no_decimals}} kr SEK"
    },
    CHF: {
        money_format: "SFr. {{amount}}",
        money_with_currency_format: "SFr. {{amount}} CHF"
    },
    TWD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} TWD"
    },
    THB: {
        money_format: "{{amount}} &#xe3f;",
        money_with_currency_format: "{{amount}} &#xe3f; THB"
    },
    TZS: {
        money_format: "{{amount}} TZS",
        money_with_currency_format: "{{amount}} TZS"
    },
    TTD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} TTD"
    },
    TND: {
        money_format: "{{amount}}",
        money_with_currency_format: "{{amount}} DT"
    },
    TRY: {
        money_format: "{{amount}}TL",
        money_with_currency_format: "{{amount}}TL"
    },
    UGX: {
        money_format: "Ush {{amount_no_decimals}}",
        money_with_currency_format: "Ush {{amount_no_decimals}} UGX"
    },
    UAH: {
        money_format: "â‚´{{amount}}",
        money_with_currency_format: "â‚´{{amount}} UAH"
    },
    AED: {
        money_format: "Dhs. {{amount}}",
        money_with_currency_format: "Dhs. {{amount}} AED"
    },
    UYU: {
        money_format: "${{amount_with_comma_separator}}",
        money_with_currency_format: "${{amount_with_comma_separator}} UYU"
    },
    VUV: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}}VT"
    },
    VEF: {
        money_format: "Bs. {{amount_with_comma_separator}}",
        money_with_currency_format: "Bs. {{amount_with_comma_separator}} VEF"
    },
    VND: {
        money_format: "{{amount_no_decimals_with_comma_separator}}&#8363;",
        money_with_currency_format: "{{amount_no_decimals_with_comma_separator}} VND"
    },
    XBT: {
        money_format: "{{amount_no_decimals}} BTC",
        money_with_currency_format: "{{amount_no_decimals}} BTC"
    },
    XOF: {
        money_format: "CFA{{amount}}",
        money_with_currency_format: "CFA{{amount}} XOF"
    },
    ZMW: {
        money_format: "K{{amount_no_decimals_with_comma_separator}}",
        money_with_currency_format: "ZMW{{amount_no_decimals_with_comma_separator}}"
    }
}, Currency.formatMoney = function(t, e) {
    function o(t, e) {
        return "undefined" == typeof t ? e : t
    }

    function i(t, e, i, n) {
        if (e = o(e, 2), i = o(i, ","), n = o(n, "."), isNaN(t) || null == t) return 0;
        t = (t / 100).toFixed(e);
        var s = t.split("."),
            r = s[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i),
            a = s[1] ? n + s[1] : "";
        return r + a
    }
    if ("function" == typeof Shopify.formatMoney) return Shopify.formatMoney(t, e);
    "string" == typeof t && (t = t.replace(".", ""));
    var n = "",
        s = /\{\{\s*(\w+)\s*\}\}/,
        r = e || "${{amount}}";
    switch (r.match(s)[1]) {
        case "amount":
            n = i(t, 2);
            break;
        case "amount_no_decimals":
            n = i(t, 0);
            break;
        case "amount_with_comma_separator":
            n = i(t, 2, ".", ",");
            break;
        case "amount_no_decimals_with_comma_separator":
            n = i(t, 0, ".", ",")
    }
    return r.replace(s, n)
}, Currency.currentCurrency = "", Currency.format = "money_format", Currency.convertAll = function(t, e, o, i) {
    t = t || Currency.currentCurrency, e = e || $(".currency-selector__select").val(), jQuery(o || "[data-money-convertible]").each(function() {
        if (jQuery(this).attr("data-currency") !== e) {
            if (jQuery(this).attr("data-currency-" + e)) jQuery(this).html(jQuery(this).attr("data-currency-" + e));
            else {
                var o = 0,
                    n = Currency.moneyFormats[t][i || Currency.format] || "{{amount}}",
                    s = Currency.moneyFormats[e][i || Currency.format] || "{{amount}}";
                o = -1 !== n.indexOf("amount_no_decimals") ? Currency.convert(100 * parseInt(jQuery(this).html().replace(/[^0-9]/g, ""), 10), t, e) : "JOD" === t || "KWD" == t || "BHD" == t ? Currency.convert(parseInt(jQuery(this).html().replace(/[^0-9]/g, ""), 10) / 10, t, e) : Currency.convert(parseInt(jQuery(this).html().replace(/[^0-9]/g, ""), 10), t, e);
                var r = Currency.formatMoney(o, s);
                jQuery(this).html(r), jQuery(this).attr("data-currency-" + e, r)
            }
            jQuery(this).attr("data-currency", e)
        }
    }), this.currentCurrency = e, this.cookie.write(e)
};
var qualifyURL = function(t) {
    var e = document.createElement("img");
    return e.src = t, t = e.src, e.src = null, t
};
! function(t, e, o, n) {
    function s(e, o) {
        this.element = e, this.$element = t(e), this.settings = t.extend({}, a, o), this._columnSize = 0, this._defaults = a, this._name = r, this.tiles = [], this._loadedImages = 0, this._rows = [
            []
        ], this._currentRow = 0, this._currentRowTile = 0, this.edges = [], this.imagesData = {}, this.currentWidth = 0, this.currentImageSizeFactor = 1, this.currentColumnsCount = 0, this.ajaxComplete = !1, this.isLoading = !1, this.currentPage = 1, this.init()
    }
    t.fn.visible = function(o) {
        if (!t(this).offset()) return !0;
        var i = t(this),
            n = t(e),
            s = n.scrollTop(),
            r = s + n.height(),
            a = i.offset().top,
            l = a + i.height(),
            c = o === !0 ? l : a,
            d = o === !0 ? a : l;
        return r >= d && c >= s
    };
    var r = "finalTilesGallery",
        a = {
            layout: "final",
            columns: [
                [4e3, 5],
                [1024, 4],
                [800, 3],
                [480, 2],
                [320, 1]
            ],
            rowHeight: 200,
            margin: 10,
            minTileWidth: 200,
            ignoreImageAttributes: !0,
            imageSizeFactor: [
                [4e3, .9],
                [1024, .8],
                [800, .7],
                [600, .6],
                [480, .5],
                [320, .3]
            ],
            gridSize: 10,
            allowEnlargement: !0,
            autoLoadURL: null,
            autoLoadOffset: 50,
            selectedFilter: "",
            loadingTarget: "",
            onComplete: function() {},
            onUpdate: function() {},
            onAutoLoaded: function() {},
            onAutoLoadCompleted: function() {},
            debug: !1
        };
    t.extend(s.prototype, {
        print: function(t) {
            this.settings.debug && console.log(t)
        },
        setCurrentImageSizeFactor: function() {
            this.currentImageSizeFactor = 1;
            for (var o = t(e).width(), i = 0; i < this.settings.imageSizeFactor.length; i++) this.settings.imageSizeFactor[i][0] >= o && (this.currentImageSizeFactor = this.settings.imageSizeFactor[i][1]);
            this.currentImageSizeFactor || (this.currentImageSizeFactor = 1), this.print("current image size factor: " + this.currentImageSizeFactor + " (" + o + ")")
        },
        setCurrentColumnSize: function() {
            for (var o = t(e).width(), i = 0; i < this.settings.columns.length; i++) this.settings.columns[i][0] >= o && (this.currentColumnsCount = this.settings.columns[i][1]);
            this._columnSize = Math.floor((this.currentWidth - this.settings.margin * (this.currentColumnsCount - 1)) / this.currentColumnsCount), console.log(this.currentWidth, this._columnSize, this.currentColumnsCount), this.print(this.currentWidth, this._columnSize)
        },
        init: function() {
            var o = this,
                i = this.settings.selectedFilter,
                n = ftg_getURLParameter("ftg-set");
            if (n && (i = n), o.currentWidth = o.$element.width(), 0 == o.$element.filter(":visible").length) return o.print("cannot initialize the gallery, container is hidden. Retrying in 500ms."), void setTimeout(function() {
                o.init()
            }, 500);
            this.$element.find(".ftg-items").css({
                position: "relative"
            });
            var i = this.settings.selectedFilter,
                n = ftg_getURLParameter("ftg-set");
            n && (i = n);
            var o = this;
            null != i && (o.print(".. found filter (" + i + ")"), o.$element.find(".ftg-filters a").removeClass("selected"), o.$element.find(".ftg-filters a").each(function() {
                t(this).data("filter") == i && (o.print(".. selecting filter"), t(this).addClass("selected"))
            }));
            var s = e.location.hash;
            if (this.$element.find(".ftg-items").css({
                    position: "relative",
                    minWidth: o.settings.minTileWidth
                }), s && "#ftg-set-ftgall" != s && "#ftg-set" == s.substr(0, 8) || o.settings.selectedFilter) {
                var r = "#ftg-set-" + o.settings.selectedFilter;
                s && (r = s);
                var a = r.replace("#", "."),
                    l = [];
                o.$element.find(".ftg-filters a").each(function() {
                    l.push(t(this).attr("href"))
                }), t.inArray(r, l) >= 0 && (a = a.substring(1), o.$element.find(".ftg-filters a").each(function() {
                    t(this).attr("href") != r && (o.$element.find(".item").each(function() {
                        var e = t(this).parent().parent();
                        0 == e.hasClass(a) && e.addClass("ftg-hidden")
                    }), t(this).removeClass("selected"))
                }), t('a[href="' + r + '"]').addClass("selected"))
            }
            if (this.tiles = this.$element.find(".tile").not(".ftg-hidden"), this.tiles.css({
                    transition: "all .3s"
                }), this.currentWidth = this.$element.width(), this.print("this.currentWidth: " + this.currentWidth), 0 == o.$element.filter(":visible").length) return o.warn("cannot initialize the gallery, container is hidden. Retrying in 500ms."), void setTimeout(function() {
                o.init()
            }, 500);
            "columns" != this.settings.layout && "rows" != this.settings.layout && "final" != this.settings.layout && console.log("WARNING: unknown layout, falling back to 'final'."), "columns" == this.settings.layout && this.setCurrentColumnSize();
            var c = 0;
            this.setCurrentImageSizeFactor(), t(e).resize(function() {
                c = setTimeout(function() {
                    o.currentWidth != o.$element.width() && (clearTimeout(c), o.print("this.currentWidth", this.currentWidth), o.currentWidth = o.$element.width(), o.setCurrentColumnSize(), o.setCurrentImageSizeFactor(), o.refresh())
                }, 500)
            }), o.isLoading = !0, o.settings.autoLoadURL && t(e).scroll(function() {
                if (!o.ajaxComplete && !o.isLoading) {
                    var i = t(o.settings.loadingTarget);
                    t(e).scrollTop() >= i.offset().top - t(e).height() - o.settings.autoLoadOffset && (o.isLoading = !0, t.get(o.settings.autoLoadURL, {
                        page: ++o.currentPage
                    }, function(t) {
                        var e = o.settings.onAutoLoaded(t);
                        0 == e.length ? (o.ajaxComplete = !0, o.settings.onAutoLoadCompleted()) : (o.$element.find(".ftg-items").append(e), o.tiles = o.$element.find(".tile"), o.loadImage())
                    }))
                }
            }), this.setupFilters(), this.edges.push({
                left: 0,
                top: 0,
                width: this.currentWidth,
                index: 0
            }), this.loadImage()
        },
        addElements: function(t) {
            this.$element.find(".ftg-items").append(t), this.tiles = this.$element.find(".tile"), this.loadImage()
        },
        removeAt: function(t) {
            this.tiles[t].remove(), this.refresh()
        },
        clear: function() {
            this.$element.find(".ftg-items").height(0).empty(), this.refresh()
        },
        setupFilters: function() {
            var e = this;
            e.$element.find(".ftg-filters a").click(function(o) {
                o.preventDefault(), e.$element.find(".ftg-filters a").removeClass("selected"), t(this).addClass("selected");
                var i = t(this).attr("href").replace("#ftg-set-", "");
                "ftgall" == i ? e.$element.find(".tile").removeClass("ftg-hidden") : e.$element.find(".tile").not(".ftg-set-" + i).addClass("ftg-hidden").end().filter(".ftg-set-" + i).removeClass("ftg-hidden"), e.refresh()
            })
        },
        printEdges: function() {
            for (this.$element.find(".edge").remove(), i = 0; i < this.edges.length; i++) {
                var e = t("<div class='edge' />");
                e.append("top: " + this.edges[i].top + "<br>"), e.append("left: " + this.edges[i].left + "<br>"), e.append("width: " + this.edges[i].width + "<br>"), e.css({
                    left: this.edges[i].left,
                    top: this.edges[i].top,
                    marginTop: -25,
                    marginLeft: 20
                }), this.$element.append(e)
            }
        },
        printEdge: function(e) {
            var o = t("<div class='edge enlarged-" + e.enlarged + "' />");
            o.append("<b>" + e.index + " " + e["case"] + "</b><br>"), o.append("t: " + Math.round(e.top) + " l: " + e.left + "<br>"), o.append("width: " + e.width + "<br>"), o.append("idx: " + e.tileIndex + "<br>"), o.css({
                left: e.left,
                top: e.top,
                marginTop: -25,
                marginLeft: 20
            }), this.$element.append(o)
        },
        refresh: function() {
            this.$element.find(".edge").remove(), this.edges = [{
                left: 0,
                top: 0,
                width: this.currentWidth
            }], this.tiles.removeClass("ftg-loaded ftg-enlarged"), this.tiles = this.$element.find(".tile").not(".ftg-hidden"), this._loadedImages = 0, this.loadImage()
        },
        getAvailableRowSpace: function() {
            return this.currentWidth - this.getBusyRowSpace()
        },
        getBusyRowSpace: function() {
            for (var t = 0, e = 0; e < this._rows[this._currentRow].length; e++) t += this._rows[this._currentRow][e].data("width") + this.settings.margin;
            return t
        },
        addImageToRow: function(t) {
            console.log(this._rows), console.log(this._currentRow), this._rows[this._currentRow].push(t)
        },
        fitImagesInRow: function() {
            for (var t = (this.getAvailableRowSpace() - this.settings.margin, (this.currentWidth - (this._rows[this._currentRow].length - 1) * this.settings.margin) / this.getBusyRowSpace()), e = 0; e < this._rows[this._currentRow].length; e++) {
                $item = this._rows[this._currentRow][e];
                var o = $item.data("width");
                $item.data("height");
                $item.data("width", o * t), this.add(this._currentRowTile++)
            }
        },
        nextTile: function(t) {
            var e = this;
            if (t && e.add(e._loadedImages),
                ++e._loadedImages < e.tiles.length) e.loadImage();
            else {
                var o = e.lowerEdgeTop();
                e.print("lower edge top: " + o), e.$element.find(".ftg-items").height(o), e.isLoading = !1, e.settings.onComplete()
            }
        },
        loadImage: function() {
            var t = this,
                e = this.tiles.eq(this._loadedImages);
            e.children("iframe").length && e.children("iframe").addClass("item");
            var o = e.find(".item");
            switch (o.get(0).tagName.toLowerCase()) {
                case "img":
                    var i = new Image;
                    i.onload = function() {
                        var n = t.currentImageSizeFactor;
                        e.data("ftg-ignore-size-factor") && (n = 1);
                        var s = {},
                            r = !0;
                        if ("final" == t.settings.layout) {
                            var a = o.attr("width") ? parseInt(o.attr("width")) : i.width,
                                l = o.attr("height") ? parseInt(o.attr("height")) : i.height;
                            s.width = a * n, s.height = l * n
                        }
                        "columns" == t.settings.layout && (s.width = t._columnSize, s.height = s.width * i.height / i.width), "rows" == t.settings.layout && (s.width = t.settings.rowHeight * i.width / i.height, s.height = t.settings.rowHeight, r = !1, t.getAvailableRowSpace() > s.width ? t.addImageToRow(o) : (t.fitImagesInRow(), t._currentRow++, t._rows.push([]), t.addImageToRow(o))), o.attr("src", this.src), t.imagesData["tile" + t._loadedImages] = {
                            width: s.width,
                            height: s.height,
                            owidth: i.width,
                            oheight: i.height,
                            src: i.src
                        }, t.nextTile(r)
                    }, i.onerror = function() {
                        t.print("error loading image: " + i.src), t.nextTile(!0)
                    }, i.src = o.data("src"), e.data("ftg-type", "image");
                    break;
                case "svg":
                    t.imagesData["tile" + t._loadedImages] = {
                        width: parseInt(o.attr("width")),
                        height: parseInt(o.attr("height")),
                        owidth: parseInt(o.attr("width")),
                        oheight: parseInt(o.attr("height"))
                    }, e.data("ftg-type", "svg"), t.nextTile(!0);
                    break;
                case "iframe":
                    t.imagesData["tile" + t._loadedImages] = {
                        width: parseInt(o.attr("width")),
                        height: parseInt(o.attr("height")),
                        owidth: parseInt(o.attr("width")),
                        oheight: parseInt(o.attr("height"))
                    }, e.data("ftg-type", "iframe"), t.nextTile(!0);
                    break;
                default:
                    t.imagesData["tile" + t._loadedImages] = {
                        width: parseInt(o.data("width")),
                        height: parseInt(o.data("height")),
                        owidth: parseInt(o.data("width")),
                        oheight: parseInt(o.data("height"))
                    }, t.nextTile(!0)
            }
        },
        higherEdge: function() {
            for (var t = 1e5, e = 0, o = 0; o < this.edges.length; o++) this.edges[o].top < t && (e = o, t = this.edges[o].top);
            return this.edges[e]
        },
        lowerEdgeTop: function() {
            for (var t = 0, e = 0; e < this.edges.length; e++) this.edges[e].top > t && (t = this.edges[e].top);
            return t
        },
        alignEdge: function(t, e) {
            for (var o = 0; o < this.edges.length; o++)
                if (this.edges[o].left + this.edges[o].width + this.settings.margin == t.left && (this.print("found edge on left", o), t.top == this.edges[o].top)) return this.print("edges can be aligned [1]"), {
                    side: "left",
                    edge: this.edges[o]
                };
            for (var o = 0; o < this.edges.length; o++)
                if (this.edges[o].left - this.settings.margin == t.left + t.width && (this.print("found edge on right", o), t.top == this.edges[o].top)) return this.print("edges can be aligned [2]"), {
                    side: "right",
                    edge: this.edges[o]
                };
            return null
        },
        removeEdge: function(t) {
            for (var e = [], o = 0; o < this.edges.length; o++) this.edges[o] != t && e.push(this.edges[o]);
            this.edges = e
        },
        add: function(t) {
            var e = this.tiles.eq(t),
                o = e.find(".item"),
                i = "tile" + t,
                n = this.imagesData[i].width,
                s = this.imagesData[i].height,
                r = this.higherEdge();
            if (this.print(r), r.tileIndex = t, this.print(t + " [" + e.data("ftg-type") + "] (" + n + "x" + s + ")"), r.top > 0 && (r.top += this.settings.margin), e.css({
                    left: r.left,
                    top: r.top,
                    position: "absolute"
                }), r.enlarged = !1, r.width < n + this.settings.margin) {
                r["case"] = "Te", this.print("Te", r.width);
                var a = r.width,
                    l = s / n * a;
                a + r.left - this.settings.margin == this.currentWidth && (this.print("END"), a -= this.settings.margin, l = s / n * a), n = a, s = l
            } else if (r.width > n)
                if (this.print("tE"), "columns" == this.settings.layout || r.width - n >= this.settings.minTileWidth) {
                    r["case"] = "tE", this.print("tE1", r.width, r.left, this.currentWidth);
                    var c = {
                        left: r.left + n + this.settings.margin,
                        top: r.top - (r.top > 0 ? this.settings.margin : 0),
                        width: r.width - n - this.settings.margin,
                        marginLeft: !0,
                        "case": "NEW",
                        index: r.index + 1
                    };
                    this.edges.push(c)
                } else {
                    r["case"] = "tE2", this.print("tE2"), this.print("enlargement", r.width, r.left, this.currentWidth);
                    var a = (r.left + r.width == this.currentWidth ? 0 : this.settings.margin, r.width),
                        l = this.settings.allowEnlargement && "rows" != this.settings.layout ? s / n * a : s;
                    this.settings.allowEnlargement ? (e.addClass("ftg-enlarged"), r.enlarged = !0) : "rows" != this.settings.layout && e.find(".item").css({
                        width: n,
                        height: s
                    }), n = a, s = l
                } if (r.top += s, this.settings.gridSize) {
                var d = r.top % this.settings.gridSize;
                r.top -= d, s -= d
            }
            r.left = r.left, r.width = n;
            var u = !0,
                p = this.alignEdge(r, t);
            p && ("left" == p.side ? (this.removeEdge(r), p.edge.width += n + this.settings.margin, s -= r.top - p.edge.top, r.top -= s, u = !1) : (this.removeEdge(p.edge), r.width += this.settings.margin + p.edge.width, u = !1), e.height(s)), this.$element.find(".ftg-items").height() < r.top && this.$element.find(".ftg-items").height(r.top), this.settings.debug && u && this.printEdge(r), "iframe" == e.data("ftg-type") && e.find("iframe").height(s), this.print(n + "x" + s), this.print("----"), e.css({
                width: n,
                height: s
            });
            var m = n / this.imagesData[i].width,
                h = this.imagesData[i].height * m - s;
            o.css({
                height: "auto"
            }), h > 0 && o.css({
                top: 0 - h / 2
            }), e.addClass("ftg-loaded")
        }
    }), t.fn[r] = function(e) {
        return this.each(function() {
            t.data(this, r) || t.data(this, r, new s(this, e))
        }), this
    }
}(jQuery, window, document),
function(t, e) {
    "use strict";

    function o(o, i) {
        this.options = t.extend({}, a, i), this.$element = t(o), this.$win = t(e), this.$loadingClassTarget = this._getLoadingClassTarget(), this.$scrollContainer = this._getScrollContainer(), this.loading = !1, this.doneLoadingInt = null, this.pageCount = this.options.triggerInitialLoad ? this.options.startingPageCount - 1 : this.options.startingPageCount, this.destroyed = !1, this._init()
    }

    function i(e, o, i) {
        e && t.isFunction(e[o]) && e[o].apply(e, i)
    }

    function n(t, e, o) {
        var i;
        return function() {
            var n = this,
                s = arguments,
                r = function() {
                    i = null, o || t.apply(n, s)
                },
                a = o && !i;
            clearTimeout(i), i = setTimeout(r, e), a && t.apply(n, s)
        }
    }
    var s = "infiniteScrollHelper",
        r = "plugin_" + s,
        a = {
            bottomBuffer: 0,
            debounceInt: 100,
            doneLoading: null,
            interval: 300,
            loadingClass: "loading",
            loadingClassTarget: null,
            loadMoreDelay: 0,
            loadMore: t.noop,
            startingPageCount: 1,
            triggerInitialLoad: !1
        };
    o.prototype._init = function() {
        this._addListeners(), this.options.triggerInitialLoad ? this._beginLoadMore(this.options.loadMoreDelay) : this._handleScroll()
    }, o.prototype._getLoadingClassTarget = function() {
        return this.options.loadingClassTarget ? t(this.options.loadingClassTarget) : this.$element
    }, o.prototype._getScrollContainer = function() {
        var e = null;
        return "scroll" == this.$element.css("overflow-y") && (e = this.$element), e || (e = this.$element.parents().filter(function() {
            return "scroll" == t(this).css("overflow-y")
        })), e = e.length > 0 ? e : this.$win
    }, o.prototype._addListeners = function() {
        var t = this;
        this.$scrollContainer.on("scroll." + s, n(function() {
            t._handleScroll()
        }, this.options.debounceInt))
    }, o.prototype._removeListeners = function() {
        this.$scrollContainer.off("scroll." + s)
    }, o.prototype._handleScroll = function(t) {
        var e = this;
        this._shouldTriggerLoad() && (this._beginLoadMore(this.options.loadMoreDelay), this.options.doneLoading && (this.doneLoadingInt = setInterval(function() {
            e.options.doneLoading(e.pageCount) && e._endLoadMore()
        }, this.options.interval)))
    }, o.prototype._shouldTriggerLoad = function() {
        var t = this._getElementHeight(),
            e = this.$scrollContainer.scrollTop() + this.$scrollContainer.height() + this.options.bottomBuffer;
        return !this.loading && e >= t && this.$element.is(":visible")
    }, o.prototype._getElementHeight = function() {
        return this.$element == this.$scrollContainer ? this.$element[0].scrollHeight : this.$element.height()
    }, o.prototype._beginLoadMore = function(e) {
        e = e || 0, setTimeout(t.proxy(function() {
            this.pageCount++, this.options.loadMore(this.pageCount, t.proxy(this._endLoadMore, this)), this.$loadingClassTarget.addClass(this.options.loadingClass)
        }, this), e), this.loading = !0, this._removeListeners()
    }, o.prototype._endLoadMore = function() {
        clearInterval(this.doneLoadingInt), this.loading = !1, this.$loadingClassTarget.removeClass(this.options.loadingClass), !this.destroyed && this._addListeners()
    }, o.prototype.destroy = function() {
        this._removeListeners(), this.options.loadMore = null, this.options.doneLoading = null, t.data(this.$element[0], r, null), clearInterval(this.doneLoadingInt), this.destroyed = !0
    }, t.fn[s] = function(e) {
        var n = !1,
            s = arguments;
        return "string" == typeof e && (n = e), this.each(function() {
            var a = t.data(this, r);
            a || n ? n && i(a, n, Array.prototype.slice.call(s, 1)) : t.data(this, r, new o(this, e))
        })
    }, e.InfiniteScrollHelper = e.InfiniteScrollHelper || o
}(jQuery, window),
function() {
    var t;
    t = function() {
            function t(t, e) {
                var o, i;
                if (this.options = {
                        target: "instafeed",
                        get: "popular",
                        resolution: "thumbnail",
                        sortBy: "none",
                        links: !0,
                        mock: !1,
                        useHttp: !1
                    }, "object" == typeof t)
                    for (o in t) i = t[o], this.options[o] = i;
                this.context = null != e ? e : this, this.unique = this._genKey()
            }
            return t.prototype.hasNext = function() {
                return "string" == typeof this.context.nextUrl && this.context.nextUrl.length > 0
            }, t.prototype.next = function() {
                return this.hasNext() ? this.run(this.context.nextUrl) : !1
            }, t.prototype.run = function(e) {
                var o, i, n;
                if ("string" != typeof this.options.clientId && "string" != typeof this.options.accessToken) throw new Error("Missing clientId or accessToken.");
                if ("string" != typeof this.options.accessToken && "string" != typeof this.options.clientId) throw new Error("Missing clientId or accessToken.");
                return null != this.options.before && "function" == typeof this.options.before && this.options.before.call(this), "undefined" != typeof document && null !== document && (n = document.createElement("script"), n.id = "instafeed-fetcher", n.src = e || this._buildUrl(), o = document.getElementsByTagName("head"), o[0].appendChild(n), i = "instafeedCache" + this.unique, window[i] = new t(this.options, this), window[i].unique = this.unique), !0
            }, t.prototype.parse = function(t) {
                var e, o, i, n, s, r, a, l, c, d, u, p, m, h, f, g, y, v, w, _, k, C, T, S, $, b, x, L, E, I, A, O, D;
                if ("object" != typeof t) {
                    if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "Invalid JSON data"), !1;
                    throw new Error("Invalid JSON response")
                }
                if (200 !== t.meta.code) {
                    if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, t.meta.error_message), !1;
                    throw new Error("Error from Instagram: " + t.meta.error_message)
                }
                if (0 === t.data.length) {
                    if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "No images were returned from Instagram"), !1;
                    throw new Error("No images were returned from Instagram")
                }
                if (null != this.options.success && "function" == typeof this.options.success && this.options.success.call(this, t), this.context.nextUrl = "", null != t.pagination && (this.context.nextUrl = t.pagination.next_url), "none" !== this.options.sortBy) switch (A = "random" === this.options.sortBy ? ["", "random"] : this.options.sortBy.split("-"), I = "least" === A[0] ? !0 : !1, A[1]) {
                    case "random":
                        t.data.sort(function() {
                            return .5 - Math.random()
                        });
                        break;
                    case "recent":
                        t.data = this._sortBy(t.data, "created_time", I);
                        break;
                    case "liked":
                        t.data = this._sortBy(t.data, "likes.count", I);
                        break;
                    case "commented":
                        t.data = this._sortBy(t.data, "comments.count", I);
                        break;
                    default:
                        throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
                }
                if ("undefined" != typeof document && null !== document && this.options.mock === !1) {
                    if (g = t.data, E = parseInt(this.options.limit, 10), null != this.options.limit && g.length > E && (g = g.slice(0, E)), a = document.createDocumentFragment(), null != this.options.filter && "function" == typeof this.options.filter && (g = this._filter(g, this.options.filter)), null != this.options.template && "string" == typeof this.options.template) {
                        for (c = "", h = "", _ = "", D = document.createElement("div"), u = 0, $ = g.length; $ > u; u++) {
                            if (p = g[u], m = p.images[this.options.resolution], "object" != typeof m) throw r = "No image found for resolution: " + this.options.resolution + ".", new Error(r);
                            k = m.width, v = m.height, w = "square", k > v && (w = "landscape"), v > k && (w = "portrait"), f = m.url, d = window.location.protocol.indexOf("http") >= 0, d && !this.options.useHttp && (f = f.replace(/https?:\/\//, "//")), h = this._makeTemplate(this.options.template, {
                                model: p,
                                id: p.id,
                                link: p.link,
                                type: p.type,
                                image: f,
                                width: k,
                                height: v,
                                orientation: w,
                                caption: this._getObjectProperty(p, "caption.text"),
                                likes: p.likes.count,
                                comments: p.comments.count,
                                location: this._getObjectProperty(p, "location.name")
                            }), c += h
                        }
                        for (D.innerHTML = c, n = [], i = 0, o = D.childNodes.length; o > i;) n.push(D.childNodes[i]), i += 1;
                        for (T = 0, b = n.length; b > T; T++) L = n[T], a.appendChild(L)
                    } else
                        for (S = 0, x = g.length; x > S; S++) {
                            if (p = g[S], y = document.createElement("img"), m = p.images[this.options.resolution], "object" != typeof m) throw r = "No image found for resolution: " + this.options.resolution + ".", new Error(r);
                            f = m.url, d = window.location.protocol.indexOf("http") >= 0, d && !this.options.useHttp && (f = f.replace(/https?:\/\//, "//")), y.src = f, this.options.links === !0 ? (e = document.createElement("a"), e.href = p.link, e.appendChild(y), a.appendChild(e)) : a.appendChild(y)
                        }
                    if (O = this.options.target, "string" == typeof O && (O = document.getElementById(O)), null == O) throw r = 'No element with id="' + this.options.target + '" on page.', new Error(r);
                    O.appendChild(a), l = document.getElementsByTagName("head")[0], l.removeChild(document.getElementById("instafeed-fetcher")), C = "instafeedCache" + this.unique, window[C] = void 0;
                    try {
                        delete window[C]
                    } catch (R) {
                        s = R
                    }
                }
                return null != this.options.after && "function" == typeof this.options.after && this.options.after.call(this), !0
            }, t.prototype._buildUrl = function() {
                var t, e, o;
                switch (t = "https://api.instagram.com/v1", this.options.get) {
                    case "popular":
                        e = "media/popular";
                        break;
                    case "tagged":
                        if (!this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                        e = "tags/" + this.options.tagName + "/media/recent";
                        break;
                    case "location":
                        if (!this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                        e = "locations/" + this.options.locationId + "/media/recent";
                        break;
                    case "user":
                        if (!this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                        e = "users/" + this.options.userId + "/media/recent";
                        break;
                    default:
                        throw new Error("Invalid option for get: '" + this.options.get + "'.")
                }
                return o = t + "/" + e, o += null != this.options.accessToken ? "?access_token=" + this.options.accessToken : "?client_id=" + this.options.clientId, null != this.options.limit && (o += "&count=" + this.options.limit), o += "&callback=instafeedCache" + this.unique + ".parse"
            }, t.prototype._genKey = function() {
                var t;
                return t = function() {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
                }, "" + t() + t() + t() + t()
            }, t.prototype._makeTemplate = function(t, e) {
                var o, i, n, s, r;
                for (i = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, o = t; i.test(o);) s = o.match(i)[1], r = null != (n = this._getObjectProperty(e, s)) ? n : "", o = o.replace(i, function() {
                    return "" + r
                });
                return o
            }, t.prototype._getObjectProperty = function(t, e) {
                var o, i;
                for (e = e.replace(/\[(\w+)\]/g, ".$1"), i = e.split("."); i.length;) {
                    if (o = i.shift(), !(null != t && o in t)) return null;
                    t = t[o]
                }
                return t
            }, t.prototype._sortBy = function(t, e, o) {
                var i;
                return i = function(t, i) {
                    var n, s;
                    return n = this._getObjectProperty(t, e), s = this._getObjectProperty(i, e), o ? n > s ? 1 : -1 : s > n ? 1 : -1
                }, t.sort(i.bind(this)), t
            }, t.prototype._filter = function(t, e) {
                var o, i, n, s, r;
                for (o = [], i = function(t) {
                        return e(t) ? o.push(t) : void 0
                    }, n = 0, r = t.length; r > n; n++) s = t[n], i(s);
                return o
            }, t
        }(),
        function(t, e) {
            return "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.Instafeed = e()
        }(this, function() {
            return t
        })
}.call(this), new function(t) {
        var e = t.separator || "&",
            o = t.spaces === !1 ? !1 : !0,
            i = (t.suffix === !1 ? "" : "[]", t.prefix === !1 ? !1 : !0),
            n = i ? t.hash === !0 ? "#" : "?" : "",
            s = t.numbers === !1 ? !1 : !0;
        jQuery.query = new function() {
            var t = function(t, e) {
                    return void 0 != t && null !== t && (e ? t.constructor == e : !0)
                },
                i = function(t) {
                    for (var e, o = /\[([^[]*)\]/g, i = /^([^[]+)(\[.*\])?$/.exec(t), n = i[1], s = []; e = o.exec(i[2]);) s.push(e[1]);
                    return [n, s]
                },
                r = function(e, o, i) {
                    var n = o.shift();
                    if ("object" != typeof e && (e = null), "" === n)
                        if (e || (e = []), t(e, Array)) e.push(0 == o.length ? i : r(null, o.slice(0), i));
                        else if (t(e, Object)) {
                        for (var s = 0; null != e[s++];);
                        e[--s] = 0 == o.length ? i : r(e[s], o.slice(0), i)
                    } else e = [], e.push(0 == o.length ? i : r(null, o.slice(0), i));
                    else if (n && n.match(/^\s*[0-9]+\s*$/)) {
                        var a = parseInt(n, 10);
                        e || (e = []), e[a] = 0 == o.length ? i : r(e[a], o.slice(0), i)
                    } else {
                        if (!n) return i;
                        var a = n.replace(/^\s*|\s*$/g, "");
                        if (e || (e = {}), t(e, Array)) {
                            for (var l = {}, s = 0; s < e.length; ++s) l[s] = e[s];
                            e = l
                        }
                        e[a] = 0 == o.length ? i : r(e[a], o.slice(0), i)
                    }
                    return e
                },
                a = function(t) {
                    var e = this;
                    return e.keys = {}, t.queryObject ? jQuery.each(t.get(), function(t, o) {
                        e.SET(t, o)
                    }) : e.parseNew.apply(e, arguments), e
                };
            return a.prototype = {
                queryObject: !0,
                parseNew: function() {
                    var t = this;
                    return t.keys = {}, jQuery.each(arguments, function() {
                        var e = "" + this;
                        e = e.replace(/^[?#]/, ""), e = e.replace(/[;&]$/, ""), o && (e = e.replace(/[+]/g, " ")), jQuery.each(e.split(/[&;]/), function() {
                            var e = decodeURIComponent(this.split("=")[0] || ""),
                                o = decodeURIComponent(this.split("=")[1] || "");
                            e && (s && (/^[+-]?[0-9]+\.[0-9]*$/.test(o) ? o = parseFloat(o) : /^[+-]?[1-9][0-9]*$/.test(o) && (o = parseInt(o, 10))), o = o || 0 === o ? o : !0, t.SET(e, o))
                        })
                    }), t
                },
                has: function(e, o) {
                    var i = this.get(e);
                    return t(i, o)
                },
                GET: function(e) {
                    if (!t(e)) return this.keys;
                    for (var o = i(e), n = o[0], s = o[1], r = this.keys[n]; null != r && 0 != s.length;) r = r[s.shift()];
                    return "number" == typeof r ? r : r || ""
                },
                get: function(e) {
                    var o = this.GET(e);
                    return t(o, Object) ? jQuery.extend(!0, {}, o) : t(o, Array) ? o.slice(0) : o
                },
                SET: function(e, o) {
                    var n = t(o) ? o : null,
                        s = i(e),
                        a = s[0],
                        l = s[1],
                        c = this.keys[a];
                    return this.keys[a] = r(c, l.slice(0), n), this
                },
                set: function(t, e) {
                    return this.copy().SET(t, e)
                },
                REMOVE: function(e, o) {
                    if (o) {
                        var i = this.GET(e);
                        if (t(i, Array)) {
                            for (tval in i) i[tval] = i[tval].toString();
                            var n = $.inArray(o, i);
                            if (!(n >= 0)) return;
                            e = i.splice(n, 1), e = e[n]
                        } else if (o != i) return
                    }
                    return this.SET(e, null).COMPACT()
                },
                remove: function(t, e) {
                    return this.copy().REMOVE(t, e)
                },
                EMPTY: function() {
                    var t = this;
                    return jQuery.each(t.keys, function(e, o) {
                        delete t.keys[e]
                    }), t
                },
                load: function(t) {
                    var e = t.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"),
                        o = t.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
                    return new a(t.length == o.length ? "" : o, t.length == e.length ? "" : e)
                },
                empty: function() {
                    return this.copy().EMPTY()
                },
                copy: function() {
                    return new a(this)
                },
                COMPACT: function() {
                    function e(o) {
                        function i(e, o, i) {
                            t(e, Array) ? e.push(i) : e[o] = i
                        }
                        var n = "object" == typeof o ? t(o, Array) ? [] : {} : o;
                        return "object" == typeof o && jQuery.each(o, function(o, s) {
                            return t(s) ? void i(n, o, e(s)) : !0
                        }), n
                    }
                    return this.keys = e(this.keys), this
                },
                compact: function() {
                    return this.copy().COMPACT()
                },
                toString: function() {
                    var i = [],
                        s = [],
                        r = function(t) {
                            return t += "", t = encodeURIComponent(t), o && (t = t.replace(/%20/g, "+")), t
                        },
                        a = function(e, o, i) {
                            if (t(i) && i !== !1) {
                                var n = [r(o)];
                                i !== !0 && (n.push("="), n.push(r(i))), e.push(n.join(""))
                            }
                        },
                        l = function(t, e) {
                            var o = function(t) {
                                return e && "" != e ? [e, "[", t, "]"].join("") : [t].join("")
                            };
                            jQuery.each(t, function(t, e) {
                                "object" == typeof e ? l(e, o(t)) : a(s, o(t), e)
                            })
                        };
                    return l(this.keys), s.length > 0 && i.push(n), i.push(s.join(e)), i.join("")
                }
            }, new a(location.search, location.hash)
        }
    }(jQuery.query || {}), ! function(t, e) {
        "function" == typeof define && define.amd ? define(["jquery"], function(o) {
            return e(t, o)
        }) : "object" == typeof exports ? e(t, require("jquery")) : e(t, t.jQuery || t.Zepto)
    }(this, function(t, e) {
        "use strict";

        function o(t) {
            if (C && "none" === t.css("animation-name") && "none" === t.css("-webkit-animation-name") && "none" === t.css("-moz-animation-name") && "none" === t.css("-o-animation-name") && "none" === t.css("-ms-animation-name")) return 0;
            var e, o, i, n, s = t.css("animation-duration") || t.css("-webkit-animation-duration") || t.css("-moz-animation-duration") || t.css("-o-animation-duration") || t.css("-ms-animation-duration") || "0s",
                r = t.css("animation-delay") || t.css("-webkit-animation-delay") || t.css("-moz-animation-delay") || t.css("-o-animation-delay") || t.css("-ms-animation-delay") || "0s",
                a = t.css("animation-iteration-count") || t.css("-webkit-animation-iteration-count") || t.css("-moz-animation-iteration-count") || t.css("-o-animation-iteration-count") || t.css("-ms-animation-iteration-count") || "1";
            for (s = s.split(", "), r = r.split(", "), a = a.split(", "), n = 0, o = s.length, e = Number.NEGATIVE_INFINITY; o > n; n++) i = parseFloat(s[n]) * parseInt(a[n], 10) + parseFloat(r[n]), i > e && (e = i);
            return e
        }

        function i() {
            if (e(document.body).height() <= e(window).height()) return 0;
            var t, o, i = document.createElement("div"),
                n = document.createElement("div");
            return i.style.visibility = "hidden", i.style.width = "100px", document.body.appendChild(i), t = i.offsetWidth, i.style.overflow = "scroll", n.style.width = "100%", i.appendChild(n), o = n.offsetWidth, i.parentNode.removeChild(i), t - o
        }

        function n() {
            if (!T) {
                var t, o, n = e("html"),
                    s = d("is-locked");
                n.hasClass(s) || (o = e(document.body), t = parseInt(o.css("padding-right"), 10) + i(), o.css("padding-right", t + "px"), n.addClass(s))
            }
        }

        function s() {
            if (!T) {
                var t, o, n = e("html"),
                    s = d("is-locked");
                n.hasClass(s) && (o = e(document.body), t = parseInt(o.css("padding-right"), 10) - i(), o.css("padding-right", t + "px"), n.removeClass(s))
            }
        }

        function r(t, e, o, i) {
            var n = d("is", e),
                s = [d("is", _.CLOSING), d("is", _.OPENING), d("is", _.CLOSED), d("is", _.OPENED)].join(" ");
            t.$bg.removeClass(s).addClass(n), t.$overlay.removeClass(s).addClass(n), t.$wrapper.removeClass(s).addClass(n), t.$modal.removeClass(s).addClass(n), t.state = e, !o && t.$modal.trigger({
                type: e,
                reason: i
            }, [{
                reason: i
            }])
        }

        function a(t, i, n) {
            var s = 0,
                r = function(t) {
                    t.target === this && s++
                },
                a = function(t) {
                    t.target === this && 0 === --s && (e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, e) {
                        n[e].off(y + " " + v)
                    }), i())
                };
            e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, e) {
                n[e].on(y, r).on(v, a)
            }), t(), 0 === o(n.$bg) && 0 === o(n.$overlay) && 0 === o(n.$wrapper) && 0 === o(n.$modal) && (e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, e) {
                n[e].off(y + " " + v)
            }), i())
        }

        function l(t) {
            t.state !== _.CLOSED && (e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(e, o) {
                t[o].off(y + " " + v)
            }), t.$bg.removeClass(t.settings.modifier), t.$overlay.removeClass(t.settings.modifier).hide(), t.$wrapper.hide(), s(), r(t, _.CLOSED, !0))
        }

        function c(t) {
            var e, o, i, n, s = {};
            for (t = t.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), e = t.split(","), n = 0, o = e.length; o > n; n++) e[n] = e[n].split(":"), i = e[n][1], ("string" == typeof i || i instanceof String) && (i = "true" === i || ("false" === i ? !1 : i)), ("string" == typeof i || i instanceof String) && (i = isNaN(i) ? i : +i), s[e[n][0]] = i;
            return s
        }

        function d() {
            for (var t = g, e = 0; e < arguments.length; ++e) t += "-" + arguments[e];
            return t
        }

        function u() {
            var t, o, i = location.hash.replace("#", "");
            if (i) {
                try {
                    o = e("[data-" + f + '-id="' + i + '"]')
                } catch (n) {}
                o && o.length && (t = e[f].lookup[o.data(f)], t && t.settings.hashTracking && t.open())
            } else m && m.state === _.OPENED && m.settings.hashTracking && m.close()
        }

        function p(t, o) {
            var i = e(document.body),
                n = i,
                s = this;
            s.settings = e.extend({}, w, o), s.index = e[f].lookup.push(s) - 1, s.state = _.CLOSED, s.$overlay = e("." + d("overlay")), null !== s.settings.appendTo && s.settings.appendTo.length && (n = e(s.settings.appendTo)), s.$overlay.length || (s.$overlay = e("<div>").addClass(d("overlay") + " " + d("is", _.CLOSED)).hide(), n.append(s.$overlay)), s.$bg = e("." + d("bg")).addClass(d("is", _.CLOSED)), s.$modal = t.addClass(g + " " + d("is-initialized") + " " + s.settings.modifier + " " + d("is", _.CLOSED)).attr("tabindex", "-1"), s.$wrapper = e("<div>").addClass(d("wrapper") + " " + s.settings.modifier + " " + d("is", _.CLOSED)).hide().append(s.$modal), n.append(s.$wrapper), s.$wrapper.on("click." + g, "[data-" + f + '-action="close"]', function(t) {
                t.preventDefault(), s.close()
            }), s.$wrapper.on("click." + g, "[data-" + f + '-action="cancel"]', function(t) {
                t.preventDefault(), s.$modal.trigger(k.CANCELLATION), s.settings.closeOnCancel && s.close(k.CANCELLATION)
            }), s.$wrapper.on("click." + g, "[data-" + f + '-action="confirm"]', function(t) {
                t.preventDefault(), s.$modal.trigger(k.CONFIRMATION), s.settings.closeOnConfirm && s.close(k.CONFIRMATION)
            }), s.$wrapper.on("click." + g, function(t) {
                var o = e(t.target);
                o.hasClass(d("wrapper")) && s.settings.closeOnOutsideClick && s.close()
            })
        }
        var m, h, f = "remodal",
            g = t.REMODAL_GLOBALS && t.REMODAL_GLOBALS.NAMESPACE || f,
            y = e.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], function(t) {
                return t + "." + g
            }).join(" "),
            v = e.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], function(t) {
                return t + "." + g
            }).join(" "),
            w = e.extend({
                hashTracking: !0,
                closeOnConfirm: !0,
                closeOnCancel: !0,
                closeOnEscape: !0,
                closeOnOutsideClick: !0,
                modifier: "",
                appendTo: null
            }, t.REMODAL_GLOBALS && t.REMODAL_GLOBALS.DEFAULTS),
            _ = {
                CLOSING: "closing",
                CLOSED: "closed",
                OPENING: "opening",
                OPENED: "opened"
            },
            k = {
                CONFIRMATION: "confirmation",
                CANCELLATION: "cancellation"
            },
            C = function() {
                var t = document.createElement("div").style;
                return void 0 !== t.animationName || void 0 !== t.WebkitAnimationName || void 0 !== t.MozAnimationName || void 0 !== t.msAnimationName || void 0 !== t.OAnimationName
            }(),
            T = /iPad|iPhone|iPod/.test(navigator.platform);
        p.prototype.open = function() {
            var t, o = this;
            o.state !== _.OPENING && o.state !== _.CLOSING && (t = o.$modal.attr("data-" + f + "-id"), t && o.settings.hashTracking && (h = e(window).scrollTop(), location.hash = t), m && m !== o && l(m), m = o, n(), o.$bg.addClass(o.settings.modifier), o.$overlay.addClass(o.settings.modifier).show(), o.$wrapper.show().scrollTop(0), o.$modal.focus(), a(function() {
                r(o, _.OPENING)
            }, function() {
                r(o, _.OPENED)
            }, o))
        }, p.prototype.close = function(t) {
            var o = this;
            o.state !== _.OPENING && o.state !== _.CLOSING && (o.settings.hashTracking && o.$modal.attr("data-" + f + "-id") === location.hash.substr(1) && (location.hash = "", e(window).scrollTop(h)), a(function() {
                r(o, _.CLOSING, !1, t)
            }, function() {
                o.$bg.removeClass(o.settings.modifier), o.$overlay.removeClass(o.settings.modifier).hide(), o.$wrapper.hide(), s(), r(o, _.CLOSED, !1, t)
            }, o))
        }, p.prototype.getState = function() {
            return this.state
        }, p.prototype.destroy = function() {
            var t, o = e[f].lookup;
            l(this), this.$wrapper.remove(), delete o[this.index], t = e.grep(o, function(t) {
                return !!t
            }).length, 0 === t && (this.$overlay.remove(), this.$bg.removeClass(d("is", _.CLOSING) + " " + d("is", _.OPENING) + " " + d("is", _.CLOSED) + " " + d("is", _.OPENED)))
        }, e[f] = {
            lookup: []
        }, e.fn[f] = function(t) {
            var o, i;
            return this.each(function(n, s) {
                i = e(s), null == i.data(f) ? (o = new p(i, t), i.data(f, o.index), o.settings.hashTracking && i.attr("data-" + f + "-id") === location.hash.substr(1) && o.open()) : o = e[f].lookup[i.data(f)]
            }), o
        }, e(document).ready(function() {
            e(document).on("click", "[data-" + f + "-target]", function(t) {
                t.preventDefault();
                var o = t.currentTarget,
                    i = o.getAttribute("data-" + f + "-target"),
                    n = e("[data-" + f + '-id="' + i + '"]');
                e[f].lookup[n.data(f)].open()
            }), e(document).find("." + g).each(function(t, o) {
                var i = e(o),
                    n = i.data(f + "-options");
                n ? ("string" == typeof n || n instanceof String) && (n = c(n)) : n = {}, i[f](n)
            }), e(document).on("keydown." + g, function(t) {
                m && m.settings.closeOnEscape && m.state === _.OPENED && 27 === t.keyCode && m.close()
            }), e(window).on("hashchange." + g, u)
        })
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.RouterRouter = e()
    }(this, function() {
        "use strict";
        var t = /[\-{}\[\]+?.,\\\^$|#\s]/g,
            e = /(\(\?)?:\w+/g,
            o = /\((.*?)\)/g,
            i = /\*\w+/g,
            n = /^[#\/]|\s+$/g,
            s = /\/$/,
            r = function(t) {
                if (t)
                    for (var e, o = Object.keys(t);
                        "undefined" != typeof(e = o.pop());) this.route(e, t[e])
            },
            a = function(t, e) {
                var o = t.exec(e).slice(1);
                return o.map(function(t) {
                    return t ? decodeURIComponent(t) : null
                })
            },
            l = function(t) {
                return t.replace(n, "").replace(s, "")
            },
            c = function(t, e) {
                return Object.prototype.toString.call(t) === "[object " + e + "]"
            },
            d = function(n) {
                return n = n.replace(t, "\\$&").replace(o, "(?:$1)?").replace(e, function(t, e) {
                    return e ? t : "([^/?]+)"
                }).replace(i, "([^?]*?)"), new RegExp("^" + n + "(?:\\?([\\s\\S]*))?$")
            },
            u = function(t) {
                this.options = t || {}, r(this.options.routes)
            };
        return u.prototype.route = function(t, e, o) {
            c(t, "RegExp") || (t = d(t)), c(e, "Function") && (o = e, e = ""), o || (o = this.options[e]);
            var i = l(window.location.pathname);
            if (t.test(i)) {
                var n = a(t, i);
                c(o, "Function") && o.apply(this, n)
            }
            return this
        }, u
    }),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";
        var e = window.Slick || {};
        e = function() {
            function e(e, i) {
                var n, s = this;
                s.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(e),
                    appendDots: t(e),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(e, o) {
                        return t('<button type="button" data-role="none" role="button" tabindex="0" />').text(o + 1)
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, s.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = t(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, n = t(e).data("slick") || {}, s.options = t.extend({}, s.defaults, i, n), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, "undefined" != typeof document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.instanceUid = o++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0)
            }
            var o = 0;
            return e
        }(), e.prototype.activateADA = function() {
            var t = this;
            t.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, e.prototype.addSlide = e.prototype.slickAdd = function(e, o, i) {
            var n = this;
            if ("boolean" == typeof o) i = o, o = null;
            else if (0 > o || o >= n.slideCount) return !1;
            n.unload(), "number" == typeof o ? 0 === o && 0 === n.$slides.length ? t(e).appendTo(n.$slideTrack) : i ? t(e).insertBefore(n.$slides.eq(o)) : t(e).insertAfter(n.$slides.eq(o)) : i === !0 ? t(e).prependTo(n.$slideTrack) : t(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function(e, o) {
                t(o).attr("data-slick-index", e)
            }), n.$slidesCache = n.$slides, n.reinit()
        }, e.prototype.animateHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: e
                }, t.options.speed)
            }
        }, e.prototype.animateSlide = function(e, o) {
            var i = {},
                n = this;
            n.animateHeight(), n.options.rtl === !0 && n.options.vertical === !1 && (e = -e), n.transformsEnabled === !1 ? n.options.vertical === !1 ? n.$slideTrack.animate({
                left: e
            }, n.options.speed, n.options.easing, o) : n.$slideTrack.animate({
                top: e
            }, n.options.speed, n.options.easing, o) : n.cssTransitions === !1 ? (n.options.rtl === !0 && (n.currentLeft = -n.currentLeft), t({
                animStart: n.currentLeft
            }).animate({
                animStart: e
            }, {
                duration: n.options.speed,
                easing: n.options.easing,
                step: function(t) {
                    t = Math.ceil(t), n.options.vertical === !1 ? (i[n.animType] = "translate(" + t + "px, 0px)", n.$slideTrack.css(i)) : (i[n.animType] = "translate(0px," + t + "px)", n.$slideTrack.css(i))
                },
                complete: function() {
                    o && o.call()
                }
            })) : (n.applyTransition(), e = Math.ceil(e), n.options.vertical === !1 ? i[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(i), o && setTimeout(function() {
                n.disableTransition(), o.call()
            }, n.options.speed))
        }, e.prototype.getNavTarget = function() {
            var e = this,
                o = e.options.asNavFor;
            return o && null !== o && (o = t(o).not(e.$slider)), o
        }, e.prototype.asNavFor = function(e) {
            var o = this,
                i = o.getNavTarget();
            null !== i && "object" == typeof i && i.each(function() {
                var o = t(this).slick("getSlick");
                o.unslicked || o.slideHandler(e, !0)
            })
        }, e.prototype.applyTransition = function(t) {
            var e = this,
                o = {};
            e.options.fade === !1 ? o[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : o[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(o) : e.$slides.eq(t).css(o)
        }, e.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, e.prototype.autoPlayClear = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer)
        }, e.prototype.autoPlayIterator = function() {
            var t = this,
                e = t.currentSlide + t.options.slidesToScroll;
            t.paused || t.interrupted || t.focussed || (t.options.infinite === !1 && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 === 0 && (t.direction = 1))), t.slideHandler(e))
        }, e.prototype.buildArrows = function() {
            var e = this;
            e.options.arrows === !0 && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, e.prototype.buildDots = function() {
            var e, o, i = this;
            if (i.options.dots === !0 && i.slideCount > i.options.slidesToShow) {
                for (i.$slider.addClass("slick-dotted"), o = t("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) o.append(t("<li />").append(i.options.customPaging.call(this, i, e)));
                i.$dots = o.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, e.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, o) {
                t(o).attr("data-slick-index", e).data("originalStyling", t(o).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
        }, e.prototype.buildRows = function() {
            var t, e, o, i, n, s, r, a = this;
            if (i = document.createDocumentFragment(), s = a.$slider.children(), a.options.rows > 1) {
                for (r = a.options.slidesPerRow * a.options.rows, n = Math.ceil(s.length / r), t = 0; n > t; t++) {
                    var l = document.createElement("div");
                    for (e = 0; e < a.options.rows; e++) {
                        var c = document.createElement("div");
                        for (o = 0; o < a.options.slidesPerRow; o++) {
                            var d = t * r + (e * a.options.slidesPerRow + o);
                            s.get(d) && c.appendChild(s.get(d))
                        }
                        l.appendChild(c)
                    }
                    i.appendChild(l)
                }
                a.$slider.empty().append(i), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, e.prototype.checkResponsive = function(e, o) {
            var i, n, s, r = this,
                a = !1,
                l = r.$slider.width(),
                c = window.innerWidth || t(window).width();
            if ("window" === r.respondTo ? s = c : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(c, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                n = null;
                for (i in r.breakpoints) r.breakpoints.hasOwnProperty(i) && (r.originalSettings.mobileFirst === !1 ? s < r.breakpoints[i] && (n = r.breakpoints[i]) : s > r.breakpoints[i] && (n = r.breakpoints[i]));
                null !== n ? null !== r.activeBreakpoint ? (n !== r.activeBreakpoint || o) && (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[n]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = n) : (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[n]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = n) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), a = n), e || a === !1 || r.$slider.trigger("breakpoint", [r, a])
            }
        }, e.prototype.changeSlide = function(e, o) {
            var i, n, s, r = this,
                a = t(e.currentTarget);
            switch (a.is("a") && e.preventDefault(), a.is("li") || (a = a.closest("li")), s = r.slideCount % r.options.slidesToScroll !== 0, i = s ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
                case "previous":
                    n = 0 === i ? r.options.slidesToScroll : r.options.slidesToShow - i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - n, !1, o);
                    break;
                case "next":
                    n = 0 === i ? r.options.slidesToScroll : i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + n, !1, o);
                    break;
                case "index":
                    var l = 0 === e.data.index ? 0 : e.data.index || a.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(l), !1, o), a.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, e.prototype.checkNavigable = function(t) {
            var e, o, i = this;
            if (e = i.getNavigableIndexes(), o = 0, t > e[e.length - 1]) t = e[e.length - 1];
            else
                for (var n in e) {
                    if (t < e[n]) {
                        t = o;
                        break
                    }
                    o = e[n]
                }
            return t
        }, e.prototype.cleanUpEvents = function() {
            var e = this;
            e.options.dots && null !== e.$dots && t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, e.prototype.cleanUpSlideEvents = function() {
            var e = this;
            e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
        }, e.prototype.cleanUpRows = function() {
            var t, e = this;
            e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.empty().append(t))
        }, e.prototype.clickHandler = function(t) {
            var e = this;
            e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, e.prototype.destroy = function(e) {
            var o = this;
            o.autoPlayClear(), o.touchObject = {}, o.cleanUpEvents(), t(".slick-cloned", o.$slider).detach(), o.$dots && o.$dots.remove(), o.$prevArrow && o.$prevArrow.length && (o.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), o.htmlExpr.test(o.options.prevArrow) && o.$prevArrow.remove()), o.$nextArrow && o.$nextArrow.length && (o.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), o.htmlExpr.test(o.options.nextArrow) && o.$nextArrow.remove()), o.$slides && (o.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                t(this).attr("style", t(this).data("originalStyling"))
            }), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.detach(), o.$list.detach(), o.$slider.append(o.$slides)), o.cleanUpRows(), o.$slider.removeClass("slick-slider"), o.$slider.removeClass("slick-initialized"), o.$slider.removeClass("slick-dotted"), o.unslicked = !0, e || o.$slider.trigger("destroy", [o])
        }, e.prototype.disableTransition = function(t) {
            var e = this,
                o = {};
            o[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(o) : e.$slides.eq(t).css(o)
        }, e.prototype.fadeSlide = function(t, e) {
            var o = this;
            o.cssTransitions === !1 ? (o.$slides.eq(t).css({
                zIndex: o.options.zIndex
            }), o.$slides.eq(t).animate({
                opacity: 1
            }, o.options.speed, o.options.easing, e)) : (o.applyTransition(t), o.$slides.eq(t).css({
                opacity: 1,
                zIndex: o.options.zIndex
            }), e && setTimeout(function() {
                o.disableTransition(t), e.call()
            }, o.options.speed))
        }, e.prototype.fadeSlideOut = function(t) {
            var e = this;
            e.cssTransitions === !1 ? e.$slides.eq(t).animate({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }))
        }, e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
            var e = this;
            null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
        }, e.prototype.focusHandler = function() {
            var e = this;
            e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(o) {
                o.stopImmediatePropagation();
                var i = t(this);
                setTimeout(function() {
                    e.options.pauseOnFocus && (e.focussed = i.is(":focus"), e.autoPlay())
                }, 0)
            })
        }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
            var t = this;
            return t.currentSlide
        }, e.prototype.getDotCount = function() {
            var t = this,
                e = 0,
                o = 0,
                i = 0;
            if (t.options.infinite === !0)
                for (; e < t.slideCount;) ++i, e = o + t.options.slidesToScroll, o += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (t.options.centerMode === !0) i = t.slideCount;
            else if (t.options.asNavFor)
                for (; e < t.slideCount;) ++i, e = o + t.options.slidesToScroll, o += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else i = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
            return i - 1
        }, e.prototype.getLeft = function(t) {
            var e, o, i, n = this,
                s = 0;
            return n.slideOffset = 0, o = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = o * n.options.slidesToShow * -1), n.slideCount % n.options.slidesToScroll !== 0 && t + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (t > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (t - n.slideCount)) * n.slideWidth * -1, s = (n.options.slidesToShow - (t - n.slideCount)) * o * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, s = n.slideCount % n.options.slidesToScroll * o * -1))) : t + n.options.slidesToShow > n.slideCount && (n.slideOffset = (t + n.options.slidesToShow - n.slideCount) * n.slideWidth, s = (t + n.options.slidesToShow - n.slideCount) * o), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, s = 0), n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? t * n.slideWidth * -1 + n.slideOffset : t * o * -1 + s, n.options.variableWidth === !0 && (i = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow), e = n.options.rtl === !0 ? i[0] ? -1 * (n.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, n.options.centerMode === !0 && (i = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? i[0] ? -1 * (n.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, e += (n.$list.width() - i.outerWidth()) / 2)), e
        }, e.prototype.getOption = e.prototype.slickGetOption = function(t) {
            var e = this;
            return e.options[t]
        }, e.prototype.getNavigableIndexes = function() {
            var t, e = this,
                o = 0,
                i = 0,
                n = [];
            for (e.options.infinite === !1 ? t = e.slideCount : (o = -1 * e.options.slidesToScroll, i = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); t > o;) n.push(o), o = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return n
        }, e.prototype.getSlick = function() {
            return this
        }, e.prototype.getSlideCount = function() {
            var e, o, i, n = this;
            return i = n.options.centerMode === !0 ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function(e, s) {
                return s.offsetLeft - i + t(s).outerWidth() / 2 > -1 * n.swipeLeft ? (o = s, !1) : void 0
            }), e = Math.abs(t(o).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
        }, e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
            var o = this;
            o.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, e)
        }, e.prototype.init = function(e) {
            var o = this;
            t(o.$slider).hasClass("slick-initialized") || (t(o.$slider).addClass("slick-initialized"), o.buildRows(), o.buildOut(), o.setProps(), o.startLoad(), o.loadSlider(), o.initializeEvents(), o.updateArrows(), o.updateDots(), o.checkResponsive(!0), o.focusHandler()), e && o.$slider.trigger("init", [o]), o.options.accessibility === !0 && o.initADA(), o.options.autoplay && (o.paused = !1, o.autoPlay())
        }, e.prototype.initADA = function() {
            var e = this;
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(o) {
                t(this).attr("role", "option");
                var i = e.options.centerMode ? o : Math.floor(o / e.options.slidesToShow);
                e.options.dots === !0 && t(this).attr("aria-describedby", "slick-slide" + e.instanceUid + i)
            }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function(o) {
                t(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + e.instanceUid + o,
                    id: "slick-slide" + e.instanceUid + o
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
        }, e.prototype.initArrowEvents = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, t.changeSlide))
        }, e.prototype.initDotEvents = function() {
            var e = this;
            e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
        }, e.prototype.initSlideEvents = function() {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
        }, e.prototype.initializeEvents = function() {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, e.prototype.initUI = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show()
        }, e.prototype.keyHandler = function(t) {
            var e = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide({
                data: {
                    message: e.options.rtl === !0 ? "next" : "previous"
                }
            }) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide({
                data: {
                    message: e.options.rtl === !0 ? "previous" : "next"
                }
            }))
        }, e.prototype.lazyLoad = function() {
            function e(e) {
                t("img[data-lazy]", e).each(function() {
                    var e = t(this),
                        o = t(this).attr("data-lazy"),
                        i = document.createElement("img");
                    i.onload = function() {
                        e.animate({
                            opacity: 0
                        }, 100, function() {
                            e.attr("src", o).animate({
                                opacity: 1
                            }, 200, function() {
                                e.removeAttr("data-lazy").removeClass("slick-loading")
                            }), r.$slider.trigger("lazyLoaded", [r, e, o])
                        })
                    }, i.onerror = function() {
                        e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, o])
                    }, i.src = o
                })
            }
            var o, i, n, s, r = this;
            r.options.centerMode === !0 ? r.options.infinite === !0 ? (n = r.currentSlide + (r.options.slidesToShow / 2 + 1), s = n + r.options.slidesToShow + 2) : (n = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), s = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (n = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, s = Math.ceil(n + r.options.slidesToShow), r.options.fade === !0 && (n > 0 && n--, s <= r.slideCount && s++)), o = r.$slider.find(".slick-slide").slice(n, s), e(o), r.slideCount <= r.options.slidesToShow ? (i = r.$slider.find(".slick-slide"), e(i)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (i = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(i)) : 0 === r.currentSlide && (i = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), e(i))
        }, e.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
        }, e.prototype.next = e.prototype.slickNext = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, e.prototype.orientationChange = function() {
            var t = this;
            t.checkResponsive(), t.setPosition()
        }, e.prototype.pause = e.prototype.slickPause = function() {
            var t = this;
            t.autoPlayClear(), t.paused = !0
        }, e.prototype.play = e.prototype.slickPlay = function() {
            var t = this;
            t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
        }, e.prototype.postSlide = function(t) {
            var e = this;
            e.unslicked || (e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), e.options.accessibility === !0 && e.initADA())
        }, e.prototype.prev = e.prototype.slickPrev = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, e.prototype.preventDefault = function(t) {
            t.preventDefault()
        }, e.prototype.progressiveLazyLoad = function(e) {
            e = e || 1;
            var o, i, n, s = this,
                r = t("img[data-lazy]", s.$slider);
            r.length ? (o = r.first(), i = o.attr("data-lazy"), n = document.createElement("img"), n.onload = function() {
                o.attr("src", i).removeAttr("data-lazy").removeClass("slick-loading"), s.options.adaptiveHeight === !0 && s.setPosition(), s.$slider.trigger("lazyLoaded", [s, o, i]), s.progressiveLazyLoad()
            }, n.onerror = function() {
                3 > e ? setTimeout(function() {
                    s.progressiveLazyLoad(e + 1)
                }, 500) : (o.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, o, i]), s.progressiveLazyLoad())
            }, n.src = i) : s.$slider.trigger("allImagesLoaded", [s])
        }, e.prototype.refresh = function(e) {
            var o, i, n = this;
            i = n.slideCount - n.options.slidesToShow, !n.options.infinite && n.currentSlide > i && (n.currentSlide = i), n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0), o = n.currentSlide, n.destroy(!0), t.extend(n, n.initials, {
                currentSlide: o
            }), n.init(), e || n.changeSlide({
                data: {
                    message: "index",
                    index: o
                }
            }, !1)
        }, e.prototype.registerBreakpoints = function() {
            var e, o, i, n = this,
                s = n.options.responsive || null;
            if ("array" === t.type(s) && s.length) {
                n.respondTo = n.options.respondTo || "window";
                for (e in s)
                    if (i = n.breakpoints.length - 1, o = s[e].breakpoint, s.hasOwnProperty(e)) {
                        for (; i >= 0;) n.breakpoints[i] && n.breakpoints[i] === o && n.breakpoints.splice(i, 1), i--;
                        n.breakpoints.push(o), n.breakpointSettings[o] = s[e].settings
                    } n.breakpoints.sort(function(t, e) {
                    return n.options.mobileFirst ? t - e : e - t
                })
            }
        }, e.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, e.prototype.resize = function() {
            var e = this;
            t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
            }, 50))
        }, e.prototype.removeSlide = e.prototype.slickRemove = function(t, e, o) {
            var i = this;
            return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : i.slideCount - 1) : t = e === !0 ? --t : t, i.slideCount < 1 || 0 > t || t > i.slideCount - 1 ? !1 : (i.unload(), o === !0 ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(t).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, void i.reinit())
        }, e.prototype.setCSS = function(t) {
            var e, o, i = this,
                n = {};
            i.options.rtl === !0 && (t = -t), e = "left" == i.positionProp ? Math.ceil(t) + "px" : "0px", o = "top" == i.positionProp ? Math.ceil(t) + "px" : "0px", n[i.positionProp] = t, i.transformsEnabled === !1 ? i.$slideTrack.css(n) : (n = {}, i.cssTransitions === !1 ? (n[i.animType] = "translate(" + e + ", " + o + ")", i.$slideTrack.css(n)) : (n[i.animType] = "translate3d(" + e + ", " + o + ", 0px)", i.$slideTrack.css(n)))
        }, e.prototype.setDimensions = function() {
            var t = this;
            t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
        }, e.prototype.setFade = function() {
            var e, o = this;
            o.$slides.each(function(i, n) {
                e = o.slideWidth * i * -1, o.options.rtl === !0 ? t(n).css({
                    position: "relative",
                    right: e,
                    top: 0,
                    zIndex: o.options.zIndex - 2,
                    opacity: 0
                }) : t(n).css({
                    position: "relative",
                    left: e,
                    top: 0,
                    zIndex: o.options.zIndex - 2,
                    opacity: 0
                })
            }), o.$slides.eq(o.currentSlide).css({
                zIndex: o.options.zIndex - 1,
                opacity: 1
            })
        }, e.prototype.setHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", e)
            }
        }, e.prototype.setOption = e.prototype.slickSetOption = function() {
            var e, o, i, n, s, r = this,
                a = !1;
            if ("object" === t.type(arguments[0]) ? (i = arguments[0], a = arguments[1], s = "multiple") : "string" === t.type(arguments[0]) && (i = arguments[0], n = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? s = "responsive" : "undefined" != typeof arguments[1] && (s = "single")), "single" === s) r.options[i] = n;
            else if ("multiple" === s) t.each(i, function(t, e) {
                r.options[t] = e
            });
            else if ("responsive" === s)
                for (o in n)
                    if ("array" !== t.type(r.options.responsive)) r.options.responsive = [n[o]];
                    else {
                        for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === n[o].breakpoint && r.options.responsive.splice(e, 1), e--;
                        r.options.responsive.push(n[o])
                    } a && (r.unload(), r.reinit())
        }, e.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, e.prototype.setProps = function() {
            var t = this,
                e = document.body.style;
            t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && t.animType !== !1
        }, e.prototype.setSlideClasses = function(t) {
            var e, o, i, n, s = this;
            o = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(t).addClass("slick-current"), s.options.centerMode === !0 ? (e = Math.floor(s.options.slidesToShow / 2), s.options.infinite === !0 && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = s.options.slidesToShow + t, o.slice(i - e + 1, i + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? o.eq(o.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && o.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : o.length <= s.options.slidesToShow ? o.addClass("slick-active").attr("aria-hidden", "false") : (n = s.slideCount % s.options.slidesToShow, i = s.options.infinite === !0 ? s.options.slidesToShow + t : t, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? o.slice(i - (s.options.slidesToShow - n), i + n).addClass("slick-active").attr("aria-hidden", "false") : o.slice(i, i + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === s.options.lazyLoad && s.lazyLoad()
        }, e.prototype.setupInfinite = function() {
            var e, o, i, n = this;
            if (n.options.fade === !0 && (n.options.centerMode = !1), n.options.infinite === !0 && n.options.fade === !1 && (o = null, n.slideCount > n.options.slidesToShow)) {
                for (i = n.options.centerMode === !0 ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - i; e -= 1) o = e - 1, t(n.$slides[o]).clone(!0).attr("id", "").attr("data-slick-index", o - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
                for (e = 0; i > e; e += 1) o = e, t(n.$slides[o]).clone(!0).attr("id", "").attr("data-slick-index", o + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
                n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    t(this).attr("id", "")
                })
            }
        }, e.prototype.interrupt = function(t) {
            var e = this;
            t || e.autoPlay(), e.interrupted = t
        }, e.prototype.selectHandler = function(e) {
            var o = this,
                i = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
                n = parseInt(i.attr("data-slick-index"));
            return n || (n = 0), o.slideCount <= o.options.slidesToShow ? (o.setSlideClasses(n), void o.asNavFor(n)) : void o.slideHandler(n)
        }, e.prototype.slideHandler = function(t, e, o) {
            var i, n, s, r, a, l = null,
                c = this;
            return e = e || !1, c.animating === !0 && c.options.waitForAnimate === !0 || c.options.fade === !0 && c.currentSlide === t || c.slideCount <= c.options.slidesToShow ? void 0 : (e === !1 && c.asNavFor(t), i = t, l = c.getLeft(i), r = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? r : c.swipeLeft, c.options.infinite === !1 && c.options.centerMode === !1 && (0 > t || t > c.getDotCount() * c.options.slidesToScroll) ? void(c.options.fade === !1 && (i = c.currentSlide, o !== !0 ? c.animateSlide(r, function() {
                c.postSlide(i)
            }) : c.postSlide(i))) : c.options.infinite === !1 && c.options.centerMode === !0 && (0 > t || t > c.slideCount - c.options.slidesToScroll) ? void(c.options.fade === !1 && (i = c.currentSlide, o !== !0 ? c.animateSlide(r, function() {
                c.postSlide(i)
            }) : c.postSlide(i))) : (c.options.autoplay && clearInterval(c.autoPlayTimer), n = 0 > i ? c.slideCount % c.options.slidesToScroll !== 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll !== 0 ? 0 : i - c.slideCount : i, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, n]), s = c.currentSlide, c.currentSlide = n, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = c.getNavTarget(), a = a.slick("getSlick"), a.slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide)), c.updateDots(), c.updateArrows(), c.options.fade === !0 ? (o !== !0 ? (c.fadeSlideOut(s), c.fadeSlide(n, function() {
                c.postSlide(n)
            })) : c.postSlide(n), void c.animateHeight()) : void(o !== !0 ? c.animateSlide(l, function() {
                c.postSlide(n)
            }) : c.postSlide(n))))
        }, e.prototype.startLoad = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, e.prototype.swipeDirection = function() {
            var t, e, o, i, n = this;
            return t = n.touchObject.startX - n.touchObject.curX, e = n.touchObject.startY - n.touchObject.curY, o = Math.atan2(e, t), i = Math.round(180 * o / Math.PI), 0 > i && (i = 360 - Math.abs(i)), 45 >= i && i >= 0 ? n.options.rtl === !1 ? "left" : "right" : 360 >= i && i >= 315 ? n.options.rtl === !1 ? "left" : "right" : i >= 135 && 225 >= i ? n.options.rtl === !1 ? "right" : "left" : n.options.verticalSwiping === !0 ? i >= 35 && 135 >= i ? "down" : "up" : "vertical"
        }, e.prototype.swipeEnd = function(t) {
            var e, o, i = this;
            if (i.dragging = !1, i.interrupted = !1, i.shouldClick = i.touchObject.swipeLength > 10 ? !1 : !0, void 0 === i.touchObject.curX) return !1;
            if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
                switch (o = i.swipeDirection()) {
                    case "left":
                    case "down":
                        e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
                }
                "vertical" != o && (i.slideHandler(e),
                    i.touchObject = {}, i.$slider.trigger("swipe", [i, o]))
            } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
        }, e.prototype.swipeHandler = function(t) {
            var e = this;
            if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
                case "start":
                    e.swipeStart(t);
                    break;
                case "move":
                    e.swipeMove(t);
                    break;
                case "end":
                    e.swipeEnd(t)
            }
        }, e.prototype.swipeMove = function(t) {
            var e, o, i, n, s, r = this;
            return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !r.dragging || s && 1 !== s.length ? !1 : (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX, r.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), o = r.swipeDirection(), "vertical" !== o ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), n = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (n = r.touchObject.curY > r.touchObject.startY ? 1 : -1), i = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === o || r.currentSlide >= r.getDotCount() && "left" === o) && (i = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.options.vertical === !1 ? r.swipeLeft = e + i * n : r.swipeLeft = e + i * (r.$list.height() / r.listWidth) * n, r.options.verticalSwiping === !0 && (r.swipeLeft = e + i * n), r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
        }, e.prototype.swipeStart = function(t) {
            var e, o = this;
            return o.interrupted = !0, 1 !== o.touchObject.fingerCount || o.slideCount <= o.options.slidesToShow ? (o.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), o.touchObject.startX = o.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, o.touchObject.startY = o.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(o.dragging = !0))
        }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, e.prototype.unload = function() {
            var e = this;
            t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, e.prototype.unslick = function(t) {
            var e = this;
            e.$slider.trigger("unslick", [e, t]), e.destroy()
        }, e.prototype.updateArrows = function() {
            var t, e = this;
            t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, e.prototype.updateDots = function() {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, e.prototype.visibility = function() {
            var t = this;
            t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
        }, t.fn.slick = function() {
            var t, o, i = this,
                n = arguments[0],
                s = Array.prototype.slice.call(arguments, 1),
                r = i.length;
            for (t = 0; r > t; t++)
                if ("object" == typeof n || "undefined" == typeof n ? i[t].slick = new e(i[t], n) : o = i[t].slick[n].apply(i[t].slick, s), "undefined" != typeof o) return o;
            return i
        }
    }),
    function(t, e) {
        function o() {
            S = E = $ = b = x = L = N
        }

        function i(t, e) {
            for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
        }

        function n(t) {
            return parseFloat(t) || 0
        }

        function s() {
            A = {
                top: e.pageYOffset,
                left: e.pageXOffset
            }
        }

        function r() {
            return e.pageXOffset != A.left ? (s(), void $()) : void(e.pageYOffset != A.top && (s(), l()))
        }

        function a(t) {
            setTimeout(function() {
                e.pageYOffset != A.top && (A.top = e.pageYOffset, l())
            }, 0)
        }

        function l() {
            for (var t = D.length - 1; t >= 0; t--) c(D[t])
        }

        function c(t) {
            if (t.inited) {
                var e = A.top <= t.limit.start ? 0 : A.top >= t.limit.end ? 2 : 1;
                t.mode != e && f(t, e)
            }
        }

        function d() {
            for (var t = D.length - 1; t >= 0; t--)
                if (D[t].inited) {
                    var e = Math.abs(w(D[t].clone) - D[t].docOffsetTop),
                        o = Math.abs(D[t].parent.node.offsetHeight - D[t].parent.height);
                    if (e >= 2 || o >= 2) return !1
                } return !0
        }

        function u(t) {
            isNaN(parseFloat(t.computed.top)) || t.isCell || "none" == t.computed.display || (t.inited = !0, t.clone || g(t), "absolute" != t.parent.computed.position && "relative" != t.parent.computed.position && (t.parent.node.style.position = "relative"), c(t), t.parent.height = t.parent.node.offsetHeight, t.docOffsetTop = w(t.clone))
        }

        function p(t) {
            var e = !0;
            t.clone && y(t), i(t.node.style, t.css);
            for (var o = D.length - 1; o >= 0; o--)
                if (D[o].node !== t.node && D[o].parent.node === t.parent.node) {
                    e = !1;
                    break
                } e && (t.parent.node.style.position = t.parent.css.position), t.mode = -1
        }

        function m() {
            for (var t = D.length - 1; t >= 0; t--) u(D[t])
        }

        function h() {
            for (var t = D.length - 1; t >= 0; t--) p(D[t])
        }

        function f(t, e) {
            var o = t.node.style;
            switch (e) {
                case 0:
                    o.position = "absolute", o.left = t.offset.left + "px", o.right = t.offset.right + "px", o.top = t.offset.top + "px", o.bottom = "auto", o.width = "auto", o.marginLeft = 0, o.marginRight = 0, o.marginTop = 0;
                    break;
                case 1:
                    o.position = "fixed", o.left = t.box.left + "px", o.right = t.box.right + "px", o.top = t.css.top, o.bottom = "auto", o.width = "auto", o.marginLeft = 0, o.marginRight = 0, o.marginTop = 0;
                    break;
                case 2:
                    o.position = "absolute", o.left = t.offset.left + "px", o.right = t.offset.right + "px", o.top = "auto", o.bottom = 0, o.width = "auto", o.marginLeft = 0, o.marginRight = 0
            }
            t.mode = e
        }

        function g(t) {
            t.clone = document.createElement("div");
            var e = t.node.nextSibling || t.node,
                o = t.clone.style;
            o.height = t.height + "px", o.width = t.width + "px", o.marginTop = t.computed.marginTop, o.marginBottom = t.computed.marginBottom, o.marginLeft = t.computed.marginLeft, o.marginRight = t.computed.marginRight, o.padding = o.border = o.borderSpacing = 0, o.fontSize = "1em", o.position = "static", o.cssFloat = t.computed.cssFloat, t.node.parentNode.insertBefore(t.clone, e)
        }

        function y(t) {
            t.clone.parentNode.removeChild(t.clone), t.clone = void 0
        }

        function v(t) {
            var e = getComputedStyle(t),
                o = t.parentNode,
                i = getComputedStyle(o),
                s = t.style.position;
            t.style.position = "relative";
            var r = {
                    top: e.top,
                    marginTop: e.marginTop,
                    marginBottom: e.marginBottom,
                    marginLeft: e.marginLeft,
                    marginRight: e.marginRight,
                    cssFloat: e.cssFloat,
                    display: e.display
                },
                a = {
                    top: n(e.top),
                    marginBottom: n(e.marginBottom),
                    paddingLeft: n(e.paddingLeft),
                    paddingRight: n(e.paddingRight),
                    borderLeftWidth: n(e.borderLeftWidth),
                    borderRightWidth: n(e.borderRightWidth)
                };
            t.style.position = s;
            var l = {
                    position: t.style.position,
                    top: t.style.top,
                    bottom: t.style.bottom,
                    left: t.style.left,
                    right: t.style.right,
                    width: t.style.width,
                    marginTop: t.style.marginTop,
                    marginLeft: t.style.marginLeft,
                    marginRight: t.style.marginRight
                },
                c = _(t),
                d = _(o),
                u = {
                    node: o,
                    css: {
                        position: o.style.position
                    },
                    computed: {
                        position: i.position
                    },
                    numeric: {
                        borderLeftWidth: n(i.borderLeftWidth),
                        borderRightWidth: n(i.borderRightWidth),
                        borderTopWidth: n(i.borderTopWidth),
                        borderBottomWidth: n(i.borderBottomWidth)
                    }
                },
                p = {
                    node: t,
                    box: {
                        left: c.win.left,
                        right: M.clientWidth - c.win.right
                    },
                    offset: {
                        top: c.win.top - d.win.top - u.numeric.borderTopWidth,
                        left: c.win.left - d.win.left - u.numeric.borderLeftWidth,
                        right: -c.win.right + d.win.right - u.numeric.borderRightWidth
                    },
                    css: l,
                    isCell: "table-cell" == e.display,
                    computed: r,
                    numeric: a,
                    width: c.win.right - c.win.left,
                    height: c.win.bottom - c.win.top,
                    mode: -1,
                    inited: !1,
                    parent: u,
                    limit: {
                        start: c.doc.top - a.top,
                        end: d.doc.top + o.offsetHeight - u.numeric.borderBottomWidth - t.offsetHeight - a.top - a.marginBottom
                    }
                };
            return p
        }

        function w(t) {
            for (var e = 0; t;) e += t.offsetTop, t = t.offsetParent;
            return e
        }

        function _(t) {
            var o = t.getBoundingClientRect();
            return {
                doc: {
                    top: o.top + e.pageYOffset,
                    left: o.left + e.pageXOffset
                },
                win: o
            }
        }

        function k() {
            O = setInterval(function() {
                !d() && $()
            }, 500)
        }

        function C() {
            clearInterval(O)
        }

        function T() {
            R && (document[P] ? C() : k())
        }

        function S() {
            R || (s(), m(), e.addEventListener("scroll", r), e.addEventListener("wheel", a), e.addEventListener("resize", $), e.addEventListener("orientationchange", $), t.addEventListener(H, T), k(), R = !0)
        }

        function $() {
            if (R) {
                h();
                for (var t = D.length - 1; t >= 0; t--) D[t] = v(D[t].node);
                m()
            }
        }

        function b() {
            e.removeEventListener("scroll", r), e.removeEventListener("wheel", a), e.removeEventListener("resize", $), e.removeEventListener("orientationchange", $), t.removeEventListener(H, T), C(), R = !1
        }

        function x() {
            b(), h()
        }

        function L() {
            for (x(); D.length;) D.pop()
        }

        function E(t) {
            for (var e = D.length - 1; e >= 0; e--)
                if (D[e].node === t) return;
            var o = v(t);
            D.push(o), R ? u(o) : S()
        }

        function I(t) {
            for (var e = D.length - 1; e >= 0; e--) D[e].node === t && (p(D[e]), D.splice(e, 1))
        }
        var A, O, D = [],
            R = !1,
            M = t.documentElement,
            N = function() {},
            P = "hidden",
            H = "visibilitychange";
        void 0 !== t.webkitHidden && (P = "webkitHidden", H = "webkitvisibilitychange"), e.getComputedStyle || o();
        for (var z = ["", "-webkit-", "-moz-", "-ms-"], j = document.createElement("div"), F = z.length - 1; F >= 0; F--) {
            try {
                j.style.position = z[F] + "sticky"
            } catch (W) {}
            "" != j.style.position && o()
        }
        s(), e.Stickyfill = {
            stickies: D,
            add: E,
            remove: I,
            init: S,
            rebuild: $,
            pause: b,
            stop: x,
            kill: L
        }
    }(document, window), window.jQuery && ! function(t) {
        t.fn.Stickyfill = function(t) {
            return this.each(function() {
                Stickyfill.add(this)
            }), this
        }
    }(window.jQuery),
    function(t) {
        var e = {
            url: !1,
            callback: !1,
            target: !1,
            duration: 120,
            on: "mouseover",
            touch: !0,
            onZoomIn: !1,
            onZoomOut: !1,
            magnify: 1
        };
        t.zoom = function(e, o, i, n) {
            var s, r, a, l, c, d, u, p = t(e),
                m = p.css("position"),
                h = t(o);
            return p.css("position", /(absolute|fixed)/.test(m) ? m : "relative"), p.css("overflow", "hidden"), i.style.width = i.style.height = "", t(i).addClass("zoomImg").css({
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0,
                width: i.width * n,
                height: i.height * n,
                border: "none",
                maxWidth: "none",
                maxHeight: "none"
            }).appendTo(e), {
                init: function() {
                    r = p.outerWidth(), s = p.outerHeight(), o === p[0] ? (l = r, a = s) : (l = h.outerWidth(), a = h.outerHeight()), c = (i.width - r) / l, d = (i.height - s) / a, u = h.offset()
                },
                move: function(t) {
                    var e = t.pageX - u.left,
                        o = t.pageY - u.top;
                    o = Math.max(Math.min(o, a), 0), e = Math.max(Math.min(e, l), 0), i.style.left = e * -c + "px", i.style.top = o * -d + "px"
                }
            }
        }, t.fn.zoom = function(o) {
            return this.each(function() {
                var i, n = t.extend({}, e, o || {}),
                    s = n.target || this,
                    r = this,
                    a = t(r),
                    l = t(s),
                    c = document.createElement("img"),
                    d = t(c),
                    u = "mousemove.zoom",
                    p = !1,
                    m = !1;
                (n.url || (i = a.find("img"), i[0] && (n.url = i.data("src") || i.attr("src")), n.url)) && (! function() {
                    var t = l.css("position"),
                        e = l.css("overflow");
                    a.one("zoom.destroy", function() {
                        a.off(".zoom"), l.css("position", t), l.css("overflow", e), d.remove()
                    })
                }(), c.onload = function() {
                    function e(e) {
                        i.init(), i.move(e), d.stop().fadeTo(t.support.opacity ? n.duration : 0, 1, t.isFunction(n.onZoomIn) ? n.onZoomIn.call(c) : !1)
                    }

                    function o() {
                        d.stop().fadeTo(n.duration, 0, t.isFunction(n.onZoomOut) ? n.onZoomOut.call(c) : !1)
                    }
                    var i = t.zoom(s, r, c, n.magnify);
                    "grab" === n.on ? a.on("mousedown.zoom", function(n) {
                        1 === n.which && (t(document).one("mouseup.zoom", function() {
                            o(), t(document).off(u, i.move)
                        }), e(n), t(document).on(u, i.move), n.preventDefault())
                    }) : "click" === n.on ? a.on("click.zoom", function(n) {
                        return p ? void 0 : (p = !0, e(n), t(document).on(u, i.move), t(document).one("click.zoom", function() {
                            o(), p = !1, t(document).off(u, i.move)
                        }), !1)
                    }) : "toggle" === n.on ? a.on("click.zoom", function(t) {
                        p ? o() : e(t), p = !p
                    }) : "mouseover" === n.on && (i.init(), a.on("mouseenter.zoom", e).on("mouseleave.zoom", o).on(u, i.move)), n.touch && a.on("touchstart.zoom", function(t) {
                        t.preventDefault(), m ? (m = !1, o()) : (m = !0, e(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0]))
                    }).on("touchmove.zoom", function(t) {
                        t.preventDefault(), i.move(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
                    }), t.isFunction(n.callback) && n.callback.call(c)
                }, c.src = n.url)
            })
        }, t.fn.zoom.defaults = e
    }(window.jQuery);