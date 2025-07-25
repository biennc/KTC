import {
  appendErrors,
  get,
  set
} from "./chunk-YKFIBYZ4.js";
import "./chunk-KS2M7ZJI.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/@hookform/resolvers/dist/resolvers.mjs
var r = (t, r2, o3) => {
  if (t && "reportValidity" in t) {
    const s2 = get(o3, r2);
    t.setCustomValidity(s2 && s2.message || ""), t.reportValidity();
  }
};
var o = (e, t) => {
  for (const o3 in t.fields) {
    const s2 = t.fields[o3];
    s2 && s2.ref && "reportValidity" in s2.ref ? r(s2.ref, o3, e) : s2 && s2.refs && s2.refs.forEach((t2) => r(t2, o3, e));
  }
};
var s = (r2, s2) => {
  s2.shouldUseNativeValidation && o(r2, s2);
  const n2 = {};
  for (const o3 in r2) {
    const f = get(s2.fields, o3), c = Object.assign(r2[o3] || {}, { ref: f && f.ref });
    if (i(s2.names || Object.keys(r2), o3)) {
      const r3 = Object.assign({}, get(n2, o3));
      set(r3, "root", c), set(n2, o3, r3);
    } else set(n2, o3, c);
  }
  return n2;
};
var i = (e, t) => {
  const r2 = n(t);
  return e.some((e2) => n(e2).match(`^${r2}\\.\\d+`));
};
function n(e) {
  return e.replace(/\]|\[/g, "");
}

// node_modules/@hookform/resolvers/yup/dist/yup.mjs
function o2(o3, n2, s2) {
  return void 0 === s2 && (s2 = {}), function(a, i2, c) {
    try {
      return Promise.resolve(function(t, r2) {
        try {
          var u = (null != n2 && n2.context && true && console.warn("You should not used the yup options context. Please, use the 'useForm' context object instead"), Promise.resolve(o3["sync" === s2.mode ? "validateSync" : "validate"](a, Object.assign({ abortEarly: false }, n2, { context: i2 }))).then(function(t2) {
            return c.shouldUseNativeValidation && o({}, c), { values: s2.raw ? Object.assign({}, a) : t2, errors: {} };
          }));
        } catch (e) {
          return r2(e);
        }
        return u && u.then ? u.then(void 0, r2) : u;
      }(0, function(e) {
        if (!e.inner) throw e;
        return { values: {}, errors: s((o4 = e, n3 = !c.shouldUseNativeValidation && "all" === c.criteriaMode, (o4.inner || []).reduce(function(e2, t) {
          if (e2[t.path] || (e2[t.path] = { message: t.message, type: t.type }), n3) {
            var o5 = e2[t.path].types, s3 = o5 && o5[t.type];
            e2[t.path] = appendErrors(t.path, n3, e2, t.type, s3 ? [].concat(s3, t.message) : t.message);
          }
          return e2;
        }, {})), c) };
        var o4, n3;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
export {
  o2 as yupResolver
};
//# sourceMappingURL=@hookform_resolvers_yup.js.map
