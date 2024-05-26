(function() {
    "use strict";
    var e = {
        473: function(e, t, n) {
            n.d(t, {
                a3: function() {
                    return s
                },
                BH: function() {
                    return y
                },
                s: function() {
                    return U
                },
                ln: function() {
                    return b
                },
                aY: function() {
                    return g
                },
                zW: function() {
                    return _
                }
            });
            n(7658);
            var a = n(4870)
              , r = n(3396)
              , o = n(2529);
            const l = {
                authKeySets: "auth_key_sets"
            };
            var u = n(7865)
              , i = n(4484);
            const s = ["memory", "session_storage", "local_storage"]
              , d = i.z.object({
                name: i.z.string(),
                publicKey: i.z.string(),
                privateKey: i.z.string(),
                storeType: i.z.union([i.z.literal("memory"), i.z.literal("session_storage"), i.z.literal("local_storage")]),
                sha256Fingerprint: i.z.string(),
                addedAtMillis: i.z.number(),
                enabled: i.z.boolean()
            });
            async function c(e) {
                return {
                    name: e.name,
                    publicKey: e.publicKey,
                    privateKey: e.privateKey,
                    storeType: e.storeType,
                    sha256Fingerprint: await (0,
                    u.YX)(e.publicKey),
                    addedAtMillis: (new Date).getTime(),
                    enabled: !0
                }
            }
            const p = (0,
            a.iH)(new Map);
            function v(e, t) {
                const n = (0,
                a.qj)((()=>{
                    const n = e.getItem(t);
                    return null === n ? [] : f(JSON.parse(n))
                }
                )());
                return (0,
                r.YP)(n, (()=>{
                    e.setItem(t, JSON.stringify(n))
                }
                )),
                n
            }
            function f(e) {
                const t = i.z.array(i.z.unknown()).safeParse(e);
                if (!t.success)
                    return console.warn("failed to parse stored auth key sets as an array", t.error),
                    [];
                const n = t.data.flatMap((e=>{
                    const t = d.safeParse(e);
                    return t.success ? [t.data] : (console.warn("failed to parse stored auth key set", e, t.error),
                    [])
                }
                ));
                return n
            }
            const m = v(window.sessionStorage, l.authKeySets)
              , h = v(window.localStorage, o.u.authKeySets)
              , w = (0,
            r.Fl)((()=>new Map([...p.value.entries(), ...m.map((e=>[e.sha256Fingerprint, e])), ...h.map((e=>[e.sha256Fingerprint, e]))])))
              , g = (0,
            r.Fl)((()=>[...w.value.values()].sort(((e,t)=>e.addedAtMillis - t.addedAtMillis))));
            function y(e) {
                return w.value.get(e)
            }
            async function b(e) {
                const t = await c(e);
                return w.value.has(t.sha256Fingerprint) ? "already_exist" : (S(t),
                "stored")
            }
            function S(e) {
                switch (e.storeType) {
                case "memory":
                    p.value.set(e.sha256Fingerprint, e);
                    break;
                case "session_storage":
                    m.push(e);
                    break;
                case "local_storage":
                    h.push(e);
                    break
                }
            }
            function U(e) {
                p.value.delete(e);
                const t = m.findIndex((t=>t.sha256Fingerprint === e));
                -1 !== t && m.splice(t, 1);
                const n = h.findIndex((t=>t.sha256Fingerprint === e));
                -1 !== n && h.splice(n, 1)
            }
            function _(e) {
                U(e.sha256Fingerprint),
                S(e)
            }
        },
        516: function(e, t, n) {
            n.d(t, {
                B: function() {
                    return r
                },
                G: function() {
                    return o
                }
            });
            var a = n(4870);
            const r = (0,
            a.qj)({
                title: "",
                message: "",
                showsInput: !1,
                inputType: "",
                shows: !1,
                placeholder: "",
                width: "",
                resolveInput: e=>{}
            });
            function o({title: e, showsInput: t=!0, message: n, inputType: a="text", placeholder: o, width: l="auto"}) {
                return r.title = e,
                r.message = n,
                r.showsInput = t,
                r.inputType = a,
                r.placeholder = o ?? "",
                r.width = l,
                r.shows = !0,
                new Promise((e=>r.resolveInput = e))
            }
        },
        7274: function(e, t, n) {
            n.d(t, {
                O: function() {
                    return o
                },
                v: function() {
                    return r
                }
            });
            var a = n(4870);
            const r = (0,
            a.qj)({
                message: "",
                icon: void 0,
                shows: !1
            });
            function o({message: e, icon: t}) {
                r.message = e,
                r.icon = t,
                r.shows = !0
            }
        },
        5989: function(e, t, n) {
            function a(e) {
                return [t=>!!t || `${e} is required.`]
            }
            n.d(t, {
                R: function() {
                    return a
                }
            })
        },
        4444: function(e, t, n) {
            n.d(t, {
                E: function() {
                    return u
                },
                x: function() {
                    return l
                }
            });
            n(2062);
            var a = n(4484);
            const r = a.z.array(a.z.tuple([a.z.string(), a.z.string()]))
              , o = {
                pipingServerUrl: "server",
                pipingServerHeaders: "headers",
                csPath: "cs_path",
                scPath: "sc_path",
                sshUsername: "user",
                sshPassword: "password",
                sshServerPortForHint: "s_port",
                autoConnect: "auto_connect"
            }
              , l = {
                pipingServerUrl() {
                    return i().get(o.pipingServerUrl) ?? void 0
                },
                pipingServerHeaders() {
                    const e = i().get(o.pipingServerHeaders);
                    if (null === e)
                        return;
                    let t;
                    try {
                        t = JSON.parse(decodeURIComponent(e))
                    } catch {
                        return
                    }
                    const n = r.safeParse(t);
                    return n.success ? n.data : void 0
                },
                csPath() {
                    return i().get(o.csPath) ?? void 0
                },
                scPath() {
                    return i().get(o.scPath) ?? void 0
                },
                sshUsername() {
                    return i().get(o.sshUsername) ?? void 0
                },
                sshPassword() {
                    return i().get(o.sshPassword) ?? void 0
                },
                sshServerPortForHint() {
                    return i().get(o.sshServerPortForHint) ?? void 0
                },
                autoConnect() {
                    const e = i().get(o.autoConnect);
                    return null !== e && ["", "1", "true"].includes(e)
                }
            };
            function u({pipingServerUrl: e, pipingServerHeaders: t, csPath: n, scPath: a, sshUsername: r, sshPassword: l, sshServerPortForHint: u, autoConnect: i}) {
                const s = new URLSearchParams;
                void 0 !== e && s.set(o.pipingServerUrl, e),
                void 0 !== t && 0 !== t.length && s.set(o.pipingServerHeaders, JSON.stringify(t)),
                void 0 !== n && s.set(o.csPath, n),
                void 0 !== a && s.set(o.scPath, a),
                void 0 !== r && s.set(o.sshUsername, r),
                void 0 !== l && s.set(o.sshPassword, l),
                void 0 !== u && "" !== u && s.set(o.sshServerPortForHint, u),
                void 0 !== i && i && s.set(o.autoConnect, "1");
                const d = new URL(location.href);
                return d.hash = `?${s.toString()}`,
                d.href.replaceAll("%3A", ":").replaceAll("%2F", "/")
            }
            function i() {
                const e = new URL(`a://a${location.hash.substring(1)}`);
                return e.searchParams
            }
        },
        5182: function(e, t, n) {
            n.d(t, {
                d: function() {
                    return r
                }
            });
            var a = n(6849);
            function r({pipingServerUrl: e, pipingServerHeaders: t, csPath: n, scPath: r, sshServerPort: o}) {
                const l = 0 === t.length ? "" : " " + t.map((([e,t])=>`-H '${e}: ${t}'`)).join(" ");
                return [`curl -sSN${l} ${(0,
                a.Z)(e, n)}`, `nc localhost ${o}`, `curl -sSNT -${l} ${(0,
                a.Z)(e, r)}`].join(" | ")
            }
        },
        7865: function(e, t, n) {
            n.d(t, {
                U0: function() {
                    return s
                },
                UX: function() {
                    return p
                },
                YX: function() {
                    return c
                },
                d0: function() {
                    return u
                },
                hI: function() {
                    return d
                },
                p8: function() {
                    return i
                }
            });
            n(2062);
            var a = n(9212);
            let[r,o] = l();
            function l() {
                console.log(_asset_blobs[n.u(755)])
                //n.p + n.u(755),n.b
                const e = new Worker(new URL(_asset_blobs[n.u(755)]));
                return [a.Ud(e), e]
            }
            async function u() {
                return await r.existed() && (o.terminate(),
                console.warn("recreating remote..."),
                [r,o] = l()),
                r
            }
            async function i(e) {
                return await (await u()).getAuthPublicKeyType(e)
            }
            async function s(e, t) {
                return (await u()).generateRsaKeys(e)
            }
            async function d(e) {
                return (await u()).generateEd25519Keys()
            }
            async function c(e) {
                return await (await u()).sshSha256Fingerprint(e)
            }
            async function p(e) {
                return await (await u()).sshPrivateKeyIsEncrypted(e)
            }
        },
        2529: function(e, t, n) {
            n.d(t, {
                u: function() {
                    return a
                }
            });
            const a = {
                language: "language",
                knownHostKeyFingerprints: "known_host_key_fingerprints",
                authKeySets: "auth_key_sets"
            }
        },
        8265: function(e, t, n) {
            var a = n(9242)
              , r = (n(1439),
            n(7585),
            n(5315),
            n(7658),
            n(3396))
              , o = n(4870)
              , l = n(7139)
              , u = n(4444)
              , i = n(6526)
              , s = n(473)
              , d = n(5182)
              , c = n(6008)
              , p = n(5989)
              , v = n(516);
            const f = {
                style: {
                    "white-space": "pre-wrap",
                    "margin-bottom": "1rem"
                }
            };
            var m = (0,
            r.aZ)({
                __name: "GlobalPrompt",
                setup(e) {
                    const t = (0,
                    o.iH)("")
                      , n = (0,
                    o.iH)(!1);
                    function u() {
                        v.B.shows = !1,
                        v.B.resolveInput(void 0)
                    }
                    function s() {
                        v.B.shows = !1,
                        v.B.resolveInput(t.value)
                    }
                    return (0,
                    r.YP)((()=>v.B.shows), (()=>{
                        v.B.shows && (t.value = "",
                        n.value = "password" === v.B.inputType)
                    }
                    )),
                    (e,d)=>{
                        const c = (0,
                        r.up)("v-card-title")
                          , p = (0,
                        r.up)("v-btn")
                          , m = (0,
                        r.up)("v-text-field")
                          , h = (0,
                        r.up)("v-card-text")
                          , w = (0,
                        r.up)("v-spacer")
                          , g = (0,
                        r.up)("v-card-actions")
                          , y = (0,
                        r.up)("v-card")
                          , b = (0,
                        r.up)("v-dialog")
                          , S = (0,
                        r.up)("v-row");
                        return (0,
                        r.wg)(),
                        (0,
                        r.j4)(S, {
                            justify: "center"
                        }, {
                            default: (0,
                            r.w5)((()=>[(0,
                            r.Wm)(b, {
                                modelValue: (0,
                                o.SU)(v.B).shows,
                                "onUpdate:modelValue": d[5] || (d[5] = e=>(0,
                                o.SU)(v.B).shows = e),
                                persistent: "",
                                width: (0,
                                o.SU)(v.B).width
                            }, {
                                default: (0,
                                r.w5)((()=>[(0,
                                o.SU)(v.B).shows ? ((0,
                                r.wg)(),
                                (0,
                                r.j4)(y, {
                                    key: 0
                                }, {
                                    default: (0,
                                    r.w5)((()=>[(0,
                                    r.Wm)(c, {
                                        class: "text-h5"
                                    }, {
                                        default: (0,
                                        r.w5)((()=>[(0,
                                        r.Uk)((0,
                                        l.zw)((0,
                                        o.SU)(v.B).title), 1)])),
                                        _: 1
                                    }), (0,
                                    r.Wm)(h, null, {
                                        default: (0,
                                        r.w5)((()=>[(0,
                                        r._)("pre", f, (0,
                                        l.zw)((0,
                                        o.SU)(v.B).message), 1), (0,
                                        r.wy)((0,
                                        r.Wm)(m, {
                                            modelValue: t.value,
                                            "onUpdate:modelValue": d[1] || (d[1] = e=>t.value = e),
                                            onKeydown: d[2] || (d[2] = (0,
                                            a.D2)((e=>s()), ["enter"])),
                                            placeholder: (0,
                                            o.SU)(v.B).placeholder,
                                            type: (0,
                                            o.SU)(v.B).inputType,
                                            variant: "solo-filled",
                                            autofocus: !0
                                        }, (0,
                                        r.Nv)({
                                            _: 2
                                        }, [n.value ? {
                                            name: "append-inner",
                                            fn: (0,
                                            r.w5)((()=>[(0,
                                            r.Wm)(p, {
                                                onClick: d[0] || (d[0] = e=>(0,
                                                o.SU)(v.B).inputType = "text" === (0,
                                                o.SU)(v.B).inputType ? "password" : "text"),
                                                icon: "text" === (0,
                                                o.SU)(v.B).inputType ? (0,
                                                o.SU)(i.DqW) : (0,
                                                o.SU)(i.rgx),
                                                variant: "text"
                                            }, null, 8, ["icon"])])),
                                            key: "0"
                                        } : void 0]), 1032, ["modelValue", "placeholder", "type"]), [[a.F8, (0,
                                        o.SU)(v.B).showsInput]])])),
                                        _: 1
                                    }), (0,
                                    r.Wm)(g, null, {
                                        default: (0,
                                        r.w5)((()=>[(0,
                                        r.Wm)(w), (0,
                                        r.Wm)(p, {
                                            variant: "text",
                                            onClick: d[3] || (d[3] = e=>u())
                                        }, {
                                            default: (0,
                                            r.w5)((()=>[(0,
                                            r.Uk)("Cancel")])),
                                            _: 1
                                        }), (0,
                                        r.Wm)(p, {
                                            color: "secondary",
                                            variant: "text",
                                            onClick: d[4] || (d[4] = e=>s())
                                        }, {
                                            default: (0,
                                            r.w5)((()=>[(0,
                                            r.Uk)("OK")])),
                                            _: 1
                                        })])),
                                        _: 1
                                    })])),
                                    _: 1
                                })) : (0,
                                r.kq)("", !0)])),
                                _: 1
                            }, 8, ["modelValue", "width"])])),
                            _: 1
                        })
                    }
                }
            });
            const h = m;
            var w = h
              , g = n(7274)
              , y = (0,
            r.aZ)({
                __name: "GlobalSnackbar",
                setup(e) {
                    return (e,t)=>{
                        const n = (0,
                        r.up)("v-icon")
                          , a = (0,
                        r.up)("v-snackbar");
                        return (0,
                        r.wg)(),
                        (0,
                        r.j4)(a, {
                            modelValue: (0,
                            o.SU)(g.v).shows,
                            "onUpdate:modelValue": t[0] || (t[0] = e=>(0,
                            o.SU)(g.v).shows = e),
                            location: "top",
                            timeout: 2500
                        }, {
                            default: (0,
                            r.w5)((()=>[void 0 !== (0,
                            o.SU)(g.v).icon ? ((0,
                            r.wg)(),
                            (0,
                            r.j4)(n, {
                                key: 0,
                                icon: (0,
                                o.SU)(g.v).icon
                            }, null, 8, ["icon"])) : (0,
                            r.kq)("", !0), (0,
                            r.Uk)(" " + (0,
                            l.zw)((0,
                            o.SU)(g.v).message), 1)])),
                            _: 1
                        }, 8, ["modelValue"])
                    }
                }
            });
            const b = y;
            var S = b
              , U = (0,
            r.aZ)({
                __name: "Globals",
                setup(e) {
                    return (e,t)=>((0,
                    r.wg)(),
                    (0,
                    r.iD)(r.HY, null, [(0,
                    r.Wm)(w), (0,
                    r.Wm)(S)], 64))
                }
            });
            const _ = U;
            var W = _;
            const k = (async()=>{
                const e = !new Request("",{
                    method: "POST",
                    body: new ReadableStream,
                    duplex: "half"
                }).headers.has("Content-Type");
                return !!e && fetch("data:a/a;charset=utf-8,", {
                    method: "POST",
                    body: new ReadableStream,
                    duplex: "half"
                }).then((()=>!0), (()=>!1))
            }
            )()
              , x = (0,
            r._)("a", {
                href: "",
                class: "me-4 font-weight-bold",
                style: {
                    color: "inherit",
                    "text-decoration": "none"
                }
            }, " Piping SSH ", -1)
              , P = (0,
            r._)("br", null, null, -1)
              , V = (0,
            r._)("br", null, null, -1)
              , H = (0,
            r._)("div", {
                class: "ma-2"
            }, "Keys", -1)
              , C = {
                style: {
                    "text-align": "end",
                    "margin-bottom": "1rem"
                }
            }
              , j = (0,
            r._)("div", {
                class: "ma-2"
            }, "New key", -1)
              , T = (0,
            r._)("div", {
                class: "ma-2"
            }, "Key generator", -1);
            var O = (0,
            r.aZ)({
                __name: "App",
                setup(e) {
                    const t = (0,
                    r.RC)((()=>n.e(149).then(n.bind(n, 6149))))
                      , v = (0,
                    r.RC)((()=>n.e(211).then(n.bind(n, 6211))))
                      , f = (0,
                    r.RC)((()=>n.e(792).then(n.bind(n, 9792))))
                      , m = (0,
                    r.RC)((()=>n.e(132).then(n.bind(n, 6132))))
                      , h = (0,
                    o.iH)(!0);
                    k.then((e=>h.value = e));
                    const w = (0,
                    o.iH)(u.x.pipingServerUrl() ?? "https://ppng.io")
                      , y = (0,
                    o.iH)(["https://ppng.io", "https://piping.nwtgck.repl.co"])
                      , b = (0,
                    o.iH)(u.x.pipingServerHeaders() ?? [])
                      , S = (0,
                    r.Fl)((()=>b.value.filter((([e,t])=>"" !== e))))
                      , U = (0,
                    o.iH)(u.x.csPath() ?? J(4))
                      , _ = (0,
                    o.iH)(u.x.scPath() ?? J(4))
                      , O = (0,
                    o.iH)(u.x.sshUsername() ?? "")
                      , F = (0,
                    o.iH)(u.x.sshServerPortForHint() ?? "22")
                      , R = (0,
                    o.iH)(u.x.sshPassword() ?? "")
                      , B = (0,
                    o.iH)(!1)
                      , z = (0,
                    o.iH)("" === u.x.sshPassword())
                      , A = (0,
                    r.Fl)((()=>{
                        if ("" !== R.value || z.value)
                            return R.value
                    }
                    ))
                      , K = (0,
                    o.iH)(void 0 !== u.x.sshPassword())
                      , q = (0,
                    o.iH)(u.x.autoConnect() ?? !1)
                      , E = (0,
                    o.iH)(!1)
                      , N = (0,
                    o.iH)(!1);
                    function I() {
                        N.value = !0
                    }
                    const M = (0,
                    o.iH)(!1)
                      , L = (0,
                    o.iH)(!1)
                      , $ = (0,
                    o.iH)(!1)
                      , Y = (0,
                    o.iH)(!1);
                    function Z() {
                        n.e(537).then(n.t.bind(n, 6537, 23)),
                        n.e(114).then(n.t.bind(n, 7114, 23)),
                        n.e(149).then(n.bind(n, 6149)),
                        n.e(98).then(n.t.bind(n, 7098, 23)),
                        n.e(211).then(n.bind(n, 6211)),
                        n.e(792).then(n.bind(n, 9792)),
                        n.e(132).then(n.bind(n, 6132))
                    }
                    (0,
                    r.bv)((()=>{
                        u.x.autoConnect() && I(),
                        window.addEventListener("load", (()=>{
                            Z()
                        }
                        ))
                    }
                    ));
                    const D = (0,
                    o.iH)("")
                      , G = (0,
                    r.Fl)((()=>(0,
                    d.d)({
                        pipingServerUrl: w.value ?? "",
                        pipingServerHeaders: S.value,
                        csPath: U.value,
                        scPath: _.value,
                        sshServerPort: F.value
                    })));
                    async function X(e) {
                        $.value = !1,
                        Y.value = !1,
                        await (0,
                        s.ln)(e)
                    }
                    function J(e) {
                        const t = ["a", "b", "c", "d", "e", "f", "h", "i", "j", "k", "m", "n", "p", "r", "s", "t", "u", "v", "w", "x", "y", "z", "2", "3", "4", "5", "6", "7", "8"]
                          , n = window.crypto.getRandomValues(new Uint32Array(e));
                        return Array.from(n).map((e=>t[e % t.length])).join("")
                    }
                    function Q() {
                        location.href = (0,
                        u.E)({
                            pipingServerUrl: w.value,
                            pipingServerHeaders: S.value,
                            csPath: U.value,
                            scPath: _.value,
                            sshUsername: O.value,
                            sshPassword: K.value ? A.value : void 0,
                            sshServerPortForHint: F.value,
                            autoConnect: q.value
                        }),
                        (0,
                        g.O)({
                            message: "URL updated"
                        })
                    }
                    return (0,
                    r.YP)(G, (()=>{
                        D.value = G.value
                    }
                    ), {
                        immediate: !0
                    }),
                    (e,n)=>{
                        const u = (0,
                        r.up)("v-icon")
                          , s = (0,
                        r.up)("v-avatar")
                          , d = (0,
                        r.up)("v-spacer")
                          , g = (0,
                        r.up)("v-btn")
                          , k = (0,
                        r.up)("v-container")
                          , Z = (0,
                        r.up)("v-app-bar")
                          , G = (0,
                        r.up)("v-alert")
                          , J = (0,
                        r.up)("v-sheet")
                          , ee = (0,
                        r.up)("v-combobox")
                          , te = (0,
                        r.up)("v-text-field")
                          , ne = (0,
                        r.up)("v-col")
                          , ae = (0,
                        r.up)("v-row")
                          , re = (0,
                        r.up)("v-checkbox")
                          , oe = (0,
                        r.up)("v-form")
                          , le = (0,
                        r.up)("v-textarea")
                          , ue = (0,
                        r.up)("v-main")
                          , ie = (0,
                        r.up)("v-card-title")
                          , se = (0,
                        r.up)("v-divider")
                          , de = (0,
                        r.up)("v-card-text")
                          , ce = (0,
                        r.up)("v-card")
                          , pe = (0,
                        r.up)("v-dialog")
                          , ve = (0,
                        r.up)("v-app");
                        return (0,
                        r.wg)(),
                        (0,
                        r.j4)(ve, {
                            theme: "dark"
                        }, {
                            default: (0,
                            r.w5)((()=>[(0,
                            r.Wm)(Z, {
                                flat: ""
                            }, {
                                default: (0,
                                r.w5)((()=>[(0,
                                r.Wm)(k, {
                                    class: "d-flex align-center"
                                }, {
                                    default: (0,
                                    r.w5)((()=>[(0,
                                    r.Wm)(s, {
                                        class: "me-4 ms-4",
                                        color: "grey-darken-3",
                                        size: "32"
                                    }, {
                                        default: (0,
                                        r.w5)((()=>[(0,
                                        r.Wm)(u, {
                                            icon: (0,
                                            o.SU)(i.aTZ)
                                        }, null, 8, ["icon"])])),
                                        _: 1
                                    }), x, (0,
                                    r.Wm)(d), (0,
                                    r.Wm)(g, {
                                        onClick: n[0] || (n[0] = e=>L.value = !L.value),
                                        variant: "text",
                                        "prepend-icon": (0,
                                        o.SU)(i.FCR)
                                    }, {
                                        default: (0,
                                        r.w5)((()=>[(0,
                                        r.Uk)(" Manage keys ")])),
                                        _: 1
                                    }, 8, ["prepend-icon"]), (0,
                                    r.Wm)(g, {
                                        icon: (0,
                                        o.SU)(i.LcO),
                                        href: "https://github.com/nwtgck/piping-ssh-web",
                                        target: "_blank"
                                    }, null, 8, ["icon"])])),
                                    _: 1
                                })])),
                                _: 1
                            }), (0,
                            r.Wm)(ue, null, {
                                default: (0,
                                r.w5)((()=>[N.value ? (0,
                                r.kq)("", !0) : ((0,
                                r.wg)(),
                                (0,
                                r.j4)(k, {
                                    key: 0
                                }, {
                                    default: (0,
                                    r.w5)((()=>[(0,
                                    r.Wm)(ae, null, {
                                        default: (0,
                                        r.w5)((()=>[(0,
                                        r.Wm)(ne, null, {
                                            default: (0,
                                            r.w5)((()=>[h.value ? (0,
                                            r.kq)("", !0) : ((0,
                                            r.wg)(),
                                            (0,
                                            r.j4)(J, {
                                                key: 0
                                            }, {
                                                default: (0,
                                                r.w5)((()=>[(0,
                                                r.Wm)(G, {
                                                    color: "warning",
                                                    icon: (0,
                                                    o.SU)(i.fr4),
                                                    variant: "outlined",
                                                    prominent: "",
                                                    border: "top",
                                                    style: {
                                                        "margin-bottom": "2rem"
                                                    }
                                                }, {
                                                    text: (0,
                                                    r.w5)((()=>[(0,
                                                    r.Uk)(" Sorry, this browser is not supported."), P, (0,
                                                    r.Uk)(" Use Google Chrome 105 or higher."), V, (0,
                                                    r.Uk)(" You can also use Microsoft Edge or other Chromium-based browsers. ")])),
                                                    _: 1
                                                }, 8, ["icon"])])),
                                                _: 1
                                            })), (0,
                                            r.Wm)(J, {
                                                "min-height": "70vh",
                                                rounded: "lg",
                                                style: {
                                                    padding: "1rem"
                                                }
                                            }, {
                                                default: (0,
                                                r.w5)((()=>[(0,
                                                r.Wm)(oe, {
                                                    onSubmit: (0,
                                                    a.iM)(I, ["prevent"]),
                                                    modelValue: E.value,
                                                    "onUpdate:modelValue": n[13] || (n[13] = e=>E.value = e),
                                                    disabled: !h.value
                                                }, {
                                                    default: (0,
                                                    r.w5)((()=>[(0,
                                                    r.Wm)(ee, {
                                                        label: "Piping Server",
                                                        modelValue: w.value,
                                                        "onUpdate:modelValue": n[1] || (n[1] = e=>w.value = e),
                                                        items: y.value,
                                                        required: "",
                                                        variant: "solo-filled",
                                                        rules: (0,
                                                        o.SU)(p.R)("Piping Server")
                                                    }, null, 8, ["modelValue", "items", "rules"]), (0,
                                                    r.Wm)(ae, null, {
                                                        default: (0,
                                                        r.w5)((()=>[(0,
                                                        r.Wm)(ne, null, {
                                                            default: (0,
                                                            r.w5)((()=>[(0,
                                                            r.Wm)(te, {
                                                                label: "client-server path",
                                                                modelValue: U.value,
                                                                "onUpdate:modelValue": n[2] || (n[2] = e=>U.value = e),
                                                                required: "",
                                                                variant: "solo-filled",
                                                                rules: (0,
                                                                o.SU)(p.R)("client-server path")
                                                            }, null, 8, ["modelValue", "rules"])])),
                                                            _: 1
                                                        }), (0,
                                                        r.Wm)(ne, null, {
                                                            default: (0,
                                                            r.w5)((()=>[(0,
                                                            r.Wm)(te, {
                                                                label: "server-client path",
                                                                modelValue: _.value,
                                                                "onUpdate:modelValue": n[3] || (n[3] = e=>_.value = e),
                                                                required: "",
                                                                variant: "solo-filled",
                                                                rules: (0,
                                                                o.SU)(p.R)("server-client path")
                                                            }, null, 8, ["modelValue", "rules"])])),
                                                            _: 1
                                                        })])),
                                                        _: 1
                                                    }), (0,
                                                    r.Wm)(te, {
                                                        label: "user name",
                                                        modelValue: O.value,
                                                        "onUpdate:modelValue": n[4] || (n[4] = e=>O.value = e),
                                                        required: "",
                                                        variant: "solo-filled",
                                                        rules: (0,
                                                        o.SU)(p.R)("user name")
                                                    }, null, 8, ["modelValue", "rules"]), M.value ? ((0,
                                                    r.wg)(),
                                                    (0,
                                                    r.iD)(r.HY, {
                                                        key: 0
                                                    }, [((0,
                                                    r.wg)(!0),
                                                    (0,
                                                    r.iD)(r.HY, null, (0,
                                                    r.Ko)(b.value, ((e,t)=>((0,
                                                    r.wg)(),
                                                    (0,
                                                    r.j4)(ae, null, {
                                                        default: (0,
                                                        r.w5)((()=>[(0,
                                                        r.Wm)(ne, null, {
                                                            default: (0,
                                                            r.w5)((()=>[(0,
                                                            r.Wm)(te, {
                                                                modelValue: e[0],
                                                                "onUpdate:modelValue": t=>e[0] = t,
                                                                label: `HTTP header name ${t + 1}`,
                                                                variant: "solo-filled"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])])),
                                                            _: 2
                                                        }, 1024), (0,
                                                        r.Wm)(ne, null, {
                                                            default: (0,
                                                            r.w5)((()=>[(0,
                                                            r.Wm)(te, {
                                                                modelValue: e[1],
                                                                "onUpdate:modelValue": t=>e[1] = t,
                                                                label: `HTTP header value ${t + 1}`,
                                                                variant: "solo-filled"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])])),
                                                            _: 2
                                                        }, 1024), (0,
                                                        r.Wm)(ne, null, {
                                                            default: (0,
                                                            r.w5)((()=>[(0,
                                                            r.Wm)(g, {
                                                                icon: (0,
                                                                o.SU)(i.UHA),
                                                                onClick: e=>b.value.splice(t, 1),
                                                                variant: "text"
                                                            }, null, 8, ["icon", "onClick"])])),
                                                            _: 2
                                                        }, 1024)])),
                                                        _: 2
                                                    }, 1024)))), 256)), (0,
                                                    r.Wm)(g, {
                                                        onClick: n[5] || (n[5] = e=>b.value.push(["", ""])),
                                                        "prepend-icon": (0,
                                                        o.SU)(i.qX5),
                                                        variant: "outlined",
                                                        style: {
                                                            "margin-bottom": "1rem",
                                                            "text-transform": "none"
                                                        }
                                                    }, {
                                                        default: (0,
                                                        r.w5)((()=>[(0,
                                                        r.Uk)(" Add header ")])),
                                                        _: 1
                                                    }, 8, ["prepend-icon"]), (0,
                                                    r.Wm)(te, {
                                                        modelValue: F.value,
                                                        "onUpdate:modelValue": n[6] || (n[6] = e=>F.value = e),
                                                        label: "SSH server port for command",
                                                        variant: "solo-filled"
                                                    }, null, 8, ["modelValue"]), (0,
                                                    r.Wm)(te, {
                                                        modelValue: R.value,
                                                        "onUpdate:modelValue": n[8] || (n[8] = e=>R.value = e),
                                                        label: "SSH password",
                                                        type: B.value ? "text" : "password",
                                                        variant: "solo-filled"
                                                    }, {
                                                        "append-inner": (0,
                                                        r.w5)((()=>[(0,
                                                        r.Wm)(g, {
                                                            onClick: n[7] || (n[7] = e=>B.value = !B.value),
                                                            icon: B.value ? (0,
                                                            o.SU)(i.DqW) : (0,
                                                            o.SU)(i.rgx),
                                                            variant: "text"
                                                        }, null, 8, ["icon"])])),
                                                        _: 1
                                                    }, 8, ["modelValue", "type"]), (0,
                                                    r.Wm)(re, {
                                                        modelValue: z.value,
                                                        "onUpdate:modelValue": n[9] || (n[9] = e=>z.value = e),
                                                        label: "Empty SSH password"
                                                    }, null, 8, ["modelValue"]), (0,
                                                    r.Wm)(re, {
                                                        modelValue: K.value,
                                                        "onUpdate:modelValue": n[10] || (n[10] = e=>K.value = e),
                                                        label: "Include SSH password in configured URL"
                                                    }, null, 8, ["modelValue"]), (0,
                                                    r.Wm)(re, {
                                                        modelValue: q.value,
                                                        "onUpdate:modelValue": n[11] || (n[11] = e=>q.value = e),
                                                        label: "Auto connect for configured URL"
                                                    }, null, 8, ["modelValue"])], 64)) : (0,
                                                    r.kq)("", !0), (0,
                                                    r.Wm)(g, {
                                                        type: "submit",
                                                        disabled: !E.value || !h.value,
                                                        block: "",
                                                        class: "mt-8",
                                                        color: "secondary"
                                                    }, {
                                                        default: (0,
                                                        r.w5)((()=>[(0,
                                                        r.Uk)(" Connect ")])),
                                                        _: 1
                                                    }, 8, ["disabled"]), (0,
                                                    r.Wm)(g, {
                                                        onClick: n[12] || (n[12] = e=>M.value = !M.value),
                                                        "prepend-icon": M.value ? (0,
                                                        o.SU)(i.LYy) : (0,
                                                        o.SU)(i.cx8),
                                                        variant: "text",
                                                        style: {
                                                            "margin-top": "1.2rem",
                                                            "text-transform": "none"
                                                        }
                                                    }, {
                                                        default: (0,
                                                        r.w5)((()=>[(0,
                                                        r.Uk)((0,
                                                        l.zw)(M.value ? "Hide options" : "More options"), 1)])),
                                                        _: 1
                                                    }, 8, ["prepend-icon"])])),
                                                    _: 1
                                                }, 8, ["onSubmit", "modelValue", "disabled"]), (0,
                                                r.Wm)(d, {
                                                    style: {
                                                        "margin-top": "4rem"
                                                    }
                                                }), (0,
                                                r.Wm)(le, {
                                                    label: "server-host command",
                                                    modelValue: D.value,
                                                    "onUpdate:modelValue": n[14] || (n[14] = e=>D.value = e),
                                                    variant: "outlined",
                                                    rows: "2",
                                                    class: "text-grey"
                                                }, {
                                                    "append-inner": (0,
                                                    r.w5)((()=>[(0,
                                                    r.Wm)(c.Z, {
                                                        text: D.value
                                                    }, null, 8, ["text"])])),
                                                    _: 1
                                                }, 8, ["modelValue"]), (0,
                                                r.Wm)(g, {
                                                    color: "grey",
                                                    onClick: n[15] || (n[15] = e=>Q()),
                                                    "prepend-icon": (0,
                                                    o.SU)(i.xRl),
                                                    variant: "outlined",
                                                    style: {
                                                        "text-transform": "none"
                                                    }
                                                }, {
                                                    default: (0,
                                                    r.w5)((()=>[(0,
                                                    r.Uk)(" Set configured URL ")])),
                                                    _: 1
                                                }, 8, ["prepend-icon"])])),
                                                _: 1
                                            })])),
                                            _: 1
                                        })])),
                                        _: 1
                                    })])),
                                    _: 1
                                })), N.value ? ((0,
                                r.wg)(),
                                (0,
                                r.j4)((0,
                                o.SU)(t), {
                                    key: 1,
                                    "piping-server-url": w.value,
                                    "piping-server-headers": S.value,
                                    "default-ssh-password": A.value,
                                    "cs-path": U.value,
                                    "sc-path": _.value,
                                    username: O.value,
                                    onEnd: n[16] || (n[16] = e=>N.value = !1)
                                }, null, 8, ["piping-server-url", "piping-server-headers", "default-ssh-password", "cs-path", "sc-path", "username"])) : (0,
                                r.kq)("", !0)])),
                                _: 1
                            }), (0,
                            r.Wm)(pe, {
                                modelValue: L.value,
                                "onUpdate:modelValue": n[20] || (n[20] = e=>L.value = e),
                                scrollable: "",
                                width: "90vw"
                            }, {
                                default: (0,
                                r.w5)((()=>[(0,
                                r.Wm)(ce, null, {
                                    default: (0,
                                    r.w5)((()=>[(0,
                                    r.Wm)(ie, {
                                        class: "d-flex"
                                    }, {
                                        default: (0,
                                        r.w5)((()=>[H, (0,
                                        r.Wm)(d), (0,
                                        r.Wm)(g, {
                                            onClick: n[17] || (n[17] = e=>L.value = !1),
                                            icon: (0,
                                            o.SU)(i.r5M),
                                            variant: "text"
                                        }, null, 8, ["icon"])])),
                                        _: 1
                                    }), (0,
                                    r.Wm)(se), (0,
                                    r.Wm)(de, {
                                        style: {
                                            "min-height": "70vh"
                                        }
                                    }, {
                                        default: (0,
                                        r.w5)((()=>[(0,
                                        r._)("div", C, [(0,
                                        r.Wm)(g, {
                                            onClick: n[18] || (n[18] = e=>$.value = !$.value),
                                            "prepend-icon": (0,
                                            o.SU)(i.qX5),
                                            color: "secondary",
                                            style: {
                                                "margin-right": "1rem"
                                            }
                                        }, {
                                            default: (0,
                                            r.w5)((()=>[(0,
                                            r.Uk)(" New ")])),
                                            _: 1
                                        }, 8, ["prepend-icon"]), (0,
                                        r.Wm)(g, {
                                            onClick: n[19] || (n[19] = e=>Y.value = !Y.value),
                                            "prepend-icon": (0,
                                            o.SU)(i.WWn),
                                            color: "secondary"
                                        }, {
                                            default: (0,
                                            r.w5)((()=>[(0,
                                            r.Uk)(" Generate ")])),
                                            _: 1
                                        }, 8, ["prepend-icon"])]), (0,
                                        r.Wm)((0,
                                        o.SU)(v))])),
                                        _: 1
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            }, 8, ["modelValue"]), (0,
                            r.Wm)(pe, {
                                modelValue: $.value,
                                "onUpdate:modelValue": n[23] || (n[23] = e=>$.value = e),
                                width: "80vw"
                            }, {
                                default: (0,
                                r.w5)((()=>[(0,
                                r.Wm)(ce, null, {
                                    default: (0,
                                    r.w5)((()=>[(0,
                                    r.Wm)(ie, {
                                        class: "d-flex"
                                    }, {
                                        default: (0,
                                        r.w5)((()=>[j, (0,
                                        r.Wm)(d), (0,
                                        r.Wm)(g, {
                                            onClick: n[21] || (n[21] = e=>$.value = !1),
                                            icon: (0,
                                            o.SU)(i.r5M),
                                            variant: "text"
                                        }, null, 8, ["icon"])])),
                                        _: 1
                                    }), (0,
                                    r.Wm)(se), (0,
                                    r.Wm)(de, {
                                        style: {
                                            "min-height": "70vh"
                                        }
                                    }, {
                                        default: (0,
                                        r.w5)((()=>[(0,
                                        r.Wm)((0,
                                        o.SU)(f), {
                                            onSave: n[22] || (n[22] = e=>X(e))
                                        })])),
                                        _: 1
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            }, 8, ["modelValue"]), (0,
                            r.Wm)(pe, {
                                modelValue: Y.value,
                                "onUpdate:modelValue": n[26] || (n[26] = e=>Y.value = e),
                                width: "80vw"
                            }, {
                                default: (0,
                                r.w5)((()=>[(0,
                                r.Wm)(ce, null, {
                                    default: (0,
                                    r.w5)((()=>[(0,
                                    r.Wm)(ie, {
                                        class: "d-flex"
                                    }, {
                                        default: (0,
                                        r.w5)((()=>[T, (0,
                                        r.Wm)(d), (0,
                                        r.Wm)(g, {
                                            onClick: n[24] || (n[24] = e=>Y.value = !1),
                                            icon: (0,
                                            o.SU)(i.r5M),
                                            variant: "text"
                                        }, null, 8, ["icon"])])),
                                        _: 1
                                    }), (0,
                                    r.Wm)(se), (0,
                                    r.Wm)(de, {
                                        style: {
                                            "min-height": "70vh"
                                        }
                                    }, {
                                        default: (0,
                                        r.w5)((()=>[(0,
                                        r.Wm)((0,
                                        o.SU)(m), {
                                            onSave: n[25] || (n[25] = e=>X(e))
                                        })])),
                                        _: 1
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            }, 8, ["modelValue"]), (0,
                            r.Wm)(W)])),
                            _: 1
                        })
                    }
                }
            });
            const F = O;
            var R = F
              , B = (n(9773),
            n(8727))
              , z = n(3447)
              , A = n(8600)
              , K = n(6517);
            const q = (0,
            B.Rd)({
                components: z,
                directives: A,
                icons: {
                    defaultSet: "mdi",
                    aliases: K.j,
                    sets: {
                        mdi: K.t
                    }
                }
            });
            (0,
            a.ri)(R).use(q).mount("#app")
        },
        6008: function(e, t, n) {
            n.d(t, {
                Z: function() {
                    return s
                }
            });
            var a = n(3396)
              , r = n(4870)
              , o = n(6526);
            const l = (0,
            a._)("span", null, "Copied", -1);
            var u = (0,
            a.aZ)({
                __name: "CopyToClipboardButton",
                props: {
                    text: {}
                },
                setup(e) {
                    const t = e
                      , u = ()=>n.e(98).then(n.t.bind(n, 7098, 23)).then((e=>e.default))
                      , i = (0,
                    r.iH)(!1);
                    async function s() {
                        const e = await u();
                        await e(t.text),
                        i.value = !0,
                        await new Promise((e=>setTimeout(e, 2e3))),
                        i.value = !1
                    }
                    return (e,t)=>{
                        const n = (0,
                        a.up)("v-btn")
                          , u = (0,
                        a.up)("v-tooltip");
                        return (0,
                        a.wg)(),
                        (0,
                        a.j4)(u, {
                            "model-value": i.value,
                            location: "bottom",
                            disabled: ""
                        }, {
                            activator: (0,
                            a.w5)((({props: e})=>[(0,
                            a.Wm)(n, (0,
                            a.dG)({
                                onClick: t[0] || (t[0] = e=>s())
                            }, e, {
                                icon: (0,
                                r.SU)(o.a0Z),
                                variant: "text"
                            }), null, 16, ["icon"])])),
                            default: (0,
                            a.w5)((()=>[l])),
                            _: 1
                        }, 8, ["model-value"])
                    }
                }
            });
            const i = u;
            var s = i
        }
    }
      , t = {};
    function n(a) {
        var r = t[a];
        if (void 0 !== r)
            return r.exports;
        var o = t[a] = {
            exports: {}
        };
        return e[a].call(o.exports, o, o.exports, n),
        o.exports
    }
    n.m = e,
    function() {
        var e = [];
        n.O = function(t, a, r, o) {
            if (!a) {
                var l = 1 / 0;
                for (d = 0; d < e.length; d++) {
                    a = e[d][0],
                    r = e[d][1],
                    o = e[d][2];
                    for (var u = !0, i = 0; i < a.length; i++)
                        (!1 & o || l >= o) && Object.keys(n.O).every((function(e) {
                            return n.O[e](a[i])
                        }
                        )) ? a.splice(i--, 1) : (u = !1,
                        o < l && (l = o));
                    if (u) {
                        e.splice(d--, 1);
                        var s = r();
                        void 0 !== s && (t = s)
                    }
                }
                return t
            }
            o = o || 0;
            for (var d = e.length; d > 0 && e[d - 1][2] > o; d--)
                e[d] = e[d - 1];
            e[d] = [a, r, o]
        }
    }(),
    function() {
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e["default"]
            }
            : function() {
                return e
            }
            ;
            return n.d(t, {
                a: t
            }),
            t
        }
    }(),
    function() {
        var e, t = Object.getPrototypeOf ? function(e) {
            return Object.getPrototypeOf(e)
        }
        : function(e) {
            return e.__proto__
        }
        ;
        n.t = function(a, r) {
            if (1 & r && (a = this(a)),
            8 & r)
                return a;
            if ("object" === typeof a && a) {
                if (4 & r && a.__esModule)
                    return a;
                if (16 & r && "function" === typeof a.then)
                    return a
            }
            var o = Object.create(null);
            n.r(o);
            var l = {};
            e = e || [null, t({}), t([]), t(t)];
            for (var u = 2 & r && a; "object" == typeof u && !~e.indexOf(u); u = t(u))
                Object.getOwnPropertyNames(u).forEach((function(e) {
                    l[e] = function() {
                        return a[e]
                    }
                }
                ));
            return l["default"] = function() {
                return a
            }
            ,
            n.d(o, l),
            o
        }
    }(),
    function() {
        n.d = function(e, t) {
            for (var a in t)
                n.o(t, a) && !n.o(e, a) && Object.defineProperty(e, a, {
                    enumerable: !0,
                    get: t[a]
                })
        }
    }(),
    function() {
        n.f = {},
        n.e = function(e) {
            return Promise.all(Object.keys(n.f).reduce((function(t, a) {
                return n.f[a](e, t),
                t
            }
            ), []))
        }
    }(),
    function() {
        n.u = function(e) {
            console.log("js/" + e + "." + {
                98: "e0ba4949",
                114: "6b0753f0",
                132: "ae9501bf",
                149: "846f493a",
                211: "4a148bf2",
                341: "faf1cf88",
                537: "8d5c2e99",
                745: "5e3a12d0",
                755: "56f05342",
                792: "e878b585"
            }[e] + ".js")
            return "js/" + e + "." + {
                98: "e0ba4949",
                114: "6b0753f0",
                132: "ae9501bf",
                149: "846f493a",
                211: "4a148bf2",
                341: "faf1cf88",
                537: "8d5c2e99",
                745: "5e3a12d0",
                755: "56f05342",
                792: "e878b585"
            }[e] + ".js"
        }
    }(),
    function() {
        n.miniCssF = function(e) {
            return "css/" + e + ".2c3db85a.css"
        }
    }(),
    function() {
        n.g = function() {
            if ("object" === typeof globalThis)
                return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" === typeof window)
                    return window
            }
        }()
    }(),
    function() {
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
    }(),
    function() {
        var e = {}
          , t = "piping-ssh-web:";
        n.l = function(a, r, o, l) {
            if (e[a])
                e[a].push(r);
            else {
                var u, i;
                console.log("A:",_asset_blobs[a.slice(1)])
                a = _asset_blobs[a.slice(1)];
                if (void 0 !== o)
                    for (var s = document.getElementsByTagName("script"), d = 0; d < s.length; d++) {
                        var c = s[d];
                        if (c.getAttribute("src") == a || c.getAttribute("data-webpack") == t + o) {
                            u = c;
                            break
                        }
                    }
                u || (i = !0,
                u = document.createElement("script"),
                u.charset = "utf-8",
                u.timeout = 120,
                n.nc && u.setAttribute("nonce", n.nc),
                u.setAttribute("data-webpack", t + o),
                u.src = a),
                e[a] = [r];
                
                var p = function(t, n) {
                    u.onerror = u.onload = null,
                    clearTimeout(v);
                    var r = e[a];
                    if (delete e[a],
                    u.parentNode && u.parentNode.removeChild(u),
                    r && r.forEach((function(e) {
                        return e(n)
                    }
                    )),
                    t)
                        return t(n)
                }
                  , v = setTimeout(p.bind(null, void 0, {
                    type: "timeout",
                    target: u
                }), 12e4);
                u.onerror = p.bind(null, u.onerror),
                u.onload = p.bind(null, u.onload),
                i && document.head.appendChild(u)
            }
        }
    }(),
    function() {
        n.r = function(e) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
    }(),
    function() {
        n.p = "/"
    }(),
    function() {
        if ("undefined" !== typeof document) {
            var e = function(e, t, n, a, r) {
                var o = document.createElement("link");
                console.log("T:",_asset_blobs[t.slice(1)])
                t = _asset_blobs[t.slice(1)];
                o.rel = "stylesheet",
                o.type = "text/css";
                var l = function(n) {
                    if (o.onerror = o.onload = null,
                    "load" === n.type)
                        a();
                    else {
                        var l = n && ("load" === n.type ? "missing" : n.type)
                          , u = n && n.target && n.target.href || t
                          , i = new Error("Loading CSS chunk " + e + " failed.\n(" + u + ")");
                        i.code = "CSS_CHUNK_LOAD_FAILED",
                        i.type = l,
                        i.request = u,
                        o.parentNode && o.parentNode.removeChild(o),
                        r(i)
                    }
                };
                return o.onerror = o.onload = l,
                o.href = t,
                n ? n.parentNode.insertBefore(o, n.nextSibling) : document.head.appendChild(o),
                o
            }
              , t = function(e, t) {
                for (var n = document.getElementsByTagName("link"), a = 0; a < n.length; a++) {
                    var r = n[a]
                      , o = r.getAttribute("data-href") || r.getAttribute("href");
                    if ("stylesheet" === r.rel && (o === e || o === t))
                        return r
                }
                var l = document.getElementsByTagName("style");
                for (a = 0; a < l.length; a++) {
                    r = l[a],
                    o = r.getAttribute("data-href");
                    if (o === e || o === t)
                        return r
                }
            }
              , a = function(a) {
                return new Promise((function(r, o) {
                    var l = n.miniCssF(a)
                      , u = n.p + l;
                    if (t(l, u))
                        return r();
                    e(a, u, null, r, o)
                }
                ))
            }
              , r = {
                143: 0
            };
            n.f.miniCss = function(e, t) {
                var n = {
                    149: 1
                };
                r[e] ? t.push(r[e]) : 0 !== r[e] && n[e] && t.push(r[e] = a(e).then((function() {
                    r[e] = 0
                }
                ), (function(t) {
                    throw delete r[e],
                    t
                }
                )))
            }
        }
    }(),
    function() {
        n.b = document.baseURI || self.location.href;
        var e = {
            143: 0
        };
        n.f.j = function(t, a) {
            var r = n.o(e, t) ? e[t] : void 0;
            if (0 !== r)
                if (r)
                    a.push(r[2]);
                else {
                    var o = new Promise((function(n, a) {
                        r = e[t] = [n, a]
                    }
                    ));
                    a.push(r[2] = o);
                    var l = n.p + n.u(t)
                      , u = new Error
                      , i = function(a) {
                        if (n.o(e, t) && (r = e[t],
                        0 !== r && (e[t] = void 0),
                        r)) {
                            var o = a && ("load" === a.type ? "missing" : a.type)
                              , l = a && a.target && a.target.src;
                            u.message = "Loading chunk " + t + " failed.\n(" + o + ": " + l + ")",
                            u.name = "ChunkLoadError",
                            u.type = o,
                            u.request = l,
                            r[1](u)
                        }
                    };
                    n.l(l, i, "chunk-" + t, t)
                }
        }
        ,
        n.O.j = function(t) {
            return 0 === e[t]
        }
        ;
        var t = function(t, a) {
            var r, o, l = a[0], u = a[1], i = a[2], s = 0;
            if (l.some((function(t) {
                return 0 !== e[t]
            }
            ))) {
                for (r in u)
                    n.o(u, r) && (n.m[r] = u[r]);
                if (i)
                    var d = i(n)
            }
            for (t && t(a); s < l.length; s++)
                o = l[s],
                n.o(e, o) && e[o] && e[o][0](),
                e[o] = 0;
            return n.O(d)
        }
          , a = self["webpackChunkpiping_ssh_web"] = self["webpackChunkpiping_ssh_web"] || [];
        a.forEach(t.bind(null, 0)),
        a.push = t.bind(null, a.push.bind(a))
    }();
    var a = n.O(void 0, [998], (function() {
        return n(8265)
    }
    ));
    a = n.O(a)
}
)();
//# sourceMappingURL=app.a907ef1e.js.map
