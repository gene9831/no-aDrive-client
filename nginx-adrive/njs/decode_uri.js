export default function decode_uri(r) {
  return r.args.redirect ? decodeURIComponent(r.args.redirect) : "";
}
