(function() {
    "use strict";
    const e = (async () => ("undefined" === typeof window ? globalThis.importScripts("https://cdn.jsdelivr.net/gh/jackb0back/piping-ssh-static@main/assets/wasm_exec.js") : await new Promise(((e, t) => {
            const n = document.createElement("script");
            n.src = "wasm_exec.js", n.onload = e, n.onerror = t, document.head.appendChild(n)
        })), new globalThis.Go))(),
        t = (async () => {
            const t = await e,
                n = new Promise((e => {
                    globalThis.pipingSshGoExportResolve = e
                }))

                const a = "undefined" === typeof window ? "https://cdn.jsdelivr.net/gh/jackb0back/piping-ssh-static@main/assets/main.wasm" : "https://cdn.jsdelivr.net/gh/jackb0back/piping-ssh-static@main/assets/main.wasm"
                const r = await fetch(a),
                s = await WebAssembly.instantiateStreaming(r, t.importObject);
            return t.run(s.instance), await n
        })();
    async function n() {
        const t = await e;
        return t.exited ?? !1
    }
    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    const a = Symbol("Comlink.proxy"),
        r = Symbol("Comlink.endpoint"),
        s = Symbol("Comlink.releaseProxy"),
        i = Symbol("Comlink.finalizer"),
        o = Symbol("Comlink.thrown"),
        c = e => "object" === typeof e && null !== e || "function" === typeof e,
        u = {
            canHandle: e => c(e) && e[a],
            serialize(e) {
                const {
                    port1: t,
                    port2: n
                } = new MessageChannel;
                return g(e, t), [n, [n]]
            },
            deserialize(e) {
                return e.start(), m(e)
            }
        },
        l = {
            canHandle: e => c(e) && o in e,
            serialize({
                value: e
            }) {
                let t;
                return t = e instanceof Error ? {
                    isError: !0,
                    value: {
                        message: e.message,
                        name: e.name,
                        stack: e.stack
                    }
                } : {
                    isError: !1,
                    value: e
                }, [t, []]
            },
            deserialize(e) {
                if (e.isError) throw Object.assign(new Error(e.value.message), e.value);
                throw e.value
            }
        },
        p = new Map([
            ["proxy", u],
            ["throw", l]
        ]);

    function y(e, t) {
        for (const n of e) {
            if (t === n || "*" === n) return !0;
            if (n instanceof RegExp && n.test(t)) return !0
        }
        return !1
    }

    function g(e, t = globalThis, n = ["*"]) {
        t.addEventListener("message", (function a(r) {
            if (!r || !r.data) return;
            if (!y(n, r.origin)) return void console.warn(`Invalid origin '${r.origin}' for comlink proxy`);
            const {
                id: s,
                type: c,
                path: u
            } = Object.assign({
                path: []
            }, r.data), l = (r.data.argumentList || []).map(j);
            let p;
            try {
                const t = u.slice(0, -1).reduce(((e, t) => e[t]), e),
                    n = u.reduce(((e, t) => e[t]), e);
                switch (c) {
                    case "GET":
                        p = n;
                        break;
                    case "SET":
                        t[u.slice(-1)[0]] = j(r.data.value), p = !0;
                        break;
                    case "APPLY":
                        p = n.apply(t, l);
                        break;
                    case "CONSTRUCT": {
                        const e = new n(...l);
                        p = O(e)
                    }
                    break;
                    case "ENDPOINT": {
                        const {
                            port1: t,
                            port2: n
                        } = new MessageChannel;
                        g(e, n), p = R(t, [t])
                    }
                    break;
                    case "RELEASE":
                        p = void 0;
                        break;
                    default:
                        return
                }
            } catch (d) {
                p = {
                    value: d,
                    [o]: 0
                }
            }
            Promise.resolve(p).catch((e => ({
                value: e,
                [o]: 0
            }))).then((n => {
                const [r, o] = L(n);
                t.postMessage(Object.assign(Object.assign({}, r), {
                    id: s
                }), o), "RELEASE" === c && (t.removeEventListener("message", a), f(t), i in e && "function" === typeof e[i] && e[i]())
            })).catch((e => {
                const [n, a] = L({
                    value: new TypeError("Unserializable return value"),
                    [o]: 0
                });
                t.postMessage(Object.assign(Object.assign({}, n), {
                    id: s
                }), a)
            }))
        })), t.start && t.start()
    }

    function d(e) {
        return "MessagePort" === e.constructor.name
    }

    function f(e) {
        d(e) && e.close()
    }

    function m(e, t) {
        return P(e, [], t)
    }

    function h(e) {
        if (e) throw new Error("Proxy has been released and is not useable")
    }

    function w(e) {
        return x(e, {
            type: "RELEASE"
        }).then((() => {
            f(e)
        }))
    }
    const E = new WeakMap,
        b = "FinalizationRegistry" in globalThis && new FinalizationRegistry((e => {
            const t = (E.get(e) || 0) - 1;
            E.set(e, t), 0 === t && w(e)
        }));

    function v(e, t) {
        const n = (E.get(t) || 0) + 1;
        E.set(t, n), b && b.register(e, t, e)
    }

    function S(e) {
        b && b.unregister(e)
    }

    function P(e, t = [], n = function() {}) {
        let a = !1;
        const i = new Proxy(n, {
            get(n, r) {
                if (h(a), r === s) return () => {
                    S(i), w(e), a = !0
                };
                if ("then" === r) {
                    if (0 === t.length) return {
                        then: () => i
                    };
                    const n = x(e, {
                        type: "GET",
                        path: t.map((e => e.toString()))
                    }).then(j);
                    return n.then.bind(n)
                }
                return P(e, [...t, r])
            },
            set(n, r, s) {
                h(a);
                const [i, o] = L(s);
                return x(e, {
                    type: "SET",
                    path: [...t, r].map((e => e.toString())),
                    value: i
                }, o).then(j)
            },
            apply(n, s, i) {
                h(a);
                const o = t[t.length - 1];
                if (o === r) return x(e, {
                    type: "ENDPOINT"
                }).then(j);
                if ("bind" === o) return P(e, t.slice(0, -1));
                const [c, u] = k(i);
                return x(e, {
                    type: "APPLY",
                    path: t.map((e => e.toString())),
                    argumentList: c
                }, u).then(j)
            },
            construct(n, r) {
                h(a);
                const [s, i] = k(r);
                return x(e, {
                    type: "CONSTRUCT",
                    path: t.map((e => e.toString())),
                    argumentList: s
                }, i).then(j)
            }
        });
        return v(i, e), i
    }

    function T(e) {
        return Array.prototype.concat.apply([], e)
    }

    function k(e) {
        const t = e.map(L);
        return [t.map((e => e[0])), T(t.map((e => e[1])))]
    }
    const A = new WeakMap;

    function R(e, t) {
        return A.set(e, t), e
    }

    function O(e) {
        return Object.assign(e, {
            [a]: !0
        })
    }

    function L(e) {
        for (const [t, n] of p)
            if (n.canHandle(e)) {
                const [a, r] = n.serialize(e);
                return [{
                    type: "HANDLER",
                    name: t,
                    value: a
                }, r]
            } return [{
            type: "RAW",
            value: e
        }, A.get(e) || []]
    }

    function j(e) {
        switch (e.type) {
            case "HANDLER":
                return p.get(e.name).deserialize(e.value);
            case "RAW":
                return e.value
        }
    }

    function x(e, t, n) {
        return new Promise((a => {
            const r = C();
            e.addEventListener("message", (function t(n) {
                n.data && n.data.id && n.data.id === r && (e.removeEventListener("message", t), a(n.data))
            })), e.start && e.start(), e.postMessage(Object.assign({
                id: r
            }, t), n)
        }))
    }

    function C() {
        return new Array(4).fill(0).map((() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))).join("-")
    }
    const M = {
        async existed() {
            return await n()
        },
        async panicOnPurpose() {
            const e = await t;
            await e.panicOnPurpose()
        },
        async doSsh(e, n) {
            const a = await t;
            await a.doSsh(e, n)
        },
        async getAuthPublicKeyType(e) {
            const n = await t;
            return await n.getAuthPublicKeyType(e)
        },
        async generateRsaKeys(e) {
            const n = await t;
            return n.generateRsaKeys(e)
        },
        async generateEd25519Keys() {
            const e = await t;
            return e.generateEd25519Keys()
        },
        async sshSha256Fingerprint(e) {
            const n = await t;
            return n.sshSha256Fingerprint(e)
        },
        async sshPrivateKeyIsEncrypted(e) {
            const n = await t;
            return await n.sshPrivateKeyIsEncrypted(e)
        }
    };
    g(M)
})();
//# sourceMappingURL=755.56f05342.js.map